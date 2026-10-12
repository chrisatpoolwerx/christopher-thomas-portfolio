import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, LayoutGroup, animate, motion } from 'framer-motion';
import { DURATION, EASE, transition } from '../motion';
import { ScrollStory, StoryStep } from '../ScrollStory';
import { cx } from '../ui';

// Domino's journey compression, told as a pinned scroll story. The seven original ordering
// steps are the same elements throughout: they line up, show where momentum leaks, then
// physically regroup into the three stages of the progressive flow.

const STEPS: StoryStep[] = [
  {
    title: 'Seven steps to a pizza',
    body: 'Ordering a custom pizza meant seven discrete steps: browse, select, size, crust, toppings, review, confirm.',
  },
  {
    title: 'Every step, a new decision',
    body: 'Each hand-off asked customers to stop and decide again. In high-frequency commerce, cognitive friction compounds, and even small delays erode momentum.',
  },
  {
    title: 'Compress the journey',
    body: 'Customization was streamlined from seven steps into a progressive flow: select and customize, progressive options, then live preview and confirm.',
  },
  {
    title: 'Keep progress visible',
    body: 'A clear progress model reduced hesitation at each step. Customers always knew where they were, and moved through customization with fewer pauses.',
  },
  {
    title: 'Momentum, measured',
    body: 'Fewer decisions, faster orders, and more customers completing their pizza.',
  },
];

const STEP_LABELS = ['Before', 'Friction', 'Compress', 'Progress', 'Result'];

const ORIGINAL_STEPS = ['Browse Menu', 'Select Item', 'Choose Size', 'Select Crust', 'Add Toppings', 'Review Changes', 'Confirm'];

const STAGES = [
  { title: 'Select & Customize', steps: [0, 1, 2] },
  { title: 'Progressive Options', steps: [3, 4] },
  { title: 'Live Preview & Confirm', steps: [5, 6] },
];

const RESULTS = [
  { value: 57, suffix: '%', label: 'Fewer decision points', decimals: 0, prefix: '' },
  { value: 3.2, suffix: 's', label: 'Avg. time reduction per order', decimals: 1, prefix: '' },
  { value: 24, suffix: '%', label: 'Completion rate increase', decimals: 0, prefix: '↑' },
];

const HEADER = ['Before · 7 steps', 'Before · 7 decision points', 'After · 3 stages', 'After · progress always visible', 'After · the result'];

const layoutTransition = { layout: { duration: DURATION.slow, ease: EASE } };

// Counts up from zero when it mounts
const CountUp: React.FC<{ value: number; decimals: number; prefix: string; suffix: string; delay: number }> = ({ value, decimals, prefix, suffix, delay }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, { duration: 1.4, ease: EASE, delay, onUpdate: setDisplay });
    return () => controls.stop();
  }, [value, delay]);
  return (
    <span className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// One of the original seven steps; the same element moves between the list and the stages
const StepChip: React.FC<{ index: number; dimmed?: boolean }> = ({ index, dimmed = false }) => (
  <motion.div
    layoutId={`step-${index}`}
    transition={layoutTransition}
    className={cx(
      'inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-500',
      dimmed ? 'border-white/10 bg-white/[0.03] text-white/50' : 'border-white/15 bg-white/[0.06] text-white/85'
    )}
  >
    <motion.span layout="position" className="w-5 h-5 rounded-full border border-white/25 flex items-center justify-center text-xs tabular-nums text-white/60">
      {index + 1}
    </motion.span>
    <motion.span layout="position">{ORIGINAL_STEPS[index]}</motion.span>
  </motion.div>
);

// Hesitation marker shown between the original steps
const Pause: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    className="flex items-center gap-2 pl-3 overflow-hidden"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 18 }}
    exit={{ opacity: 0, height: 0 }}
    transition={transition(DURATION.base, index * 0.06)}
  >
    <span className="w-px h-full bg-brand/50" />
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand/90">Decide</span>
  </motion.div>
);

