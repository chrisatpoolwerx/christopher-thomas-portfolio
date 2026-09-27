import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { cx } from './ui';

// Pinned scroll storytelling. On desktop the visual stays pinned (position: sticky, no
// scroll hijacking) while the steps scroll past; the step nearest the middle of the screen
// drives the visual. On small screens each step shows its own copy of the visual instead.

export type StoryStep = {
  title: string;
  body: React.ReactNode;
};

type RenderVisual = (activeStep: number, mode: 'pinned' | 'inline') => React.ReactNode;

const StepText: React.FC<{ step: StoryStep; index: number; total: number; active: boolean }> = ({ step, index, total, active }) => (
  <div className={cx('transition-opacity duration-500', active ? 'opacity-100' : 'opacity-30')}>
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand tabular-nums">
      {String(index + 1).padStart(2, '0')} <span className="text-white/40">/ {String(total).padStart(2, '0')}</span>
    </p>
    <h3 className="mt-5 font-serif text-3xl md:text-4xl tracking-tight text-white">{step.title}</h3>
    <p className="mt-4 text-base md:text-lg leading-relaxed text-white/70 max-w-md">{step.body}</p>
  </div>
);

// Reports when its step crosses the middle band of the viewport
const DesktopStep: React.FC<{ step: StoryStep; index: number; total: number; active: boolean; onActive: (i: number) => void }> = ({
  step,
  index,
  total,
  active,
  onActive,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="min-h-[75vh] flex items-center">
      <StepText step={step} index={index} total={total} active={active} />
    </div>
  );
};

// On small screens each step's visual starts from the previous state and plays into its own
// once it scrolls into view
const InlineVisual: React.FC<{ index: number; renderVisual: RenderVisual }> = ({ index, renderVisual }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' });
  return (
    <div ref={ref} className="flex justify-center mb-10">
      {renderVisual(inView ? index : Math.max(index - 1, 0), 'inline')}
    </div>
  );
};

export const ScrollStory: React.FC<{
  steps: StoryStep[];
  renderVisual: RenderVisual;
  stepLabels?: string[];
  className?: string;
}> = ({ steps, renderVisual, stepLabels, className }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <div className={className}>
      {/* Desktop: pinned visual beside scrolling steps */}
      <div ref={containerRef} className="hidden md:grid grid-cols-12 gap-12 lg:gap-20">
        <div className="col-span-5 relative py-[15vh]">
          {/* Progress rail */}
          <div className="absolute left-0 top-[15vh] bottom-[15vh] w-px bg-white/10" aria-hidden="true">
            <motion.div className="absolute inset-0 bg-brand origin-top" style={{ scaleY: progress }} />
          </div>
          <div className="pl-10 lg:pl-14">
            {steps.map((step, i) => (
              <DesktopStep key={step.title} step={step} index={i} total={steps.length} active={i === activeStep} onActive={setActiveStep} />
            ))}
          </div>
        </div>
        <div className="col-span-7">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8">
            {renderVisual(activeStep, 'pinned')}
            {stepLabels && (
              <ol className="flex gap-2 lg:gap-3" aria-hidden="true">
                {stepLabels.map((label, i) => (
                  <li
                    key={label}
                    className={cx(
                      'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500',
                      i === activeStep ? 'bg-brand text-white' : i < activeStep ? 'text-white/70' : 'text-white/30'
                    )}
                  >
                    {label}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: each step carries its own visual */}
      <ol className="md:hidden space-y-20">
        {steps.map((step, i) => (
          <li key={step.title}>
            <InlineVisual index={i} renderVisual={renderVisual} />
            <StepText step={step} index={i} total={steps.length} active />
          </li>
        ))}
      </ol>
    </div>
  );
};
