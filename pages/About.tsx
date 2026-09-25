import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION, fadeUp, transition } from '../components/motion';
import {
  Accent,
  Card,
  CardIcon,
  CardText,
  CardTitle,
  ContactFooter,
  Container,
  Eyebrow,
  Intro,
  Lead,
  PAGE_TOP,
  PillButton,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
} from '../components/ui';

const VISA_POINTS = [
  { icon: 'check-circle', title: 'No lottery', desc: '10,500 annual quota never reached' },
  { icon: 'refresh', title: 'Renewable indefinitely', desc: 'Two-year increments' },
  { icon: 'users', title: 'Spousal work rights', desc: 'Partner can work unrestricted' },
  { icon: 'zap', title: 'Fast & streamlined', desc: 'Quicker than H-1B process' },
];

const VisaIcon: React.FC<{ name: string }> = ({ name }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'check-circle' && (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>
    )}
    {name === 'refresh' && (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    )}
    {name === 'users' && (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    )}
    {name === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
  </svg>
);

const PRINCIPLES = [
  { title: 'Clarity is the highest form of craft.', text: "Minimalism eliminates cognitive friction. If it's confusing, it's not finished." },
  { title: 'Reveal power progressively.', text: 'Great tools scale with expertise. We design for the expert user while welcoming the novice with warmth.' },
  { title: 'Details are comprehension.', text: 'The nuance of motion and typography signals causality and hierarchy to the mind.' },
];

const FOCUS_AREAS = [
  {
    title: 'Clarity in Complex Systems',
    text: 'Designing products that synthesize dense information into confident action.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Intelligence Made Perceptible',
    text: 'Shaping AI-driven experiences that feel assistive rather than opaque.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    title: 'Behavioral Design',
    text: 'Creating interactions that quietly shift how people operate in the world.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: 'Platform-Native Craft',
    text: 'Building software that feels deeply at home on the devices it inhabits.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];

export const About: React.FC = () => {
  const [isVisaOpen, setIsVisaOpen] = useState(false);

  return (
    <main className="min-h-screen bg-paper">
      <Container className={PAGE_TOP}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <Intro className="md:col-span-8">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-serif leading-[1.05] tracking-tighter">
              I design intelligent systems that make complex domains feel <Accent>clear, calm, and naturally understood.</Accent>
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-12 md:mt-16">
              <Lead>
                Across AI-native tools, global commerce platforms, spatial interfaces, and predictive service ecosystems, my work focuses on reducing cognitive burden while revealing powerful capability progressively.
              </Lead>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 md:mt-12">
              <PillButton to="/resume">View Full Resume</PillButton>
            </motion.div>

            {/* E-3 Visa Card */}
            <motion.div variants={fadeUp} className="mt-10 md:mt-12 rounded-3xl bg-brand text-white overflow-hidden shadow-[0_20px_60px_-24px_rgba(255,92,52,0.6)]">
              <button
                type="button"
                onClick={() => setIsVisaOpen(!isVisaOpen)}
                aria-expanded={isVisaOpen}
                aria-controls="visa-details"
                className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white rounded-3xl"
              >
                <span className="flex items-center gap-4">
                  <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-base font-bold tracking-wide">U.S. Work Authorization</span>
                    <span className="block text-sm text-white/80">E-3 Visa — No H-1B Required</span>
                  </span>
                </span>
                <motion.span
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"
                  animate={{ rotate: isVisaOpen ? 180 : 0 }}
                  transition={transition(DURATION.fast)}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isVisaOpen && (
                  <motion.div
                    id="visa-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={transition(0.5)}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-6 md:pb-8 space-y-6">
                      <div className="h-px bg-white/20" />
                      <p className="text-base text-white/90 leading-relaxed">
                        As an Australian citizen, I'm eligible for the E-3 visa — a U.S. work visa exclusively available to Australians. No H-1B sponsorship required.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {VISA_POINTS.map((item) => (
                          <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white/10">
                            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                              <VisaIcon name={item.icon} />
                            </span>
                            <span>
                              <span className="block text-sm font-bold">{item.title}</span>
                              <span className="block text-sm text-white/80">{item.desc}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="p-4 rounded-2xl bg-white/10 text-sm text-white/90 leading-relaxed">
                        <span className="font-bold text-white">For employers:</span> Hiring under E-3 is straightforward — no lottery uncertainty, faster onboarding, and reduced administrative complexity compared to H-1B.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Intro>

          <Intro className="md:col-span-4 flex flex-col gap-16 md:gap-20 md:pt-4" delay={0.4}>
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-6 md:mb-8">Expertise</Eyebrow>
              <ul className="text-xl md:text-2xl space-y-3 md:space-y-4 font-serif">
                {['Product Design', 'AI-Native Systems', 'Design Systems', 'Design Engineering', 'Apple Ecosystem'].map((item) => (
                  <li key={item} className={item === 'AI-Native Systems' ? 'text-brand italic' : undefined}>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Eyebrow className="mb-6 md:mb-8">Recognition</Eyebrow>
              <ul className="text-base md:text-lg space-y-3 md:space-y-4 text-ink-muted">
                <li>FIA Excellence in Franchise Innovation</li>
                <li>IDC Digital Transformation Award</li>
                <li>Apple Park Presenter</li>
                <li>Telstra Vantage Speaker</li>
              </ul>
            </motion.div>
          </Intro>
        </div>

        {/* Design Perspective */}
        <Section className="border-t border-black/10 pt-16 md:pt-24">
          <Reveal className="max-w-4xl">
            <p className="text-3xl md:text-5xl font-serif leading-[1.2] tracking-tight">
              I'm most energized by problems where technology risks <Accent>overwhelming the people it serves.</Accent>
            </p>
            <Lead className="mt-8 md:mt-10">
              My work focuses on restoring legibility, ensuring powerful systems feel navigable, intelligence feels supportive, and complexity resolves into clarity.
            </Lead>
            <p className="mt-6 text-lg md:text-xl font-serif italic text-ink-subtle">
              I believe the highest form of craft is quiet: experiences that feel so natural they disappear into use.
            </p>
          </Reveal>
        </Section>

        {/* Core Principles */}
        <Section>
          <Reveal>
            <Eyebrow rule className="mb-12 md:mb-16">Core Principles</Eyebrow>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {PRINCIPLES.map((principle, i) => (
              <RevealItem key={principle.title}>
                <span className="block text-5xl md:text-6xl font-serif text-brand">0{i + 1}</span>
                <h3 className="mt-6 md:mt-8 text-2xl md:text-3xl font-serif leading-tight tracking-tight">{principle.title}</h3>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-ink-muted">{principle.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Areas of Focus */}
        <Section>
          <Reveal>
            <Eyebrow rule className="mb-12 md:mb-16">Areas of Focus</Eyebrow>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {FOCUS_AREAS.map((area) => (
              <Card key={area.title}>
                <CardIcon>{area.icon}</CardIcon>
                <CardTitle>{area.title}</CardTitle>
                <CardText>{area.text}</CardText>
              </Card>
            ))}
          </RevealGroup>
        </Section>
      </Container>

      <ContactFooter />
    </main>
  );
};

