import React from 'react';
import HeroSection from '../assets/components/HeroSection';
import ManifestoSection from '../assets/components/ManifestoSection';
import MarqueeStrip from '../assets/components/MarqueeStrip';
import FeaturedWork from '../assets/components/FeaturedWork';
import SkillsSection from '../assets/components/SkillsSection';
import BentoStats from '../assets/components/BentoStats';
import AboutSection from '../assets/components/AboutSection';
import CareerSection from '../assets/components/CareerSection';
import ContactSection from '../assets/components/ContactSection';

const LandingPage = () => (
  <>
    <HeroSection />
    <ManifestoSection />
    <MarqueeStrip />
    <FeaturedWork />
    <SkillsSection />
    <BentoStats />
    <AboutSection />
    <CareerSection />
    <ContactSection />
  </>
);

export default LandingPage;
