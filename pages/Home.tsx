
import React, { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';

// Preload all project hero images
const preloadImages = () => {
  PROJECTS.forEach((project) => {
    const img = new Image();
    img.src = project.heroImage;
  });
};

// Custom easing for consistent animation curves
const easeOutExpo = [0.33, 1, 0.68, 1];

// Memoized ProjectRow to prevent unnecessary re-renders from parent
const ProjectRow: React.FC<{ project: Project; index: number }> = memo(({ project, index }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`group relative w-full py-16 md:py-24 ${index !== 0 ? 'border-t border-black/10' : ''} flex flex-col md:flex-row items-baseline justify-between cursor-pointer px-4 md:px-8 overflow-hidden`}
      onClick={() => navigate(`/project/${project.id}`)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ willChange: 'transform' }}
    >
      {/* Background - uses GPU-accelerated transform instead of triggering layout */}
      <motion.div
        className="absolute inset-0 bg-brand/5 -z-10 origin-top"
        initial={false}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        style={{ willChange: 'transform' }}
      />

      <div className="flex flex-col md:w-1/3 relative z-10">
        {/* Use Framer Motion for hover transforms instead of CSS transitions */}
        <motion.h2
          className="text-4xl md:text-8xl font-serif tracking-tighter"
          animate={{
            x: isHovered ? 16 : 0,
            fontStyle: isHovered ? 'italic' : 'normal'
          }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          {project.title}
        </motion.h2>
        <motion.p
          className="mt-4 md:mt-6 text-xs uppercase tracking-[0.4em] font-bold"
          animate={{
            opacity: isHovered ? 1 : 0.3,
            color: isHovered ? '#FF4F00' : '#1d1d1f'
          }}
          transition={{ duration: 0.4 }}
        >
          {project.subtitle}
        </motion.p>
      </div>

      <div className="md:w-1/2 mt-8 md:mt-0 relative z-20">
        <motion.p
          className="text-lg md:text-3xl leading-[1.2] max-w-lg font-light"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.4 }}
        >
          {project.oneLine}
        </motion.p>
      </div>

      {/* Image preview - GPU accelerated with transform3d */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="hidden lg:block absolute pointer-events-none z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20"
            initial={{ opacity: 0, scale: 0.9, x: '100%', y: '-50%', rotate: 5 }}
            animate={{ opacity: 1, scale: 1, x: '10%', y: '-50%', rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: '100%', rotate: -5 }}
            style={{
              width: '540px',
              height: '340px',
              right: '0',
              top: '50%',
              willChange: 'transform, opacity'
            }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <img
              src={project.heroImage}
              className="w-full h-full object-cover"
              alt="Preview"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbfb] to-transparent opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow button - GPU accelerated */}
      <motion.div
        className="absolute right-12 top-1/2 z-30"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 40,
          y: '-50%'
        }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white shadow-xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
});

export const Home: React.FC = () => {
  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      {/* Hero Section */}
      <section className="px-6 md:px-8 pt-32 md:pt-64 pb-0 max-w-screen-xl mx-auto relative">
        <motion.div className="will-change-transform">
          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.h1 
              className="text-5xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
            >
              Christopher <br /> 
              <span className="text-brand">Thomas</span>
            </motion.h1>
          </div>

          <motion.p 
            className="text-lg md:text-4xl mt-12 md:mt-16 max-w-4xl leading-[1.2] font-light tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            Building intelligent, high-fidelity software that translates powerful technology into <span className="text-brand italic font-serif">human inevitability.</span>
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mt-24 md:mt-48 flex justify-between items-end border-b border-black/10 pb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
          style={{ originX: 0 }}
        >
          <div className="flex gap-6 items-center">
            <div className="flex gap-1">
               {/* Use Framer Motion for pulse - pauses when off-screen unlike CSS animation */}
               <motion.span
                 className="w-2 h-2 rounded-full bg-brand"
                 animate={{ opacity: [1, 0.4, 1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
               />
               <span className="w-2 h-2 rounded-full bg-black/10" />
               <span className="w-2 h-2 rounded-full bg-black/10" />
            </div>
            <span className="text-xs uppercase tracking-[0.4em] opacity-40 font-bold">Selected Works</span>
          </div>
          <span className="hidden md:block text-xs uppercase tracking-[0.4em] opacity-40 font-bold">Volume 01 / 2026</span>
        </motion.div>
      </section>

      {/* Projects List */}
      <section>
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <ProjectRow project={project} index={index} />
          </motion.div>
        ))}
      </section>

      {/* Final Footer Call to Action */}
      <section className="px-6 md:px-8 py-40 md:py-80 bg-[#121214] text-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow orb - only animates when in viewport */}
        <motion.div
          className="absolute -top-64 -right-64 w-[40rem] h-[40rem] bg-brand/10 blur-[180px] rounded-full"
          initial={{ scale: 1, opacity: 0.2 }}
          whileInView={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ willChange: 'transform, opacity' }}
        />
        
        <motion.h3
          className="text-3xl md:text-[6.3rem] font-serif max-w-6xl leading-[0.9] tracking-tighter relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let’s build the <span className="text-brand italic">inevitable.</span>
        </motion.h3>
        
        <div className="mt-20 md:mt-32 group relative z-10">
          <a href="mailto:chris@christhomas.co" className="text-xl md:text-4xl border-b border-white/10 pb-3 md:pb-4 group-hover:border-brand transition-all duration-700 font-serif italic text-white/60 hover:text-white">
            chris@christhomas.co
          </a>
        </div>
        
        <motion.div 
          className="mt-32 md:mt-48 flex flex-col md:flex-row gap-8 md:gap-12 text-xs uppercase tracking-[0.5em] opacity-30 font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <span>Brisbane, Australia</span>
          <span className="hidden md:block">/</span>
          <span>Global Relocation Ready</span>
          <span className="hidden md:block">/</span>
          <span>© 2026</span>
        </motion.div>
      </section>
    </main>
  );
};
