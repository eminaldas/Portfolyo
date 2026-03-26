import React from 'react';
import HeroSection from '../assets/components/HeroSection';
import BentoStats from '../assets/components/BentoStats';
import AboutSection from '../assets/components/AboutSection';
import CareerSection from '../assets/components/CareerSection';
import FeaturedWork from '../assets/components/FeaturedWork';
import ContactSection from '../assets/components/ContactSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <BentoStats />
      <AboutSection />
      <CareerSection />
      <FeaturedWork />
      <ContactSection />
    </>
  );
};

export default LandingPage;
