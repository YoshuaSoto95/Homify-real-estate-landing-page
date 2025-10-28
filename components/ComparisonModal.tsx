import React from 'react';
import { motion } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';

interface Property {
    image: string;
    title: string;
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    location: string;
    description: string;
}

interface ComparisonModalProps {
    properties: Property[];
    onClose: () => void;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { 
        y: "-50px",
        opacity: 0,
        scale: 0.9
    },
    visible: { 
        y: "0",
        opacity: 1,
        scale: 1,
        transition: { 
            duration: 0.4,
            type: "spring",
            damping: 25,
            stiffness: 200,
        } 
    },
    exit: { 
        y: "50px",
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const ComparisonModal: React.FC<ComparisonModalProps> = ({ properties, onClose }) => {
    const features = [
        { label: 'Price', key: 'price' },
        { label: 'Beds', key: 'beds' },
        { label: 'Baths', key: 'baths' },
        { label: 'Area (sqft)', key: 'sqft' },
        { label: 'Location', key: 'location' },
        { label: 'Description', key: 'description' },
    ];

    return (
        <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div
                className="bg-[#0C1018] rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/50 border border-white/10 relative"
                variants={modalVariants}
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-3xl font-bold text-white text-center">Compare Properties</h2>
                </div>
                
                <div className="overflow-auto scrollbar-hide">
                    <table className="w-full border-collapse">
                        <thead className="text-left sticky top-0 bg-[#0C1018] z-10">
                            <tr>
                                <th className="p-4 w-40 sm:w-48 sticky left-0 bg-[#0C1018] font-semibold text-[#E6E8EC]">Feature</th>
                                {properties.map(prop => (
                                    <th key={prop.title} className="p-4 w-64 sm:w-80">
                                        <img src={prop.image} alt={prop.title} className="w-full h-32 sm:h-40 object-cover rounded-md mb-2" />
                                        <p className="font-bold text-base sm:text-lg text-white">{prop.title}</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {features.map(feature => (
                                <tr key={feature.label}>
                                    <td className="p-4 font-semibold text-[#9AA3B2] sticky left-0 bg-[#0C1018] align-top">{feature.label}</td>
                                    {properties.map(prop => (
                                        <td key={prop.title} className="p-4 text-sm text-white align-top w-64 sm:w-80">
                                            {String(prop[feature.key as keyof Property])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300"
                    aria-label="Close comparison"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ComparisonModal;