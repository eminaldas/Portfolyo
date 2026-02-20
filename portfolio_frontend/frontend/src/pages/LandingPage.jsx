import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experiences from './Experiences';
import ContactSection from './Contact';
import RevealOnScroll from '../assets/components/RevealOnScroll';

function LandingPage() {
  return (
    <main className="w-full">
   
            <div className='flex flex-col items-center overflow-auto scroll-smooth gap-y-10 pb-20'>         
            
            <RevealOnScroll>
              <About/>
            </RevealOnScroll>

            <RevealOnScroll>
              <Skills/>
            </RevealOnScroll>

            <RevealOnScroll>
              <Projects/>
            </RevealOnScroll>

            <RevealOnScroll>
              <Experiences  />
            </RevealOnScroll>

            <RevealOnScroll>
              <ContactSection/>
            </RevealOnScroll>

            </div>

    </main>
  );
}

export default LandingPage;
