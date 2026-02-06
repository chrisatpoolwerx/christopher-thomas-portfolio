
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div>Project not found</div>;

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
            className={`w-full aspect-video rounded-2xl md:rounded-[3rem] overflow-hidden ${isAR ? 'shadow-[0_50px_100px_rgba(0,0,0,0.5)] scale-110' : 'bg-gray-200'}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <img
              src={project.heroImage}
              className={`w-full h-full object-cover ${isAR ? 'brightness-75 contrast-125' : ''}`}
              alt={project.title}
            />
          </motion.div>
          {/* IDC Award Badge - AR Pizza only */}
          {isAR && (
            <motion.div
              className="absolute -bottom-16 -right-8 md:-bottom-24 md:-right-16 z-20"
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
          <p className="text-xl md:text-3xl leading-relaxed opacity-80 font-serif italic">
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
      {isHealthyPool && (
        <>
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">From Transactions → <span className="text-brand italic">Continuous Care</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                Rather than designing isolated service moments, the experience was structured as an ongoing relationship — where diagnostics, treatment, and communication form a coherent narrative of water health.
              </p>
            </div>
            <EcosystemDiagram />
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
                  For devices without ARKit — or users who simply didn't want to place a pizza on the floor — we added a camera-off toggle and rendered the pizza against a neutral background.
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
                Removing friction from the path to purchase — reducing decision fatigue, compressing steps, and making progress continuously visible.
              </p>
            </div>
            <MomentumDiagram />
          </section>

          {/* Image Placeholder: Customization Flow */}
          <section className="mt-32 md:mt-64 px-4">
            <motion.div
              className="w-full aspect-[21/9] bg-gray-100 rounded-2xl md:rounded-[3rem] overflow-hidden"
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <img
                src="/assets/projects/dominos-global/customization-flow.jpg"
                className="w-full h-full object-cover"
                alt="Customization flow redesign"
              />
            </motion.div>
            <p className="text-center text-sm opacity-40 mt-6 uppercase tracking-widest">Progressive customization interface</p>
          </section>

          {/* Systems Thinking */}
          <section className="mt-32 md:mt-80 px-6 md:px-8 max-w-screen-xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 tracking-tighter">Design System <span className="text-brand italic">Evolution</span></h2>
              <p className="text-lg md:text-2xl opacity-60 max-w-3xl font-light">
                To support global consistency while enabling regional flexibility, we evolved a modular design system — allowing teams to scale improvements without fragmenting the experience.
              </p>
            </div>
            <DesignSystemDiagram />
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
                     Intelligence Layer
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
      ) : (
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
      )}

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
