import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

const EMAIL = 'chris@christhomas.co';
const easeOutExpo = [0.33, 1, 0.68, 1];

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand rounded-full';

const NAV_ITEMS = [
  { label: 'Work', to: '/', isActive: (path: string) => path === '/' || path.startsWith('/project') },
  { label: 'About', to: '/about', isActive: (path: string) => path === '/about' },
  { label: 'Resume', to: '/resume', isActive: (path: string) => path === '/resume' },
];

// Memoized NavLink to prevent re-renders when parent updates
const NavLink = memo<{ text: string; to: string; isActive: boolean }>(({ text, to, isActive }) => {
  return (
    <MagneticButton>
      <Link
        to={to}
        aria-current={isActive ? 'page' : undefined}
        className={`relative px-4 py-2 flex flex-col items-center justify-center group ${focusRing}`}
      >
        <span className={`relative z-10 text-xs font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${isActive ? 'text-brand' : 'text-black/60 group-hover:text-black'}`}>
          {text}
        </span>

        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </MagneticButton>
  );
});

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastY = useRef(0);

  // Frosted background once scrolled, hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current;
    lastY.current = latest;

    setIsScrolled(latest > 24);
    setIsPastHero(latest > 300);

    if (latest < 120) {
      setIsHidden(false);
    } else if (delta > 6) {
      setIsHidden(true);
    } else if (delta < -6) {
      setIsHidden(false);
    }
  });

  // Reset on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsHidden(false);
  }, [location.pathname]);

  // Lock page scroll and allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  // On home the hero already shows the name, so the wordmark waits until it scrolls away
  const showName = !isHome || isPastHero || isMenuOpen;
  const showBar = isScrolled && !isMenuOpen;

  return (
    <>
      <motion.nav
        aria-label="Main"
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${showBar ? 'bg-[#fbfbfb]/75 backdrop-blur-xl backdrop-saturate-150 border-black/5' : 'bg-transparent border-transparent'}`}
        initial={{ y: '-100%' }}
        animate={{ y: isHidden && !isMenuOpen ? '-100%' : 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        <div className={`px-6 md:px-12 flex justify-between items-center transition-[padding] duration-500 ${isScrolled ? 'py-4 md:py-5' : 'py-6 md:py-10'}`}>
          <div className="flex items-center h-12 -ml-3 pl-3 pr-3 overflow-hidden">
            <AnimatePresence mode="wait">
              {showName && (
                <motion.div
                  key="nav-name"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  <Link
                    to="/"
                    aria-label="Christopher Thomas, home"
                    className={`group flex items-center gap-3 md:gap-4 text-[#1d1d1f] px-1 ${focusRing}`}
                    onClick={() => {
                      if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(255,92,52,0.7)]" />
                    <span className="md:hidden text-sm font-bold tracking-[0.3em]">CT</span>
                    <span className="hidden md:inline text-xs uppercase font-bold tracking-[0.4em]">Christopher Thomas</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-4 items-center">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} text={item.label} to={item.to} isActive={item.isActive(location.pathname)} />
            ))}
            <MagneticButton className="ml-4">
              <a
                href={`mailto:${EMAIL}`}
                className={`inline-flex items-center gap-3 rounded-full bg-brand pl-6 pr-2 py-2 text-xs uppercase tracking-[0.3em] font-bold text-white shadow-[0_15px_40px_-15px_rgba(255,92,52,0.8)] ${focusRing}`}
              >
                Let's talk
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={`md:hidden relative w-10 h-10 flex items-center justify-center ${focusRing}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <motion.span
              className="absolute w-6 h-[2px] rounded-full bg-[#1d1d1f]"
              animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            />
            <motion.span
              className="absolute w-6 h-[2px] rounded-full bg-[#1d1d1f]"
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-40 bg-[#fbfbfb] flex flex-col justify-between px-6 pt-32 pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <ul className="space-y-4">
              {NAV_ITEMS.map((item, i) => {
                const isActive = item.isActive(location.pathname);
                return (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: easeOutExpo }}
                  >
                    <Link
                      to={item.to}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-block text-6xl font-serif tracking-tighter ${isActive ? 'text-brand italic' : 'text-[#1d1d1f]'} ${focusRing}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: easeOutExpo }}
            >
              <span className="block text-xs uppercase tracking-[0.4em] opacity-40 font-bold">Get in touch</span>
              <a
                href={`mailto:${EMAIL}`}
                className={`inline-flex items-center gap-4 rounded-full bg-brand pl-6 pr-2 py-2 text-xs uppercase tracking-[0.3em] font-bold text-white shadow-[0_20px_50px_-20px_rgba(255,92,52,0.7)] ${focusRing}`}
              >
                Let's talk
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <p className="font-serif italic text-xl text-black/60">{EMAIL}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
