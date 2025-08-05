import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experiences from './Experiences';

function LandingPage() {
  return (
    <main className="w-full">
   
            <div className='flex flex-col items-center overflow-auto scroll-smooth'>         
            <About/>
            <Skills/>
            <Projects/>
            <Experiences  />
            </div>

    </main>
  );
}

export default LandingPage;
