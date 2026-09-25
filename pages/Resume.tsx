
import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../components/motion';
import {
  Accent,
  Card,
  CardTitle,
  ContactFooter,
  Container,
  Eyebrow,
  Intro,
  PAGE_TOP,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
} from '../components/ui';

// Custom icons for expertise categories
const IconProductDesign = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const IconPlatforms = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 7h.01" />
    <path d="M10 7h.01" />
  </svg>
);

const IconAI = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
    <path d="M12 12v10" />
    <path d="M8 18h8" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <path d="M6 8a6 6 0 0 0 0 8" />
    <path d="M18 8a6 6 0 0 1 0 8" />
  </svg>
);

const IconTools = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IconApple = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const IconMethods = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M16 16l2 2" />
  </svg>
);

const IconLeadership = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Expertise data structure
const EXPERTISE_DATA = [
  {
    icon: IconProductDesign,
    title: 'Product Design',
    items: ['Interaction', 'Visual Design', 'Design Systems', 'Information Architecture', 'Prototyping']
  },
  {
    icon: IconPlatforms,
    title: 'Platforms',
    items: ['iOS', 'macOS', 'Web', 'Voice', 'AI Interfaces', 'Connected Hardware']
  },
  {
    icon: IconAI,
    title: 'AI Product Design',
    items: ['Conversational UI', 'Intelligence-informed UX', 'Emerging Interaction Models']
  },
  {
    icon: IconTools,
    title: 'Tools',
    items: ['Sketch', 'Figma', 'Principle', 'ProtoPie', 'Framer', 'Adobe Creative Cloud']
  },
  {
    icon: IconApple,
    title: 'Apple Ecosystem',
    items: ['Keynote', 'Pages', 'Numbers', 'Final Cut Pro X', 'GarageBand', 'iMovie', 'Pixelmator Pro', 'Photomator']
  },
  {
    icon: IconMethods,
    title: 'Methods',
    items: ['User Research', 'Experimentation', 'Usability Testing', 'Data-informed Design']
  },
  {
    icon: IconLeadership,
    title: 'Leadership',
    items: ['Cross-functional Alignment', 'Executive Communication', 'Critique Culture']
  }
];

const EXPERIENCE = [
  {
    dates: '2024 – Present',
    company: 'Poolwerx',
    role: 'Global Head of Client Experience & Innovation',
    points: [
      <>Designed and launched <span className="text-brand font-medium">Poolchex</span>, an AI-powered mobile experience translating complex water chemistry into conversational guidance.</>,
      <>Created the end-to-end experience for Healthy Pool Plan, transforming a reactive service model into a proactive subscription product.</>,
      <>Architected a unified ecosystem spanning consumer apps, technician tools, and connected hardware sensors.</>,
      <>Introduced a modern design systems approach elevating interaction consistency and visual quality globally.</>,
    ],
  },
  {
    dates: '2018 – 2024',
    company: "Domino's Pizza Enterprises",
    role: 'Head of User Experience',
    points: [
      <>Directed global product design across a multi-market ecosystem contributing to <span className="font-medium text-ink">$1.2B+ in digital revenue growth.</span></>,
      <>Led design of the business crucial next-generation Domino’s app and web platform.</>,
      <>Standardized design language across 10 global markets, dramatically improving usability and conversion at planetary scale.</>,
      <>Created the award-winning <span className="font-medium italic text-ink">New Pizza Chef with AR™</span>, redefining interactive food customization.</>,
      <>Designed and launched the <span className="font-medium italic text-ink">OneStore™ platform</span>, digitizing store operations through intuitive interfaces.</>,
      <>Partnered with <span className="font-medium text-ink">Apple, Amazon, and Google</span> to deliver voice ordering and next-generation interaction models.</>,
    ],
  },
  {
    dates: '2016 – 2018',
    company: "Domino's Pizza Enterprises",
    role: 'Lead User Experience Designer',
    points: [<>Elevated App Store ratings from 1.5 → 4.5 stars through systematic UX redesign and implemented experimentation frameworks.</>],
  },
  {
    dates: '2013 – 2016',
    company: 'Thomas Trieb',
    role: 'Head of Design (Brand & Digital)',
    points: [<>Directed design for mobile and web products spanning retail and promotional ecosystems.</>],
  },
];

const SPEAKING = [
  { venue: 'Apple Park, 2022', topic: 'Invited to Present on Digital Innovation' },
  { venue: 'Telstra Vantage 2022', topic: 'Main Stage Panel: Value of Great User Experience' },
  { venue: 'Telstra Vantage 2022', topic: 'Invitation-Only Panel: Apple Experience with Telstra Purple' },
  { venue: 'Meta, 2022', topic: 'High-level Metaverse Integration Briefing' },
  { venue: 'Microsoft, 2022', topic: 'Partnership Guidance: Digital Innovation Roadmapping' },
  { venue: 'IDC DX Awards, 2019', topic: 'Panel Discussion & Presentation' },
  { venue: 'Immerse™ Australia AR/VR Meetup, 2020', topic: 'What Makes Great AR Experiences?' },
  { venue: 'The Smith Family, 2020–24', topic: 'Youth Mentor: Teaching Design Thinking' },
];

