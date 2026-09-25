import type { Variants, Transition } from 'framer-motion';

// One easing curve and one set of durations for the whole site: quick to start, long gentle settle
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.3,
  base: 0.8,
  slow: 1.2,
};

// Content reveals once, slightly before it reaches the middle of the screen
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

export const REVEAL_DISTANCE = 24;

export const transition = (duration = DURATION.base, delay = 0): Transition => ({ duration, ease: EASE, delay });

// Fade up; `custom` is an optional delay in seconds
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: transition(DURATION.base, delay) }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: transition(DURATION.base, delay) }),
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const HOVER_LIFT = { y: -4, transition: transition(DURATION.fast) };
export const TAP = { scale: 0.98, transition: transition(DURATION.fast) };
