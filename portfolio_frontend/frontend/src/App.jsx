import Navbar from './assets/components/Navbar'
import './App.css'
import LandingPage from './pages/LandingPage';
import SocialMedia from './assets/components/SocialMedia';

function App() {
  return (
    <div className=''>
    <div 
    className='w-screen h-screen bg-[var(--color-50)] fixed bg-radial from-white from-40% to-[var(--color-50)] dark:from-[var(--color-800)] dark:to-[var(--color-900)] ' >
      
    </div>
    <div className='w-full min-h-screen overflow-auto scroll-smooth flex flex-col items-center justify-start'>

            <Navbar />      

      <div  className=" w-full max-w-7xl   h-fit px-10 scroll-smooth">       
          <LandingPage/>
        </div>
      <SocialMedia/>
    </div>
    </div>
  );
}

export default App;
