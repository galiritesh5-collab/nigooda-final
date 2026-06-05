/**
 * StructuralSummaryBlock
 *
 * Displays: AI executive insight card with a summary paragraph
 * and up to 4 key highlighted findings as badge chips.
 *
 * Merge target: src/components/product-intelligence/blocks/StructuralSummaryBlock.tsx
 */

import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import type { StructuralSummaryBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const StructuralSummaryBlock: React.FC<{ data: StructuralSummaryBlockData }> = ({ data }) => {
  return (
    <BaseCard variant="glass" className="relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-400/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-100 rounded-2xl">
            <Brain className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-0.5">
              AI Executive Summary
            </div>
            <h3 className="text-base font-bold text-gray-900">
              {data.title ?? 'Structural Intelligence'}
            </h3>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-5 h-5 text-indigo-400/60" />
          </div>
        </div>

        {/* Summary paragraph */}
        <p className="text-sm text-gray-700 leading-relaxed mb-6 font-medium">
          {data.summary}
        </p>

        {/* Highlights */}
        {data.highlights && data.highlights.length > 0 && (
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Key Findings
            </div>
            <div className="flex flex-wrap gap-2">
              {data.highlights.map((hl, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/70 border border-indigo-100 text-indigo-800 rounded-full text-xs font-semibold shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {hl}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseCard>
  );
};
