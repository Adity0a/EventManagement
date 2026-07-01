import React from 'react';
import Logo from '../common/Logo';
import {
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';

/**
 * Footer Component
 * Displays brand info, useful links, and contact information
 */
const Footer = () => {
  const usefulLinks1 = [
    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Refund/Cancellation', href: '#' },
    { name: 'Holidays', href: '#' },
  ];

  const usefulLinks2 = [
    { name: 'Exhibition', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Corporate Offerings', href: '#' },
    { name: 'Venues', href: '#' },
    { name: 'Club Membership', href: '#' },
    { name: 'Referral program', href: '#' },
    { name: 'List Your Venue', href: '#' },
  ];

  const socialLinks = [
    {
      name: 'X',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Facebook',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: '#'
    },
  ];

  return (
    <footer className="bg-[#050714] text-gray-400 py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="space-y-6">
          <Logo light />
          <p className="text-sm leading-relaxed max-w-xs">
            Discover seamless event planning with India's Largest Event Booking Portal.
            Explore a vast array of venues and services, ensuring a perfect match for your occasions.
            From weddings to corporate events, our platform simplifies the booking process,
            offering convenience and choice in one centralized hub.
          </p>
        </div>

        {/* Useful Links Column 1 */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4 relative inline-block">
            Useful Links
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#7c3aed]"></div>
          </h3>
          <div className="mt-8 border-t border-gray-800/50">
            <ul className="space-y-0 text-sm">
              {usefulLinks1.map((link, idx) => (
                <li key={idx} className="border-b border-gray-800/50 py-3 group">
                  <a href={link.href} className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                    <ChevronRight size={14} className="text-[#7c3aed] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Useful Links Column 2 */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4 relative inline-block">
            Useful Links
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#7c3aed]"></div>
          </h3>
          <div className="mt-8 border-t border-gray-800/50">
            <ul className="space-y-0 text-sm">
              {usefulLinks2.map((link, idx) => (
                <li key={idx} className="border-b border-gray-800/50 py-3 group">
                  <a href={link.href} className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                    <ChevronRight size={14} className="text-[#7c3aed] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4 relative inline-block">
            Contact Us
            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#7c3aed]"></div>
          </h3>
          <div className="mt-8 pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Phone:</span>
                <a href="tel:+919773696123" className="text-[#7c3aed] hover:underline">+91 7736961239</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Phone:</span>
                <a href="tel:+918451901950" className="text-[#7c3aed] hover:underline">+91 1234123412</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">Email:</span>
                <a href="mailto:info@evently.com" className="text-[#7c3aed] hover:underline">info@evently.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#7c3aed] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

