import React from 'react';
import { motion } from 'framer-motion';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { TwitterIcon } from './icons/TwitterIcon';

interface Realtor {
    image: string;
    name: string;
    title: string;
    bio: string;
}

const realtors: Realtor[] = [
    {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
        name: 'Jessica Miller',
        title: 'Luxury Property Specialist',
        bio: 'With over a decade of experience in high-end real estate, Jessica has an unmatched eye for luxury and detail.'
    },
    {
        image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=1887&auto=format&fit=crop',
        name: 'Marcus Chen',
        title: 'Investment Advisor',
        bio: 'Marcus specializes in identifying high-yield investment properties and guiding clients through complex financial transactions.'
    },
    {
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
        name: 'Sophia Rodriguez',
        title: 'First-Time Buyer\'s Agent',
        bio: 'Sophia is passionate about helping new buyers navigate the market and find their perfect first home with confidence.'
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
};
  
const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
};

interface RealtorsProps {
    onContactClick: (context: { realtorName?: string; propertyTitle?: string; }) => void;
}

const Realtors: React.FC<RealtorsProps> = ({ onContactClick }) => {

    const handleContactClick = (realtor: Realtor) => {
        onContactClick({ realtorName: realtor.name });
    };

  return (
    <section id="realtors" className="bg-[#0C1018] py-24 sm:py-32">
    <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
        <h2 className="text-base font-semibold leading-7 text-[#D4AF37]">Our Team</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-[#E6E8EC] sm:text-4xl">Meet Our Expert Realtors</p>
        <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-[#9AA3B2]">
            Our dedicated team of professionals is here to provide you with the best real estate advice and service.
        </p>
        </div>

        <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
        {realtors.map((realtor, index) => (
            <motion.div 
                key={index} 
                className="bg-[#0A0D14] p-8 rounded-xl shadow-2xl shadow-black/30 border border-white/10 text-center flex flex-col items-center"
                variants={cardVariants}
            >
            <img 
                src={realtor.image} 
                alt={realtor.name} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#D4AF37]/50"
            />
            <h3 className="text-xl font-bold text-white">{realtor.name}</h3>
            <p className="text-sm font-semibold text-[#D4AF37] mb-3">{realtor.title}</p>
            <p className="text-[#9AA3B2] text-sm">{realtor.bio}</p>
            <div className="flex space-x-4 mt-6">
                <a href="#" className="text-[#9AA3B2] hover:text-[#D4AF37] transition-colors">
                    <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-[#9AA3B2] hover:text-[#D4AF37] transition-colors">
                    <TwitterIcon className="h-6 w-6" />
                </a>
            </div>
            <div className="mt-auto pt-6 w-full">
                <button
                    onClick={() => handleContactClick(realtor)}
                    className="w-full px-4 py-2.5 text-sm font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20 hover:bg-yellow-300 transition-colors duration-300"
                >
                    Contact {realtor.name.split(' ')[0]}
                </button>
            </div>
            </motion.div>
        ))}
        </motion.div>
    </div>
    </section>
  );
};

export default Realtors;
