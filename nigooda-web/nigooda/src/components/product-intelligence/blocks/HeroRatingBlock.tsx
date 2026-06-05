/**
 * HeroRatingBlock
 *
 * Displays: Overall AI intelligence rating, summary label, and category tags.
 * Position: Always first block in any analysis result.
 *
 * Merge target: src/components/product-intelligence/blocks/HeroRatingBlock.tsx
 */

import React from 'react';
import { Star, Sparkles, ShieldCheck } from 'lucide-react';
import type { HeroRatingBlockData } from "../types";
import { BaseCard } from './BaseCard';

const getRatingColor = (rating: number, max: number): string => {
  const pct = (rating / max) * 100;
  if (pct >= 85) return 'from-emerald-500 to-teal-600';
  if (pct >= 68) return 'from-indigo-500 to-violet-600';
  if (pct >= 50) return 'from-amber-500 to-orange-600';
  return 'from-rose-500 to-red-600';
};

const getRatingLabel = (rating: number, max: number): string => {
  const pct = (rating / max) * 100;
  if (pct >= 90) return 'Exceptional';
  if (pct >= 80) return 'Advanced';
  if (pct >= 68) return 'Above Average';
  if (pct >= 50) return 'Moderate';
  if (pct >= 35) return 'Below Average';
  return 'Concerning';
};

export const HeroRatingBlock: React.FC<{ data: HeroRatingBlockData }> = ({ data }) => {
  const { rating, maxRating = 5, summary, tags = [] } = data;
  const percentage = Math.min((rating / maxRating) * 100, 100);
  const gradientClass = getRatingColor(rating, maxRating);
  const ratingLabel = getRatingLabel(rating, maxRating);
  const filledStars = Math.round((rating / maxRating) * 5);

  return (
    <BaseCard variant="elevated" className="relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
        {/* Left — text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              {data.title ?? 'NIGOODA Intelligence Rating'}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
            {summary}
          </h2>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 rounded-full text-xs font-semibold border border-gray-200 hover:border-indigo-200 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right — rating badge */}
        <div className={`relative flex-shrink-0 flex flex-col items-center justify-center w-52 h-52 rounded-3xl bg-gradient-to-br ${gradientClass} text-white shadow-xl shadow-indigo-200/50`}>
          {/* Verified badge */}
          <div className="absolute -top-3 -right-3 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-md border border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-bold text-gray-700">AI Verified</span>
          </div>

          <div className="text-6xl font-black mb-1 tabular-nums tracking-tighter">
            {rating.toFixed(1)}
          </div>

          <div className="text-white/70 text-sm font-medium mb-3">
            out of {maxRating}
          </div>

          {/* Star row */}
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < filledStars
                    ? 'fill-white text-white'
                    : 'fill-white/20 text-white/30'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-3 text-white/80 text-xs font-semibold uppercase tracking-wider">
            {ratingLabel}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
