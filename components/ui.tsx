import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DURATION, HOVER_LIFT, TAP, VIEWPORT, fadeUp, stagger, transition } from './motion';

// Shared building blocks so every page uses the same layout, type, surfaces and motion

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

type Children = { children?: React.ReactNode; className?: string };

export const EMAIL = 'chris@christhomas.co';

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const Container: React.FC<Children> = ({ children, className }) => (
  <div className={cx('mx-auto w-full max-w-screen-xl px-6 md:px-12', className)}>{children}</div>
);

// Standard vertical rhythm between sections
export const SECTION_SPACING = 'mt-28 md:mt-48';

export const Section: React.FC<Children & { id?: string }> = ({ children, className, id }) => (
  <section id={id} className={cx(SECTION_SPACING, className)}>
    {children}
  </section>
);

// Top padding for the first block on every page (clears the fixed nav)
export const PAGE_TOP = 'pt-36 md:pt-56';

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

// Fades content up once as it scrolls into view
export const Reveal: React.FC<Children & { delay?: number }> = ({ children, className, delay = 0 }) => (
  <motion.div className={className} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp} custom={delay}>
    {children}
  </motion.div>
);

// Staggers its RevealItem children as the group scrolls into view
export const RevealGroup: React.FC<Children & { staggerBy?: number }> = ({ children, className, staggerBy = 0.08 }) => (
  <motion.div className={className} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={stagger(staggerBy)}>
    {children}
  </motion.div>
);

export const RevealItem: React.FC<Children> = ({ children, className }) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);

// Page-load entrance for hero content (not scroll-triggered)
export const Intro: React.FC<Children & { delay?: number }> = ({ children, className, delay = 0.15 }) => (
  <motion.div className={className} initial="hidden" animate="visible" variants={stagger(0.12, delay)}>
    {children}
  </motion.div>
);

// ---------------------------------------------------------------------------
// Type
// ---------------------------------------------------------------------------

type Tone = 'brand' | 'muted' | 'light';
const toneClass: Record<Tone, string> = {
  brand: 'text-brand',
  muted: 'text-ink-subtle',
  light: 'text-white/60',
};

// Small uppercase label above a section or field
export const Eyebrow: React.FC<Children & { tone?: Tone; rule?: boolean; as?: 'p' | 'h2' | 'h3' | 'span' }> = ({
  children,
  className,
  tone = 'brand',
  rule = false,
  as: Tag = 'p',
}) => (
  <Tag className={cx('flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em]', toneClass[tone], className)}>
    {rule && <span className="w-8 h-px bg-current shrink-0" />}
    {children}
  </Tag>
);

// Orange italic emphasis used at the end of headings
export const Accent: React.FC<Children> = ({ children }) => <span className="text-brand italic font-serif">{children}</span>;

export const H2: React.FC<Children> = ({ children, className }) => (
  <h2 className={cx('font-serif text-4xl md:text-6xl tracking-tighter leading-[1.05]', className)}>{children}</h2>
);

export const H3: React.FC<Children> = ({ children, className }) => (
  <h3 className={cx('font-serif text-2xl md:text-3xl tracking-tight leading-snug', className)}>{children}</h3>
);

export const Lead: React.FC<Children> = ({ children, className }) => (
  <p className={cx('text-lg md:text-2xl font-light leading-relaxed text-ink-muted', className)}>{children}</p>
);

export const Body: React.FC<Children> = ({ children, className }) => (
  <p className={cx('text-base md:text-lg leading-relaxed text-ink-muted', className)}>{children}</p>
);

