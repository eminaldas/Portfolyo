import React from 'react';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import LandingPage from './pages/LandingPage';
import SocialSidebar from './assets/components/SocialSidebar';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="bg-background text-on-background font-body selection:bg-primary/30 selection:text-primary">
        <Navbar />      
        <SocialSidebar />
        <main className="relative">
          <LandingPage />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
