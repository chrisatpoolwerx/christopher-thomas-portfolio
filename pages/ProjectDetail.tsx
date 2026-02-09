
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { MagneticButton } from '../components/MagneticButton';
import { CircularTextBadge } from '../components/CircularTextBadge';

const IconSmartphone = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const IconWrench = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const IconBuilding = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="22"></line>
    <line x1="15" y1="22" x2="15" y2="22"></line>
    <line x1="9" y1="6" x2="9" y2="6"></line>
    <line x1="15" y1="6" x2="15" y2="6"></line>
    <line x1="9" y1="10" x2="9" y2="10"></line>
    <line x1="15" y1="10" x2="15" y2="10"></line>
    <line x1="9" y1="14" x2="9" y2="14"></line>
    <line x1="15" y1="14" x2="15" y2="14"></line>
    <line x1="9" y1="18" x2="9" y2="18"></line>
    <line x1="15" y1="18" x2="15" y2="18"></line>
  </svg>
);

const IconWater = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);

// Tool Icons
const ToolIcons: Record<string, React.FC<{ className?: string }>> = {
  'Sketch': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.5L2 8.5l10 12 10-12-10-7zm0 2.31l6.9 4.81L12 17.12 5.1 8.62 12 3.81z"/>
      <path d="M12 1.5v15.62M2 8.5h20"/>
    </svg>
  ),
  'Principle': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'Keynote': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 18v3M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="11" r="3"/>
    </svg>
  ),
  'Pixelmator Pro': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v16H4V4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 16l4-8 4 8M6 12h4M14 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Figma': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
    </svg>
  ),
  'Zeplin': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7l10 5 10-5M12 12v10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'Reality Composer': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8l4 2.25v4.5L12 17l-4-2.25v-4.5L12 8z"/>
      <path d="M12 2v6M4 6.5L12 11M20 6.5L12 11" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'Xcode': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  'Gemini': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6c-2.5 0-4.5 2.5-4.5 6s2 6 4.5 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 6c2.5 0 4.5 2.5 4.5 6s-2 6-4.5 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  'Flutter': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 2L4 12.5l3.5 3.5L19 4.5V2h-4.5z"/>
      <path d="M14.5 12L8 18.5 11.5 22l8-8v-2h-5z"/>
    </svg>
  ),
  'SwiftUI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 8c-2 2-4 4-6 5 1-2 2-4 2-6-2 2-4 4-5 6 0-2 1-4 2-6-3 3-4 6-3 8 2 0 5-1 8-4 0 2-1 4-2 5 3-2 5-5 4-8z" fill="currentColor"/>
    </svg>
  ),
  'Core ML': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="2" fill="currentColor"/>
      <circle cx="16" cy="12" r="2" fill="currentColor"/>
      <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3v3M12 18v3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'Vision': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
};

const ToolBadge: React.FC<{ name: string }> = ({ name }) => {
  const Icon = ToolIcons[name];
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#fbfbfb] border border-black/5 rounded-xl group hover:bg-brand hover:border-brand transition-all duration-300">
      {Icon && <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />}
      <span className="text-sm font-medium opacity-70 group-hover:text-white group-hover:opacity-100 transition-all">{name}</span>
    </div>
  );
};

