import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Properties from './components/Properties';
import Realtors from './components/Realtors';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#0A0D14] text-[#E6E8EC] min-h-screen font-sans">
      <Header />
      <main>
        <HeroSection />
        <AboutUs />
        <Properties />
        <Realtors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;