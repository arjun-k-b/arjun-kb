'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { Experience as ExperienceType } from '@/types/experience';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Career Journey"
          title="Work Experience"
          subtitle="A track record of engineering leadership, high-impact enterprise projects, and technical excellence."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#7C3AED]/40 to-transparent -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#7C3AED]/40 to-transparent -translate-x-1/2 sm:hidden" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  variants={fadeIn(isEven ? 'right' : 'left', 0.2)}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-[#0B0B12] border-2 border-[#7C3AED] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  </div>

                  {/* Card Container (Occupies 1/2 of timeline width on sm+) */}
                  <div className="w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0">
                    <GlassCard className="p-6 space-y-4 hover:border-[#7C3AED]/50">
                      {/* Header Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Badge variant="accent" size="sm">
                            {exp.duration}
                          </Badge>
                          {exp.isCurrent && (
                            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              Current Role
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-[#7C3AED] transition-colors">
                          {exp.position}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#A1A1AA]">
                          <span className="flex items-center gap-1 font-medium text-white/90">
                            <Building2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Role Description */}
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {exp.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="primary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
