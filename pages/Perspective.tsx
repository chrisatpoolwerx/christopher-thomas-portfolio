
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';

export const Perspective: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-32 md:pt-64 pb-32 md:pb-64">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="w-10 h-[1px] bg-brand" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand font-bold">Design Perspective</span>
          </div>

          <div className="space-y-12 md:space-y-20">
            <motion.p
              className="text-3xl md:text-[4rem] font-serif leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
              I'm most energized by problems where technology risks overwhelming the people it serves.
            </motion.p>

            <motion.p
              className="text-xl md:text-3xl leading-[1.5] opacity-70 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              My work focuses on restoring legibility — ensuring powerful systems feel navigable, intelligence feels supportive, and complexity resolves into clarity.
            </motion.p>

            <motion.p
              className="text-xl md:text-3xl leading-[1.5] opacity-70 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              I believe the highest form of craft is <span className="text-black opacity-100 italic">quiet</span>: experiences that feel so natural they disappear into use.
            </motion.p>
          </div>

          <motion.div
            className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex flex-wrap gap-6">
              <MagneticButton onClick={() => navigate('/about')}>
                <span className="text-sm uppercase tracking-[0.4em] text-brand font-bold border-b border-brand/20 pb-2 hover:border-brand transition-all">
                  About Me
                </span>
              </MagneticButton>
              <MagneticButton onClick={() => navigate('/')}>
                <span className="text-sm uppercase tracking-[0.4em] opacity-50 font-bold border-b border-black/10 pb-2 hover:border-black/30 hover:opacity-80 transition-all">
                  View Work
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};
