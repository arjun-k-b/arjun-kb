'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Layers, Code2 } from 'lucide-react';
import { SiteSettings } from '@/types/site';
import { Button } from '@/components/ui/Button';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface ResumeCtaProps {
  siteSettings: SiteSettings;
}

const resumes = [
  {
    id: 'sap',
    role: 'SAP ABAP Developer',
    subtitle: 'SAP ABAP • S/4HANA • Enterprise Development',
    href: '/resume/arjun-kb-sap-abap-resume.pdf',
    downloadName: 'arjun-kb-sap-abap-resume.pdf',
    buttonLabel: 'Download SAP Resume',
    Icon: Layers,
    borderClass: 'border-[#7C3AED]/40 hover:border-[#7C3AED]/80',
    bgClass: 'bg-[#7C3AED]/10 hover:bg-[#7C3AED]/15',
    iconBgClass: 'bg-[#7C3AED]/20 border-[#7C3AED]/40 text-[#A78BFA]',
    buttonVariant: 'primary' as const,
    buttonClass: 'shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:shadow-[0_0_30px_rgba(124,58,237,0.65)]',
  },
  {
    id: 'fullstack',
    role: 'Full-Stack Developer',
    subtitle: 'React • Next.js • Node.js • Full-Stack Development',
    href: '/resume/arjun-kb-fullstack-resume.pdf',
    downloadName: 'arjun-kb-fullstack-resume.pdf',
    buttonLabel: 'Download Full-Stack Resume',
    Icon: Code2,
    borderClass: 'border-[#0EA5E9]/30 hover:border-[#0EA5E9]/70',
    bgClass: 'bg-[#0EA5E9]/5 hover:bg-[#0EA5E9]/10',
    iconBgClass: 'bg-[#0EA5E9]/20 border-[#0EA5E9]/40 text-[#38BDF8]',
    buttonVariant: 'outline' as const,
    buttonClass: 'border-[#0EA5E9]/50 text-[#38BDF8] hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9]',
  },
];

export const ResumeCta: React.FC<ResumeCtaProps> = () => {
  return (
    <section className="py-20 bg-[#0B0B12] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-[#7C3AED]/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -right-20 top-1/2 w-72 h-72 bg-[#0EA5E9]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Download My{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-white bg-clip-text text-transparent">
              Resume
            </span>
          </h2>

          <p className="text-[#A1A1AA] text-sm sm:text-base max-w-md mx-auto">
            Choose the version that best matches the role you&apos;re hiring for.
          </p>
        </motion.div>

        {/* Resume cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
        >
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              variants={fadeIn('up', index * 0.12)}
              className={`group relative rounded-2xl border transition-all duration-300 p-6 flex flex-col gap-5 ${resume.bgClass} ${resume.borderClass}`}
            >
              {/* Icon + role info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 ${resume.iconBgClass}`}
                >
                  <resume.Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white leading-tight mb-1">
                    {resume.role}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {resume.subtitle}
                  </p>
                </div>
              </div>

              {/* Download button */}
              <Button
                asAnchor
                href={resume.href}
                download={resume.downloadName}
                variant={resume.buttonVariant}
                size="md"
                icon={<Download className="w-4 h-4" />}
                className={`w-full justify-center ${resume.buttonClass}`}
                aria-label={`${resume.buttonLabel} — ${resume.role}`}
              >
                {resume.buttonLabel}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
