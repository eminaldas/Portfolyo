import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import LandingPage from './pages/LandingPage';
import SocialSidebar from './assets/components/SocialSidebar';
import Preloader from './assets/components/Preloader';
import GridCanvas from './assets/components/GridCanvas';
import CustomCursor from './assets/components/CustomCursor';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { BuildProvider, useBuild } from './context/BuildContext';
import './App.css';

// preloader bitince context ready=true yapar
function BuildActivator() {
  const { setReady } = useBuild();
  useEffect(() => { setReady(true); }, [setReady]);
  return null;
}

function App() {
  const noPreloader = !!sessionStorage.getItem('preloader-seen');
  const [showPreloader] = useState(() => !noPreloader);
  const [preloaderDone, setPreloaderDone] = useState(noPreloader);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-seen', '1');
    setPreloaderDone(true);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BuildProvider initialReady={noPreloader}>
          {showPreloader && !preloaderDone && (
            <Preloader onComplete={handleComplete} />
          )}
          {preloaderDone && !noPreloader && <BuildActivator />}

          <GridCanvas />
          <CustomCursor />
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
