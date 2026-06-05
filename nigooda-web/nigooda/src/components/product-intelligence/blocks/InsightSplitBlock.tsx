/**
 * InsightSplitBlock
 *
 * Displays: Two-column pros vs. considerations split panel.
 * Supports: positive / neutral / negative variants per panel.
 *
 * Merge target: src/components/product-intelligence/blocks/InsightSplitBlock.tsx
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import type { InsightSplitBlockData, InsightVariant } from '../types';
import { BaseCard } from './BaseCard';

const variantConfig: Record<
  InsightVariant,
  {
    bg: string;
    border: string;
    icon: React.ReactNode;
    titleColor: string;
    dotColor: string;
    textColor: string;
  }
> = {
  positive: {
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-200/80',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    titleColor: 'text-emerald-900',
    dotColor: 'bg-emerald-400',
    textColor: 'text-emerald-800',
  },
  negative: {
    bg: 'bg-amber-50/80',
    border: 'border-amber-200/80',
    icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
    titleColor: 'text-amber-900',
    dotColor: 'bg-amber-400',
    textColor: 'text-amber-800',
  },
  neutral: {
    bg: 'bg-blue-50/80',
    border: 'border-blue-200/80',
    icon: <Info className="w-5 h-5 text-blue-600" />,
    titleColor: 'text-blue-900',
    dotColor: 'bg-blue-400',
    textColor: 'text-blue-800',
  },
};

const Panel: React.FC<{ side: InsightSplitBlockData['left'] }> = ({ side }) => {
  const config = variantConfig[side.variant];
  return (
    <div className={`flex-1 min-w-0 p-6 rounded-2xl border ${config.border} ${config.bg}`}>
      <div className="flex items-center gap-3 mb-5">
        {config.icon}
        <h4 className={`font-bold text-sm uppercase tracking-wide ${config.titleColor}`}>
          {side.title}
        </h4>
      </div>
      <ul className="space-y-3">
        {side.content.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dotColor}`} />
            <span className={`text-sm leading-relaxed ${config.textColor}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const InsightSplitBlock: React.FC<{ data: InsightSplitBlockData }> = ({ data }) => {
  return (
    <BaseCard label="Formulation Insight" title={data.title ?? 'Pros & Considerations'}>
      <div className="flex flex-col md:flex-row gap-4">
        <Panel side={data.left} />
        <Panel side={data.right} />
      </div>
    </BaseCard>
  );
};
