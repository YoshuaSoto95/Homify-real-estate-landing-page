import React from 'react';
import { motion } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';
import { CheckIcon } from './icons/CheckIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { CalendarIcon } from './icons/CalendarIcon';


interface ThankYouModalProps {
    onClose: () => void;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
};

const ThankYouModal: React.FC<ThankYouModalProps> = ({ onClose }) => {
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
                className="bg-[#0C1018] rounded-2xl w-full max-w-md shadow-2xl shadow-black/50 border border-white/10 relative p-8 text-center"
                variants={modalVariants}
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div 
                    className="flex justify-center items-center w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                    <CheckIcon className="w-8 h-8 text-green-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                <p className="text-md text-[#9AA3B2] mb-6">
                    Your message has been sent successfully. We will be in touch with you shortly.
                </p>
                
                <div className="space-y-4">
                    <a
                        href="https://wa.me/1234567890" // Replace with your WhatsApp number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold text-white bg-[#25D366]/80 rounded-full hover:bg-[#25D366] transition-colors duration-300"
                    >
                        <WhatsappIcon className="w-5 h-5" />
                        Chat on WhatsApp
                    </a>
                    <a
                        href="https://calendly.com/your-link" // Replace with your Calendly link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold text-white bg-blue-500/80 rounded-full hover:bg-blue-500 transition-colors duration-300"
                    >
                        <CalendarIcon className="w-5 h-5" />
                        Schedule a Meeting
                    </a>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300"
                    aria-label="Close thank you message"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ThankYouModal;