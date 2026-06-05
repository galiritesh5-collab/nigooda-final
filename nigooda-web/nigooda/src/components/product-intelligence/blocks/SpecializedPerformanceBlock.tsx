/**
 * SpecializedPerformanceBlock
 *
 * Displays: Category-specific performance as COMPACT SCORE TILES.
 * Design: Premium card tiles with no progress bars.
 *         Score badge is color-coded and prominently displayed.
 *         Used for domain-specific metrics (SPF, UV coverage, whitening, etc.).
 *
 * Merge target: src/components/product-intelligence/blocks/SpecializedPerformanceBlock.tsx
 */

import React from 'react';
import { Zap } from 'lucide-react';
import type { SpecializedPerformanceBlockData } from '../types';
import { BaseCard } from './BaseCard';

type ScoreTier = 'exceptional' | 'good' | 'moderate' | 'low';

function getScoreTier(value: string | number): ScoreTier {
  if (typeof value === 'number') {
    if (value >= 4.5) return 'exceptional';
    if (value >= 3.5) return 'good';
    if (value >= 2.5) return 'moderate';
    return 'low';
  }
  const upper = String(value).toUpperCase();
  if (['EXCEPTIONAL', 'EXCELLENT', 'OUTSTANDING', 'VERY HIGH', 'HIGH'].includes(upper)) return 'exceptional';
  if (['GOOD', 'STRONG', 'ABOVE AVERAGE', 'MODERATE-HIGH'].includes(upper)) return 'good';
  if (['MODERATE', 'AVERAGE', 'FAIR', 'BELOW AVERAGE'].includes(upper)) return 'moderate';
  return 'low';
}

const tierStyles: Record<ScoreTier, { pill: string; glow: string; dot: string; label: string }> = {
  exceptional: {
    pill:  'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300/60',
    glow:  'bg-emerald-400/10',
    dot:   'bg-emerald-400',
    label: 'Exceptional',
  },
  good: {
    pill:  'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-300/60',
    glow:  'bg-indigo-400/10',
    dot:   'bg-indigo-400',
    label: 'Above Average',
  },
  moderate: {
    pill:  'bg-amber-100 text-amber-800 ring-1 ring-amber-300/60',
    glow:  'bg-amber-400/10',
    dot:   'bg-amber-400',
    label: 'Moderate',
  },
  low: {
    pill:  'bg-rose-100 text-rose-800 ring-1 ring-rose-300/60',
    glow:  'bg-rose-400/10',
    dot:   'bg-rose-400',
    label: 'Below Average',
  },
};

function formatValue(value: string | number): string {
  if (typeof value === 'number') return value.toFixed(1);
  return String(value);
}

export const SpecializedPerformanceBlock: React.FC<{ data: SpecializedPerformanceBlockData }> = ({ data }) => {
  return (
    <BaseCard label="Specialized Analysis" title={data.title ?? 'Specialized Performance'}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.items.map((item, idx) => {
          const tier = getScoreTier(item.value);
          const styles = tierStyles[tier];

          return (
            <div
              key={idx}
              className="relative group flex flex-col items-start p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Background glow spot */}
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl pointer-events-none ${styles.glow}`} />

              {/* Icon dot + label */}
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`} />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide line-clamp-1">
                  {item.label}
                </span>
              </div>

              {/* Score badge — the hero element — NO progress bar */}
              <div className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-2xl font-black tabular-nums mb-3 relative z-10 ${styles.pill}`}>
                {formatValue(item.value)}
              </div>

              {/* Tier label */}
              <div className="flex items-center gap-1.5 mb-3 relative z-10">
                <Zap className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {styles.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 relative z-10">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </BaseCard>
  );
};
