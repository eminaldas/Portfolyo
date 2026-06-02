import React, { useState, useCallback } from 'react';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import LandingPage from './pages/LandingPage';
import SocialSidebar from './assets/components/SocialSidebar';
import Preloader from './assets/components/Preloader';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [showPreloader] = useState(() => !sessionStorage.getItem('preloader-seen'));
  const [preloaderDone, setPreloaderDone] = useState(!showPreloader);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-seen', '1');
    setPreloaderDone(true);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {showPreloader && !preloaderDone && (
          <Preloader onComplete={handleComplete} />
        )}
        <div className="bg-background text-on-background font-body selection:bg-primary/20 selection:text-on-primary">
          <Navbar />
          <SocialSidebar />
          <main className="relative">
            <LandingPage />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
