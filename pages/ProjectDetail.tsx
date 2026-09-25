
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { CircularTextBadge } from '../components/CircularTextBadge';
import { ReadingProgress } from '../components/ReadingProgress';
import { DURATION, fadeUp, transition } from '../components/motion';
import {
  Accent,
  Body,
  Card,
  CardIcon,
  CardText,
  CardTitle,
  ContactFooter,
  Container,
  Eyebrow,
  H3,
  Intro,
  Lead,
  MediaFrame,
  PAGE_TOP,
  Panel,
  PillButton,
  Reveal,
  RevealGroup,
  RevealItem,
  SECTION_SPACING,
  Section,
  SectionIntro,
  Tile,
  Video,
  cx,
} from '../components/ui';

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
  ),
  'Foundation Models': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="14" width="16" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="6" y="8" width="12" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="3" width="8" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="17" r="1" fill="currentColor"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
      <circle cx="16" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),
  'Prompt Engineering': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16M4 12h12M4 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 14l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
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

const SCAN_STEPS = [
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

const ToolBadge: React.FC<{ name: string }> = ({ name }) => {
  const Icon = ToolIcons[name];
  return (
    <span className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-black/[0.06] text-sm text-ink-muted">
      {Icon && <Icon className="w-4 h-4 text-brand" />}
      {name}
    </span>
  );
};

// Centered eyebrow + supporting line at the top of a diagram panel
const PanelIntro: React.FC<{ eyebrow: React.ReactNode; children?: React.ReactNode; dark?: boolean }> = ({ eyebrow, children, dark = false }) => (
  <div className="text-center mb-12 md:mb-20">
    <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
    {children && (
      <p className={cx('mt-6 max-w-2xl mx-auto text-lg md:text-2xl font-light leading-relaxed', dark ? 'text-white/75' : 'text-ink-muted')}>
        {children}
      </p>
    )}
  </div>
);

const SpatialDiagram: React.FC = () => {
  return (
    <Panel variant="dark">
      <div aria-hidden="true" className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative">
        <PanelIntro eyebrow="From Selection → Manipulation" dark />

        <RevealGroup className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24" staggerBy={0.15}>
          {/* Node 1: Selection */}
          <RevealItem className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 mb-8">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
              <div className="w-16 h-1 bg-white/40 rounded-full" />
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">2D Interface</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">List-based selection</p>
          </RevealItem>

          {/* Transition Arrow */}
          <RevealItem className="flex flex-col items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
              </svg>
            </motion.div>
            <span className="text-xs uppercase font-bold text-brand tracking-[0.3em]">Spatial Shift</span>
          </RevealItem>

          {/* Node 2: Manipulation */}
          <RevealItem className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <div className="absolute inset-0 border-2 border-brand/20 rounded-full animate-[spin_12s_linear_infinite]" />
              <div className="w-24 h-24 rounded-full bg-brand shadow-[0_0_50px_rgba(255,92,52,0.4)] flex items-center justify-center">
                <IconSmartphone />
              </div>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  className="absolute w-3 h-3 bg-white rounded-full"
                  animate={{ y: [0, -40, 0], x: [0, i % 2 === 0 ? 30 : -30, 0], opacity: [0, 1, 0] }}
                  transition={{ delay: i * 0.6, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ top: '40%', left: '45%' }}
                />
              ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">Spatial Experience</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">Direct Placement</p>
          </RevealItem>
        </RevealGroup>

        <div className="mt-20 md:mt-24 pt-12 md:pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-white">Cognitive Unloading</h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">By placing ingredients in 3D, we bypass the need for users to translate text lists into visual expectations. The product is the interface.</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-white">Tactile Assurance</h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">Gesture-based manipulation triggers immediate visual and haptic feedback, building confidence in the customization outcome.</p>
          </div>
        </div>
      </div>
    </Panel>
  );
};

const MomentumDiagram: React.FC = () => {
  return (
    <Panel variant="dark">
      <div aria-hidden="true" className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <PanelIntro eyebrow="User Journey Compression" dark />

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center" staggerBy={0.15}>
          {/* Before */}
          <RevealItem className="space-y-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Before</span>
              <div className="h-px flex-grow bg-white/10" />
            </div>
            {['Browse Menu', 'Select Item', 'Choose Size', 'Select Crust', 'Add Toppings', 'Review Changes', 'Confirm'].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/60 tabular-nums">{i + 1}</span>
                <span className="text-white/70 text-sm">{step}</span>
              </div>
            ))}
            <p className="pt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">7 discrete steps</p>
          </RevealItem>

          {/* After */}
          <RevealItem className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand">After</span>
              <div className="h-px flex-grow bg-brand/30" />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand via-brand/50 to-brand/20" />
              {['Select & Customize', 'Progressive Options', 'Live Preview & Confirm'].map((step, i) => (
                <div key={step} className="flex items-center gap-6 mb-8">
                  <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-brand/30 z-10 tabular-nums">{i + 1}</span>
                  <span className="text-white text-base font-medium">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand">Progressive flow</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-16 md:mt-24 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { value: '57%', label: 'Fewer decision points', accent: true },
            { value: '3.2s', label: 'Avg. time reduction per order', accent: false },
            { value: '↑24%', label: 'Completion rate increase', accent: true },
          ].map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <span className={cx('text-4xl md:text-5xl font-serif', stat.accent ? 'text-brand' : 'text-white')}>{stat.value}</span>
              <p className="mt-3 text-sm text-white/60">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  );
};

const DesignSystemDiagram: React.FC = () => {
  return (
    <Panel>
      <div className="max-w-5xl mx-auto">
        <PanelIntro eyebrow="Modular Design System" />

        <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {[
            { label: 'Core Tokens', desc: 'Color, Type, Spacing', icon: '◉' },
            { label: 'Components', desc: 'Buttons, Cards, Inputs', icon: '◧' },
            { label: 'Patterns', desc: 'Flows, Interactions', icon: '◫' },
            { label: 'Templates', desc: 'Market-specific layouts', icon: '◳' },
          ].map((item) => (
            <RevealItem key={item.label}>
              <Tile className="h-full text-center">
                <span className="text-3xl md:text-4xl text-brand" aria-hidden="true">{item.icon}</span>
                <p className="mt-4 text-base font-bold">{item.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{item.desc}</p>
              </Tile>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-night rounded-2xl text-white">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-brand animate-pulse" />
            <span className="text-sm font-medium">Global Consistency</span>
          </div>
          <div className="hidden md:block h-px flex-grow bg-white/10 mx-8" />
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Regional Flexibility</span>
            <div className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </Panel>
  );
};

const EcosystemDiagram: React.FC = () => {
  return (
    <Panel>
      <div className="max-w-5xl mx-auto">
        <PanelIntro eyebrow="System Architecture" />
        <RevealGroup className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6" staggerBy={0.12}>
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-black/10" />
          {[
            { label: 'Technician App', icon: <IconSmartphone />, desc: 'Simple poolside data capture' },
            { label: 'Store Dashboard', icon: <IconDashboard />, desc: 'Review, edit & generate reports' },
            { label: 'Service Backend', icon: <IconServer />, desc: 'LLM generation & document assembly' },
            { label: 'Customer Report', icon: <IconDocument />, desc: 'Clarity and confidence delivered' },
          ].map((node) => (
            <RevealItem key={node.label} className="relative z-10 flex flex-col items-center text-center flex-1">
              <div className="w-24 h-24 rounded-full bg-paper border border-black/[0.06] flex items-center justify-center text-brand mb-6">
                {node.icon}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em]">{node.label}</p>
              <p className="mt-2 text-sm text-ink-muted max-w-[180px]">{node.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  );
};

// ============================================
// POOLCHEX DIAGRAMS
// ============================================

const WaterFieldDiagram: React.FC = () => {
  return (
    <Panel variant="water">
      {/* Animated water simulation background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ background: `linear-gradient(${45 + i * 30}deg, transparent 40%, rgba(56, 189, 248, ${0.05 + i * 0.02}) 50%, transparent 60%)` }}
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        <PanelIntro eyebrow="The Animated Water Field" dark>
          Every screen is backed by a mathematically generated water simulation, a <span className="text-cyan-300 italic font-serif">live mesh driven by interfering wave equations.</span>
        </PanelIntro>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            { title: 'Slow Structural Swells', text: 'Low-frequency waves create deep, organic movement that anchors the visual foundation.', pulse: 4, scale: 1.3 },
            { title: 'Surface Ripples', text: 'Higher-frequency interference creates the shimmer of sunlight on water.', pulse: 1.5, scale: 1.2 },
          ].map((item) => (
            <RevealItem key={item.title}>
              <Tile dark className="h-full backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-cyan-300"
                    animate={{ scale: [1, item.scale, 1] }}
                    transition={{ duration: item.pulse, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">{item.title}</span>
                </div>
                <p className="text-base leading-relaxed text-white/70">{item.text}</p>
              </Tile>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  );
};

const TimeOfDayPalette: React.FC = () => {
  const timeStates = [
    { time: 'Dawn', image: '/assets/projects/poolchex/dawn-screenshot.png', desc: 'Softened pastels', textColor: 'text-rose-600' },
    { time: 'Noon', image: '/assets/projects/poolchex/noon-screenshot.png', desc: 'Vivid cyan highlights', textColor: 'text-cyan-700' },
    { time: 'Dusk', image: '/assets/projects/poolchex/dusk-screenshot.png', desc: 'Warm reflections', textColor: 'text-orange-600' },
    { time: 'Night', image: '/assets/projects/poolchex/night-screenshot.png', desc: 'Moonlit silvers', textColor: 'text-slate-600' },
  ];

  return (
    <Panel>
      <div className="max-w-5xl mx-auto">
        <PanelIntro eyebrow="Time as an Emotional Material">
          The app looks different at breakfast than it does at midnight, creating a subtle emotional bond between the owner, their pool, and the passage of time.
        </PanelIntro>

        <RevealGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerBy={0.1}>
          {timeStates.map((state) => (
            <RevealItem key={state.time}>
              <div className="aspect-[9/19] mb-4 overflow-hidden">
                <img src={state.image} alt={`${state.time} palette`} className="w-full h-full object-cover" />
              </div>
              <p className={cx('text-sm font-bold uppercase tracking-[0.2em]', state.textColor)}>{state.time}</p>
              <p className="mt-1 text-sm text-ink-muted">{state.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  );
};

const ScanFlowDiagram: React.FC = () => {
  return (
    <Panel variant="dark">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-brand/5 to-cyan-500/5" />

      <div className="max-w-5xl mx-auto relative">
        <PanelIntro eyebrow="Computer Vision Capture" dark>
          Built to make strip scanning feel effortless and trustworthy, even for first-time pool owners.
        </PanelIntro>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand/0 via-brand/50 to-brand/0" />

          <RevealGroup className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4" staggerBy={0.1}>
            {SCAN_STEPS.map((step) => (
              <RevealItem key={step.label} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-night border border-white/15 flex items-center justify-center text-white/70 mb-4 relative">
                  {step.icon}
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{step.label}</p>
                <p className="mt-2 text-sm text-white/60 max-w-[140px]">{step.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16">
          <Tile dark>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="flex-1 text-base md:text-lg leading-relaxed text-white/80">
                The guide rectangle <span className="text-brand">pulses while searching</span>, turns <span className="text-green-400">green when aligned</span>, and provides live instruction. Flash capture → review → confirm.
              </p>
              <div className="flex gap-4" aria-hidden="true">
                <motion.div
                  className="w-16 h-16 rounded-2xl border-2 border-brand/60"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="w-16 h-16 rounded-2xl border-2 border-green-400 bg-green-400/10" />
              </div>
            </div>
          </Tile>
        </Reveal>
      </div>
    </Panel>
  );
};

const OnDeviceAIDiagram: React.FC = () => {
  return (
    <Panel>
      <div className="max-w-5xl mx-auto">
        <PanelIntro eyebrow="Making Intelligence Feel Alive">
          On-device Foundation Models generate summaries, risk assessments, and guidance, with zero data leaving the device.
        </PanelIntro>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: 'Privacy First',
              text: 'All AI processing happens on-device. Sensitive pool data never leaves the iPhone.',
              icon: (
                <>
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </>
              ),
            },
            {
              title: 'Instant Response',
              text: 'No network latency. Analysis feels immediate even in areas with poor connectivity.',
              icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
            },
            {
              title: 'Offline Capable',
              text: 'Full functionality by the pool, at the store, or anywhere without signal.',
              icon: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />,
            },
          ].map((item) => (
            <RevealItem key={item.title}>
              <Tile className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    {item.icon}
                  </svg>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </Tile>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6">
          <div className="p-8 md:p-12 rounded-2xl bg-night text-white flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <Eyebrow className="mb-4">Streaming Responses</Eyebrow>
              <p className="text-base leading-relaxed text-white/75">
                Responses stream progressively, signaling active reasoning, reducing perceived latency, and creating conversational presence. Subtle haptics every few words reinforce aliveness.
              </p>
            </div>
            <RevealGroup className="flex flex-col gap-2 w-full md:w-64" staggerBy={0.3}>
              {['Analyzing pH levels...', 'Chlorine is slightly low.', 'Recommendation ready.'].map((text) => (
                <RevealItem key={text} className="px-4 py-2.5 rounded-xl bg-white/5 text-sm text-white/70">
                  {text}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </Panel>
  );
};

const ScoreCardDiagram: React.FC = () => {
  return (
    <Panel>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-white" />
      <div className="max-w-4xl mx-auto relative">
        <PanelIntro eyebrow="The Score Card">
          A single health score transforms multi-variable chemistry into immediate comprehension. Color communicates urgency instantly.
        </PanelIntro>

        <div className="flex justify-center mb-16">
          <RevealGroup className="relative" staggerBy={0.1}>
            <RevealItem>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-serif text-white">87</span>
                  <p className="text-white/90 text-sm font-bold uppercase tracking-[0.2em] mt-2">Healthy</p>
                </div>
              </div>
            </RevealItem>
            {[
              { label: 'pH', value: '7.4', angle: 0 },
              { label: 'Cl', value: '2.1', angle: 90 },
              { label: 'Alk', value: '95', angle: 180 },
              { label: 'CYA', value: '42', angle: 270 },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  visible: { opacity: 1, scale: 1, transition: transition(DURATION.base) },
                }}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex flex-col items-center justify-center"
                style={{
                  top: `calc(50% + ${Math.sin((metric.angle * Math.PI) / 180) * 140}px - 28px)`,
                  left: `calc(50% + ${Math.cos((metric.angle * Math.PI) / 180) * 140}px - 28px)`,
                }}
              >
                <span className="text-xs text-brand font-bold">{metric.label}</span>
                <span className="text-sm font-medium">{metric.value}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
          {[
            { range: '80–100', color: 'bg-green-500', label: 'Healthy' },
            { range: '50–79', color: 'bg-amber-500', label: 'Attention' },
            { range: '0–49', color: 'bg-red-500', label: 'Action Required' },
          ].map((state) => (
            <RevealItem key={state.range} className="flex items-center gap-3 p-3 rounded-xl bg-white/70">
              <div className={cx('w-3 h-3 rounded-full', state.color)} />
              <div>
                <p className="text-sm font-bold tabular-nums">{state.range}</p>
                <p className="text-xs text-ink-muted">{state.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  );
};


const isVideo = (src: string) => /\.(m4v|mp4|webm|mov)$/i.test(src);

const replayVideo: React.MouseEventHandler<HTMLDivElement> = (event) => {
  const video = event.currentTarget.querySelector('video');
  if (!video) return;
  video.currentTime = 0;
  void video.play();
};

const IconCard: React.FC<{ icon: React.ReactNode; title: string; text?: string; label?: string }> = ({ icon, title, text, label }) => (
  <Card className="relative">
    {label && <Eyebrow tone="muted" className="absolute top-6 right-6 md:top-8 md:right-8">{label}</Eyebrow>}
    <CardIcon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icon}
      </svg>
    </CardIcon>
    <CardTitle>{title}</CardTitle>
    {text && <CardText>{text}</CardText>}
  </Card>
);

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[projectIndex];
  const [isPretotypingOpen, setIsPretotypingOpen] = useState(false);

  useEffect(() => {
    setIsPretotypingOpen(false);
  }, [id]);

  if (!project) return <div>Project not found</div>;

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const isPoolchex = project.id === 'poolchex';
  const isHealthyPool = project.id === 'healthy-pool';
  const isAR = project.id === 'ar-pizza';
  const isDominos = project.id === 'dominos-global';

  const fiaBadgeProps = {
    text: 'Excellence in Franchise Innovation ・ FIA Winner ・ 2026 ・ ',
    imageSrc: '/assets/icons/fia-badge-2026.png',
    imageAlt: 'Franchise Industry Awards 2026',
  };

  const heroImage = (
    <motion.div
      className="w-full aspect-video rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-black/5"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition(DURATION.slow, 0.3)}
    >
      <img src={project.heroImage} className="w-full h-full object-cover" alt={project.title} />
    </motion.div>
  );

  const badgeEntrance = {
    initial: { opacity: 0, scale: 0.85, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: transition(DURATION.slow, 0.9),
  };

  return (
    <main className="bg-paper min-h-screen">
      <ReadingProgress />

      {/* Hero */}
      <Container className={PAGE_TOP}>
        <Intro>
          <motion.div variants={fadeUp}>
            <Eyebrow rule>{project.subtitle}</Eyebrow>
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-6 md:mt-8 text-5xl md:text-8xl xl:text-[8.5rem] font-serif leading-[0.9] tracking-tighter">
            {project.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 md:mt-12 max-w-5xl text-xl md:text-4xl leading-[1.2] font-light tracking-tight text-ink-muted">
            {project.oneLine}
          </motion.p>
        </Intro>
      </Container>

      {/* Hero Image */}
      {isAR ? (
        <section className="mt-16 md:mt-32 bg-night py-24 md:py-40 overflow-x-clip">
          <Container className="relative">
            {heroImage}
            <motion.div className="absolute -bottom-16 right-0 md:-bottom-28 md:-right-4 z-20" {...badgeEntrance}>
              <CircularTextBadge size={180} variant="dark" className="md:hidden" />
              <CircularTextBadge size={300} variant="dark" className="hidden md:block" />
            </motion.div>
          </Container>
        </section>
      ) : (
        <Container className="mt-16 md:mt-32 overflow-x-clip">
          <div className="relative">
            {heroImage}
            {isHealthyPool && (
              <motion.div className="absolute -bottom-24 right-2 md:-bottom-28 md:right-12 z-20" {...badgeEntrance}>
                <CircularTextBadge {...fiaBadgeProps} size={150} fontSize={12} className="md:hidden" />
                <CircularTextBadge {...fiaBadgeProps} size={300} className="hidden md:block" />
              </motion.div>
            )}
          </div>
        </Container>
      )}

      {/* Context & Role */}
      <Section>
        <Container className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-7">
            <Eyebrow rule className="mb-8 md:mb-12">{isAR ? 'A Visionary Shift' : 'Opening Context'}</Eyebrow>
            <p className="text-xl md:text-3xl leading-relaxed font-serif italic text-ink whitespace-pre-line">{project.context}</p>
          </Reveal>
          <RevealGroup className="md:col-span-5 space-y-12 md:space-y-14">
            <RevealItem>
              <Eyebrow tone="muted" className="mb-4">Role</Eyebrow>
              <p className="text-xl md:text-2xl font-medium tracking-tight">{project.role}</p>
            </RevealItem>
            <RevealItem>
              <Eyebrow tone="muted" className="mb-5">Scope</Eyebrow>
              <ul className="space-y-3 text-base md:text-lg text-ink-muted">
                {project.scope.map((item) => (
                  <li key={item} className="flex gap-4 items-start">
                    <span className="mt-3 w-2 h-px bg-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              <Eyebrow tone="muted" className="mb-5">Tools</Eyebrow>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolBadge key={tool} name={tool} />
                ))}
              </div>
            </RevealItem>
            {project.throughLine && (
              <RevealItem>
                <Eyebrow tone="muted" className="mb-4">In Short</Eyebrow>
                <p className="text-base md:text-lg font-serif italic text-ink-muted">{project.throughLine}</p>
              </RevealItem>
            )}
          </RevealGroup>
        </Container>
      </Section>

      {/* Designing Beyond the Interface */}
      <Section>
        <Container>
          <Panel>
            <div aria-hidden="true" className="absolute -top-20 -right-20 w-72 h-72 bg-brand/5 rounded-full blur-3xl" />
            <div className="relative max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-center mb-12 md:mb-16">
                {isAR ? <>Operating in <Accent>Ambiguity</Accent></> : <>Designing Beyond <Accent>the Interface</Accent></>}
              </h2>
              <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-10">
                {project.hardThings.map((thing, i) => (
                  <RevealItem key={thing} className="flex gap-6 items-start">
                    <span className="pt-1.5 text-xs font-bold tracking-[0.2em] text-brand tabular-nums">0{i + 1}</span>
                    <p className="text-lg md:text-xl leading-snug">{thing}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Panel>
        </Container>
      </Section>

      {/* Insight */}
      <Section>
        <Container>
          <Reveal className="text-center">
            <Eyebrow className="justify-center">The Insight</Eyebrow>
            <blockquote className="mt-10 max-w-5xl mx-auto font-serif italic text-3xl md:text-6xl leading-[1.15] tracking-tight">
              “{project.insight}”
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      {isPoolchex && (
        <>
          {/* The Design Thesis */}
          <Section>
            <Container>
              <Panel className="text-center">
                <Eyebrow className="justify-center mb-8">Design Thesis</Eyebrow>
                <p className="max-w-4xl mx-auto font-serif italic text-3xl md:text-5xl leading-tight">
                  If users want to know what to do next, the interface must act like a guide: <span className="text-brand">alive</span>, <span className="text-cyan-600">contextual</span>, and quietly intelligent.
                </p>
              </Panel>
            </Container>
          </Section>

          {/* Designing an Interface That Feels Like Water */}
          <Section>
            <Container>
              <SectionIntro
                title={<>Designing an Interface That Feels Like <Accent>Water</Accent></>}
                lead={
                  <>
                    Pool owners have a deeply sensory relationship with water. The interface honors that relationship, replacing flat utility screens with something familiar, calm, and spatially resonant.
                    <br />
                    <br />
                    When glass materials layer above the surface, the effect becomes architectural: the user is no longer looking at a screen, <i>but through it.</i>
                  </>
                }
              />
              <Reveal>
                <Eyebrow rule className="mb-8">Design Evidence</Eyebrow>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <MediaFrame className="md:col-span-2" frameClassName="aspect-[16/9]">
                  <Video src="/assets/projects/poolchex/hero-ui-glass.mp4" className="scale-[1.01]" />
                </MediaFrame>
                <MediaFrame className="md:col-span-2" frameClassName="aspect-[16/9]">
                  <Video src="/assets/projects/poolchex/hero-3up.mp4" className="scale-[1.01]" />
                </MediaFrame>
                {[
                  { label: 'Platform Integrations', tone: 'bg-cyan-50', video: '/assets/projects/poolchex/widgets-animation.mp4', loop: false },
                  { label: 'Glass Layers', tone: 'bg-white', video: '/assets/projects/poolchex/liquid-glass.mp4', loop: true },
                  { label: 'Score Card Screen', tone: 'bg-slate-50', video: '/assets/projects/poolchex/score-card.mp4', loop: false },
                  { label: 'Guided Treatment', tone: 'bg-black/5', video: '/assets/projects/poolchex/guided-treatment.mp4', loop: true },
                ].map((item) => (
                  <MediaFrame
                    key={item.label}
                    frameClassName={cx('aspect-[4/3]', item.tone, !item.loop && 'cursor-pointer')}
                    onClick={item.loop ? undefined : replayVideo}
                  >
                    <Video src={item.video} loop={item.loop} className="absolute inset-0 scale-[1.01]" />
                  </MediaFrame>
                ))}
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <WaterFieldDiagram />
            </Container>
          </Section>

          {/* Time as Material */}
          <Section>
            <Container>
              <TimeOfDayPalette />
            </Container>
          </Section>

          {/* Performance as Craft */}
          <Section>
            <Container>
              <SectionIntro
                title={<>Performance as a <Accent>Design Feature</Accent></>}
                lead="Motion only delights when it remains invisible to the processor."
              />
              <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <IconCard title="Begin animation at 30fps → ramp to 60fps once stable" icon={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>} />
                <IconCard title="Render mesh as a single cached layer" icon={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18" /></>} />
                <IconCard title="Scale beyond bounds to hide artifacts" icon={<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />} />
                <IconCard title="Disable unnecessary hit testing" icon={<><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3" /><line x1="1" y1="1" x2="23" y2="23" /></>} />
              </RevealGroup>
            </Container>
          </Section>

          {/* Computer Vision */}
          <Section>
            <Container>
              <SectionIntro
                title={<>Removing Friction From <Accent>Reality</Accent></>}
                lead="Test strips require manual color comparison, which is error-prone and tedious. The goal was to eliminate interpretive effort entirely."
              />
              <ScanFlowDiagram />
            </Container>
          </Section>

          {/* The Score Card */}
          <Section>
            <Container>
              <ScoreCardDiagram />
            </Container>
          </Section>

          {/* On-Device AI */}
          <Section>
            <Container>
              <OnDeviceAIDiagram />
            </Container>
          </Section>
        </>
      )}

      {isHealthyPool && (
        <>
          <Section>
            <Container>
              <SectionIntro
                title={<>From Transactions → <Accent>Continuous Care</Accent></>}
                lead="The experience was structured as an ongoing relationship, where diagnostics, treatment, and communication form a coherent narrative of water health."
              />
              <EcosystemDiagram />
            </Container>
          </Section>

          {/* Pretotyping at Scale */}
          <Section>
            <Container>
              <SectionIntro
                title={<>Build to Learn, <Accent>Then Build to Last</Accent></>}
                lead="Before committing to native, we shipped a cross-platform layer to validate behaviors at speed, then migrated deliberately once patterns stabilized."
              />

              {/* Phase Journey Cards */}
              <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-28">
                <IconCard
                  label="Phase 1"
                  title="Ship Fast"
                  text="Flutter-based mobile and web layer. Real users, real data, rapid iteration across technician tools and dashboards."
                  icon={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                />
                <IconCard
                  label="Phase 2"
                  title="Observe Patterns"
                  text="Field testing revealed where cross-platform fell short: offline reliability, background uploads, memory on constrained devices."
                  icon={<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>}
                />
                <IconCard
                  label="Phase 3"
                  title="Go Native"
                  text="Migrated to SwiftUI and Kotlin with evidence in hand. The architecture was designed to make this transition low-risk."
                  icon={<><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>}
                />
              </RevealGroup>

              {/* Architecture Decisions */}
              <Reveal>
                <Eyebrow rule className="mb-10 md:mb-12">Architecture Decisions</Eyebrow>
              </Reveal>

              <motion.div
                id="pretotyping-content"
                className="relative overflow-hidden"
                initial={false}
                animate={{ height: isPretotypingOpen ? 'auto' : 360 }}
                transition={transition(0.6)}
              >
                <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-20">
                  <IconCard
                    title="Thin Clients, Thick Edge"
                    text="Business logic and AI orchestration live server-side. The mobile layer focuses purely on presentation and interaction."
                    icon={<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>}
                  />
                  <IconCard
                    title="Platform-Appropriate Surfaces"
                    text="Native mobile for field reliability. React web for operational dashboards. Edge functions for intelligence. Each excels in its context."
                    icon={
                      <>
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </>
                    }
                  />
                  <IconCard
                    title="Migration by Design"
                    text="Every architectural choice assumed eventual platform specialization. When the time came, we swapped the presentation layer without touching the system."
                    icon={<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />}
                  />
                  <IconCard
                    title="Performance as Experience"
                    text="Heavy compute stays off-device. Interfaces stay responsive. In service environments, speed is trust."
                    icon={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
                  />
                </RevealGroup>

                {/* Deeper Context */}
                <div className="max-w-3xl space-y-12">
                  <div>
                    <H3>Why Start Cross-Platform?</H3>
                    <Body className="mt-4">Prototyping asks <em>"is this usable?"</em>. Pretotyping asks <em>"should this exist, and in what form?"</em>.</Body>
                    <Body className="mt-4">We needed to validate technician workflows, service orchestration, and dashboard requirements across two markets before locking into platform-specific builds. Flutter let us test assumptions in production without over-committing.</Body>
                  </div>
                  <div>
                    <H3>The Moment to Migrate</H3>
                    <Body className="mt-4">Field testing made the limits tangible. Technicians working in full sun with poor connectivity needed background upload queues, aggressive memory management, and offline-first resilience that cross-platform couldn't reliably deliver.</Body>
                    <Body className="mt-4">The decision wasn't ideological. It was evidence-driven. Native became necessary when reliability became the user experience.</Body>
                  </div>
                  <div>
                    <H3>What This Enabled</H3>
                    <ul className="mt-4 space-y-3 text-base md:text-lg text-ink-muted">
                      {[
                        'Validated behavioral assumptions before scaling investment',
                        'De-risked the transition to native with real-world data',
                        'Kept learning cycles fast during the ambiguous early phase',
                        'Preserved flexibility until the architecture earned its constraints',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="pt-6 border-t border-black/10 text-lg font-serif italic text-ink-muted">
                    The most resilient systems are built to become correct over time.
                  </p>
                </div>

                {!isPretotypingOpen && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
                )}
              </motion.div>

              <div className="mt-8 flex justify-end">
                <PillButton
                  icon={isPretotypingOpen ? 'up' : 'down'}
                  onClick={() => setIsPretotypingOpen(!isPretotypingOpen)}
                  ariaExpanded={isPretotypingOpen}
                  ariaControls="pretotyping-content"
                >
                  {isPretotypingOpen ? 'Collapse' : 'Read Full Story'}
                </PillButton>
              </div>
            </Container>
          </Section>

          {/* Technician & Customer Experience */}
          <Section>
            <Container className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <MediaFrame frameClassName="aspect-[4/3]" caption="Technician Assessment">
                <img src="/assets/projects/healthy-pool/technician-app.jpg" className="w-full h-full object-cover" alt="Technician assessment app" />
              </MediaFrame>
              <MediaFrame frameClassName="aspect-[4/3]" caption="Progressive Disclosure UI">
                <Video src="/assets/projects/healthy-pool/progressive-disclosure.mp4" />
              </MediaFrame>
            </Container>
          </Section>

          {/* Full-width detail shot */}
          <Section>
            <Container>
              <MediaFrame frameClassName="aspect-[21/9]" caption="Assessment findings translated into actionable insights">
                <img src="/assets/projects/healthy-pool/report-detail.jpg" className="w-full h-full object-cover" alt="Report detail view" />
              </MediaFrame>
            </Container>
          </Section>
        </>
      )}

      {isAR && (
        <>
          {/* Designing the Interaction Model */}
          <Section>
            <Container>
              <SectionIntro title={<>Designing the <Accent>Interaction Model</Accent></>} />
              <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <RevealItem>
                  <H3>Under-thumb customisation</H3>
                  <Body className="mt-4">
                    To keep the experience fast and ergonomic, we introduced a swipe-navigable ingredient picker designed to keep customisations under the user's thumb, with single-gesture add/remove interactions.
                  </Body>
                </RevealItem>
                <RevealItem>
                  <H3>"AR Optional" by design</H3>
                  <Body className="mt-4">
                    For devices without ARKit, or users who preferred not to place a pizza on the floor, we added a camera-off toggle and rendered the pizza against a neutral background.
                  </Body>
                </RevealItem>
              </RevealGroup>
            </Container>
          </Section>

          {/* AR Interface Showcase */}
          <Section>
            <Container className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <MediaFrame frameClassName="aspect-[4/3] bg-black" caption="AR Mode">
                <Video src="/assets/projects/ar-pizza/ar-mode.mp4" />
              </MediaFrame>
              <MediaFrame frameClassName="aspect-[4/3]" caption="Camera-Off Fallback">
                <img src="/assets/projects/ar-pizza/non-ar-mode.jpg" className="w-full h-full object-cover" alt="Non-AR fallback mode" />
              </MediaFrame>
            </Container>
          </Section>

          {/* Spatial Diagram */}
          <Section>
            <Container>
              <SpatialDiagram />
            </Container>
          </Section>
        </>
      )}

      {isDominos && (
        <>
          {/* Designing for Momentum */}
          <Section>
            <Container>
              <SectionIntro
                title={<>Designing for <Accent>Momentum</Accent></>}
                lead="Removing friction from the path to purchase by reducing decision fatigue, compressing steps, and making progress continuously visible."
              />
              <MomentumDiagram />
            </Container>
          </Section>

          {/* Customization Flow */}
          <Section>
            <Container>
              <MediaFrame frameClassName="aspect-square md:aspect-[21/9] bg-black" caption="Progressive customization interface">
                <PingPongVideo src="/assets/projects/dominos-global/customisation-flow-redesign.mp4" className="w-full h-full object-cover" />
              </MediaFrame>
            </Container>
          </Section>

          {/* Systems Thinking */}
          <section className={cx(SECTION_SPACING, 'relative')}>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/assets/projects/dominos-global/component-bg.png)' }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-paper via-paper/75 to-paper" />
            <Container className="relative py-24 md:py-40">
              <SectionIntro
                title={<>Design System <Accent>Evolution</Accent></>}
                lead="To support global consistency while enabling regional flexibility, we evolved a modular design system, allowing teams to scale improvements without fragmenting the experience."
              />
              <DesignSystemDiagram />
            </Container>
          </section>

          {/* Multi-market showcase */}
          <Section>
            <Container>
              <MediaFrame frameClassName="aspect-video" caption="Consistent experience across global markets">
                <img src="/assets/projects/dominos-global/multi-market.jpg" className="w-full h-full object-cover" alt="Multi-market implementation" />
              </MediaFrame>
            </Container>
          </Section>
        </>
      )}

      {/* Experience Principles */}
      <Section>
        <Container>
          <SectionIntro title={<>Experience <Accent>Principles</Accent></>} />
          <RevealGroup className={cx('grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12', project.principles.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
            {project.principles.map((principle, i) => (
              <RevealItem key={principle.title} className="border-t border-black/10 pt-6">
                <span className="text-xs font-bold tracking-[0.2em] text-brand tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-xl md:text-2xl tracking-tight leading-snug">{principle.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{principle.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Craft Details */}
      {isHealthyPool ? (
        <Section>
          <Container>
            <SectionIntro title={<>Craft & <Accent>Execution</Accent></>} />
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {project.craft.map((c, i) => (
                <Card key={c.title || c.section}>
                  <span className="text-xs font-bold tracking-[0.2em] text-brand tabular-nums">0{i + 1}</span>
                  <CardTitle className="mt-4">{c.title || c.section}</CardTitle>
                  <CardText>{c.description || c.content}</CardText>
                </Card>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : !isPoolchex ? (
        <Section>
          <Container className="space-y-24 md:space-y-40">
            {project.craft.map((c, i) => {
              const visual = project.visuals[i] || project.heroImage;
              return (
                <div key={c.section || c.title} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-center">
                  <Reveal className={cx('md:col-span-5', i % 2 !== 0 && 'md:order-last')}>
                    <Eyebrow rule className="mb-6 md:mb-8">Craft 0{i + 1}</Eyebrow>
                    <h3 className="text-3xl md:text-5xl font-serif tracking-tighter leading-[1.05]">{c.section || c.title}</h3>
                    <Lead className="mt-6 md:mt-8">{c.content || c.description}</Lead>
                  </Reveal>
                  <MediaFrame className="md:col-span-7" frameClassName="aspect-[16/10]">
                    {isVideo(visual) ? (
                      <Video src={visual} />
                    ) : (
                      <img src={visual} className="w-full h-full object-cover" alt={c.section || c.title} />
                    )}
                  </MediaFrame>
                </div>
              );
            })}
          </Container>
        </Section>
      ) : null}

      {/* Outcome & Reflection */}
      <Section>
        <Container>
          <Reveal className="max-w-4xl mx-auto text-center">
            <Eyebrow className="justify-center mb-10 md:mb-12">Outcome{project.outcomes ? 's' : ''}</Eyebrow>
            {project.outcomes ? (
              <ul className="space-y-5 text-left max-w-2xl mx-auto">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-4 items-start text-lg md:text-xl leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-brand shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-3xl md:text-5xl font-serif leading-tight tracking-tight">{project.outcome}</p>
            )}
          </Reveal>
          <Reveal className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-black/10 max-w-3xl mx-auto text-center">
            <Eyebrow tone="muted" className="justify-center mb-8">Reflection</Eyebrow>
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-ink-muted">“{project.reflection}”</p>
          </Reveal>
        </Container>
      </Section>

      {/* Next Project */}
      <Section>
        <Container>
          <Reveal>
            <Link
              to={`/project/${nextProject.id}`}
              className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_80px_-48px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <div className="p-8 md:p-14 flex flex-col justify-between gap-12">
                <Eyebrow rule>Next Project</Eyebrow>
                <div>
                  <p className="font-serif text-4xl md:text-6xl tracking-tighter leading-[0.95] transition-colors duration-500 group-hover:text-brand">
                    {nextProject.title}
                  </p>
                  <Eyebrow tone="muted" className="mt-5">{nextProject.subtitle}</Eyebrow>
                </div>
                <span className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_16px_40px_-16px_rgba(255,92,52,0.8)] transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-black/5">
                <img
                  src={nextProject.heroImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
            </Link>
          </Reveal>
        </Container>
      </Section>

      <ContactFooter />
    </main>
  );
};
