'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/framer';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  subtitle,
  center = true,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className={`mb-12 md:mb-16 ${center ? 'text-center max-w-3xl mx-auto' : ''}`}
    >
      <Badge variant="accent" className="mb-4 uppercase tracking-widest text-[11px] font-semibold">
        {badgeText}
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {title.split(' ').map((word, idx) => {
          if (idx === title.split(' ').length - 1) {
            return (
              <span
                key={idx}
                className="bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-white bg-clip-text text-transparent ml-2"
              >
                {word}
              </span>
            );
          }
          return word + ' ';
        })}
      </h2>
      {subtitle && <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
};