export const Resume: React.FC = () => {
  return (
    <main className="min-h-screen bg-paper">
      <Container className={PAGE_TOP}>
        {/* Header */}
        <Intro className="border-b border-black/10 pb-16 md:pb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div variants={fadeUp}>
            <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-[0.9]">
              Christopher <br /> <span className="text-brand">Thomas</span>
            </h1>
            <Eyebrow tone="muted" className="mt-8">Product Designer, AI-Driven Experiences</Eyebrow>
          </motion.div>
          <motion.div variants={fadeUp} className="md:text-right space-y-2">
            <Eyebrow tone="muted" className="md:justify-end">Based in Brisbane, Australia</Eyebrow>
            <a
              href="mailto:chris@christhomas.co"
              className="block text-lg font-serif italic hover:text-brand transition-colors duration-300 underline decoration-black/15 underline-offset-8"
            >
              chris@christhomas.co
            </a>
            <p className="text-lg font-serif italic">+61 421 507 365</p>
          </motion.div>
        </Intro>

        {/* Summary */}
        <Intro className="mt-16 md:mt-24 max-w-3xl" delay={0.4}>
          <motion.div variants={fadeUp}>
            <Eyebrow rule className="mb-8">Executive Summary</Eyebrow>
            <p className="text-xl md:text-3xl font-light leading-relaxed text-ink-muted">
              Product designer with 15+ years crafting elegant, high-impact consumer software used by millions globally. Proven record shipping category-defining digital products across mobile, web, voice, AR, and AI, including platforms responsible for over <Accent>$1B in revenue growth.</Accent>
            </p>
          </motion.div>
        </Intro>

        {/* Core Expertise */}
        <Section>
          <Reveal>
            <Eyebrow rule className="mb-12 md:mb-16">Core Expertise</Eyebrow>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {EXPERTISE_DATA.map((expertise) => {
              const Icon = expertise.icon;
              return (
                <Card key={expertise.title}>
                  <div className="mb-6 text-brand">
                    <Icon />
                  </div>
                  <CardTitle className="mb-5">{expertise.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {expertise.items.map((item) => (
                      <span key={item} className="text-sm px-3 py-1.5 rounded-full bg-black/[0.04] text-ink-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </RevealGroup>
        </Section>

        {/* Experience */}
        <Section>
          <Reveal>
            <Eyebrow rule className="mb-12 md:mb-20">Professional Experience</Eyebrow>
          </Reveal>
          <div className="space-y-20 md:space-y-28">
            {EXPERIENCE.map((job) => (
              <Reveal key={`${job.company}-${job.dates}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <p className="md:col-span-3 pt-2 text-sm font-bold uppercase tracking-[0.2em] text-ink-subtle tabular-nums">{job.dates}</p>
                <div className="md:col-span-9">
                  <h3 className="text-3xl md:text-4xl font-serif tracking-tight">{job.company}</h3>
                  <p className="mt-2 text-lg text-ink-muted">{job.role}</p>
                  <ul className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-ink-muted border-l border-brand/30 pl-6 md:pl-8">
                    {job.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Speaking & Thought Leadership */}
        <Section className="pt-16 md:pt-24 border-t border-black/10">
          <Reveal>
            <Eyebrow rule className="mb-12">Speaking & Thought Leadership</Eyebrow>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8" staggerBy={0.05}>
            {SPEAKING.map((item, i) => (
              <RevealItem key={i}>
                <p className="text-sm font-bold text-brand">{item.venue}</p>
                <p className="mt-1 text-lg text-ink-muted">{item.topic}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Recognition & Education */}
        <Section className="pt-16 md:pt-24 border-t border-black/10">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <RevealItem>
              <Eyebrow rule className="mb-10">Recognition</Eyebrow>
              <ul className="space-y-6 font-serif text-2xl leading-snug">
                <li>FIA Excellence in Franchise Innovation 2026: Healthy Pool Plan</li>
                <li>IDC Innovation Award: AR Product Design</li>
                <li>Telstra Vantage: UX Thought Leadership</li>
              </ul>
            </RevealItem>
            <RevealItem>
              <Eyebrow rule className="mb-10">Education</Eyebrow>
              <p className="text-2xl font-serif">B. Design (Honours)</p>
              <p className="mt-2 text-lg text-ink-muted">Queensland University of Technology</p>
              <Eyebrow className="mt-4">Dean's Award for Academic Excellence</Eyebrow>
            </RevealItem>
          </RevealGroup>
        </Section>
      </Container>

      <ContactFooter />
    </main>
  );
};
