
import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { DURATION, EASE } from './components/motion';
import { didArriveViaViewTransition } from './components/transitions';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';

// View-transition navigations are crossfaded by the browser; anything else (back/forward,
// unsupported browsers) gets a gentle fade-in instead
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={didArriveViaViewTransition() ? false : { opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: DURATION.base, ease: EASE } }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
      <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      {/* Synchronous navigation updates so view transitions capture the finished new page */}
      <Router unstable_useTransitions={false}>
        <Navigation />
        <AnimatedRoutes />
      </Router>
      <Analytics />
    </MotionConfig>
  );
};

export default App;
