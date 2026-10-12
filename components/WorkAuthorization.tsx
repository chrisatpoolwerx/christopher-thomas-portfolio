import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, transition } from './motion';
import { cx } from './ui';

// U.S. work authorisation details, shared by the About page card and the Resume summary line

export const VISA_POINTS = [
  { icon: 'check-circle', title: 'No lottery', desc: '10,500 annual quota never reached' },
  { icon: 'refresh', title: 'Renewable indefinitely', desc: 'Two-year increments' },
  { icon: 'users', title: 'Spousal work rights', desc: 'Partner can work unrestricted' },
  { icon: 'zap', title: 'Fast & streamlined', desc: 'Quicker than H-1B process' },
];

export const VisaIcon: React.FC<{ name: string }> = ({ name }) => (
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

// Compact, recruiter-facing version for the Resume: a toggle stating the key fact, and a
// details panel the page can place wherever it fits its layout
export const WORK_AUTHORIZATION_DETAILS_ID = 'work-authorization-details';

export const WorkAuthorizationToggle: React.FC<{ open: boolean; onToggle: () => void; className?: string }> = ({ open, onToggle, className }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-expanded={open}
    aria-controls={WORK_AUTHORIZATION_DETAILS_ID}
    className={cx(
      'group inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl sm:rounded-full border bg-white p-2 sm:pl-2 sm:pr-4 sm:py-1.5 text-left text-sm text-ink transition-colors duration-300 hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
      open ? 'border-brand/40' : 'border-black/10',
      className
    )}
  >
    <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.15em] text-brand">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      U.S. Work Authorized
    </span>
    <span className="inline-flex items-center gap-2 px-1 sm:px-0 font-medium">
      E-3 visa · No H-1B sponsorship required
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-ink-subtle group-hover:text-brand transition-colors duration-300"
        animate={{ rotate: open ? 180 : 0 }}
        transition={transition(DURATION.fast)}
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </span>
  </button>
);

export const WorkAuthorizationDetails: React.FC<{ open: boolean; className?: string }> = ({ open, className }) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        id={WORK_AUTHORIZATION_DETAILS_ID}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={transition(0.5)}
        className={cx('overflow-hidden', className)}
      >
        <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <div className="md:col-span-4 space-y-4">
            <p className="text-base leading-relaxed text-ink-muted">
              As an Australian citizen, I'm eligible for the E-3 visa — a U.S. work visa exclusively available to Australians.
            </p>
            <p className="text-sm leading-relaxed text-ink-muted">
              <span className="font-bold text-ink">For employers:</span> no lottery uncertainty, faster onboarding, and reduced administrative complexity compared to H-1B.
            </p>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {VISA_POINTS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <VisaIcon name={item.icon} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{item.title}</span>
                  <span className="block text-sm text-ink-muted">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
