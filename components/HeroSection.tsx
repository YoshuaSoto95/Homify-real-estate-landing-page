import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Easily customizable background image URL for the hero section
const heroBackgroundImage = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// A reusable component to animate numbers
const Counter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    // Animate from 0 to the target value
    const animation = animate(count, value, {
      duration: 2.5,
      delay: 1.2,
      ease: "easeOut",
    });

    // Cleanup function to stop animation
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

// Data for the statistics cards
const stats = [
  { value: 1200, label: 'Premium Properties' },
  { value: 4500, label: 'Happy Customers' },
  { value: 250, label: 'Awards Winning' },
];

const HeroSection: React.FC = () => {
  return (
    <section 
      className="relative h-auto lg:h-screen flex flex-col justify-center lg:justify-between gap-16 lg:gap-0 overflow-hidden bg-cover bg-center pt-40 lg:pt-52 pb-16 lg:pb-24 px-6 sm:px-12 lg:px-24" 
      style={{backgroundImage: `url('${heroBackgroundImage}')`}}
    >
      <div className="absolute inset-0 bg-[#0A0D14] opacity-70"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#E6E8EC] tracking-tight max-w-3xl"
        >
          Invest in Your Future with{' '}
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#F0E68C] bg-clip-text text-transparent">
            HomiFi
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 max-w-xl text-lg md:text-xl text-[#9AA3B2]"
        >
          A premier society by realtors and investors dedicated to unlocking prime real estate opportunities for you.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10"
        >
            <a href="#" className="px-8 py-4 text-lg font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/30 hover:bg-yellow-300 transition-colors duration-300">
                Explore Properties
            </a>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { 
            opacity: 1, 
            transition: { 
              staggerChildren: 0.3,
              delayChildren: 1.0,
            } 
          },
          hidden: { opacity: 0 },
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p className="text-4xl font-bold text-white">
                <Counter value={stat.value} />+
              </p>
              <p className="mt-2 text-sm text-[#9AA3B2] uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;