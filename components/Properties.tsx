import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BedIcon } from './icons/BedIcon';
import { BathIcon } from './icons/BathIcon';
import { AreaIcon } from './icons/AreaIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import PropertyModal from './PropertyModal';

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

const properties: Property[] = [
  {
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    title: 'Modern Downtown Loft',
    price: '$1,200,000',
    beds: 2,
    baths: 2,
    sqft: 1800,
    location: '123 Main Street, Metropolis, USA',
    description: 'A beautifully designed loft in the heart of the city, featuring floor-to-ceiling windows, an open-plan living space, and state-of-the-art appliances. Perfect for urban professionals seeking a stylish and convenient lifestyle.'
  },
  {
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
    title: 'Suburban Family Home',
    price: '$850,000',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: '456 Oak Avenue, Suburbia, USA',
    description: 'Spacious and welcoming, this family home offers a large backyard, a modern kitchen, and plenty of room for a growing family. Located in a quiet, friendly neighborhood with excellent schools.'
  },
  {
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    title: 'Luxury Villa with Ocean View',
    price: '$3,500,000',
    beds: 5,
    baths: 5,
    sqft: 4500,
    location: '789 Ocean Drive, Coastline, USA',
    description: 'Experience unparalleled luxury in this stunning villa with panoramic ocean views. Features include an infinity pool, a private cinema, and expansive outdoor terraces for entertaining.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop',
    title: 'Cozy Countryside Cottage',
    price: '$650,000',
    beds: 3,
    baths: 2,
    sqft: 2000,
    location: '101 Pine Lane, countryside, USA',
    description: 'Escape the hustle and bustle in this charming countryside cottage. Surrounded by nature, it features a rustic design, a cozy fireplace, and a beautiful garden. The perfect retreat.'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    title: 'Urban Penthouse with Terrace',
    price: '$2,100,000',
    beds: 3,
    baths: 3,
    sqft: 2200,
    location: '212 Sky Tower, Metropolis, USA',
    description: 'This exclusive penthouse offers breathtaking city views from a private rooftop terrace. With a sleek, modern interior and premium finishes, it represents the pinnacle of city living.'
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop',
    title: 'Lakeside Modern Residence',
    price: '$1,750,000',
    beds: 4,
    baths: 4,
    sqft: 3500,
    location: '333 Lakeview Road, Lakepoint, USA',
    description: 'A stunning modern home with direct lake access. Enjoy serene water views from every room, a private dock, and a spacious, light-filled interior designed for comfort and elegance.'
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

interface PropertiesProps {
    onContactClick: (context: { realtorName?: string; propertyTitle?: string; }) => void;
}

const Properties: React.FC<PropertiesProps> = ({ onContactClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const intervalRef = useRef<number | null>(null);
    const cardWidthRef = useRef(0);

    const scroll = (direction: number) => {
        if (scrollContainerRef.current) {
            if (!cardWidthRef.current) {
                const card = scrollContainerRef.current.querySelector('div > div') as HTMLElement;
                if (card) cardWidthRef.current = card.offsetWidth;
            }
            const gap = 32; // Corresponds to gap-8
            scrollContainerRef.current.scrollBy({ left: (cardWidthRef.current + gap) * direction, behavior: 'smooth' });
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalRef.current = window.setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll(1);
                }
            }
        }, 4000);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    const handleContactAgent = (property: Property) => {
        setSelectedProperty(null);
        onContactClick({ propertyTitle: property.title });
    };

    const resetAutoScroll = () => {
        stopAutoScroll();
        startAutoScroll();
    };
    
  return (
    <>
    <section id="properties" className="bg-[#0A0D14] py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-[#D4AF37]">
            Featured Properties
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#E6E8EC] sm:text-4xl">
            Explore Our Curated Listings
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-[#9AA3B2]">
            Discover a selection of our finest properties, from modern lofts to luxurious family homes, each chosen for its unique character and investment potential.
          </p>
        </div>

        <div
          className="mt-16 relative"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
            <motion.div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 scrollbar-hide -mx-6 px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
            >
                <div className="flex gap-8">
                    {properties.map((property, index) => (
                        <motion.div
                        key={index}
                        className="bg-[#0C1018] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 group flex flex-col w-[90vw] sm:w-[45vw] lg:w-[30vw] flex-shrink-0 snap-start"
                        variants={cardVariants}
                        >
                        <div className="overflow-hidden">
                            <img src={property.image} alt={property.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-[#E6E8EC]">{property.title}</h3>
                            <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">{property.price}</p>
                            <div className="flex items-center space-x-6 mt-4 text-sm text-[#9AA3B2] border-t border-white/10 pt-4">
                                <span className="flex items-center"><BedIcon className="h-5 w-5 mr-2" /> {property.beds} Beds</span>
                                <span className="flex items-center"><BathIcon className="h-5 w-5 mr-2" /> {property.baths} Baths</span>
                                <span className="flex items-center"><AreaIcon className="h-5 w-5 mr-2" /> {property.sqft} sqft</span>
                            </div>
                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={() => setSelectedProperty(property)}
                                    className="w-full px-4 py-3 text-base font-semibold text-[#0A0D14] bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/20 hover:bg-yellow-300 transition-colors duration-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-0 pointer-events-none -mt-4">
                <button 
                    onClick={() => { scroll(-1); resetAutoScroll(); }}
                    className="pointer-events-auto bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300 -ml-4"
                    aria-label="Previous property"
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button 
                    onClick={() => { scroll(1); resetAutoScroll(); }}
                    className="pointer-events-auto bg-[#0A0D14]/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full p-2 transition-colors duration-300 -mr-4"
                    aria-label="Next property"
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
      </div>
    </section>

    <AnimatePresence>
        {selectedProperty && (
            <PropertyModal 
                property={selectedProperty} 
                onClose={() => setSelectedProperty(null)} 
                onContactAgent={() => handleContactAgent(selectedProperty)}
            />
        )}
    </AnimatePresence>
    </>
  );
};

export default Properties;
