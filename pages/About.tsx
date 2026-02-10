
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const [isVisaOpen, setIsVisaOpen] = useState(false);

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

              <motion.button
                type="button"
                onClick={() => navigate('/resume')}
                className="inline-flex items-center gap-4 rounded-full bg-brand px-6 md:px-8 py-3 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.45em] font-bold text-white shadow-[0_20px_50px_-20px_rgba(255,79,0,0.7)]"
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View Full Resume
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>

              {/* E-3 Visa Card */}
              <motion.div
                className="rounded-2xl md:rounded-3xl bg-brand text-white overflow-hidden shadow-[0_20px_60px_-20px_rgba(255,79,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setIsVisaOpen(!isVisaOpen)}
                  className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 flex items-center justify-center"
                      animate={{ rotate: isVisaOpen ? 0 : [0, -10, 10, -5, 5, 0] }}
                      transition={{ duration: 0.6, delay: isVisaOpen ? 0 : 2, repeat: isVisaOpen ? 0 : Infinity, repeatDelay: 4 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-sm md:text-base font-bold tracking-wide">U.S. Work Authorization</p>
                      <p className="text-xs md:text-sm text-white/70">E-3 Visa — No H-1B Required</p>
                    </div>
                  </div>
                  <motion.span
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                    animate={{ rotate: isVisaOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isVisaOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 md:pb-8 space-y-6">
                        <div className="h-[1px] bg-white/20" />

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                          As an Australian citizen, I'm eligible for the E-3 visa — a U.S. work visa exclusively available to Australians. No H-1B sponsorship required.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          {[
                            { icon: 'check-circle', title: 'No lottery', desc: '10,500 annual quota never reached' },
                            { icon: 'refresh', title: 'Renewable indefinitely', desc: 'Two-year increments' },
                            { icon: 'users', title: 'Spousal work rights', desc: 'Partner can work unrestricted' },
                            { icon: 'zap', title: 'Fast & streamlined', desc: 'Quicker than H-1B process' },
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-xl bg-white/10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                            >
                              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                                {item.icon === 'check-circle' && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                  </svg>
                                )}
                                {item.icon === 'refresh' && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="23 4 23 10 17 10"/>
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                                  </svg>
                                )}
                                {item.icon === 'users' && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                  </svg>
                                )}
                                {item.icon === 'zap' && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                                  </svg>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold">{item.title}</p>
                                <p className="text-xs text-white/60">{item.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                          <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                            <span className="font-bold text-white">For employers:</span> Hiring under E-3 is straightforward — no lottery uncertainty, faster onboarding, and reduced administrative complexity compared to H-1B.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <p className="text-lg md:text-2xl opacity-70">
                I'm drawn to problems where thoughtful design reshapes behavior.
              </p>
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
          className="mt-16 md:mt-24 border-t border-black/5 pt-12 md:pt-20 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl md:text-4xl font-serif leading-[1.3] tracking-tight mb-6 md:mb-8">
            I'm most energized by problems where technology risks overwhelming the people it serves.
          </p>
          <p className="text-lg md:text-2xl leading-[1.6] opacity-60 font-light mb-4 md:mb-6">
            My work focuses on restoring legibility, ensuring powerful systems feel navigable, intelligence feels supportive, and complexity resolves into clarity.
          </p>
          <p className="text-lg md:text-xl leading-[1.6] opacity-40 font-light italic">
            I believe the highest form of craft is quiet: experiences that feel so natural they disappear into use.
          </p>
        </motion.section>

        <section className="mt-16 md:mt-24 border-t border-black/5 pt-12 md:pt-20">
          <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-12 md:mb-16">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            <motion.div
              className="space-y-6 md:space-y-10 group"
              whileHover={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-5xl md:text-6xl font-serif text-brand group-hover:italic transition-all">01</span>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight">Clarity is the highest form of craft.</h3>
              <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">Minimalism eliminates cognitive friction. If it's confusing, it's not finished.</p>
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
              <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light">The nuance of motion and typography signals causality and hierarchy to the mind.</p>
            </motion.div>
          </div>
        </section>

        {/* Areas of Focus */}
        <section className="mt-16 md:mt-24 border-t border-black/5 pt-12 md:pt-20">
          <h2 className="text-xs uppercase tracking-[0.4em] text-brand font-bold mb-12 md:mb-16">Areas of Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3 className="text-xl md:text-2xl font-serif mb-3">Clarity in Complex Systems</h3>
              <p className="text-base text-black/60">Designing products that synthesize dense information into confident action.</p>
            </motion.div>
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z"/>
                <circle cx="12" cy="6" r="1"/>
              </svg>
              <h3 className="text-xl md:text-2xl font-serif mb-3">Intelligence Made Perceptible</h3>
              <p className="text-base text-black/60">Shaping AI-driven experiences that feel assistive rather than opaque.</p>
            </motion.div>
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <h3 className="text-xl md:text-2xl font-serif mb-3">Behavioral Design</h3>
              <p className="text-base text-black/60">Creating interactions that quietly shift how people operate in the world.</p>
            </motion.div>
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-black/[0.02] border border-black/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-8 h-8 text-brand mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <h3 className="text-xl md:text-2xl font-serif mb-3">Platform-Native Craft</h3>
              <p className="text-base text-black/60">Building software that feels deeply at home on the devices it inhabits.</p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer Call to Action - Full width */}
      <section className="mt-24 md:mt-40 px-6 md:px-8 py-32 md:py-48 bg-[#121214] text-white flex flex-col items-center text-center relative overflow-hidden">
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

        <div className="mt-12 md:mt-20 group relative z-10">
          <a href="mailto:chris@christhomas.co" className="text-xl md:text-4xl border-b border-white/10 pb-3 md:pb-4 group-hover:border-brand transition-all duration-700 font-serif italic text-white/60 hover:text-white">
            chris@christhomas.co
          </a>
        </div>

        <motion.div
          className="mt-20 md:mt-32 flex flex-col md:flex-row gap-8 md:gap-12 text-xs uppercase tracking-[0.5em] opacity-30 font-bold"
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
