import React from 'react';
import Logo from './Logo';
import { Settings } from '../supabase';
import { Mail, Phone, Instagram, Facebook, Twitter, Shield } from 'lucide-react';

interface FooterProps {
  settings: Settings;
  onNavigate: (view: string) => void;
}

export default function Footer({ settings, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Clean whatsapp link
  const cleanNumber = (settings?.whatsapp_number || '+237681193469').replace(/[+\s\-()]/g, '');
  const promptText = encodeURIComponent("Hello! I am browsing the beautiful perfumes of The Sweet Savour and would love more information.");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${promptText}`;

  return (
    <footer className="bg-[#111111] text-[#FAF6F0] pt-20 pb-8 border-t border-[#EACE8C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-2 flex flex-col items-start space-y-6">
            <Logo className="h-20 w-auto" showTagline={true} light={true} />
            <p className="text-base text-[#FAF6F0]/60 max-w-sm leading-relaxed tracking-wide">
              "For we are to God the pleasing aroma of Christ among those who are being saved and those who are perishing."
            </p>
            <p className="text-sm font-cinzel text-gold uppercase tracking-widest">
              — Philippians 4:18 (KJV)
            </p>
          </div>

          {/* Quick Nav Options */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-cinzel text-base uppercase tracking-widest text-gold text-left">Navigation</h4>
            <div className="flex flex-col space-y-2 text-base text-[#FAF6F0]/70">
              <a href="#collections" className="hover:text-gold transition duration-300 text-left">Our Collections</a>
              <a href="#story" className="hover:text-gold transition duration-300 text-left">About the Savour</a>
              <a href="#why-oils" className="hover:text-gold transition duration-300 text-left">Why Perfume Oils</a>
              <a href="#faq" className="hover:text-gold transition duration-300 text-left">Frequently Asked Questions</a>
            </div>
          </div>

          {/* Boutique Contact */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-cinzel text-base uppercase tracking-widest text-gold text-left">Contact & Care</h4>
            <div className="flex flex-col space-y-3 text-base text-[#FAF6F0]/70">
              
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-gold transition duration-300"
              >
                <Phone className="w-4 h-4 text-[#EACE8C]" />
                <span>{settings?.whatsapp_number || '+237 6 81 19 34 69'}</span>
              </a>

              <a 
                href={`mailto:${settings?.business_email || 'contact@thesweetsavour.com'}`}
                className="flex items-center gap-2 hover:text-gold transition duration-300"
              >
                <Mail className="w-4 h-4 text-[#EACE8C]" />
                <span>{settings?.business_email || 'contact@thesweetsavour.com'}</span>
              </a>

              <div className="flex space-x-4 pt-2">
                <a 
                  href={settings?.social_links?.instagram || "https://www.instagram.com/thesweetsavour_?igsh=YzljYTk1ODg3Zg=="}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-[#222] hover:bg-[#333] text-[#FAF6F0] hover:text-gold transition duration-300 rounded-full"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links?.facebook || "https://facebook.com/thesweetsavour"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-[#222] hover:bg-[#333] text-[#FAF6F0] hover:text-gold transition duration-300 rounded-full"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={settings?.social_links?.twitter || "https://twitter.com/thesweetsavour"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-[#222] hover:bg-[#333] text-[#FAF6F0] hover:text-gold transition duration-300 rounded-full"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Legal & Attribution Meta */}
        <div className="pt-8 border-t border-[#FAF6F0]/10 flex flex-col sm:flex-row justify-between items-center text-sm text-[#FAF6F0]/40 tracking-wider">
          <p className="mb-4 sm:mb-0 flex items-center gap-2">
            <span>&copy; {currentYear} The Sweet Savour. A Legacy in Scent.</span>
            <span className="opacity-30">|</span>
            <button 
              onClick={() => onNavigate('admin')}
              className="hover:text-gold transition duration-300 flex items-center gap-1 cursor-pointer focus:outline-hidden opacity-30 hover:opacity-100"
              title="Laura's Admin Entrance"
            >
              <Shield className="w-3 h-3" />
              <span>Owner Access</span>
            </button>
          </p>
          <div className="flex space-x-6">
            <span>Sourced via US & Dubai</span>
            <span>Premium Long-Lasting Oils</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
