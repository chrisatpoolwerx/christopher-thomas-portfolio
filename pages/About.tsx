
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

              <div className="pt-8">
                <MagneticButton onClick={() => navigate('/resume')}>
                  <span className="text-sm uppercase tracking-[0.4em] text-brand font-bold border-b border-brand/20 pb-2 hover:border-brand transition-all">
                    View Full Resume
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-16 md:gap-24 pt-6 md:pt-12">
            <div className="space-y-6 md:space-y-8">
              <span className="text-xs uppercase tracking-[0.4em] text-brand font-bold">Expertise</span>
              <ul className="text-xl md:text-2xl space-y-3 md:space-y-4 font-serif italic">
                <li className="hover:translate-x-4 transition-transform duration-500">Product Design</li>
                <li className="hover:translate-x-4 transition-transform duration-500 text-brand">AI-Native Systems</li>
                <li className="hover:translate-x-4 transition-transform duration-500">Design Systems</li>
                <li className="hover:translate-x-4 transition-transform duration-500">Design Engineering</li>
                <li className="hover:translate-x-4 transition-transform duration-500">Apple Ecosystem</li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <span className="text-xs uppercase tracking-[0.4em] opacity-30">Recognition</span>
              <ul className="text-lg md:text-xl space-y-3 md:space-y-4 font-light opacity-60">
                <li>IDC Digital Transformation Award</li>
                <li>Apple Park Presenter</li>
                <li>Telstra Vantage Speaker</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design Perspective */}
        <motion.section
          className="mt-24 md:mt-40 border-t border-black/5 pt-20 md:pt-32 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl md:text-4xl font-serif leading-[1.3] tracking-tight mb-8 md:mb-12">
            I'm most energized by problems where technology risks overwhelming the people it serves.
          </p>
          <p className="text-lg md:text-2xl leading-[1.6] opacity-60 font-light mb-6 md:mb-8">
            My work focuses on restoring legibility — ensuring powerful systems feel navigable, intelligence feels supportive, and complexity resolves into clarity.
          </p>
          <p className="text-lg md:text-xl leading-[1.6] opacity-40 font-light italic">
            I believe the highest form of craft is quiet: experiences that feel so natural they disappear into use.
          </p>
        </motion.section>

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
