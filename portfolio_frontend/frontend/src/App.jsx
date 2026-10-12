import { useCallback, useState } from 'react';
import Preloader from './components/Preloader';
import NeuralBackground from './components/NeuralBackground';
import TargetCursor from './components/TargetCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillMarquee from './components/SkillMarquee';
import Work from './components/Work';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Now from './components/Now';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <div className="grain has-target-cursor relative min-h-screen">
      <Preloader onDone={onDone} />
      <NeuralBackground />
      <TargetCursor spinDuration={3} hideDefaultCursor parallaxOn hoverDuration={0.18} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <SkillMarquee />
        <Work />
        <Experience />
        <Stack />
        <Now />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
