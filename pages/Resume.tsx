
import React from 'react';
import { motion } from 'framer-motion';

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

// Custom easing matching site-wide pattern
const easeOutExpo = [0.33, 1, 0.68, 1];

// Stagger animation variants for expertise cards - clean entrance, no re-triggers
const expertiseContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0
    }
  }
};

const expertiseCardVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo
    }
  }
};

// Experience section stagger variants
const experienceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const experienceItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo }
  }
};

export const Resume: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-32 md:pt-48 pb-32 md:pb-64 px-6 md:px-8 max-w-screen-lg mx-auto selection:bg-brand selection:text-white">
      {/* Header */}
      <motion.header 
        className="border-b border-black/10 pb-16 md:pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-[0.85] mb-6">
              Christopher <br /> <span className="text-brand">Thomas</span>
            </h1>
            <p className="text-lg md:text-xl opacity-60 uppercase tracking-[0.3em] font-medium">
              Product Designer, AI-Driven Experiences
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm tracking-widest opacity-40 uppercase">Based in Brisbane, Australia</p>
            <a href="mailto:chris@christhomas.co" className="block text-lg hover:text-brand transition-colors font-serif italic underline decoration-black/10 underline-offset-8">chris@christhomas.co</a>
            <p className="text-lg font-serif italic">+61 421 507 365</p>
          </div>
        </div>
      </motion.header>

      {/* Summary */}
      <motion.section
        className="mt-16 md:mt-24 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
      >
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold mb-8">Executive Summary</h2>
        <p className="text-xl md:text-3xl font-light leading-relaxed opacity-80">
          Product designer with 15+ years crafting elegant, high-impact consumer software used by millions globally. Proven record shipping category-defining digital products across mobile, web, voice, AR, and AI, including platforms responsible for over <span className="font-serif italic">$1B in revenue growth.</span>
        </p>
      </motion.section>

      {/* Core Expertise */}
      <motion.section
        className="mt-24 md:mt-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.h2
          className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold mb-12 md:mb-16"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } }
          }}
        >
          Core Expertise
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={expertiseContainerVariants}
        >
          {EXPERTISE_DATA.map((expertise) => {
            const Icon = expertise.icon;
            return (
              <motion.div
                key={expertise.title}
                variants={expertiseCardVariants}
                className="group p-6 md:p-8 rounded-2xl border bg-white border-black/5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                {/* Icon */}
                <div className="mb-6 text-brand group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl mb-4 text-[#1d1d1f] group-hover:text-brand transition-colors duration-300">
                  {expertise.title}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {expertise.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-black/5 text-black/60 group-hover:bg-brand/10 group-hover:text-brand transition-all duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-4"
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 1, delay: 0.3, ease: easeOutExpo } }
          }}
          style={{ originX: 0 }}
        >
          <div className="h-[1px] flex-grow bg-gradient-to-r from-brand/40 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold whitespace-nowrap">15+ Years of Craft</span>
        </motion.div>
      </motion.section>

      {/* Experience */}
      <section className="mt-20 md:mt-24">
        <motion.h2
          className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Professional Experience
        </motion.h2>

        <motion.div
          className="space-y-32"
          variants={experienceContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Poolwerx */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
            variants={experienceItemVariants}
          >
            <div className="md:col-span-3 opacity-40 font-mono text-sm">2024 to Present</div>
            <div className="md:col-span-9 space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-serif">Poolwerx</h3>
                <p className="text-lg opacity-60">Head of Innovation & Global User Experience</p>
              </div>
              <ul className="space-y-6 text-lg font-light opacity-80 list-none border-l border-brand/20 pl-8">
                <li>Designed and launched <span className="text-brand font-medium">Poolchex</span>, an AI-powered mobile experience translating complex water chemistry into conversational guidance.</li>
                <li>Created the end-to-end experience for Healthy Pool Plan, transforming a reactive service model into a proactive subscription product.</li>
                <li>Architected a unified ecosystem spanning consumer apps, technician tools, and connected hardware sensors.</li>
                <li>Introduced a modern design systems approach elevating interaction consistency and visual quality globally.</li>
              </ul>
            </div>
          </motion.div>

          {/* Domino's Head */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
            variants={experienceItemVariants}
          >
            <div className="md:col-span-3 opacity-40 font-mono text-sm">2018 to 2024</div>
            <div className="md:col-span-9 space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-serif">Domino's Pizza Enterprises</h3>
                <p className="text-lg opacity-60">Head of User Experience</p>
              </div>
              <ul className="space-y-6 text-lg font-light opacity-80 list-none border-l border-brand/20 pl-8">
                <li>Directed global product design across a multi-market ecosystem contributing to <span className="font-medium">$1.2B+ in digital revenue growth.</span></li>
                <li>Led design of the business crucial next-generation Domino’s app and web platform.</li>
                <li>Standardized design language across 10 global markets, dramatically improving usability and conversion at planetary scale.</li>
                <li>Created the award-winning <span className="font-medium italic">New Pizza Chef with AR™</span>, redefining interactive food customization.</li>
                <li>Designed and launched the <span className="font-medium italic">OneStore™ platform</span>, digitizing store operations through intuitive interfaces.</li>
                <li>Partnered with <span className="font-medium">Apple, Amazon, and Google</span> to deliver voice ordering and next-generation interaction models.</li>
              </ul>
            </div>
          </motion.div>

          {/* Domino's Lead */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 opacity-70"
            variants={experienceItemVariants}
          >
            <div className="md:col-span-3 opacity-40 font-mono text-sm">2016 to 2018</div>
            <div className="md:col-span-9 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif">Domino's Pizza Enterprises</h3>
                <p className="opacity-60">Lead User Experience Designer</p>
              </div>
              <p className="text-lg font-light italic">Elevated App Store ratings from 1.5 → 4.5 stars through systematic UX redesign and implemented experimentation frameworks.</p>
            </div>
          </motion.div>

          {/* Thomas Trieb */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 opacity-50"
            variants={experienceItemVariants}
          >
            <div className="md:col-span-3 opacity-40 font-mono text-sm">2013 to 2016</div>
            <div className="md:col-span-9 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif">Thomas Trieb</h3>
                <p className="opacity-60">Head of Design (Brand & Digital)</p>
              </div>
              <p className="text-lg font-light">Directed design for mobile and web products spanning retail and promotional ecosystems.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Speaking & Thought Leadership */}
      <motion.section
        className="mt-40 pt-24 border-t border-black/5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      >
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold mb-12">Speaking & Thought Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {[
            { venue: 'Apple Park, 2022', topic: 'Invited to Present on Digital Innovation' },
            { venue: 'Telstra Vantage 2022', topic: 'Main Stage Panel: Value of Great User Experience' },
            { venue: 'Telstra Vantage 2022', topic: 'Invitation-Only Panel: Apple Experience with Telstra Purple' },
            { venue: 'Meta, 2022', topic: 'High-level Metaverse Integration Briefing' },
            { venue: 'Microsoft, 2022', topic: 'Partnership Guidance: Digital Innovation Roadmapping' },
            { venue: 'IDC DX Awards, 2019', topic: 'Panel Discussion & Presentation' },
            { venue: 'Immerse™ Australia AR/VR Meetup, 2020', topic: 'What Makes Great AR Experiences?' },
            { venue: 'The Smith Family, 2020–24', topic: 'Youth Mentor: Teaching Design Thinking' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: easeOutExpo }}
            >
              <span className="text-sm font-medium text-brand">{item.venue}</span>
              <span className="text-lg font-light opacity-70 group-hover:opacity-100 transition-opacity">{item.topic}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recognition & Education */}
      <motion.section
        className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-24 pt-24 border-t border-black/5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      >
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
        >
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold">Recognition</h2>
          <ul className="space-y-6 font-serif text-2xl italic">
            <li>IDX Innovation Award: AR Product Design</li>
            <li>Telstra Vantage: UX Thought Leadership</li>
          </ul>
        </motion.div>
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
        >
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-brand font-bold">Education</h2>
          <div className="space-y-2">
            <p className="text-2xl font-serif">B. Design (Honours)</p>
            <p className="opacity-60">Queensland University of Technology</p>
            <p className="text-xs uppercase tracking-widest text-brand font-bold mt-2">Dean's Award for Academic Excellence</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="mt-48 pt-24 border-t border-black/5 flex flex-col items-center opacity-30 uppercase tracking-[0.5em] text-[10px] font-bold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeOutExpo }}
      >
        <span>Christopher Thomas / 2026</span>
      </motion.footer>
    </main>
  );
};
