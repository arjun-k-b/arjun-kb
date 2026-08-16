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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % siteSettings.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [siteSettings.titles]);

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

            {/* Main Headline & Animated Developer Titles */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-white via-white to-[#7C3AED] bg-clip-text text-transparent">
                  {siteSettings.name}
                </span>
              </h1>

              {/* Dynamic Title Switcher */}
              <div className="h-12 sm:h-14 flex items-center">
                <span className="text-xl sm:text-3xl font-semibold text-[#A1A1AA] mr-3">I am a</span>
                <motion.span
                  key={currentTitleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-white bg-clip-text text-transparent"
                >
                  {siteSettings.titles[currentTitleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Intro Description */}
            <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {siteSettings.bio}
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
                <p className="text-2xl sm:text-3xl font-bold text-white">{siteSettings.codeQuality}%</p>
                <p className="text-xs text-[#A1A1AA]">Code Quality</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asAnchor
                href="#projects"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Projects
              </Button>

              <Button
                asAnchor
                href={siteSettings.resumePdf}
                download
                variant="secondary"
                size="lg"
                icon={<Download className="w-4 h-4" />}
              >
                Download Resume
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
                  <p className="text-xs font-semibold text-white">Full-Stack Architect</p>
                  <p className="text-[10px] text-[#A1A1AA]">Next.js 15 & React 19</p>
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
                  <p className="text-xs font-semibold text-white">SAP S/4HANA</p>
                  <p className="text-[10px] text-[#A1A1AA]">ABAP RAP & OData</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
