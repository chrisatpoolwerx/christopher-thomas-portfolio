
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { DURATION, EASE } from './components/motion';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';

// Every page fades in and out the same way; scroll resets once the old page has gone
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: DURATION.base, ease: EASE } }}
    exit={{ opacity: 0, transition: { duration: DURATION.fast, ease: EASE } }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/project/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Navigation />
        <AnimatedRoutes />
      </Router>
      <Analytics />
    </MotionConfig>
  );
};

export default App;
