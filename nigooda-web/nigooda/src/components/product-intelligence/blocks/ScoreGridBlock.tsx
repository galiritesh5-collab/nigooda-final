/**
 * ScoreGridBlock
 *
 * Displays: Core intelligence metric cards with progress bars and score values.
 * Used for general analytical dimensions (Safety, Efficacy, Barrier, etc.).
 *
 * Merge target: src/components/product-intelligence/blocks/ScoreGridBlock.tsx
 */

import React from 'react';
import { Activity } from 'lucide-react';
import type { ScoreGridBlockData } from '../types';
import { BaseCard } from './BaseCard';

const getScoreColor = (score: number, max = 5): { bar: string; text: string; bg: string; border: string } => {
  const pct = (score / max) * 100;
  if (pct >= 85) return { bar: 'from-emerald-400 to-teal-500',   text: 'text-emerald-700', bg: 'bg-emerald-50',  border: 'border-emerald-200' };
  if (pct >= 68) return { bar: 'from-indigo-400 to-violet-500',  text: 'text-indigo-700',  bg: 'bg-indigo-50',   border: 'border-indigo-200'  };
  if (pct >= 50) return { bar: 'from-amber-400 to-orange-500',   text: 'text-amber-700',   bg: 'bg-amber-50',    border: 'border-amber-200'   };
  return             { bar: 'from-rose-400 to-red-500',          text: 'text-rose-700',    bg: 'bg-rose-50',     border: 'border-rose-200'    };
};

export const ScoreGridBlock: React.FC<{ data: ScoreGridBlockData }> = ({ data }) => {
  return (
    <BaseCard label="Analysis Matrix" title={data.title ?? 'Core Intelligence Metrics'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.items.map((item, idx) => {
          const colors = getScoreColor(item.score);
          const pct = Math.min((item.score / 5) * 100, 100);

          return (
            <div
              key={idx}
              className={`group relative p-5 rounded-2xl border ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/70 rounded-lg">
                    <Activity className={`w-3.5 h-3.5 ${colors.text}`} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    {item.label}
                  </span>
                </div>
                <span className={`text-2xl font-black tabular-nums ${colors.text}`}>
                  {item.score.toFixed(1)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-white/70 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Reason */}
              {item.reason && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {item.reason}
                </p>
              )}

              {/* Score out of 5 */}
              <div className="absolute bottom-4 right-5 text-[10px] font-semibold text-gray-300 tabular-nums">
                / 5
              </div>
            </div>
          );
        })}
      </div>
    </BaseCard>
  );
};
