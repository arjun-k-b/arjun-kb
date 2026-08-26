'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types/site';
import { Button } from '@/components/ui/Button';

interface ResumeCtaProps {
  siteSettings: SiteSettings;
}

export const ResumeCta: React.FC<ResumeCtaProps> = ({ siteSettings }) => {
  return (
    <section className="py-16 bg-[#0B0B12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-r from-[#7C3AED]/20 via-[#6D28D9]/15 to-[#111118] border border-[#7C3AED]/40 p-8 sm:p-12 overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.2)]"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#7C3AED]/30 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Interested in my SAP ABAP & Full-Stack capabilities?
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl">
                Download my complete resume for a detailed view of my enterprise experience, technical proficiencies, project milestones, and career qualifications.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-4">
              <Button
                asAnchor
                href={siteSettings.resumePdf}
                download
                variant="primary"
                size="lg"
                icon={<Download className="w-5 h-5" />}
                className="shadow-[0_0_25px_rgba(124,58,237,0.5)]"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
