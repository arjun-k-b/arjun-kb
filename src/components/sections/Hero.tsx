'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, Sparkles, Code2, Terminal, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/types/site';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fadeIn, floatAnimation } from '@/lib/framer';

interface HeroProps {
  siteSettings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ siteSettings }) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumePickerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % siteSettings.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [siteSettings.titles]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumePickerRef.current && !resumePickerRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    if (resumeOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [resumeOpen]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#0B0B12]">
      {/* Cinematic Violet Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/20 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#6D28D9]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text & CTA Content (7 cols on lg) */}
          <motion.div
            variants={fadeIn('right', 0.2)}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-white text-xs font-medium backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#7C3AED] animate-spin-slow" />
              <span>{siteSettings.availability}</span>
            </div>

            {/* Main Headline & Position */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-white via-white to-[#7C3AED] bg-clip-text text-transparent">
                  {siteSettings.name}
                </span>
              </h1>

              <div className="pt-1">
                <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-white bg-clip-text text-transparent">
                  {siteSettings.role}
                </p>
              </div>
            </div>

            {/* Intro Description */}
            <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              SAP ABAP developer experienced in building enterprise applications, reports, workflows and custom SAP solutions, with additional experience in modern full-stack and embedded development.
            </p>

            {/* Key Metrics Pill Grid */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-4 max-w-lg">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-2xl sm:text-3xl font-bold text-white">{siteSettings.yearsOfExperience}+</p>
                <p className="text-xs text-[#A1A1AA]">Years Exp.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-2xl sm:text-3xl font-bold text-[#7C3AED]">{siteSettings.completedProjects}+</p>
                <p className="text-xs text-[#A1A1AA]">Projects</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <p className="text-2xl sm:text-3xl font-bold text-white">{siteSettings.codeQuality}+</p>
                <p className="text-xs text-[#A1A1AA]">Core Domains</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Resume Download Picker */}
              <div className="relative" id="hero-resume-picker" ref={resumePickerRef}>
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Download className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => setResumeOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={resumeOpen}
                >
                  View Resume
                  <svg
                    className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${resumeOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                {resumeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-64 rounded-xl bg-[#111118] border border-[#7C3AED]/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-50"
                    role="menu"
                  >
                    <a
                      href="https://drive.google.com/file/d/1QLD-f20jQEY07OsJ8Qe3GrCEDcGR0vLW/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setResumeOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#7C3AED]/15 transition-colors duration-200 group border-b border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#A78BFA] shrink-0 group-hover:scale-110 transition-transform">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">SAP ABAP Developer</p>
                        <p className="text-[10px] text-[#A1A1AA]">SAP ABAP • S/4HANA</p>
                      </div>
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1xKCQWl_3136ThHAFB1Ik-zUx1iKtNcjF/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setResumeOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#0EA5E9]/10 transition-colors duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0EA5E9]/20 border border-[#0EA5E9]/40 flex items-center justify-center text-[#38BDF8] shrink-0 group-hover:scale-110 transition-transform">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Full-Stack Developer</p>
                        <p className="text-[10px] text-[#A1A1AA]">React • Next.js • Node.js</p>
                      </div>
                    </a>
                  </motion.div>
                )}
              </div>

              <Button
                asAnchor
                href="#projects"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Projects
              </Button>

              <Button
                asAnchor
                href="#contact"
                variant="outline"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Contact Me
              </Button>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={siteSettings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#7C3AED] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-white transition-all duration-300"
                >
                  <Code2 className="w-5 h-5" />
                </a>
                <a
                  href={siteSettings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#7C3AED] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-white transition-all duration-300"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Portrait Column (5 cols on lg) */}
          <motion.div
            variants={fadeIn('left', 0.4)}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Floating Portrait Container with Violet Glow Ring */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              className="relative w-[290px] sm:w-[380px] h-[360px] sm:h-[460px]"
            >
              {/* Violet Ambient Glow Halo Behind Image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#6D28D9] to-[#A78BFA] opacity-50 blur-2xl -z-10 scale-105" />

              {/* Glassmorphic Frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 p-2 bg-[#111118]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.35)]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={siteSettings.heroImage}
                    alt={siteSettings.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle dark gradient overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Tech Pill Badge 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-6 bg-[#111118]/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED]">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Full-Stack Developer</p>
                  <p className="text-[10px] text-[#A1A1AA]">MERN Stack</p>
                </div>
              </motion.div>

              {/* Floating Tech Pill Badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-6 bg-[#111118]/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED]">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">SAP ABAP Developer</p>
                  <p className="text-[10px] text-[#A1A1AA]"></p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
