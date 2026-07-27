'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { Education as EducationType } from '@/types/education';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface EducationProps {
  educationList: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ educationList }) => {
  return (
    <section id="education" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Academic Background"
          title="Education & Qualifications"
          subtitle="Formal university education, core theoretical foundation, and academic honors."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {educationList.map((edu) => (
              <motion.div key={edu.id} variants={fadeIn('up', 0.2)}>
                <GlassCard className="p-8 hover:border-[#7C3AED]/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-sm font-semibold text-[#7C3AED]">{edu.field}</p>
                        <p className="text-xs text-[#A1A1AA] flex items-center gap-2 mt-1">
                          <span>{edu.institution}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {edu.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1.5">
                      <Badge variant="accent">{edu.duration}</Badge>
                      {edu.grade && (
                        <span className="text-xs text-emerald-400 font-medium">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {edu.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
