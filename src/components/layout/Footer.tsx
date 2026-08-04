'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowUp, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/Icons';
import { SocialLink } from '@/types/social';
import { SiteSettings } from '@/types/site';

interface FooterProps {
  siteSettings: SiteSettings;
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ siteSettings, socialLinks }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'twitter':
        return <TwitterIcon className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-[#0B0B12] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7C3AED]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Info */}
          <div className="md:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteSettings.name}<span className="text-[#7C3AED]">.dev</span>
              </span>
            </a>
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-md">
              {siteSettings.bio}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {siteSettings.availability}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Hero', key: 'hero' },
                { name: 'About', key: 'about' },
                { name: 'Skills', key: 'skills' },
                { name: 'Experience', key: 'experience' },
                { name: 'Projects', key: 'projects' },
                { name: 'Education', key: 'education' },
                { name: 'Certificates', key: 'certificates' },
                { name: 'Blog', key: 'blog' },
                { name: 'Contact', key: 'contact' },
              ]
                .filter((item) =>
                  siteSettings.sections
                    ? siteSettings.sections[item.key as keyof typeof siteSettings.sections] !== false
                    : true
                )
                .map((link) => (
                  <li key={link.key}>
                    <a
                      href={`#${link.key}`}
                      className="text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-all duration-300 shadow-sm"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
            <p className="text-xs text-[#A1A1AA]">{siteSettings.location}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A1A1AA] flex items-center gap-1">
            © {new Date().getFullYear()} {siteSettings.name}. Built with{' '}
            <Heart className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED] inline" /> using Next.js 15
            & React 19.
          </p>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-xs font-medium text-[#A1A1AA] hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#7C3AED] transition-all duration-300"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
