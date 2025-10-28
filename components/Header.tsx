import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoIcon } from './icons/LogoIcon';

const navItems = [
  { name: 'About Us', href: '#' },
  { name: 'Properties', href: '#' },
  { name: 'Realtors', href: '#' },
  { name: 'Contacts', href: '#' },
];

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle: React.FC<{ toggle: () => void }> = ({ toggle }) => (
  <button onClick={toggle} className="focus:outline-none z-50">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-[#0A0D14]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LogoIcon className="h-8 w-8 text-[#D4AF37]" />
              <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#E6E8EC] via-[#9AA3B2] to-[#E6E8EC] bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
                HomiFi
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-[#E6E8EC] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(212, 175, 55, 0.7)',
                    '0 0 0 10px rgba(212, 175, 55, 0)',
                    '0 0 0 0 rgba(212, 175, 55, 0)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
                className="px-6 py-2 text-sm font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20"
              >
                Find & Buy Home
              </motion.button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden">
              <motion.nav animate={isOpen ? 'open' : 'closed'}>
                <MenuToggle toggle={() => setIsOpen(!isOpen)} />
              </motion.nav>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100vw' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100vw', transition: { duration: 0.3, ease: 'easeInOut' } }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-[#0C1018] lg:hidden"
          >
            <motion.div
                className="h-full w-full flex flex-col items-center justify-center pt-24"
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
            >
                {navItems.map((item, i) => (
                    <motion.a
                        key={i}
                        href={item.href}
                        className="text-2xl font-semibold text-[#E6E8EC] my-4"
                        variants={itemVariants}
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </motion.a>
                ))}
                <motion.div variants={itemVariants} className="mt-8">
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 text-lg font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20"
                     >
                        Find & Buy Home
                    </motion.button>
                </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
