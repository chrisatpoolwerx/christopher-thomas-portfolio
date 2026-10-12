import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, transition } from '../motion';
import { ScrollStory, StoryStep } from '../ScrollStory';
import { cx } from '../ui';

// Healthy Pool Plan build phases, told as a pinned scroll story. One architecture board
// evolves: a cross-platform layer ships, field testing flags where it falls short, the
// technician app goes native without touching the system, and each surface settles on
// the platform that suits it.

const STEPS: StoryStep[] = [
  {
    title: 'Ship fast',
    body: 'A Flutter-based mobile and web layer. Real users, real data, rapid iteration across technician tools and dashboards.',
  },
  {
    title: 'Observe patterns',
    body: 'Field testing revealed where cross-platform fell short. Technicians working in full sun with poor connectivity exposed offline reliability, background uploads and memory on constrained devices.',
  },
  {
    title: 'Go native',
    body: 'Migrated to SwiftUI and Kotlin with evidence in hand. Because the architecture assumed specialization, the presentation layer was swapped without touching the system.',
  },
  {
    title: 'Every surface in its place',
    body: 'Native mobile for field reliability. React web for operational dashboards. Edge functions for intelligence. Thin clients, thick edge: business logic and AI orchestration live server-side.',
  },
];

const STEP_LABELS = ['Ship Fast', 'Observe', 'Go Native', 'Surfaces'];

const HEADER = ['Phase 1 · Cross-platform', 'Phase 2 · Field testing', 'Phase 3 · Native', 'Today · Platform-appropriate'];

const TECHNICIAN_TECH = ['Flutter', 'Flutter', 'SwiftUI · Kotlin', 'SwiftUI · Kotlin'];
const DASHBOARD_TECH = ['Flutter web', 'Flutter web', 'Flutter web', 'React web'];

const FIELD_ISSUES = [
  { problem: 'Offline reliability', fix: 'Offline-first' },
  { problem: 'Background uploads', fix: 'Upload queue' },
  { problem: 'Memory limits', fix: 'Memory managed' },
];

const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const PhoneIcon = () => (
  <Icon>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </Icon>
);
const DashboardIcon = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Icon>
);
const ServerIcon = () => (
  <Icon>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </Icon>
);
const DocumentIcon = () => (
  <Icon>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8M16 17H8" />
  </Icon>
);

// Technology tag that cross-fades when the platform changes
const TechTag: React.FC<{ label: string; highlight: boolean }> = ({ label, highlight }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={label}
      className={cx(
        'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
        highlight ? 'bg-brand text-white' : 'bg-white/10 text-white/75'
      )}
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.9 }}
      transition={transition(DURATION.base)}
    >
      {label}
    </motion.span>
  </AnimatePresence>
);

const Node: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  tag?: React.ReactNode;
  glow?: boolean;
  alert?: boolean;
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
  stackTag?: boolean;
}> = ({ icon, title, subtitle, tag, glow = false, alert = false, children, className, inline = false, stackTag = false }) => (
  <motion.div
    className={cx('relative rounded-2xl border', stackTag ? 'p-3' : 'p-4', className)}
    initial={false}
    animate={{
      borderColor: alert ? 'rgba(255,92,52,0.55)' : glow ? 'rgba(255,92,52,0.35)' : 'rgba(255,255,255,0.1)',
      backgroundColor: glow ? 'rgba(255,92,52,0.08)' : 'rgba(255,255,255,0.04)',
      boxShadow: glow ? '0 0 40px -12px rgba(255,92,52,0.55)' : '0 0 0px 0px rgba(255,92,52,0)',
    }}
    transition={transition(DURATION.base)}
  >
    {inline ? (
      /* Icon beside the text, for the full-width system and report rows */
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-brand shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm md:text-base font-medium text-white">{title}</p>
          <div className="mt-0.5 text-xs leading-snug text-white/60">{subtitle}</div>
        </div>
      </div>
    ) : (
      <>
        <div className="flex items-start justify-between gap-3">
          <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-brand shrink-0">{icon}</span>
          {!stackTag && tag}
        </div>
        <p className="mt-3 text-sm md:text-base font-medium text-white">{title}</p>
        <div className="mt-0.5 text-xs leading-snug text-white/60">{subtitle}</div>
        {/* On narrow boards the tag sits under the text so it never collides with the icon */}
        {stackTag && tag && <div className="mt-2.5">{tag}</div>}
      </>
    )}
    {children}
  </motion.div>
);

// Vertical data line with packets flowing down it; `broken` makes packets drop out mid-way
const Flow: React.FC<{ broken?: boolean; delay?: number }> = ({ broken = false, delay = 0 }) => (
  <div className={cx('relative w-[2px] h-full rounded-full transition-colors duration-700', broken ? 'bg-brand/40' : 'bg-white/15')}>
    {[0, 1].map((i) => (
      <motion.span
        key={`${broken}-${i}`}
        className={cx('absolute left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full', broken ? 'bg-brand' : 'bg-white')}
        initial={{ top: '0%', opacity: 0 }}
        animate={broken ? { top: ['0%', '45%', '45%'], opacity: [0, 1, 0] } : { top: ['0%', '100%'], opacity: [0, 1, 0] }}
        transition={{ duration: broken ? 1.4 : 1.6, repeat: Infinity, ease: 'easeInOut', delay: delay + i * 0.8 }}
      />
    ))}
  </div>
);

