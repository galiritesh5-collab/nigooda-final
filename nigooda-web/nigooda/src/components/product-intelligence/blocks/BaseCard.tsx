/**
 * NIGOODA BaseCard
 *
 * Universal glassmorphism card wrapper for all block components.
 * Supports optional variants, section labels, and hover elevation.
 *
 * Merge target: src/components/product-intelligence/blocks/BaseCard.tsx
 */

import React from 'react';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'flat';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  label?: string;         // small uppercase label above title
  variant?: CardVariant;
  noPadding?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default:  'bg-white/85 backdrop-blur-sm border border-gray-100/80 shadow-lg hover:shadow-xl',
  glass:    'bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl',
  elevated: 'bg-white border border-gray-100 shadow-2xl hover:shadow-[0_32px_64px_rgba(0,0,0,0.10)]',
  flat:     'bg-gray-50/80 border border-gray-100',
};

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className = '',
  title,
  label,
  variant = 'default',
  noPadding = false,
}) => {
  return (
    <div
      className={`rounded-3xl transition-all duration-300 ${variantClasses[variant]} ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}
    >
      {(label || title) && (
        <div className="mb-6">
          {label && (
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
              {label}
            </span>
          )}
          {title && (
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-snug">
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
