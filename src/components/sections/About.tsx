'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { SiteSettings } from '@/types/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface AboutProps {
  siteSettings: SiteSettings;
}

export const About: React.FC<AboutProps> = ({ siteSettings }) => {
  const highlights = [
    'Senior Software Engineer with 6+ years of production experience',
    'Specialist in Next.js 15, React 19, TypeScript, and modern state management',
    'Enterprise SAP technical consultant (ABAP RAP, S/4HANA, OData, Fiori)',
    'Strong background in RESTful/GraphQL APIs, microservices, and Docker containers',
    'Passionate about performance optimization, micro-interactions, and accessibility',
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#7C3AED]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="About Me"
          title="Engineering Sleek & Scalable Systems"
          subtitle="Discover my background, core engineering philosophy, and technical highlights."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Column */}
          <motion.div
            variants={fadeIn('right', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/15 p-2 bg-[#111118]/80 shadow-[0_0_40px_rgba(124,58,237,0.2)] group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={siteSettings.aboutImage}
                  alt={siteSettings.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-50" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#111118]/90 backdrop-blur-md border border-white/10">
                <p className="text-white font-semibold text-sm">{siteSettings.name}</p>
                <p className="text-xs text-[#7C3AED]">{siteSettings.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Text & Highlights Column */}
          <motion.div
            variants={fadeIn('left', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-[#A1A1AA] text-base leading-relaxed">
              {siteSettings.aboutBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Core Highlights List */}
            <div className="pt-2">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#7C3AED]" />
                Key Professional Highlights
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn('up', index * 0.1)}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#7C3AED]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90 font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
