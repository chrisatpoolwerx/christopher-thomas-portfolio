import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface CircularTextBadgeProps {
  text?: string;
  size?: number;
  fontSize?: number;
  textColor?: string;
  spinDuration?: number; // seconds per rotation
  className?: string;
}

export const CircularTextBadge: React.FC<CircularTextBadgeProps> = ({
  text = "Omni-Experience Innovator ・ Digital Transformation Awards Winner ・ 2019 ・ ",
  size = 200,
  fontSize = 10,
  textColor = "#121214",
  spinDuration = 20,
  className = "",
}) => {
  const rotation = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    controlsRef.current = animate(rotation, 360, {
      duration: spinDuration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      controlsRef.current?.stop();
    };
  }, [spinDuration, rotation]);

  const radius = size / 2;
  const textRadius = radius - 20; // Inset for text
  const characters = text.split('');
  const anglePerChar = 360 / characters.length;

  // Watch bezel notches
  const notchCount = 120;
  const notches = Array.from({ length: notchCount }, (_, i) => {
    const angle = (i * 360) / notchCount;
    const isMajor = i % 10 === 0;
    const notchLength = isMajor ? 8 : 4;
    const notchWidth = isMajor ? 1.5 : 0.75;
    return { angle, length: notchLength, width: notchWidth, isMajor };
  });

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ring with watch bezel notches */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        {/* Subtle outer circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 2}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-black/10"
        />

        {/* Watch bezel notches - inward facing */}
        {notches.map((notch, i) => {
          const angleRad = (notch.angle - 90) * (Math.PI / 180);
          const outerR = radius - 4;
          const innerR = outerR - notch.length;
          const x1 = radius + outerR * Math.cos(angleRad);
          const y1 = radius + outerR * Math.sin(angleRad);
          const x2 = radius + innerR * Math.cos(angleRad);
          const y2 = radius + innerR * Math.sin(angleRad);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={notch.width}
              className={notch.isMajor ? "text-black/30" : "text-black/15"}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Rotating text */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate: rotation }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {characters.map((char, i) => {
            const angle = i * anglePerChar - 90; // Start from top
            const angleRad = angle * (Math.PI / 180);
            const x = radius + textRadius * Math.cos(angleRad);
            const y = radius + textRadius * Math.sin(angleRad);

            return (
              <text
                key={i}
                x={x}
                y={y}
                fill={textColor}
                fontSize={fontSize}
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${angle + 90}, ${x}, ${y})`}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontVariant: 'small-caps',
                  letterSpacing: '0.05em',
                }}
              >
                {char.toLowerCase()}
              </text>
            );
          })}
        </svg>
      </motion.div>

      {/* Center badge */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ padding: size * 0.18 }}
      >
        <img
          src="/assets/icons/idcbadge.svg"
          alt="IDC Digital Transformation Award"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
