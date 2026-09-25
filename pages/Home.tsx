import React, { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { DURATION, fadeUp, transition } from '../components/motion';
import { Accent, ContactFooter, Container, Eyebrow, Intro, PAGE_TOP, RevealGroup, cx } from '../components/ui';

// Preload all project hero images
const preloadImages = () => {
  PROJECTS.forEach((project) => {
    const img = new Image();
    img.src = project.heroImage;
  });
};

const ProjectRow: React.FC<{ project: Project }> = memo(({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li variants={fadeUp} className="border-t border-black/10">
      <Link
        to={`/project/${project.id}`}
        className="group relative -mx-4 md:-mx-8 px-4 md:px-8 py-14 md:py-20 flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-12 rounded-3xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Hover wash */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-brand/5 origin-top"
          initial={false}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={transition(DURATION.base)}
        />

        <div className="relative md:w-5/12">
          <motion.h2
            className="text-4xl md:text-7xl font-serif tracking-tighter leading-[0.95]"
            animate={{ x: isHovered ? 12 : 0 }}
            transition={transition(DURATION.base)}
          >
            {project.title}
          </motion.h2>
          <Eyebrow tone={isHovered ? 'brand' : 'muted'} className="mt-4 md:mt-6 transition-colors duration-300">
            {project.subtitle}
          </Eyebrow>
        </div>

        <p className={cx('relative md:w-1/2 max-w-lg text-lg md:text-2xl font-light leading-snug transition-colors duration-300', isHovered ? 'text-ink' : 'text-ink-muted')}>
          {project.oneLine}
        </p>

        {/* Image preview */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              aria-hidden="true"
              className="hidden xl:block absolute pointer-events-none z-10 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, scale: 0.94, x: '60%', y: '-50%', rotate: 4 }}
              animate={{ opacity: 1, scale: 1, x: '20%', y: '-50%', rotate: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: '60%', y: '-50%', rotate: -4 }}
              style={{ width: '440px', height: '280px', right: '0', top: '50%' }}
              transition={transition(DURATION.base)}
            >
              <img src={project.heroImage} className="w-full h-full object-cover" alt="" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow */}
        <motion.span
          aria-hidden="true"
          className="hidden md:flex absolute right-8 top-1/2 z-20 w-14 h-14 rounded-full bg-brand items-center justify-center text-white shadow-xl"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 24, y: '-50%' }}
          transition={transition(DURATION.base)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </Link>
    </motion.li>
  );
});

export const Home: React.FC = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      {/* Hero */}
      <Container className={PAGE_TOP}>
        <div className="overflow-hidden pb-2">
          <motion.h1
            className="text-6xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={transition(DURATION.slow)}
          >
            Christopher <br />
            <span className="text-brand">Thomas</span>
          </motion.h1>
        </div>

        <Intro delay={0.5}>
          <motion.p variants={fadeUp} className="mt-12 md:mt-16 max-w-4xl text-xl md:text-4xl leading-[1.2] font-light tracking-tight text-ink-muted">
            Building intelligent, high-fidelity software that translates powerful technology into <Accent>natural clarity.</Accent>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-24 md:mt-40 pb-8 md:pb-10 flex justify-between items-end">
            <Eyebrow tone="muted" className="gap-6">
              <span className="flex gap-1" aria-hidden="true">
                <motion.span
                  className="w-2 h-2 rounded-full bg-brand"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="w-2 h-2 rounded-full bg-black/10" />
                <span className="w-2 h-2 rounded-full bg-black/10" />
              </span>
              Selected Works
            </Eyebrow>
            <Eyebrow tone="muted" className="hidden md:flex">Volume 01 / 2026</Eyebrow>
          </motion.div>
        </Intro>
      </Container>

      {/* Projects */}
      <Container>
        <RevealGroup className="border-b border-black/10" staggerBy={0.1}>
          <ul>
            {PROJECTS.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </ul>
        </RevealGroup>
      </Container>

      <ContactFooter />
    </main>
  );
};

