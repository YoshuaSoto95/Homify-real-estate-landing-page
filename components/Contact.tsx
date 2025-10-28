import React from 'react';
import { motion } from 'framer-motion';

const contactBackgroundImage = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop';

interface ContactProps {
    onContactClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onContactClick }) => {
    return (
        <section
            id="contact"
            className="relative bg-cover bg-center py-32 sm:py-40"
            style={{ backgroundImage: `url('${contactBackgroundImage}')` }}
        >
            <div className="absolute inset-0 bg-[#0A0D14] opacity-75"></div>
            <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-3xl font-bold tracking-tight text-[#E6E8EC] sm:text-4xl lg:text-5xl"
                >
                    Ready to Find Your Dream Home?
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-[#9AA3B2]"
                >
                    Let our experts guide you through every step of the process. Contact us today to begin your real estate journey with a team you can trust.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className="mt-10"
                >
                    <button 
                        onClick={onContactClick}
                        className="px-8 py-4 text-lg font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/30 hover:bg-yellow-300 transition-colors duration-300"
                    >
                        Contact Us
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
