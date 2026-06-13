import React, { useState } from 'react';
import Logo from './Logo';
import { Settings } from '../supabase';
import { Menu, X, MessageSquare, Shield } from 'lucide-react';

interface NavbarProps {
  settings: Settings;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navbar({ settings, currentView, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatWhatsAppLink = (number: string) => {
    const cleanNumber = number.replace(/[+\s\-()]/g, '');
    const message = encodeURIComponent("Hello! I am browsing the beautiful perfumes of The Sweet Savour and would love more information.");
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const menuItems = [
    { label: 'Collections', href: '#collections' },
    { label: 'Our Story', href: '#story' },
    { label: 'Why Oils', href: '#why-oils' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleMenuClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FBF9F6]/85 backdrop-blur-md border-b border-[#EACE8C]/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Title */}
          <div className="flex-1 flex justify-start items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center space-x-2 focus:outline-hidden group cursor-pointer"
              id="nav-logo-btn"
              title="Go to Home"
              aria-label="Go to Home"
            >
              <Logo className="h-14 py-1" showTagline={false} />
            </button>
          </div>

          {/* Desktop Navigation Links (Balanced to the Right) */}
          <div className="hidden md:flex flex-1 justify-end space-x-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className="text-base tracking-widest text-[#1A1A1A]/80 hover:text-gold uppercase font-medium transition duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1A1A] focus:outline-hidden cursor-pointer"
              title="Toggle mobile menu"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#EACE8C]/20 shadow-lg px-4 pt-2 pb-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className="text-left py-2 text-sm tracking-widest text-[#1A1A1A]/80 hover:text-gold uppercase font-medium border-b border-[#1A1A1A]/5 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
