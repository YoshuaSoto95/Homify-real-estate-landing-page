import React from 'react';
import { motion } from 'framer-motion';
import { BedIcon } from './icons/BedIcon';
import { BathIcon } from './icons/BathIcon';
import { AreaIcon } from './icons/AreaIcon';
import { CloseIcon } from './icons/CloseIcon';
import { LocationIcon } from './icons/LocationIcon';

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

interface PropertyModalProps {
    property: Property;
    onClose: () => void;
    onContactAgent: () => void;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { 
        y: "-100vh",
        opacity: 0,
        scale: 0.8
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
        y: "100vh",
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onContactAgent }) => {
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
                className="bg-[#0C1018] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 border border-white/10 relative scrollbar-hide"
                variants={modalVariants}
                exit="exit"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal content
            >
                <div className="grid md:grid-cols-2">
                    {/* Image Section */}
                    <div className="md:h-full h-64">
                        <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-full h-full object-cover md:rounded-l-2xl md:rounded-tr-none rounded-t-2xl"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 text-[#E6E8EC]">
                        <h2 className="text-3xl font-bold text-white mb-2">{property.title}</h2>
                        
                        <div className="flex items-center text-md text-[#9AA3B2] mb-4">
                            <LocationIcon className="w-5 h-5 mr-2 shrink-0"/>
                            <span>{property.location}</span>
                        </div>
                        
                        <p className="text-3xl font-semibold text-[#D4AF37] mb-6">{property.price}</p>
                        
                        <div className="grid grid-cols-3 gap-4 text-center mb-6 border-y border-white/10 py-4">
                            <div>
                                <BedIcon className="h-6 w-6 mx-auto mb-1 text-[#9AA3B2]" />
                                <p className="font-bold text-lg">{property.beds}</p>
                                <p className="text-xs text-[#9AA3B2]">Beds</p>
                            </div>
                            <div>
                                <BathIcon className="h-6 w-6 mx-auto mb-1 text-[#9AA3B2]" />
                                <p className="font-bold text-lg">{property.baths}</p>
                                <p className="text-xs text-[#9AA3B2]">Baths</p>
                            </div>
                            <div>
                                <AreaIcon className="h-6 w-6 mx-auto mb-1 text-[#9AA3B2]" />
                                <p className="font-bold text-lg">{property.sqft}</p>
                                <p className="text-xs text-[#9AA3B2]">sqft</p>
                            </div>
                        </div>

                        <p className="text-md leading-relaxed text-[#9AA3B2] mb-8">{property.description}</p>
                        
                        <button 
                            onClick={onContactAgent}
                            className="w-full px-4 py-3 text-base font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20 hover:bg-yellow-300 transition-colors duration-300"
                        >
                            Contact Agent
                        </button>
                    </div>
                </div>

                 <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300"
                    aria-label="Close property details"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default PropertyModal;
