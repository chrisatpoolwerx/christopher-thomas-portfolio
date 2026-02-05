
import React, { useState, useRef, memo } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

// Memoized NavLink to prevent re-renders when parent updates
const NavLink = memo<{
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}>(({ text, isActive, onClick }) => {
  return (
    <MagneticButton className="cursor-pointer" onClick={onClick}>
      <div className="relative px-4 py-2 flex flex-col items-center justify-center group">
        <span className={`relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] transition-all duration-700 ease-[0.33,1,0.68,1] ${isActive ? 'text-brand' : 'text-white/40 group-hover:text-white'}`}>
          {text}
        </span>

        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </MagneticButton>
  );
});

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [shouldShowName, setShouldShowName] = useState(false);

  // Track previous state to avoid unnecessary re-renders
  const prevShowName = useRef(false);
  const isHome = location.pathname === '/';

  // Use modern API with built-in cleanup and optimized event handling
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldShow = isHome ? latest > 300 : true;
    // Only update state if value actually changed
    if (shouldShow !== prevShowName.current) {
      prevShowName.current = shouldShow;
      setShouldShowName(shouldShow);
    }
  });

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 md:py-12 flex justify-between items-center mix-blend-difference"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex items-center h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          {shouldShowName && (
            <motion.div 
              key="nav-name"
              className="text-white cursor-pointer group flex items-center gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              onClick={() => {
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
            >
              <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_15px_rgba(255,79,0,0.8)]" />
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em]">Christopher Thomas</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex gap-2 md:gap-6 items-center">
        <NavLink 
          text="About"
          isActive={location.pathname === '/about'} 
          onClick={() => navigate('/about')}
        />
        <NavLink 
          text="Work"
          isActive={isHome && !shouldShowName} 
          onClick={() => navigate('/')}
        />
      </div>
    </motion.nav>
  );
};
