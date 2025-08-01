import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function LandingPage() {
  return (
    <main className="h-screen">
      <Parallax pages={3} style={{ top: '0', left: '0' }}>
        <ParallaxLayer offset={0} speed={0.2} style={{ backgroundColor: '#0f172a' }} >

        </ParallaxLayer>


      </Parallax>
    </main>
  );
}

export default LandingPage;
