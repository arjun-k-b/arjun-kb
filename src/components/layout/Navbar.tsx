'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Download, ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from '@/components/ui/Button';

const navItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(navItems.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B12]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#7C3AED] transition-colors">
            Arjun<span className="text-[#7C3AED]">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isActive ? 'text-white font-semibold' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#7C3AED] rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            asAnchor
            href="/resume/resume.pdf"
            download
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Resume
          </Button>
          <Button
            asAnchor
            href="#contact"
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#A1A1AA] hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0B12]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]'
                        : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-4 flex flex-col gap-2.5 border-t border-white/10 mt-2">
                <Button
                  asAnchor
                  href="/resume/resume.pdf"
                  download
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download Resume
                </Button>
                <Button
                  asAnchor
                  href="#contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
