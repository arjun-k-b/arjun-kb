'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Certificate } from '@/types/certificate';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface CertificatesProps {
  certificates: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  return (
    <section id="certificates" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#7C3AED]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Verified Credentials"
          title="Certifications & Badges"
          subtitle="Official industry certifications from SAP, AWS, and leading cloud technology providers."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={fadeIn('up', 0.2)}>
              <GlassCard className="h-full flex flex-col justify-between p-6 hover:border-[#7C3AED]/50">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <Badge variant="accent" size="sm">
                      Issued {cert.issueDate}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white leading-snug">{cert.title}</h3>
                    <p className="text-xs font-semibold text-[#7C3AED]">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-[11px] text-[#A1A1AA]">ID: {cert.credentialId}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="primary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-4">
                  <Button
                    asAnchor
                    href={cert.credentialUrl}
                    target="_blank"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    Verify Credential
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
