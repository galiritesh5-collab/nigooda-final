/**
 * CriticalAlertsBlock
 *
 * Displays: High-priority usage warnings in prominent rose-red banners.
 * These are must-read alerts placed prominently in the analysis.
 *
 * Merge target: src/components/product-intelligence/blocks/CriticalAlertsBlock.tsx
 */

import React from 'react';
import { TriangleAlert, ArrowRight } from 'lucide-react';
import type { CriticalAlertsBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const CriticalAlertsBlock: React.FC<{ data: CriticalAlertsBlockData }> = ({ data }) => {
  return (
    <BaseCard noPadding className="overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-600 to-red-600 text-white">
        <div className="p-1.5 bg-white/20 rounded-lg">
          <TriangleAlert className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
            Must Read
          </div>
          <div className="text-sm font-bold">
            {data.title ?? 'Critical Usage Alerts'}
          </div>
        </div>
        <div className="ml-auto text-white/60 text-sm font-bold">
          {data.alerts.length} alert{data.alerts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Alert cards */}
      <div className="divide-y divide-rose-100">
        {data.alerts.map((alert, idx) => (
          <div key={idx} className="p-6 bg-rose-50/60 hover:bg-rose-50 transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                    {alert.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-rose-900 leading-relaxed mb-3">
                  {alert.message}
                </p>
                {alert.action && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-white/80 border border-rose-200/60">
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-700 font-medium leading-relaxed">
                      {alert.action}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
