import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, EASE, transition } from '../motion';
import { ScrollStory, StoryStep } from '../ScrollStory';
import { cx } from '../ui';

// Poolchex strip-scanning flow, told as a pinned scroll story. The phone is drawn in code
// and moves between five states: searching, aligned, captured, analysing, scored.

const STEPS: StoryStep[] = [
  {
    title: 'Detect',
    body: 'Vision detects the test strip in the camera frame. While it searches, the guide rectangle pulses so owners know the app is looking.',
  },
  {
    title: 'Align',
    body: 'The guide rectangle coaches position with live instruction, and turns green the moment the strip is aligned.',
  },
  {
    title: 'Capture',
    body: 'Flash capture fires at the optimal moment, then the owner reviews and confirms.',
  },
  {
    title: 'Analyze',
    body: 'Each pad’s colour is extracted and converted into LAB colour space for comparison.',
  },
  {
    title: 'Score',
    body: 'Readings are matched against calibrated references and resolve into a single health score owners understand instantly.',
  },
];

const STEP_LABELS = ['Detect', 'Align', 'Capture', 'Analyze', 'Score'];

const STATUS = ['Searching for strip…', 'Aligned — hold steady', 'Captured', 'Reading pads…', 'Analysis complete'];

const PADS = ['#f4d35e', '#ee8f6a', '#e76f8a', '#8ecae6', '#90be6d', '#c9a7eb'];

const READINGS = [
  { label: 'pH', value: '7.4', color: '#ee8f6a', position: 0.55 },
  { label: 'Free Chlorine', value: '2.1 ppm', color: '#e76f8a', position: 0.45 },
  { label: 'Alkalinity', value: '95 ppm', color: '#8ecae6', position: 0.62 },
];

const SCORE = 87;

// Device geometry, in container-query units (1cqw = 1% of the phone's width) so every size
// scales together. The screen radius is the frame radius minus the bezel, which keeps the
// screen perfectly concentric with the frame at any size.
const FRAME_RADIUS = 15;
const BEZEL = 3.6;
const cqw = (value: number) => `${value}cqw`;

