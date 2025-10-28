import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';

interface ContactModalProps {
    onClose: () => void;
    onSuccess: () => void;
    realtorName?: string;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { y: "-50px", opacity: 0, scale: 0.95 },
    visible: { y: "0", opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { y: "50px", opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
};

const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

interface FormState {
    fullName: string;
    email: string;
    phone: string;
    state: string;
    investmentType: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    state?: string;
    investmentType?: string;
    message?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, onSuccess, realtorName }) => {
    const [formData, setFormData] = useState<FormState>({
        fullName: '',
        email: '',
        phone: '',
        state: '',
        investmentType: '',
        message: realtorName ? `Hello ${realtorName}, I am interested in discussing real estate opportunities with you.` : ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid.';
        }
        if (!formData.state) newErrors.state = 'Please select a state.';
        if (!formData.investmentType) newErrors.investmentType = 'Please select an investment type.';
        if (!formData.message.trim()) newErrors.message = 'Message is required.';

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Handle form submission logic here
            onSuccess();
        }
    };

    const inputClass = "w-full bg-[#0A0D14] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition";
    const errorClass = "text-red-400 text-xs mt-1";

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
                className="bg-[#0C1018] rounded-2xl w-full max-w-lg shadow-2xl shadow-black/50 border border-white/10 relative max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {realtorName ? `Contact ${realtorName}` : 'Contact Us'}
                    </h2>
                    <p className="text-md text-[#9AA3B2] mb-6">
                        {realtorName
                            ? `Fill out the form below to get in touch with ${realtorName}.`
                            : "Fill out the form below and we'll get back to you shortly."
                        }
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-[#E6E8EC] mb-1">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="John Doe" />
                            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#E6E8EC] mb-1">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john.doe@example.com" />
                            {errors.email && <p className={errorClass}>{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-[#E6E8EC] mb-1">Phone</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="(123) 456-7890" />
                            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-[#E6E8EC] mb-1">State</label>
                                <select id="state" name="state" value={formData.state} onChange={handleChange} className={inputClass}>
                                    <option value="" disabled>Select a State</option>
                                    {usStates.map(state => <option key={state} value={state}>{state}</option>)}
                                </select>
                                {errors.state && <p className={errorClass}>{errors.state}</p>}
                            </div>
                            <div>
                                <label htmlFor="investmentType" className="block text-sm font-medium text-[#E6E8EC] mb-1">Investment Type</label>
                                <select id="investmentType" name="investmentType" value={formData.investmentType} onChange={handleChange} className={inputClass}>
                                    <option value="" disabled>Select a Type</option>
                                    <option value="First Time Buyer">First Time Buyer</option>
                                    <option value="Investment">Investment</option>
                                </select>
                                {errors.investmentType && <p className={errorClass}>{errors.investmentType}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#E6E8EC] mb-1">Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClass} placeholder="How can we help you?"></textarea>
                            {errors.message && <p className={errorClass}>{errors.message}</p>}
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="w-full px-4 py-3 text-base font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20 hover:bg-yellow-300 transition-colors duration-300">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300" aria-label="Close contact form">
                    <CloseIcon className="h-5 w-5" />
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ContactModal;