import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../ui';

// Real-time water surface for the Poolchex "Animated Water Field" panel, rendered with a
// WebGL fragment shader. Height is a sum of interfering waves (slow structural swells plus
// higher-frequency surface ripples) and pointer-driven ripples; the surface is lit with a
// diffuse wash, specular sun glints and soft caustics. It only animates while on screen,
// pauses in background tabs, renders a single still frame for reduced motion, and falls
// back to `fallback` when WebGL is unavailable.

const MAX_RIPPLES = 12;
const MAX_DPR = 1.5;

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec4 uRipples[${MAX_RIPPLES}]; // xy: centre, z: start time, w: strength

float swells(vec2 p, float t) {
  float h = 0.0;
  h += 0.50 * sin(dot(p, vec2(0.90, 0.40)) * 2.2 + t * 0.45);
  h += 0.35 * sin(dot(p, vec2(-0.50, 0.85)) * 2.9 + t * 0.38);
  h += 0.25 * sin(dot(p, vec2(0.20, -1.00)) * 3.7 - t * 0.52);
  return h;
}

float surfaceRipples(vec2 p, float t) {
  float h = 0.0;
  h += 0.042 * sin(dot(p, vec2(0.70, 0.70)) * 11.0 + t * 1.4);
  h += 0.034 * sin(dot(p, vec2(-0.80, 0.60)) * 14.0 - t * 1.7);
  h += 0.024 * sin(dot(p, vec2(0.10, 1.00)) * 19.0 + t * 2.1);
  h += 0.016 * sin(dot(p, vec2(1.00, -0.20)) * 25.0 - t * 2.5);
  return h;
}

float touchRipples(vec2 p, float t) {
  float h = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 r = uRipples[i];
    float age = t - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 4.0) continue;
    float d = distance(p, r.xy);
    float front = age * 0.42;
    float envelope = exp(-age * 1.0) * exp(-abs(d - front) * 6.0);
    h += r.w * envelope * sin((d - front) * 26.0);
  }
  return h;
}

float heightAt(vec2 p, float t) {
  return swells(p, t) * 0.35 + surfaceRipples(p, t) + touchRipples(p, t) * 0.22;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = gl_FragCoord.xy / uResolution.y;
  float t = uTime;
  float e = 1.5 / uResolution.y;

  float h = heightAt(p, t);
  float hx = heightAt(p + vec2(e, 0.0), t);
  float hy = heightAt(p + vec2(0.0, e), t);
  float hxm = heightAt(p - vec2(e, 0.0), t);
  float hym = heightAt(p - vec2(0.0, e), t);

  vec2 slope = vec2(hx - hxm, hy - hym) / (2.0 * e);
  vec3 normal = normalize(vec3(-slope * 0.26, 1.0));

  vec3 deep = vec3(0.039, 0.086, 0.157);
  vec3 mid = vec3(0.051, 0.157, 0.278);
  vec3 cyan = vec3(0.22, 0.74, 0.97);

  vec3 colour = mix(deep, mid, clamp(uv.y * 0.85 + h * 0.18 + 0.08, 0.0, 1.0));

  vec3 light = normalize(vec3(0.35, 0.55, 0.75));
  float diffuse = clamp(dot(normal, light), 0.0, 1.0);
  colour += cyan * 0.10 * (diffuse - 0.72);

  vec3 reflected = reflect(-light, normal);
  float glint = pow(max(dot(reflected, vec3(0.0, 0.0, 1.0)), 0.0), 28.0);
  colour += vec3(0.70, 0.90, 1.0) * glint * 0.22;

  float curvature = (hx + hxm + hy + hym - 4.0 * h) / (e * e);
  colour += cyan * smoothstep(0.0, 1.0, -curvature * 0.003) * 0.16;

  float vignette = smoothstep(1.25, 0.25, length(uv - 0.5) * 1.35);
  colour *= mix(0.72, 1.0, vignette);

  gl_FragColor = vec4(colour, 1.0);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export const WaterSurface: React.FC<{ className?: string; fallback?: React.ReactNode }> = ({ className, fallback }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // Full-screen triangle pair
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uRipples = gl.getUniformLocation(program, 'uRipples');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ripples = new Float32Array(MAX_RIPPLES * 4);
    let nextRipple = 0;
    const start = performance.now();
    const now = () => (performance.now() - start) / 1000;

    const addRipple = (x: number, y: number, strength: number) => {
      const i = nextRipple * 4;
      ripples[i] = x;
      ripples[i + 1] = y;
      ripples[i + 2] = now();
      ripples[i + 3] = strength;
      nextRipple = (nextRipple + 1) % MAX_RIPPLES;
    };

    let frame = 0;
    let visible = false;
    let firstFrameDrawn = false;

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform4fv(uRipples, ripples);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!firstFrameDrawn) {
        firstFrameDrawn = true;
        setReady(true);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(host.clientWidth * dpr));
      const height = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform2f(uResolution, width, height);
      }
      if (reduceMotion) draw(12);
    };

    // Occasional ambient drops keep the surface alive without a pointer (e.g. on touch devices)
    let lastAmbient = 0;
    const loop = () => {
      const time = now();
      if (time - lastAmbient > 2.6) {
        lastAmbient = time;
        const aspect = host.clientWidth / Math.max(host.clientHeight, 1);
        addRipple(0.15 * aspect + Math.random() * 0.7 * aspect, 0.15 + Math.random() * 0.7, 0.55);
      }
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (reduceMotion || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Pointer ripples, throttled and positioned in the shader's aspect-corrected space
    let lastPointer = 0;
    const toSurface = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: (event.clientX - rect.left) / rect.height, y: (rect.bottom - event.clientY) / rect.height };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion) return;
      const stamp = performance.now();
      if (stamp - lastPointer < 70) return;
      lastPointer = stamp;
      const { x, y } = toSurface(event);
      addRipple(x, y, 0.5);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotion) return;
      const { x, y } = toSurface(event);
      addRipple(x, y, 1.3);
    };

    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stopLoop();
      setFailed(true);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    intersectionObserver.observe(host);

    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onContextLost);
    resize();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <>
      {/* Shown until the first frame is drawn */}
      {!ready && fallback}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cx('absolute inset-0 w-full h-full transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0', className)}
      />
    </>
  );
};
