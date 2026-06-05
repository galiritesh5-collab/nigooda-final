/**
 * IngredientListBlock
 *
 * Displays: Ingredient cards with risk-level color coding.
 * Risk scale: 1 (safest / green) → 5 (highest concern / red).
 *
 * Merge target: src/components/product-intelligence/blocks/IngredientListBlock.tsx
 */

import React from 'react';
import { FlaskConical, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';
import type { IngredientListBlockData, Ingredient } from '../types';
import { BaseCard } from './BaseCard';

type RiskLevel = 1 | 2 | 3 | 4 | 5;

const riskConfig: Record<
  RiskLevel,
  { badge: string; border: string; bg: string; label: string; icon: React.ReactNode }
> = {
  1: {
    badge: 'bg-emerald-100 text-emerald-800',
    border: 'border-emerald-200/60',
    bg: 'hover:bg-emerald-50/40',
    label: 'Safe',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
  },
  2: {
    badge: 'bg-teal-100 text-teal-800',
    border: 'border-teal-200/60',
    bg: 'hover:bg-teal-50/40',
    label: 'Low Risk',
    icon: <Shield className="w-3.5 h-3.5 text-teal-600" />,
  },
  3: {
    badge: 'bg-amber-100 text-amber-800',
    border: 'border-amber-200/60',
    bg: 'hover:bg-amber-50/30',
    label: 'Moderate',
    icon: <Shield className="w-3.5 h-3.5 text-amber-600" />,
  },
  4: {
    badge: 'bg-orange-100 text-orange-800',
    border: 'border-orange-200/60',
    bg: 'hover:bg-orange-50/30',
    label: 'Caution',
    icon: <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />,
  },
  5: {
    badge: 'bg-rose-100 text-rose-800',
    border: 'border-rose-200/60',
    bg: 'hover:bg-rose-50/30',
    label: 'High Risk',
    icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />,
  },
};

const RiskDots: React.FC<{ level: RiskLevel }> = ({ level }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((dot) => (
      <div
        key={dot}
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          dot <= level
            ? level <= 2 ? 'bg-emerald-400' : level <= 3 ? 'bg-amber-400' : 'bg-rose-400'
            : 'bg-gray-200'
        }`}
      />
    ))}
  </div>
);

const IngredientCard: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
  const cfg = riskConfig[ingredient.riskLevel];
  return (
    <div className={`group p-5 rounded-2xl border ${cfg.border} bg-white ${cfg.bg} transition-all duration-200`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 bg-gray-100 rounded-lg flex-shrink-0">
            <FlaskConical className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <span className="text-sm font-bold text-gray-900 truncate">{ingredient.name}</span>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex-shrink-0 ${cfg.badge}`}>
          {cfg.icon}
          {cfg.label}
        </span>
      </div>

      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {ingredient.purpose}
      </div>

      {ingredient.description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {ingredient.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <RiskDots level={ingredient.riskLevel} />
        <span className="text-[10px] text-gray-400 font-medium">Risk Level {ingredient.riskLevel}/5</span>
      </div>
    </div>
  );
};

export const IngredientListBlock: React.FC<{ data: IngredientListBlockData }> = ({ data }) => {
  const sorted = [...data.ingredients].sort((a, b) => b.riskLevel - a.riskLevel);

  return (
    <BaseCard label="Ingredient Intelligence" title={data.title ?? 'Key Structural Ingredients'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((ing, idx) => (
          <IngredientCard key={idx} ingredient={ing} />
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-6 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Safe (1–2)</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />Moderate (3)</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />Caution (4–5)</span>
      </div>
    </BaseCard>
  );
};