export const JourneyBoard: React.FC<{ step: number; compact?: boolean }> = ({ step, compact = false }) => {
  const groupId = useId();
  const before = step < 2;
  const showPauses = step === 1;
  const showProgress = step >= 3;
  const showResults = step >= 4;

  return (
    <LayoutGroup id={groupId}>
      <div
        className={cx(
          'relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 md:p-7 flex flex-col',
          compact ? 'w-full max-w-[360px] min-h-[500px]' : 'w-[min(520px,100%)] h-[min(620px,calc(100vh-180px))]'
        )}
        role="img"
        aria-label={`Domino's ordering journey: ${HEADER[step]}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step}
              className={cx('text-xs font-bold uppercase tracking-[0.2em]', before ? 'text-white/60' : 'text-brand')}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={transition(DURATION.fast)}
            >
              {HEADER[step]}
            </motion.span>
          </AnimatePresence>
          <span className="flex gap-1" aria-hidden="true">
            {ORIGINAL_STEPS.map((_, i) => (
              <motion.span
                key={i}
                className="h-1.5 rounded-full"
                initial={false}
                animate={{
                  width: before ? 8 : i < 3 ? 14 : 0,
                  opacity: before ? 1 : i < 3 ? 1 : 0,
                  backgroundColor: before ? 'rgba(255,255,255,0.3)' : '#FF5C34',
                }}
                transition={transition(DURATION.base)}
              />
            ))}
          </span>
        </div>

        {/* Body, centred vertically under the header */}
        <div className="flex-1 flex flex-col justify-center">
        {before ? (
          /* The original seven steps, in sequence */
          <div className="flex flex-col items-start gap-1.5">
            {ORIGINAL_STEPS.map((_, i) => (
              <React.Fragment key={i}>
                <StepChip index={i} />
                <AnimatePresence>{showPauses && i < ORIGINAL_STEPS.length - 1 && <Pause key={`pause-${i}`} index={i} />}</AnimatePresence>
              </React.Fragment>
            ))}
          </div>
        ) : (
          /* The same steps regrouped into three stages */
          <div className="relative flex flex-col gap-3 pl-8">
            {/* Progress rail */}
            <div className="absolute left-3 top-4 bottom-4 w-[2px] rounded-full bg-white/10" aria-hidden="true">
              <motion.div
                className="absolute inset-0 rounded-full bg-brand origin-top"
                initial={false}
                animate={{ scaleY: showProgress ? 1 : 0 }}
                transition={{ duration: showProgress ? 1.6 : DURATION.base, ease: EASE }}
              />
            </div>
            {STAGES.map((stage, s) => (
              <motion.div
                key={stage.title}
                layout
                transition={layoutTransition}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Stage marker on the rail */}
                <motion.span
                  className="absolute -left-[29px] top-4 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold tabular-nums"
                  initial={false}
                  animate={{
                    backgroundColor: showProgress ? '#FF5C34' : 'rgba(255,92,52,0.15)',
                    color: showProgress ? '#ffffff' : '#FF5C34',
                  }}
                  transition={transition(DURATION.base, showProgress ? 0.25 + s * 0.5 : 0)}
                >
                  {showProgress ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s + 1
                  )}
                </motion.span>
                <motion.p layout="position" className="text-sm md:text-base font-medium text-white">
                  {stage.title}
                </motion.p>
                <AnimatePresence initial={false}>
                  {!showResults && (
                    <motion.div
                      className="mt-3 flex flex-wrap gap-1.5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={transition(DURATION.base)}
                    >
                      {stage.steps.map((i) => (
                        <StepChip key={i} index={i} dimmed />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              className="pt-6 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={transition(DURATION.base, 0.2)}
            >
              {RESULTS.map((result, i) => (
                <div key={result.label} className={cx('rounded-2xl border border-white/10 bg-white/[0.04] text-center', compact ? 'px-1.5 py-3' : 'p-4')}>
                  <p className={cx('font-serif', compact ? 'text-2xl' : 'text-4xl', i === 1 ? 'text-white' : 'text-brand')}>
                    <CountUp value={result.value} decimals={result.decimals} prefix={result.prefix} suffix={result.suffix} delay={0.3 + i * 0.12} />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-white/60">{result.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
};

export const DominosJourneyStory: React.FC = () => (
  <ScrollStory steps={STEPS} stepLabels={STEP_LABELS} renderVisual={(step, mode) => <JourneyBoard step={step} compact={mode === 'inline'} />} />
);
