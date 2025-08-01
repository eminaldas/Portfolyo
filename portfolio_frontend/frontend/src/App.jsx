import Navbar from './assets/components/Navbar'
import './App.css'
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="w-screen h-screen bg-brand relative overflow-hidden">
    
      <div className="absolute inset-0 z-0 bg-brand"></div>

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 text-white pt-8">
          <LandingPage/>
        </div>
      </div>
    </div>
  );
}

export default App;
