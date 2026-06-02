import React, { useState, useCallback } from 'react';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import LandingPage from './pages/LandingPage';
import SocialSidebar from './assets/components/SocialSidebar';
import Preloader from './assets/components/Preloader';
import GridCanvas from './assets/components/GridCanvas';
import TargetCursor from './components/reactBits/TargetCursor';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { BuildProvider } from './context/BuildContext';
import './App.css';

function App() {
  const noPreloader = !!sessionStorage.getItem('preloader-seen');
  const [showPreloader] = useState(() => !noPreloader);
  // preloaderDone: preloader yoksa (noPreloader) hemen true, varsa false → preloader bitince true
  const [preloaderDone, setPreloaderDone] = useState(noPreloader);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-seen', '1');
    setPreloaderDone(true);
  }, []);

  // ready = preloader bitti veya hiç gösterilmedi
  const ready = preloaderDone;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BuildProvider ready={ready}>
          {showPreloader && !preloaderDone && (
            <Preloader onComplete={handleComplete} />
          )}
          <GridCanvas />
          <TargetCursor spinDuration={3} hideDefaultCursor parallaxOn hoverDuration={0.18} />
          <div className="bg-background text-on-background font-body selection:bg-primary/20 selection:text-on-primary">
            <Navbar />
            <SocialSidebar />
            <main className="relative">
              <LandingPage />
            </main>
            <Footer />
          </div>
        </BuildProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
