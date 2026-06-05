/**
 * CompatibilityGridBlock
 *
 * Displays: Suitability grid for user/skin/use-case type compatibility.
 * Compatible → emerald check | Incompatible → rose X.
 *
 * Merge target: src/components/product-intelligence/blocks/CompatibilityGridBlock.tsx
 */

import React from 'react';
import { Check, X, Users } from 'lucide-react';
import type { CompatibilityGridBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const CompatibilityGridBlock: React.FC<{ data: CompatibilityGridBlockData }> = ({ data }) => {
  const compatible = data.items.filter((i) => i.compatible);
  const incompatible = data.items.filter((i) => !i.compatible);

  return (
    <BaseCard label="Compatibility Analysis" title={data.title ?? 'User Compatibility Matrix'}>
      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500">
            {compatible.length} of {data.items.length} types compatible
          </span>
        </div>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700"
            style={{ width: `${(compatible.length / data.items.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-emerald-600">
          {Math.round((compatible.length / data.items.length) * 100)}%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
              item.compatible
                ? 'bg-emerald-50/60 border-emerald-200/60 hover:bg-emerald-50'
                : 'bg-rose-50/40 border-rose-200/40 hover:bg-rose-50/60'
            }`}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                item.compatible ? 'bg-emerald-500' : 'bg-rose-400'
              }`}
            >
              {item.compatible ? (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              ) : (
                <X className="w-4 h-4 text-white" strokeWidth={3} />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold mb-1 ${item.compatible ? 'text-emerald-900' : 'text-rose-900'}`}>
                {item.label}
              </p>
              <p className={`text-xs leading-relaxed ${item.compatible ? 'text-emerald-700' : 'text-rose-700'}`}>
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
