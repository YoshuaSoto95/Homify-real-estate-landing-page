import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';

const navItems = [
  { name: 'About Us', href: '#about-us' },
  { name: 'Properties', href: '#properties' },
  { name: 'Realtors', href: '#realtors' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: LinkedinIcon, href: '#', name: 'LinkedIn' },
  { icon: TwitterIcon, href: '#', name: 'Twitter' },
  { icon: InstagramIcon, href: '#', name: 'Instagram' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C1018] border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand and Socials */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <LogoIcon className="h-8 w-8 text-[#D4AF37]" />
              <span className="text-2xl font-bold tracking-wider text-[#E6E8EC]">
                HomiFi
              </span>
            </div>
            <p className="text-[#9AA3B2] text-sm max-w-md">
              A premier society by realtors and investors dedicated to unlocking prime real estate opportunities for you.
            </p>
            <div className="flex space-x-5 mt-6">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[#9AA3B2] hover:text-[#D4AF37] transition-colors duration-300" aria-label={link.name}>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-[#9AA3B2] hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-white tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-[#9AA3B2]">
              <li>123 Luxury Lane, Metropolis, USA</li>
              <li>contact@homifi.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-center text-xs text-[#9AA3B2]">
            © 2026 HomiFi. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;