const SpatialDiagram: React.FC = () => {
  return (
    <div className="w-full py-24 md:py-40 px-8 bg-[#121214] border border-white/5 rounded-[3rem] md:rounded-[5rem] overflow-hidden relative">
      <div className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h4 className="text-xs uppercase tracking-[0.6em] text-brand font-bold mb-24 text-center">From Selection → Manipulation</h4>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
          {/* Node 1: Selection */}
          <motion.div 
            className="flex flex-col items-center text-center group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-32 h-32 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 mb-8 group-hover:bg-white/10 transition-colors">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
              <div className="w-16 h-1 bg-white/40 rounded-full" />
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
            <p className="text-white font-bold uppercase tracking-widest mb-3">2D Interface</p>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">List-based selection</p>
          </motion.div>

          {/* Transition Arrow - only animates when in viewport */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white"
              initial={{ x: 0 }}
              whileInView={{ x: [0, 10, 0] }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ willChange: 'transform' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </motion.div>
            <span className="text-[10px] uppercase font-bold text-brand tracking-[0.5em]">Spatial Shift</span>
          </div>

          {/* Node 2: Manipulation */}
          <motion.div 
            className="flex flex-col items-center text-center group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="w-24 h-24 rounded-full bg-brand shadow-[0_0_50px_rgba(255,79,0,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <IconSmartphone />
              </div>
              {/* Floating particles - only animate when in viewport for performance */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full"
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  whileInView={{
                    y: [0, -40, 0],
                    x: [0, (i % 2 === 0 ? 30 : -30), 0],
                    opacity: [0, 1, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: i * 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ top: '40%', left: '45%', willChange: 'transform, opacity' }}
                />
              ))}
            </div>
            <p className="text-white font-bold uppercase tracking-widest mb-3">Spatial Experience</p>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Direct Placement</p>
          </motion.div>
        </div>

        <div className="mt-24 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h5 className="text-white font-serif italic text-xl">Cognitive Unloading</h5>
            <p className="text-white/50 font-light leading-relaxed">By placing ingredients in 3D, we bypass the need for users to translate text lists into visual expectations. The product is the interface.</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-serif italic text-xl">Tactile Assurance</h5>
            <p className="text-white/50 font-light leading-relaxed">Gesture-based manipulation triggers immediate visual and haptic feedback, building confidence in the customization outcome.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MomentumDiagram: React.FC = () => {
  return (
    <div className="w-full py-20 md:py-32 px-8 bg-[#121214] border border-white/5 rounded-[3rem] md:rounded-[5rem] overflow-hidden relative">
      <div className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h4 className="text-xs uppercase tracking-[0.6em] text-brand font-bold mb-16 md:mb-24 text-center">User Journey Compression</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Before */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs text-white/40 uppercase tracking-widest">Before</span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            {['Browse Menu', 'Select Item', 'Choose Size', 'Select Crust', 'Add Toppings', 'Review Changes', 'Confirm'].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/40">{i + 1}</span>
                <span className="text-white/60 text-sm">{step}</span>
              </div>
            ))}
            <p className="text-white/30 text-xs mt-8 uppercase tracking-wider">7 discrete steps</p>
          </motion.div>

          {/* After */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs text-brand uppercase tracking-widest">After</span>
              <div className="h-[1px] flex-grow bg-brand/30" />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand via-brand/50 to-brand/20" />
              {['Select & Customize', 'Progressive Options', 'Live Preview & Confirm'].map((step, i) => (
                <div key={i} className="flex items-center gap-6 mb-8">
                  <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-brand/30 z-10">{i + 1}</span>
                  <span className="text-white text-base font-medium">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-brand text-xs mt-8 uppercase tracking-wider font-bold">Progressive flow</p>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif text-brand">57%</span>
            <p className="text-white/40 text-sm mt-3">Fewer decision points</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif text-white">3.2s</span>
            <p className="text-white/40 text-sm mt-3">Avg. time reduction per order</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-serif text-brand">↑24%</span>
            <p className="text-white/40 text-sm mt-3">Completion rate increase</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PingPongVideo: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState(false);
  const animationRef = useRef<number>();

  const reversePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const step = () => {
      if (video.currentTime <= 0) {
        setIsReversing(false);
        video.play();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - 0.033);
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.pause();
      setIsReversing(true);
      reversePlay();
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reversePlay]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
    />
  );
};

const DesignSystemDiagram: React.FC = () => {
  return (
    <div className="w-full py-16 md:py-24 px-8 bg-white border border-black/5 rounded-[3rem] md:rounded-[5rem] shadow-2xl shadow-black/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-xs uppercase tracking-[0.5em] text-brand font-bold mb-12 md:mb-16 text-center">Modular Design System</h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {[
            { label: 'Core Tokens', desc: 'Color, Type, Spacing', icon: '◉' },
            { label: 'Components', desc: 'Buttons, Cards, Inputs', icon: '◧' },
            { label: 'Patterns', desc: 'Flows, Interactions', icon: '◫' },
            { label: 'Templates', desc: 'Market-specific layouts', icon: '◳' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 md:p-8 bg-[#fbfbfb] rounded-2xl md:rounded-3xl border border-black/5 text-center group hover:bg-brand hover:border-brand transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-3xl md:text-4xl text-brand group-hover:text-white transition-colors">{item.icon}</span>
              <p className="text-sm md:text-base font-bold mt-4 mb-2 group-hover:text-white transition-colors">{item.label}</p>
              <p className="text-[10px] md:text-xs opacity-40 group-hover:text-white/60 group-hover:opacity-100 transition-all">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-[#121214] rounded-2xl md:rounded-3xl text-white">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-brand animate-pulse" />
            <span className="text-sm font-medium">Global Consistency</span>
          </div>
          <div className="hidden md:block h-[1px] flex-grow bg-white/10 mx-8" />
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Regional Flexibility</span>
            <div className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

const IconDashboard = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1"></rect>
    <rect x="14" y="3" width="7" height="5" rx="1"></rect>
    <rect x="14" y="12" width="7" height="9" rx="1"></rect>
    <rect x="3" y="16" width="7" height="5" rx="1"></rect>
  </svg>
);

const IconServer = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const IconDocument = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const EcosystemDiagram: React.FC = () => {
  return (
    <div className="w-full py-20 px-8 bg-white border border-black/5 rounded-[3rem] md:rounded-[5rem] shadow-2xl shadow-black/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-xs uppercase tracking-[0.5em] text-brand font-bold mb-16 text-center">System Architecture</h4>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-black/5 -translate-y-1/2" />

          {[
            { label: 'Technician App', icon: <IconSmartphone />, desc: 'Simple poolside data capture' },
            { label: 'Store Dashboard', icon: <IconDashboard />, desc: 'Review, edit & generate reports' },
            { label: 'Service Backend', icon: <IconServer />, desc: 'LLM generation & document assembly' },
            { label: 'Customer Report', icon: <IconDocument />, desc: 'Clarity and confidence delivered' }
          ].map((node, i) => (
            <motion.div
              key={i}
              className="relative z-10 flex flex-col items-center text-center group flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#fbfbfb] border border-black/5 flex items-center justify-center text-brand mb-6 shadow-sm group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500">
                {node.icon}
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{node.label}</p>
              <p className="text-[10px] opacity-50 uppercase tracking-wider max-w-[140px]">{node.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// POOLCHEX DIAGRAMS
// ============================================

const WaterFieldDiagram: React.FC = () => {
  return (
    <div className="w-full py-24 md:py-40 px-8 bg-gradient-to-b from-[#0a1628] to-[#0d2847] rounded-[3rem] md:rounded-[5rem] overflow-hidden relative">
      {/* Animated water simulation background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Wave layers */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${45 + i * 30}deg, transparent 40%, rgba(56, 189, 248, ${0.05 + i * 0.02}) 50%, transparent 60%)`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h4 className="text-xs uppercase tracking-[0.6em] text-cyan-400 font-bold mb-8 text-center">The Animated Water Field</h4>

        <div className="text-center mb-16">
          <p className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            Every screen is backed by a mathematically generated water simulation, a <span className="text-cyan-400 italic font-serif">live mesh driven by interfering wave equations.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-4 h-4 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-white text-sm font-bold uppercase tracking-widest">Slow Structural Swells</span>
            </div>
            <p className="text-white/50 font-light">Low-frequency waves create deep, organic movement that anchors the visual foundation.</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-4 h-4 rounded-full bg-cyan-300"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-white text-sm font-bold uppercase tracking-widest">Surface Ripples</span>
            </div>
            <p className="text-white/50 font-light">Higher-frequency interference creates the shimmer of sunlight on water.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TimeOfDayPalette: React.FC = () => {
  const timeStates = [
    { time: 'Dawn', image: '/assets/projects/poolchex/dawn-screenshot.png', desc: 'Softened pastels', textColor: 'text-rose-600' },
    { time: 'Noon', image: '/assets/projects/poolchex/noon-screenshot.png', desc: 'Vivid cyan highlights', textColor: 'text-cyan-700' },
    { time: 'Dusk', image: '/assets/projects/poolchex/dusk-screenshot.png', desc: 'Warm reflections', textColor: 'text-orange-600' },
    { time: 'Night', image: '/assets/projects/poolchex/night-screenshot.png', desc: 'Moonlit silvers', textColor: 'text-slate-500' },
  ];

  return (
    <div className="w-full py-20 md:py-32 px-8 bg-white border border-black/5 rounded-[3rem] md:rounded-[5rem] shadow-2xl shadow-black/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-xs uppercase tracking-[0.5em] text-brand font-bold mb-6 text-center">Time as an Emotional Material</h4>
        <p className="text-center text-lg md:text-2xl opacity-60 font-light max-w-2xl mx-auto mb-16">
          The app looks different at breakfast than it does at midnight, creating a subtle emotional bond between the owner, their pool, and the passage of time.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeStates.map((state, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-[9/19] rounded-2xl md:rounded-3xl mb-4 shadow-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden bg-gray-100">
                <img
                  src={state.image}
                  alt={`${state.time} palette`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${state.textColor}`}>{state.time}</p>
              <p className="text-xs opacity-50">{state.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScanFlowDiagram: React.FC = () => {
  const steps = [
    {
      label: 'Detect',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      ),
      desc: 'Vision detects strip in frame'
    },
    {
      label: 'Align',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
        </svg>
      ),
      desc: 'Guide rectangle coaches position'
    },
    {
      label: 'Capture',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      desc: 'Flash capture at optimal moment'
    },
    {
      label: 'Analyze',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="2.5"/>
          <circle cx="6" cy="12" r="2.5"/>
          <circle cx="18" cy="12" r="2.5"/>
          <circle cx="8" cy="18" r="2.5"/>
          <circle cx="16" cy="18" r="2.5"/>
        </svg>
      ),
      desc: 'Extract pad colors → LAB space'
    },
    {
      label: 'Score',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      desc: 'Match calibrated references'
    },
  ];

  return (
    <div className="w-full py-20 md:py-32 px-8 bg-[#121214] rounded-[3rem] md:rounded-[5rem] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-cyan-500/5" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h4 className="text-xs uppercase tracking-[0.6em] text-brand font-bold mb-6 text-center">Computer Vision Capture</h4>
        <p className="text-center text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-16">
          Built to make strip scanning feel effortless and trustworthy, even for first-time pool owners.
        </p>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand/0 via-brand/50 to-brand/0" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 mb-4 group-hover:bg-brand/20 group-hover:border-brand/50 group-hover:text-brand transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.icon}
                </motion.div>
                <p className="text-white text-sm font-bold uppercase tracking-widest mb-2">{step.label}</p>
                <p className="text-white/40 text-xs max-w-[120px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-white/80 text-base leading-relaxed">
                The guide rectangle <span className="text-brand">pulses while searching</span>, turns <span className="text-green-400">green when aligned</span>, and provides live instruction. Flash capture → review → confirm.
              </p>
            </div>
            <div className="flex gap-4">
              <motion.div
                className="w-16 h-16 rounded-2xl border-2 border-brand/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="w-16 h-16 rounded-2xl border-2 border-green-400 bg-green-400/10"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const OnDeviceAIDiagram: React.FC = () => {
  return (
    <div className="w-full py-20 md:py-32 px-8 bg-white border border-black/5 rounded-[3rem] md:rounded-[5rem] shadow-2xl shadow-black/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h4 className="text-xs uppercase tracking-[0.5em] text-brand font-bold mb-6 text-center">Making Intelligence Feel Alive</h4>
        <p className="text-center text-lg md:text-2xl opacity-60 font-light max-w-2xl mx-auto mb-16">
          On-device Foundation Models generate summaries, risk assessments, and guidance, with zero data leaving the device.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-8 rounded-3xl bg-[#fbfbfb] border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <p className="text-lg font-bold mb-2">Privacy First</p>
            <p className="text-sm opacity-50">All AI processing happens on-device. Sensitive pool data never leaves the iPhone.</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl bg-[#fbfbfb] border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <p className="text-lg font-bold mb-2">Instant Response</p>
            <p className="text-sm opacity-50">No network latency. Analysis feels immediate even in areas with poor connectivity.</p>
          </motion.div>

          <motion.div
            className="p-8 rounded-3xl bg-[#fbfbfb] border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <p className="text-lg font-bold mb-2">Offline Capable</p>
            <p className="text-sm opacity-50">Full functionality by the pool, at the store, or anywhere without signal.</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 p-8 md:p-12 rounded-3xl bg-[#121214] text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-brand mb-4 font-bold">Streaming Responses</p>
              <p className="text-white/70 leading-relaxed">
                Responses stream progressively, signaling active reasoning, reducing perceived latency, and creating conversational presence. Subtle haptics every few words reinforce aliveness.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-64">
              {['Analyzing pH levels...', 'Chlorine is slightly low.', 'Recommendation ready.'].map((text, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 rounded-xl bg-white/5 text-sm text-white/60"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ScoreCardDiagram: React.FC = () => {
  return (
    <div className="w-full py-20 md:py-32 px-8 bg-gradient-to-b from-cyan-50 to-white rounded-[3rem] md:rounded-[5rem] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xs uppercase tracking-[0.5em] text-brand font-bold mb-6 text-center">The Score Card</h4>
        <p className="text-center text-lg md:text-2xl opacity-60 font-light max-w-2xl mx-auto mb-16">
          A single health score transforms multi-variable chemistry into immediate comprehension. Color communicates urgency instantly.
        </p>

        <div className="flex justify-center mb-12">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
              <div className="text-center">
                <motion.span
                  className="text-6xl md:text-8xl font-serif text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  87
                </motion.span>
                <p className="text-white/80 text-sm uppercase tracking-widest mt-2">Healthy</p>
              </div>
            </div>
            {/* Orbiting metrics */}
            {[
              { label: 'pH', value: '7.4', angle: 0 },
              { label: 'Cl', value: '2.1', angle: 90 },
              { label: 'Alk', value: '95', angle: 180 },
              { label: 'CYA', value: '42', angle: 270 },
            ].map((metric, i) => (
              <motion.div
                key={i}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex flex-col items-center justify-center"
                style={{
                  top: `calc(50% + ${Math.sin(metric.angle * Math.PI / 180) * 140}px - 28px)`,
                  left: `calc(50% + ${Math.cos(metric.angle * Math.PI / 180) * 140}px - 28px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="text-xs text-brand font-bold">{metric.label}</span>
                <span className="text-sm font-medium">{metric.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { range: '80-100', color: 'bg-green-500', label: 'Healthy' },
            { range: '50-79', color: 'bg-amber-500', label: 'Attention' },
            { range: '0-49', color: 'bg-red-500', label: 'Action Required' },
          ].map((state, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <div className={`w-3 h-3 rounded-full ${state.color}`} />
              <div>
                <p className="text-xs font-bold">{state.range}</p>
                <p className="text-[10px] opacity-50">{state.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);
  const shouldReduceMotion = useReducedMotion();
  const [isPretotypingOpen, setIsPretotypingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div>Project not found</div>;

  const isPoolchex = project.id === 'poolchex';
  const isHealthyPool = project.id === 'healthy-pool';
  const isAR = project.id === 'ar-pizza';
  const isDominos = project.id === 'dominos-global';

  return (
    <main className="bg-[#fbfbfb] min-h-screen pb-32 md:pb-64">
      {/* Hero */}
      <section className="pt-32 md:pt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="w-6 md:w-8 h-[1px] bg-brand" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand font-semibold">{project.subtitle}</span>
          </div>
          <h1 className="text-4xl md:text-[8rem] xl:text-[9rem] font-serif leading-[0.9] tracking-tighter mb-8 md:mb-16">{project.title}</h1>
          <p className="text-lg md:text-4xl leading-[1.2] opacity-90 max-w-5xl font-light">
            {project.oneLine}
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className={`mt-16 md:mt-40 px-4 overflow-hidden ${isAR ? 'bg-[#121214] py-32 md:py-64' : ''}`}>
        <div className={`relative ${isAR ? 'max-w-6xl mx-auto' : ''}`}>
          <motion.div
            className={`w-full aspect-video rounded-2xl md:rounded-[3rem] overflow-hidden ${isAR ? 'shadow-[0_50px_100px_rgba(0,0,0,0.5)] scale-[1.2]' : 'bg-gray-200'}`}
            initial={{ scale: isAR ? 1.3 : 1.1, opacity: 0 }}
            animate={{ scale: isAR ? 1.2 : 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <img
              src={project.heroImage}
              className="w-full h-full object-cover"
              alt={project.title}
            />
          </motion.div>
          {/* IDC Award Badge - AR Pizza only */}
          {isAR && (
            <motion.div
              className="absolute -bottom-20 -right-10 md:-bottom-32 md:-right-20 z-20"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <CircularTextBadge size={200} variant="dark" className="md:hidden" />
              <CircularTextBadge size={300} variant="dark" className="hidden md:block" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Context & Role */}
      <section className="mt-20 md:mt-40 px-6 md:px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="text-xs uppercase tracking-widest opacity-40 mb-8 md:mb-12 flex items-center gap-3 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {isAR ? 'A Visionary Shift' : 'Opening Context'}
          </h2>
          <p className="text-xl md:text-3xl leading-relaxed opacity-80 font-serif italic whitespace-pre-line">
            {project.context}
          </p>
        </div>
        <div className="md:col-span-5 space-y-12 md:space-y-16">
          <div>
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-4 md:mb-6 font-bold">Role</h2>
            <p className="text-xl md:text-2xl font-medium tracking-tight">{project.role}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-4 md:mb-6 font-bold">Scope</h2>
            <ul className="space-y-3 md:space-y-4 opacity-70">
              {project.scope.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-base md:text-lg">
                  <span className="mt-2.5 w-1.5 h-[1px] bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest opacity-40 mb-4 md:mb-6 font-bold">Tools</h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <ToolBadge key={i} name={tool} />
              ))}
            </div>
          </div>
          {project.throughLine && (
            <div>
              <h2 className="text-xs uppercase tracking-widest opacity-40 mb-4 md:mb-6 font-bold">TLDR</h2>
              <p className="text-base md:text-lg opacity-70 italic">{project.throughLine}</p>
            </div>
          )}
        </div>
      </section>

      {/* Designing Beyond the Interface Breakout */}
      <section className={`mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto py-16 md:py-32 border border-black/5 ${isAR ? 'bg-brand text-white border-none' : 'bg-white shadow-2xl shadow-black/5'} rounded-3xl md:rounded-[5rem] relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-64 h-64 ${isAR ? 'bg-white/10' : 'bg-brand/5'} rounded-full blur-3xl`} />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-5xl font-serif mb-12 md:mb-20 text-center tracking-tight italic">
            {isAR ? 'Operating in Ambiguity' : 'Designing Beyond the Interface'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-12">
            {project.hardThings.map((thing, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group">
                <span className={`text-xs ${isAR ? 'text-white' : 'text-brand'} font-mono font-bold pt-1`}>0{i+1}</span>
                <p className="text-lg md:text-xl opacity-80 leading-snug group-hover:opacity-100 transition-opacity">{thing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="mt-32 md:mt-80 px-6 md:px-8 text-center max-w-screen-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-xs uppercase tracking-[0.5em] text-brand font-bold block mb-12">The Insight</span>
          <h3 className="text-2xl md:text-7xl font-serif max-w-5xl mx-auto leading-tight italic">
            “{project.insight}”
          </h3>
        </motion.div>
      </section>

      {/* Special Visuals Sections */}
      {isPoolchex && (
        <>
          {/* The Design Thesis */}
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <motion.div
              className="py-16 md:py-24 px-8 md:px-16 bg-white border border-black/5 rounded-[3rem] md:rounded-[5rem] text-center shadow-2xl shadow-black/5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.5em] text-brand font-bold block mb-8">Design Thesis</span>
              <h3 className="text-2xl md:text-5xl font-serif italic max-w-4xl mx-auto leading-tight">
                If users want to know what to do next, the interface must act like a guide: <span className="text-brand">alive</span>, <span className="text-cyan-600">contextual</span>, and quietly <span className="text-[#121214]">intelligent.</span>
              </h3>
            </motion.div>
          </section>

          {/* Designing an Interface That Feels Like Water */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Designing an Interface That Feels Like <span className="text-brand italic">Water</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Pool owners have a deeply sensory relationship with water.
The interface honors that relationship, replacing flat utility screens with something familiar, calm, and spatially resonant.
<br /><br />
When glass materials layer above the surface, the effect becomes architectural: the user is no longer looking at a screen, <i>but through it.</i>
              </p>
            </div>
            {/* Design Evidence (Placeholders) */}
            <motion.div
              className="mb-16 md:mb-24"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand font-bold">Design Evidence</span>
                <div className="h-[1px] flex-grow bg-black/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                <motion.div
                  className="md:col-span-12 aspect-[16/9] rounded-3xl md:rounded-[3rem] border border-black/10 bg-white shadow-2xl shadow-black/5 overflow-hidden relative"
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,0,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(14,116,144,0.08),transparent_45%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs uppercase tracking-[0.4em] text-black/40">Hero UI Screenshot</span>
                  </div>
                </motion.div>

                {[
                  { label: 'Water Field Detail', tone: 'bg-cyan-50' },
                  { label: 'Glass Layers', tone: 'bg-white', image: '/assets/projects/poolchex/liquid-glass.jpg' },
                  { label: 'Score Card Screen', tone: 'bg-slate-50' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className={`md:col-span-6 aspect-[4/3] rounded-2xl md:rounded-[2.5rem] border border-black/10 ${item.tone} shadow-xl shadow-black/5 overflow-hidden relative`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.05 }}
                  >
                    {item.image ? (
                      <>
                        <img src={item.image} className="absolute inset-0 w-full h-full object-cover" alt={item.label} />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
                        <div className="absolute left-6 bottom-6">
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/80">{item.label}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.04),transparent)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-black/40">{item.label}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  className="md:col-span-6 aspect-[4/3] rounded-2xl md:rounded-[2.5rem] border border-black/10 bg-black shadow-xl shadow-black/5 overflow-hidden relative"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 }}
                >
                  <video
                    src="/assets/projects/poolchex/guided-treatment.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.2),transparent)]" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/70">Guided Treatment</span>
                  </div>
                </motion.div>
              </div>
              <p className="text-xs md:text-sm opacity-40 mt-6 uppercase tracking-[0.4em]">
                Placeholder frames for final UI screenshots
              </p>
            </motion.div>
            <WaterFieldDiagram />
          </section>

          {/* Time as Material */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <TimeOfDayPalette />
          </section>

          {/* Performance as Craft */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Performance as a <span className="text-brand italic">Design Feature</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Motion only delights when it remains invisible to the processor.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="p-8 rounded-3xl bg-black/[0.02] border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <p className="text-lg md:text-xl">Begin animation at 30fps → ramp to 60fps once stable</p>
              </motion.div>
              <motion.div
                className="p-8 rounded-3xl bg-black/[0.02] border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M3 15h18"/>
                </svg>
                <p className="text-lg md:text-xl">Render mesh as a single cached layer</p>
              </motion.div>
              <motion.div
                className="p-8 rounded-3xl bg-black/[0.02] border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                <p className="text-lg md:text-xl">Scale beyond bounds to hide artifacts</p>
              </motion.div>
              <motion.div
                className="p-8 rounded-3xl bg-black/[0.02] border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                <p className="text-lg md:text-xl">Disable unnecessary hit testing</p>
              </motion.div>
            </div>
          </section>

          {/* Computer Vision */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Removing Friction From <span className="text-brand italic">Reality</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Test strips require manual color comparison, which is error-prone and tedious. The goal was to eliminate interpretive effort entirely.
              </p>
            </div>
            <ScanFlowDiagram />
          </section>

          {/* The Score Card */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <ScoreCardDiagram />
          </section>

          {/* On-Device AI */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <OnDeviceAIDiagram />
          </section>

        </>
      )}

      {isHealthyPool && (
        <>
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">From Transactions → <span className="text-brand italic">Continuous Care</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                The experience was structured as an ongoing relationship, where diagnostics, treatment, and communication form a coherent narrative of water health.
              </p>
            </div>
            <EcosystemDiagram />
          </section>

          {/* Pretotyping at Scale */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <motion.div
              className="mb-16 md:mb-24"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Build to Learn, <span className="text-brand italic">Then Build to Last</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Before committing to native, we shipped a cross-platform layer to validate behaviors at speed, then migrated deliberately once patterns stabilized.
              </p>
            </motion.div>

            {/* Phase Journey Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
              <motion.div
                className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">Phase 1</div>
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <h3 className="text-xl md:text-2xl font-serif mb-3">Ship Fast</h3>
                <p className="text-base text-black/60">Flutter-based mobile and web layer. Real users, real data, rapid iteration across technician tools and dashboards.</p>
              </motion.div>
              <motion.div
                className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">Phase 2</div>
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                <h3 className="text-xl md:text-2xl font-serif mb-3">Observe Patterns</h3>
                <p className="text-base text-black/60">Field testing revealed where cross-platform fell short: offline reliability, background uploads, memory on constrained devices.</p>
              </motion.div>
              <motion.div
                className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">Phase 3</div>
                <svg className="w-8 h-8 text-brand mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <h3 className="text-xl md:text-2xl font-serif mb-3">Go Native</h3>
                <p className="text-base text-black/60">Migrated to SwiftUI and Kotlin with evidence in hand. The architecture was designed to make this transition low-risk.</p>
              </motion.div>
            </div>

            {/* Architecture Philosophy */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 font-bold mb-10 md:mb-12">
                <span className="w-10 h-[1px] bg-brand" />
                <span>Architecture Decisions</span>
              </div>

              <motion.div
                id="pretotyping-content"
                className="relative overflow-hidden"
                animate={{ maxHeight: isPretotypingOpen ? 1800 : 320 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                style={{ willChange: 'max-height' }}
              >
                {/* Key Decisions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
                  <div className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5">
                    <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <path d="M8 21h8M12 17v4"/>
                    </svg>
                    <h4 className="text-lg md:text-xl font-serif mb-2">Thin Clients, Thick Edge</h4>
                    <p className="text-base text-black/60">Business logic and AI orchestration live server-side. The mobile layer focuses purely on presentation and interaction.</p>
                  </div>
                  <div className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5">
                    <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                      <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                      <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    <h4 className="text-lg md:text-xl font-serif mb-2">Platform-Appropriate Surfaces</h4>
                    <p className="text-base text-black/60">Native mobile for field reliability. React web for operational dashboards. Edge functions for intelligence. Each excels in its context.</p>
                  </div>
                  <div className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5">
                    <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                    <h4 className="text-lg md:text-xl font-serif mb-2">Migration by Design</h4>
                    <p className="text-base text-black/60">Every architectural choice assumed eventual platform specialization. When the time came, we swapped the presentation layer without touching the system.</p>
                  </div>
                  <div className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5">
                    <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    <h4 className="text-lg md:text-xl font-serif mb-2">Performance as Experience</h4>
                    <p className="text-base text-black/60">Heavy compute stays off-device. Interfaces stay responsive. In service environments, speed is trust.</p>
                  </div>
                </div>

                {/* Deeper Context */}
                <div className="space-y-8 md:space-y-10 text-lg md:text-xl leading-relaxed font-light text-black/80 max-w-3xl">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif tracking-tight">Why Start Cross-Platform?</h3>
                    <p>Prototyping asks <em>"is this usable?"</em>. Pretotyping asks <em>"should this exist, and in what form?"</em>.</p>
                    <p>We needed to validate technician workflows, service orchestration, and dashboard requirements across two markets before locking into platform-specific builds. Flutter let us test assumptions in production without over-committing.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif tracking-tight">The Moment to Migrate</h3>
                    <p>Field testing made the limits tangible. Technicians working in full sun with poor connectivity needed background upload queues, aggressive memory management, and offline-first resilience that cross-platform couldn't reliably deliver.</p>
                    <p>The decision wasn't ideological. It was evidence-driven. Native became necessary when reliability became the user experience.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif tracking-tight">What This Enabled</h3>
                    <ul className="space-y-3 text-base md:text-lg text-black/70">
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />Validated behavioral assumptions before scaling investment</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />De-risked the transition to native with real-world data</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />Kept learning cycles fast during the ambiguous early phase</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />Preserved flexibility until the architecture earned its constraints</li>
                    </ul>
                  </div>

                  <div className="pt-4 md:pt-6 border-t border-black/10">
                    <p className="text-base md:text-lg italic text-black/50">The most resilient systems are built to become correct over time.</p>
                  </div>
                </div>

                {!isPretotypingOpen && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
                )}
              </motion.div>

              {!isPretotypingOpen && (
                <div className="relative z-10 mt-8 flex justify-end">
                  <motion.button
                    type="button"
                    className="inline-flex items-center gap-4 rounded-full bg-brand px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.45em] font-bold text-white shadow-[0_20px_50px_-20px_rgba(255,79,0,0.7)]"
                    onClick={() => setIsPretotypingOpen(true)}
                    aria-expanded={isPretotypingOpen}
                    aria-controls="pretotyping-content"
                    whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                  >
                    Read Full Story
                    <motion.span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15"
                      animate={{ rotate: isPretotypingOpen ? 180 : 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </motion.button>
                </div>
              )}

              {isPretotypingOpen && (
                <div className="mt-10 md:mt-12 flex justify-end">
                  <motion.button
                    type="button"
                    className="inline-flex items-center gap-4 rounded-full bg-brand px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.45em] font-bold text-white shadow-[0_20px_50px_-20px_rgba(255,79,0,0.7)]"
                    onClick={() => setIsPretotypingOpen(false)}
                    aria-expanded={isPretotypingOpen}
                    aria-controls="pretotyping-content"
                    whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                  >
                    Collapse
                    <motion.span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15"
                      animate={{ rotate: isPretotypingOpen ? 180 : 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </section>

          {/* Technician & Customer Experience */}
          <section className="mt-32 md:mt-64 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/assets/projects/healthy-pool/technician-app.jpg"
                  className="w-full h-full object-cover"
                  alt="Technician assessment app"
                />
              </motion.div>
              <motion.div
                className="aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <img
                  src="/assets/projects/healthy-pool/customer-report.jpg"
                  className="w-full h-full object-cover"
                  alt="Customer-facing report"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-6 px-2 text-sm opacity-40 uppercase tracking-widest">
              <span>Technician Assessment</span>
              <span>Customer Report</span>
            </div>
          </section>

          {/* Full-width detail shot */}
          <section className="mt-24 md:mt-40 px-4">
            <motion.div
              className="w-full aspect-[21/9] bg-gray-100 rounded-2xl md:rounded-[3rem] overflow-hidden"
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <img
                src="/assets/projects/healthy-pool/report-detail.jpg"
                className="w-full h-full object-cover"
                alt="Report detail view"
              />
            </motion.div>
            <p className="text-center text-sm opacity-40 mt-6 uppercase tracking-widest">Assessment findings translated into actionable insights</p>
          </section>
        </>
      )}

      {isAR && (
        <>
          {/* Designing the Interaction Model */}
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Designing the <span className="text-brand italic">Interaction Model</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-serif italic">Under-thumb customisation</h3>
                <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">
                  To keep the experience fast and ergonomic, we introduced a swipe-navigable ingredient picker designed to keep customisations under the user's thumb, with single-gesture add/remove interactions.
                </p>
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl md:text-3xl font-serif italic">"AR Optional" by design</h3>
                <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">
                  For devices without ARKit, or users who preferred not to place a pizza on the floor, we added a camera-off toggle and rendered the pizza against a neutral background.
                </p>
              </motion.div>
            </div>
          </section>

          {/* AR Interface Showcase */}
          <section className="mt-24 md:mt-40 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="/assets/projects/ar-pizza/ar-mode.jpg"
                  className="w-full h-full object-cover"
                  alt="AR mode with pizza placement"
                />
              </motion.div>
              <motion.div
                className="aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src="/assets/projects/ar-pizza/non-ar-mode.jpg"
                  className="w-full h-full object-cover"
                  alt="Non-AR fallback mode"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-6 px-2 text-sm opacity-40 uppercase tracking-widest">
              <span>AR Mode</span>
              <span>Camera-Off Fallback</span>
            </div>
          </section>

          {/* Spatial Diagram */}
          <section className="mt-32 md:mt-64 px-6 md:px-8 max-w-screen-xl mx-auto">
            <SpatialDiagram />
          </section>
        </>
      )}

      {/* Domino's Specific Sections */}
      {isDominos && (
        <>
          {/* Designing for Momentum */}
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Designing for <span className="text-brand italic">Momentum</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Removing friction from the path to purchase by reducing decision fatigue, compressing steps, and making progress continuously visible.
              </p>
            </div>
            <MomentumDiagram />
          </section>

          {/* Image Placeholder: Customization Flow */}
          <section className="mt-32 md:mt-64 px-4">
            <motion.div
              className="w-full aspect-square md:aspect-[21/9] bg-black rounded-2xl md:rounded-[3rem] overflow-hidden"
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <PingPongVideo
                src="/assets/projects/dominos-global/customisation-flow-redesign.mp4"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <p className="text-center text-sm opacity-40 mt-6 uppercase tracking-widest">Progressive customization interface</p>
          </section>

          {/* Systems Thinking */}
          <section className="mt-32 md:mt-80 relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/assets/projects/dominos-global/component-bg.png)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
            <div className="relative px-6 md:px-8 py-24 md:py-40 max-w-screen-xl mx-auto">
              <div className="mb-16 md:mb-24">
                <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Design System <span className="text-brand italic">Evolution</span></h2>
                <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                  To support global consistency while enabling regional flexibility, we evolved a modular design system, allowing teams to scale improvements without fragmenting the experience.
                </p>
              </div>
              <DesignSystemDiagram />
            </div>
          </section>

          {/* Image Placeholder: Multi-market showcase */}
          <section className="mt-32 md:mt-64 px-4">
            <motion.div
              className="w-full aspect-video bg-gray-100 rounded-2xl md:rounded-[3rem] overflow-hidden"
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <img
                src="/assets/projects/dominos-global/multi-market.jpg"
                className="w-full h-full object-cover"
                alt="Multi-market implementation"
              />
            </motion.div>
            <p className="text-center text-sm opacity-40 mt-6 uppercase tracking-widest">Consistent experience across global markets</p>
          </section>
        </>
      )}

      {/* Generic Mental Model for other projects */}
      {!isHealthyPool && !isAR && !isDominos && (
        <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 md:mb-10 tracking-tight">The <span className="text-brand italic">Mental Model</span></h2>
              <p className="text-lg md:text-2xl leading-relaxed opacity-60 font-light">
                {project.modelDescription}
              </p>
            </div>
            <div className="bg-[#1d1d1f] p-8 md:p-16 rounded-3xl md:rounded-[4rem] shadow-3xl text-white relative">
               <div className="flex flex-col gap-6 md:gap-8 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em]">
                  <div className="p-6 md:p-8 border border-white/10 rounded-2xl md:rounded-3xl bg-white/5 flex justify-between items-center group">
                     <span className="text-white/40">Input</span>
                     <span>Technical Complexity</span>
                  </div>
                  <div className="mx-auto h-8 md:h-12 w-[1px] bg-brand/50" />
                  <div className="p-8 md:p-10 border-2 border-brand rounded-full text-center text-brand font-bold text-xs md:text-sm tracking-widest scale-105 shadow-2xl shadow-brand/20">
                     Foundation Models
                  </div>
                  <div className="mx-auto h-8 md:h-12 w-[1px] bg-brand/50" />
                  <div className="p-6 md:p-8 border border-white/10 rounded-2xl md:rounded-3xl bg-white/5 flex justify-between items-center group">
                     <span className="text-white/40">Output</span>
                     <span>Human Clarity</span>
                  </div>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience Principles */}
      <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-16 md:mb-24 font-bold">Experience Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {project.principles.map((principle, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif italic">{principle.title}</h3>
              <p className="text-base md:text-lg opacity-60 leading-relaxed font-light">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Craft Details */}
      {isHealthyPool ? (
        /* Healthy Pool: Grid layout for 6 craft items */
        <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-16 md:mb-24">Craft & Execution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {project.craft.map((c, i) => (
              <motion.div
                key={i}
                className="p-8 md:p-10 bg-white border border-black/5 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6 hover:-translate-y-1 transition-transform duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="text-[10px] font-mono text-brand font-bold">0{i + 1}</span>
                <h3 className="text-xl md:text-2xl font-serif italic">{c.title || c.section}</h3>
                <p className="text-base md:text-lg opacity-60 leading-relaxed font-light">{c.description || c.content}</p>
              </motion.div>
            ))}
          </div>
        </section>
      ) : !isPoolchex ? (
        /* Default: Alternating image/text layout */
        <section className={`mt-32 md:mt-80 space-y-24 md:space-y-48 ${isAR ? 'bg-white py-32 md:py-64' : ''}`}>
          {project.craft.map((c, i) => (
            <div key={i} className="px-6 md:px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
              <div className={`md:col-span-5 ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                   <span className="text-[10px] md:text-xs font-mono text-brand font-bold">CRAFT {i+1}</span>
                   <div className="h-[1px] flex-grow bg-black/5" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-10 tracking-tight italic">{c.section || c.title}</h2>
                <p className="text-lg md:text-2xl leading-relaxed opacity-60 font-light">{c.content || c.description}</p>
              </div>
              <div className="md:col-span-7">
                 <motion.div
                   className={`aspect-[16/10] bg-gray-100 rounded-2xl md:rounded-[4rem] overflow-hidden ${isAR ? 'shadow-2xl' : ''}`}
                   whileHover={{ scale: 1.02 }}
                   transition={{ duration: 1 }}
                 >
                   {(project.visuals[i] || '').match(/\.(m4v|mp4|webm|mov)$/i) ? (
                     <video
                       src={project.visuals[i]}
                       className="w-full h-full object-cover"
                       autoPlay
                       loop
                       muted
                       playsInline
                     />
                   ) : (
                     <img src={project.visuals[i] || project.heroImage} className="w-full h-full object-cover" alt={c.section || c.title} />
                   )}
                 </motion.div>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {/* Outcome & Reflection */}
      <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto flex flex-col items-center">
        <div className="max-w-4xl text-center space-y-16 md:space-y-24">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-8 md:mb-12">Outcome{project.outcomes ? 's' : ''}</h2>

            {project.outcomes ? (
              <ul className="space-y-4 md:space-y-6 text-left max-w-2xl mx-auto">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex gap-4 items-start text-lg md:text-xl opacity-80">
                    <span className="mt-2 w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                    <span className="font-light">{outcome}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-2xl md:text-6xl font-serif leading-tight tracking-tight ${isAR ? 'italic' : ''}`}>{project.outcome}</p>
            )}
          </div>
          <div className="pt-16 md:pt-24 border-t border-black/10">
            <h2 className="text-xs uppercase tracking-[0.4em] opacity-40 mb-8 md:mb-12 italic font-bold">Reflection</h2>
            <p className="text-lg md:text-2xl opacity-60 leading-relaxed max-w-3xl mx-auto font-light italic">
              "{project.reflection}"
            </p>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="mt-32 md:mt-80 px-6 md:px-8 flex justify-center pb-24 md:pb-32">
        <MagneticButton onClick={() => {
          window.scrollTo(0, 0);
          navigate('/');
        }}>
          <div className="px-10 md:px-16 py-6 md:py-8 bg-brand text-white rounded-full text-lg md:text-2xl font-serif italic shadow-2xl shadow-brand/30 hover:scale-105 transition-transform">
            Explore more Work
          </div>
        </MagneticButton>
      </section>
    </main>
  );
};
