/**
 * TimelineResultsBlock
 *
 * Displays: Vertical animated timeline of expected formulation outcomes.
 * Status: completed (emerald) | in-progress (indigo, pulsing) | pending (gray)
 *
 * Merge target: src/components/product-intelligence/blocks/TimelineResultsBlock.tsx
 */

import React from 'react';
import { CheckCircle2, Clock, Circle, TrendingUp } from 'lucide-react';
import type { TimelineResultsBlockData, TimelineStatus } from '../types';
import { BaseCard } from './BaseCard';

const statusConfig: Record<
  TimelineStatus,
  {
    dot: string;
    line: string;
    labelBg: string;
    labelColor: string;
    icon: React.ReactNode;
    textColor: string;
  }
> = {
  completed: {
    dot:        'bg-emerald-500 ring-4 ring-emerald-100',
    line:       'bg-emerald-200',
    labelBg:    'bg-emerald-100',
    labelColor: 'text-emerald-800',
    icon:       <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    textColor:  'text-gray-700',
  },
  'in-progress': {
    dot:        'bg-indigo-500 ring-4 ring-indigo-100 animate-pulse',
    line:       'bg-indigo-100',
    labelBg:    'bg-indigo-100',
    labelColor: 'text-indigo-800',
    icon:       <Clock className="w-4 h-4 text-indigo-500" />,
    textColor:  'text-gray-600',
  },
  pending: {
    dot:        'bg-gray-300 ring-4 ring-gray-100',
    line:       'bg-gray-100',
    labelBg:    'bg-gray-100',
    labelColor: 'text-gray-500',
    icon:       <Circle className="w-4 h-4 text-gray-400" />,
    textColor:  'text-gray-500',
  },
};

export const TimelineResultsBlock: React.FC<{ data: TimelineResultsBlockData }> = ({ data }) => {
  return (
    <BaseCard label="Results Timeline" title={data.title ?? 'Expected Formulation Outcomes'}>
      <div className="flex flex-col gap-0">
        {data.items.map((item, idx) => {
          const cfg = statusConfig[item.status];
          const isLast = idx === data.items.length - 1;

          return (
            <div key={idx} className="flex gap-5">
              {/* Timeline column */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${cfg.dot}`} />
                {!isLast && (
                  <div className={`w-0.5 flex-1 min-h-6 my-1 ${cfg.line}`} />
                )}
              </div>

              {/* Content column */}
              <div className={`pb-8 ${isLast ? 'pb-0' : ''} flex-1 min-w-0`}>
                <div className="flex items-start gap-3 mb-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.labelBg} ${cfg.labelColor}`}>
                    {cfg.icon}
                    {item.label}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${cfg.textColor}`}>
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          Achieved
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
          In Progress
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          Upcoming
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
          <TrendingUp className="w-3.5 h-3.5" />
          Based on clinical evidence
        </div>
      </div>
    </BaseCard>
  );
};
