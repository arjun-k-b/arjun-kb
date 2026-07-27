'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowOnHover = true,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[#111118]/80 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300',
        glowOnHover && 'hover:border-[#7C3AED]/50 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.25)]',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-r from-[#7C3AED]/20 via-transparent to-[#7C3AED]/15 -z-10" />
      {children}
    </motion.div>
  );
};