// Eyebrow + heading + lead, the standard opening for a section
export const SectionIntro: React.FC<{
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}> = ({ eyebrow, title, lead, align = 'left', className }) => {
  const centered = align === 'center';
  return (
    <Reveal className={cx('mb-12 md:mb-20', centered && 'text-center', className)}>
      {eyebrow && (
        <Eyebrow rule={!centered} className={cx('mb-6 md:mb-8', centered && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      )}
      {title && <H2 className={cx(centered && 'mx-auto max-w-4xl')}>{title}</H2>}
      {lead && <Lead className={cx('mt-6 md:mt-8 max-w-3xl', centered && 'mx-auto')}>{lead}</Lead>}
    </Reveal>
  );
};

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

const cardSurface =
  'rounded-3xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-28px_rgba(0,0,0,0.2)]';

// Light content card; animates as part of a RevealGroup
export const Card: React.FC<Children & { hover?: boolean }> = ({ children, className, hover = true }) => (
  <motion.div variants={fadeUp} whileHover={hover ? HOVER_LIFT : undefined} className={cx(cardSurface, 'p-6 md:p-8', className)}>
    {children}
  </motion.div>
);

export const CardIcon: React.FC<Children> = ({ children, className }) => (
  <div className={cx('mb-6 text-brand [&>svg]:w-7 [&>svg]:h-7', className)}>{children}</div>
);

export const CardTitle: React.FC<Children> = ({ children, className }) => (
  <h3 className={cx('font-serif text-xl md:text-2xl tracking-tight leading-snug', className)}>{children}</h3>
);

export const CardText: React.FC<Children> = ({ children, className }) => (
  <p className={cx('mt-3 text-base leading-relaxed text-ink-muted', className)}>{children}</p>
);

// Large feature panel that holds a diagram
type PanelVariant = 'light' | 'dark' | 'water';
const panelClass: Record<PanelVariant, string> = {
  light: 'bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_80px_-48px_rgba(0,0,0,0.25)]',
  dark: 'bg-night text-white',
  water: 'bg-gradient-to-b from-[#0a1628] to-[#0d2847] text-white',
};

export const Panel: React.FC<Children & { variant?: PanelVariant }> = ({ children, className, variant = 'light' }) => (
  <Reveal className={cx('relative overflow-hidden rounded-[2rem] md:rounded-[3rem] px-6 py-16 md:px-16 md:py-24', panelClass[variant], className)}>
    {children}
  </Reveal>
);

// Smaller tile inside a panel
export const Tile: React.FC<Children & { dark?: boolean }> = ({ children, className, dark = false }) => (
  <div className={cx('rounded-2xl border p-6 md:p-8', dark ? 'border-white/10 bg-white/5' : 'border-black/[0.06] bg-paper', className)}>
    {children}
  </div>
);

// Rounded frame for images and video, with an optional caption
export const MediaFrame: React.FC<Children & { caption?: React.ReactNode; frameClassName?: string; onClick?: React.MouseEventHandler<HTMLDivElement> }> = ({
  children,
  className,
  caption,
  frameClassName,
  onClick,
}) => (
  <motion.figure className={className} variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
    <div className={cx('relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-black/5', frameClassName)} onClick={onClick}>
      {children}
    </div>
    {caption && <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-ink-subtle">{caption}</figcaption>}
  </motion.figure>
);

export const Video: React.FC<{ src: string; loop?: boolean; className?: string }> = ({ src, loop = true, className }) => (
  <video src={src} className={cx('w-full h-full object-cover', className)} autoPlay loop={loop} muted playsInline />
);

// ---------------------------------------------------------------------------
// Buttons
// ---------------------------------------------------------------------------

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

type ButtonIcon = 'arrow' | 'down' | 'up';
const iconPath: Record<ButtonIcon, string> = {
  arrow: 'M5 12h14M12 5l7 7-7 7',
  down: 'M6 9l6 6 6-6',
  up: 'M18 15l-6-6-6 6',
};

export const PillButton: React.FC<{
  children: React.ReactNode;
  icon?: ButtonIcon;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
}> = ({ children, icon = 'arrow', to, href, onClick, className, ariaExpanded, ariaControls }) => {
  const classes = cx(
    'inline-flex items-center gap-4 rounded-full bg-brand pl-6 md:pl-7 pr-2 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_16px_40px_-16px_rgba(255,92,52,0.8)]',
    focusRing
  );
  const content = (
    <>
      {children}
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={iconPath[icon]} />
        </svg>
      </span>
    </>
  );

  return (
    <motion.span className={cx('inline-block rounded-full', className)} whileHover={{ y: -2, transition: transition(DURATION.fast) }} whileTap={TAP}>
      {to ? (
        <Link to={to} className={classes}>{content}</Link>
      ) : href ? (
        <a href={href} className={classes}>{content}</a>
      ) : (
        <button type="button" onClick={onClick} className={classes} aria-expanded={ariaExpanded} aria-controls={ariaControls}>
          {content}
        </button>
      )}
    </motion.span>
  );
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

// Dark contact footer that closes every page
export const ContactFooter: React.FC<{ className?: string }> = ({ className }) => (
  <footer className={cx(SECTION_SPACING, 'relative overflow-hidden bg-night text-white py-32 md:py-48', className)}>
    <motion.div
      aria-hidden="true"
      className="absolute -top-64 -right-64 w-[40rem] h-[40rem] bg-brand/10 blur-[180px] rounded-full"
      animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <Container className="relative flex flex-col items-center text-center">
      <Reveal>
        <p className="font-serif text-4xl md:text-7xl tracking-tighter leading-[0.95]">
          Let's build what's <Accent>next.</Accent>
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 md:mt-16">
        <a
          href={`mailto:${EMAIL}`}
          className={cx('font-serif italic text-2xl md:text-4xl text-white/70 hover:text-white border-b border-white/15 hover:border-brand pb-2 transition-colors duration-500 rounded-sm', focusRing)}
        >
          {EMAIL}
        </a>
      </Reveal>
      <Reveal delay={0.2} className="mt-20 md:mt-28">
        <p className="flex flex-col md:flex-row gap-4 md:gap-10 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
          <span>Brisbane, Australia</span>
          <span className="hidden md:block" aria-hidden="true">/</span>
          <span>Global Relocation Ready</span>
          <span className="hidden md:block" aria-hidden="true">/</span>
          <span>© 2026</span>
        </p>
      </Reveal>
    </Container>
  </footer>
);