export const ScanPhone: React.FC<{ step: number; compact?: boolean }> = ({ step, compact = false }) => {
  const aligned = step >= 1;
  const analysing = step >= 3;
  const scored = step >= 4;

  return (
    <div
      className={cx('relative', compact ? 'w-[230px]' : 'w-[min(300px,calc((100vh-190px)*0.46))]')}
      style={{ containerType: 'inline-size' }}
      role="img"
      aria-label={`Poolchex scanning a test strip: ${STATUS[step]}`}
    >
      {/* Side buttons: action and volume on the left, power on the right */}
      {[
        { side: 'left', top: 18, height: 6 },
        { side: 'left', top: 27, height: 11 },
        { side: 'left', top: 40, height: 11 },
        { side: 'right', top: 31, height: 17 },
      ].map((button) => (
        <span
          key={`${button.side}-${button.top}`}
          aria-hidden="true"
          className="absolute rounded-sm bg-[#1c1c20]"
          style={{ [button.side]: cqw(-0.9), top: `${button.top}%`, height: `${button.height}%`, width: cqw(1.2) }}
        />
      ))}

      {/* Frame */}
      <div
        className="relative aspect-[9/19.5] bg-[#0b0b0d] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]"
        style={{ borderRadius: cqw(FRAME_RADIUS), padding: cqw(BEZEL) }}
      >
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: cqw(FRAME_RADIUS - BEZEL) }}>
        {/* Camera feed */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 70% at 25% 15%, #2e5361 0%, transparent 60%), radial-gradient(90% 60% at 85% 95%, #1f4541 0%, transparent 60%), linear-gradient(180deg, #13262f, #0b161c)',
          }}
        />

        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-30"
          style={{ top: cqw(2.8), width: cqw(30), height: cqw(8.6) }}
        />

        {/* Status */}
        <div className="absolute top-[8.5%] inset-x-0 flex justify-center z-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={transition(DURATION.fast)}
              className={cx(
                'px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md whitespace-nowrap',
                aligned && !analysing ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/90'
              )}
            >
              {STATUS[step]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Viewfinder: guide rectangle and strip */}
        <motion.div
          className="absolute left-[33%] right-[33%] top-[17%] h-[58%] flex items-center justify-center"
          initial={false}
          animate={analysing ? { y: '-12%', scale: 0.78 } : { y: '0%', scale: 1 }}
          transition={transition(DURATION.base)}
        >
          {/* Guide rectangle */}
          <motion.div
            className={cx('absolute inset-0 rounded-2xl border-2', aligned ? 'border-solid border-green-400' : 'border-dashed border-brand')}
            initial={false}
            animate={aligned ? { opacity: analysing ? 0 : 1, scale: 1 } : { opacity: [0.35, 1, 0.35], scale: 1.04 }}
            transition={aligned ? transition(DURATION.base) : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Scan line while searching */}
          {!aligned && (
            <motion.div
              className="absolute -inset-x-[12%] h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Test strip */}
          <motion.div
            className="relative w-[40%] h-[94%] rounded-md bg-[#f7f5ef] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] flex flex-col items-center justify-evenly py-[8%]"
            initial={false}
            animate={
              aligned
                ? { rotate: 0, x: '0%', y: '0%' }
                : { rotate: [-16, -11, -16], x: ['-70%', '-58%', '-70%'], y: ['10%', '6%', '10%'] }
            }
            transition={aligned ? { duration: DURATION.slow, ease: EASE } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {PADS.map((color, i) => (
              <div key={color} className="relative w-[62%] aspect-square rounded-[3px]" style={{ background: color }}>
                {/* Sampling ring */}
                <motion.span
                  className="absolute -inset-[30%] rounded-full border-2 border-brand"
                  initial={false}
                  animate={analysing && !scored ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                  transition={transition(DURATION.base, analysing ? i * 0.08 : 0)}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Flash on capture */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="flash"
              className="absolute inset-0 bg-white z-10 pointer-events-none"
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          )}
        </AnimatePresence>

        {/* Shutter */}
        {/* Shutter: iOS style white ring with a white disc inside */}
        <div className="absolute inset-x-0 flex justify-center" style={{ bottom: cqw(10) }}>
          <motion.div
            className="rounded-full border-solid border-white flex items-center justify-center"
            style={{ width: cqw(19), height: cqw(19), borderWidth: cqw(1.1) }}
            initial={false}
            animate={{ opacity: analysing ? 0 : 1 }}
            transition={transition(DURATION.base)}
          >
            <motion.div
              className="rounded-full bg-white"
              style={{ width: cqw(14.2), height: cqw(14.2) }}
              initial={false}
              animate={{ scale: step === 2 ? [1, 0.84, 1] : 1, opacity: aligned ? 1 : 0.55 }}
              transition={transition(DURATION.base)}
            />
          </motion.div>
        </div>

        {/* Pad readings */}
        <AnimatePresence>
          {analysing && !scored && (
            <motion.div
              key="readings"
              className="absolute inset-x-[7%] bottom-[5%] rounded-2xl bg-black/50 backdrop-blur-md p-3 space-y-3 z-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={transition(DURATION.base)}
            >
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="font-semibold">Pad colours</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono">LAB</span>
              </div>
              {READINGS.map((reading, i) => (
                <div key={reading.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: reading.color }} />
                      {reading.label}
                    </span>
                    <span className="font-semibold tabular-nums">{reading.value}</span>
                  </div>
                  <div className="relative h-1 rounded-full bg-white/15">
                    <motion.span
                      className="absolute top-1/2 -mt-1 w-2 h-2 -ml-1 rounded-full bg-white"
                      initial={{ left: '0%' }}
                      animate={{ left: `${reading.position * 100}%` }}
                      transition={transition(DURATION.slow, 0.2 + i * 0.12)}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score */}
        <AnimatePresence>
          {scored && (
            <motion.div
              key="score"
              className="absolute inset-0 z-20 bg-gradient-to-b from-[#e9fbff] to-white flex flex-col items-center justify-center px-[8%] pb-[6%]"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={transition(DURATION.slow)}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d2847]/60">Pool Health</p>
              <div className="relative mt-5 w-[68%] aspect-square">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#0d2847" strokeOpacity="0.08" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: SCORE / 100 }}
                    transition={transition(1.4, 0.3)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-5xl text-[#0d2847] tabular-nums">{SCORE}</span>
                  <span className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-green-600">Healthy</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 w-full">
                {[
                  { label: 'pH', value: '7.4' },
                  { label: 'Cl', value: '2.1' },
                  { label: 'Alk', value: '95' },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className="rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(13,40,71,0.35)] py-2 text-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={transition(DURATION.base, 0.6 + i * 0.08)}
                  >
                    <p className="text-xs font-bold text-brand">{metric.label}</p>
                    <p className="text-sm font-semibold text-[#0d2847] tabular-nums">{metric.value}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="mt-5 text-xs text-[#0d2847]/70 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition(DURATION.base, 1)}
              >
                Recommendation ready
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home indicator */}
        <div
          className={cx('absolute left-1/2 -translate-x-1/2 rounded-full z-30 transition-colors duration-500', scored ? 'bg-black/35' : 'bg-white/70')}
          style={{ bottom: cqw(2.2), width: cqw(35), height: cqw(1.3) }}
        />
      </div>
      </div>
    </div>
  );
};

export const PoolchexScanStory: React.FC<{ className?: string }> = ({ className }) => (
  <ScrollStory
    className={className}
    steps={STEPS}
    stepLabels={STEP_LABELS}
    renderVisual={(step, mode) => <ScanPhone step={step} compact={mode === 'inline'} />}
  />
);
