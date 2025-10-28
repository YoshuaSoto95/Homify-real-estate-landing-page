import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

const AboutUs: React.FC = () => {
  return (
    <section className="bg-[#0C1018] text-[#E6E8EC] py-24 sm:py-32">
      <motion.div
        className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Left Column: Text Content */}
        <div className="text-left">
          <motion.h2 variants={textVariants} className="text-base font-semibold leading-7 text-[#D4AF37]">
            About HomiFi
          </motion.h2>
          <motion.p variants={textVariants} className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Where Visionary Investors Meet Unparalleled Opportunities
          </motion.p>
          <motion.p variants={textVariants} className="mt-6 text-lg leading-8 text-[#9AA3B2]">
            HomiFi isn't just a platform; it's a curated ecosystem for the discerning real estate investor. Born from a partnership of seasoned realtors and savvy investors, we bridge the gap between ambition and acquisition. We provide exclusive access to premium properties and data-driven insights to ensure your portfolio thrives.
          </motion.p>
          <motion.div variants={textVariants} className="mt-10">
            <a href="#" className="px-6 py-3 text-base font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20 hover:bg-yellow-300 transition-colors duration-300">
                Learn More
            </a>
          </motion.div>
        </div>

        {/* Right Column: Image Collage */}
        <motion.div 
            className="grid grid-cols-2 gap-4 h-[400px] sm:h-[500px] lg:block lg:relative lg:h-[500px]"
            variants={containerVariants}
        >
            <motion.img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern luxury house"
                className="col-span-1 row-span-2 rounded-xl shadow-2xl object-cover h-full w-full lg:absolute lg:w-2/3 lg:h-auto lg:top-0 lg:left-0"
                variants={imageVariants}
            />
            <motion.img
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury home with a pool"
                className="col-span-1 row-span-1 rounded-xl shadow-2xl object-cover h-full w-full lg:absolute lg:w-1/2 lg:h-auto lg:top-1/4 lg:right-0 lg:border-4 border-[#0C1018]"
                variants={imageVariants}
            />
            <motion.img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Stylish home exterior"
                className="col-span-1 row-span-1 rounded-xl shadow-2xl object-cover h-full w-full lg:absolute lg:w-1/2 lg:h-auto lg:bottom-0 lg:left-1/4 lg:border-4 border-[#0C1018]"
                variants={imageVariants}
            />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;