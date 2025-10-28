import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Properties from './components/Properties';
import Realtors from './components/Realtors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ThankYouModal from './components/ThankYouModal';

export interface ContactContext {
  realtorName?: string;
  propertyTitle?: string;
}

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [contactContext, setContactContext] = useState<ContactContext>({});

  const handleOpenContactModal = (context: ContactContext = {}) => {
    setContactContext(context);
    setIsContactModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsContactModalOpen(false);
    setIsThankYouModalOpen(false);
  };

  const handleContactSuccess = () => {
    setIsContactModalOpen(false);
    setIsThankYouModalOpen(true);
  };

  return (
    <div className="bg-[#0A0D14] text-[#E6E8EC] min-h-screen font-sans">
      <Header onContactClick={() => handleOpenContactModal()} />
      <main>
        <HeroSection />
        <AboutUs onContactClick={() => handleOpenContactModal()} />
        <Properties onContactClick={handleOpenContactModal} />
        <Realtors onContactClick={handleOpenContactModal} />
        <Contact onContactClick={() => handleOpenContactModal()} />
      </main>
      <Footer />
      <AnimatePresence>
        {isContactModalOpen && (
          <ContactModal
            onClose={handleCloseModals}
            onSuccess={handleContactSuccess}
            realtorName={contactContext.realtorName}
            propertyTitle={contactContext.propertyTitle}
          />
        )}
        {isThankYouModalOpen && (
          <ThankYouModal onClose={handleCloseModals} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
