'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
}) => {
  const variants = {
    primary: 'bg-white/5 text-[#A1A1AA] border border-white/10',
    accent: 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30 shadow-[0_0_12px_rgba(124,58,237,0.2)]',
    secondary: 'bg-white/10 text-white border border-white/20',
    outline: 'bg-transparent text-white/80 border border-white/20',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium rounded-md',
    md: 'text-xs px-3 py-1 font-medium rounded-lg',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-200',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
