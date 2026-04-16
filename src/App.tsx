import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import HologramBackground from './components/HologramBackground';
import BootSequence from './components/BootSequence';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ThumbnailGrid from './components/ThumbnailGrid';
import SkillsPanel from './components/SkillsPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const AppContent: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [keysPressed, useStateKeys] = useState<Set<string>>(new Set());

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  // Hidden admin panel: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keySet = new Set(keysPressed);
      keySet.add(e.key);
      useStateKeys(keySet);

      if (keySet.has('Control') && keySet.has('Shift') && keySet.has('A')) {
        e.preventDefault();
        setAdminOpen(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keySet = new Set(keysPressed);
      keySet.delete(e.key);
      useStateKeys(keySet);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed]);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-darker)' }}>
      {/* Hologram Background */}
      <HologramBackground />

      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Main Content */}
      <div
        className={`transition-all duration-1000 ${bootComplete ? 'opacity-100' : 'opacity-0'}`}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Header />
        <HeroSection />
        <ThumbnailGrid />
        <SkillsPanel />
        <ContactSection />
        <Footer />
      </div>

      {/* Admin Panel */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
