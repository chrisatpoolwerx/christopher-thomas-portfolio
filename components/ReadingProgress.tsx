import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

// Thin brand-coloured bar pinned to the top of the viewport that fills as the page is read
export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand origin-left z-[60] pointer-events-none"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
};
