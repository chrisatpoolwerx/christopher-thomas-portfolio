
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Perspective } from './pages/Perspective';
import { ProjectDetail } from './pages/ProjectDetail';
import { Resume } from './pages/Resume';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/perspective" element={<Perspective />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
