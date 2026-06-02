import React from 'react';
import HeroSection from '../assets/components/HeroSection';
import ManifestoSection from '../assets/components/ManifestoSection';
import SkillsSection from '../assets/components/SkillsSection';
import BentoStats from '../assets/components/BentoStats';
import AboutSection from '../assets/components/AboutSection';
import CareerSection from '../assets/components/CareerSection';
import FeaturedWork from '../assets/components/FeaturedWork';
import ContactSection from '../assets/components/ContactSection';

const LandingPage = () => (
  <>
    <HeroSection />
    <ManifestoSection />
    <FeaturedWork />
    <SkillsSection />
    <BentoStats />
    <AboutSection />
    <CareerSection />
    <ContactSection />
  </>
);

export default LandingPage;
