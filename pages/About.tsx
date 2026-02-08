
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      {/* Content container with max-width */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-32 md:pt-64">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <h1 className="text-3xl md:text-[5.5rem] font-serif leading-[1.05] tracking-tighter mb-12 md:mb-20">
                I design intelligent systems that make complex domains feel <span className="text-brand italic">clear, calm, and naturally understood.</span>
              </h1>
            </motion.div>

            <motion.div
              className="mt-12 md:mt-20 text-xl md:text-3xl leading-[1.5] opacity-70 space-y-8 md:space-y-12 font-light"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <p>
                Across AI-native tools, global commerce platforms, spatial interfaces, and predictive service ecosystems, my work focuses on reducing cognitive burden while revealing powerful capability progressively.
              </p>
              <p className="text-lg md:text-2xl opacity-70">
                I'm drawn to problems where thoughtful design doesn't just improve interaction — it reshapes behavior.
              </p>

              <div className="pt-8 flex flex-wrap gap-6">
                <MagneticButton onClick={() => navigate('/perspective')}>
                  <span className="text-sm uppercase tracking-[0.4em] text-brand font-bold border-b border-brand/20 pb-2 hover:border-brand transition-all">
                    Design Perspective
                  </span>
                </MagneticButton>
                <MagneticButton onClick={() => navigate('/resume')}>
                  <span className="text-sm uppercase tracking-[0.4em] opacity-50 font-bold border-b border-black/10 pb-2 hover:border-black/30 hover:opacity-80 transition-all">
                    View Resume
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-16 md:gap-24 pt-6 md:pt-12">
            <div className="space-y-6 md:space-y-8">
              <span className="text-xs uppercase tracking-[0.4em] text-brand font-bold">Areas of Focus</span>
              <ul className="text-lg md:text-xl space-y-4 md:space-y-5 font-light">
                <li className="hover:translate-x-3 transition-transform duration-500">
                  <span className="font-serif italic text-xl md:text-2xl block">Clarity in Complex Systems</span>
                  <span className="text-sm opacity-50 mt-1 block">Synthesizing dense information into confident action</span>
                </li>
                <li className="hover:translate-x-3 transition-transform duration-500">
                  <span className="font-serif italic text-xl md:text-2xl block text-brand">Intelligence Made Perceptible</span>
                  <span className="text-sm opacity-50 mt-1 block">AI experiences that feel assistive, not opaque</span>
                </li>
                <li className="hover:translate-x-3 transition-transform duration-500">
                  <span className="font-serif italic text-xl md:text-2xl block">Behavioral Design</span>
                  <span className="text-sm opacity-50 mt-1 block">Interactions that quietly shift how people operate</span>
                </li>
                <li className="hover:translate-x-3 transition-transform duration-500">
                  <span className="font-serif italic text-xl md:text-2xl block">Platform-Native Craft</span>
                  <span className="text-sm opacity-50 mt-1 block">Software that feels at home on its device</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <span className="text-xs uppercase tracking-[0.4em] opacity-30">Recognition</span>
              <ul className="text-base md:text-lg space-y-3 md:space-y-4 font-light opacity-50">
                <li>IDC Digital Transformation Award</li>
                <li>Apple Park Presenter</li>
                <li>Telstra Vantage Speaker</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-24 md:mt-40 border-t border-black/5 pt-20 md:pt-32">
          <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-16 md:mb-24">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
            <motion.div
              className="space-y-6 md:space-y-10 group"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl md:text-6xl font-serif text-brand group-hover:italic transition-all">01</span>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight">Clarity is the highest form of craft.</h3>
              <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">Minimalism isn't just aesthetic; it's the elimination of cognitive friction. If it's confusing, it's not finished.</p>
            </motion.div>
            <motion.div
              className="space-y-6 md:space-y-10 group"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl md:text-6xl font-serif text-brand group-hover:italic transition-all">02</span>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight">Reveal power <br />progressively.</h3>
              <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">Great tools scale with expertise. We design for the expert user while welcoming the novice with warmth.</p>
            </motion.div>
            <motion.div
              className="space-y-6 md:space-y-10 group"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl md:text-6xl font-serif text-brand group-hover:italic transition-all">03</span>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight">Details are <br />comprehension.</h3>
              <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">The nuance of motion and typography isn't just beauty; it's how we signal causality and hierarchy to the mind.</p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer Call to Action - Full width */}
      <section className="mt-40 md:mt-64 px-6 md:px-8 py-40 md:py-80 bg-[#121214] text-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow orb */}
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
          Let's build the <span className="text-brand italic">inevitable.</span>
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
