/**
 * AlertListBlock
 *
 * Displays: Severity-coded alert cards with colored left border accents.
 * Severity levels: low → medium → high → critical
 *
 * Merge target: src/components/product-intelligence/blocks/AlertListBlock.tsx
 */

import React from 'react';
import { Info, AlertTriangle, AlertOctagon, Flame } from 'lucide-react';
import type { AlertListBlockData, AlertSeverity } from '../types';
import { BaseCard } from './BaseCard';

const severityConfig: Record<
  AlertSeverity,
  {
    border: string;
    bg: string;
    iconBg: string;
    iconColor: string;
    titleColor: string;
    textColor: string;
    badge: string;
    icon: React.ReactNode;
    label: string;
  }
> = {
  low: {
    border: 'border-l-4 border-blue-400',
    bg: 'bg-blue-50/60',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    icon: <Info className="w-4 h-4" />,
    label: 'LOW',
  },
  medium: {
    border: 'border-l-4 border-amber-400',
    bg: 'bg-amber-50/60',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-900',
    textColor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
    icon: <AlertTriangle className="w-4 h-4" />,
    label: 'MEDIUM',
  },
  high: {
    border: 'border-l-4 border-orange-500',
    bg: 'bg-orange-50/60',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-900',
    textColor: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
    icon: <AlertOctagon className="w-4 h-4" />,
    label: 'HIGH',
  },
  critical: {
    border: 'border-l-4 border-rose-600',
    bg: 'bg-rose-50/80',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    titleColor: 'text-rose-900',
    textColor: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
    icon: <Flame className="w-4 h-4" />,
    label: 'CRITICAL',
  },
};

export const AlertListBlock: React.FC<{ data: AlertListBlockData }> = ({ data }) => {
  const sorted = [...data.alerts].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <BaseCard label="Safety Assessment" title={data.title ?? 'Alerts & Advisories'}>
      <div className="flex flex-col gap-3">
        {sorted.map((alert, idx) => {
          const cfg = severityConfig[alert.severity];
          return (
            <div
              key={idx}
              className={`flex items-start gap-4 p-5 rounded-2xl ${cfg.bg} ${cfg.border} transition-all duration-200 hover:brightness-95`}
            >
              <div className={`p-2 rounded-xl flex-shrink-0 ${cfg.iconBg} ${cfg.iconColor}`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`text-sm font-bold ${cfg.titleColor}`}>{alert.title}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${cfg.textColor}`}>{alert.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </BaseCard>
  );
};