export const ArchitectureBoard: React.FC<{ step: number; compact?: boolean }> = ({ step, compact = false }) => {
  const observing = step === 1;
  const native = step >= 2;
  const settled = step >= 3;

  return (
    <div
      className={cx(
        'relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7 flex flex-col',
        compact ? 'w-full max-w-[360px] min-h-[540px]' : 'w-[min(520px,100%)] h-[min(620px,calc(100vh-180px))] min-h-[580px]'
      )}
      role="img"
      aria-label={`Healthy Pool Plan architecture: ${HEADER[step]}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={step}
            className="text-xs font-bold uppercase tracking-[0.2em] text-brand"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={transition(DURATION.fast)}
          >
            {HEADER[step]}
          </motion.span>
        </AnimatePresence>
        <span className="flex gap-1" aria-hidden="true">
          {STEP_LABELS.map((label, i) => (
            <motion.span
              key={label}
              className="h-1.5 rounded-full"
              initial={false}
              animate={{ width: i === step ? 16 : 8, backgroundColor: i <= step ? '#FF5C34' : 'rgba(255,255,255,0.25)' }}
              transition={transition(DURATION.base)}
            />
          ))}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Presentation layer */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Presentation</span>
          <AnimatePresence>
            {settled && (
              <motion.span
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition(DURATION.base)}
              >
                Thin clients
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-2 gap-3 items-stretch">
          <Node
            icon={<PhoneIcon />}
            title="Technician App"
            subtitle={observing ? 'Full sun · poor signal' : 'Poolside data capture'}
            tag={<TechTag label={TECHNICIAN_TECH[step]} highlight={native && !settled} />}
            alert={observing}
            stackTag={compact}
          >
            <AnimatePresence initial={false}>
              {step >= 1 && (
                <motion.ul
                  className="mt-3 space-y-1.5 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={transition(DURATION.base)}
                >
                  {FIELD_ISSUES.map((issue, i) => (
                    <motion.li
                      key={issue.problem}
                      className={cx('flex items-center gap-2 min-w-0 text-xs transition-colors duration-500', native ? 'text-green-300' : 'text-brand')}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={transition(DURATION.base, 0.15 + i * 0.1)}
                    >
                      <span
                        className={cx(
                          'w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500',
                          native ? 'bg-green-400/15' : 'bg-brand/15'
                        )}
                      >
                        {native ? (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span className="text-[10px] font-bold leading-none" aria-hidden="true">!</span>
                        )}
                      </span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          className="min-w-0 break-words"
                          key={native ? issue.fix : issue.problem}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={transition(DURATION.fast, native ? i * 0.12 : 0)}
                        >
                          {native ? issue.fix : issue.problem}
                        </motion.span>
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </Node>
          <Node
            icon={<DashboardIcon />}
            title="Store Dashboard"
            subtitle="Review, edit & generate reports"
            tag={<TechTag label={DASHBOARD_TECH[step]} highlight={settled} />}
            stackTag={compact}
          />
        </div>

        {/* Data flowing down to the system */}
        <div className="grid grid-cols-2 h-8 md:h-10" aria-hidden="true">
          <div className="flex justify-center">
            <Flow broken={observing} />
          </div>
          <div className="flex justify-center">
            <Flow delay={0.4} />
          </div>
        </div>

        {/* System layer */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">System</span>
          <AnimatePresence mode="wait">
            {native && (
              <motion.span
                key={settled ? 'edge' : 'unchanged'}
                className={cx(
                  'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em] border',
                  settled ? 'border-brand/50 text-brand' : 'border-green-400/40 text-green-300'
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={transition(DURATION.base, 0.3)}
              >
                {settled ? 'Thick edge' : 'Unchanged'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Node
          icon={<ServerIcon />}
          title="Service Backend"
          subtitle={
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={settled ? 'edge' : 'core'}
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition(DURATION.fast)}
              >
                {settled ? 'Edge functions · business logic · AI orchestration' : 'Business logic · LLM generation & document assembly'}
              </motion.span>
            </AnimatePresence>
          }
          glow={settled}
          inline
        />

        {/* Data flowing down to the report */}
        <div className="flex justify-center h-6 md:h-8" aria-hidden="true">
          <Flow delay={0.8} />
        </div>

        <Node icon={<DocumentIcon />} title="Customer Report" subtitle="Clarity and confidence delivered" inline />
      </div>
    </div>
  );
};

export const HealthyPoolPhasesStory: React.FC = () => (
  <ScrollStory steps={STEPS} stepLabels={STEP_LABELS} renderVisual={(step, mode) => <ArchitectureBoard step={step} compact={mode === 'inline'} />} />
);
