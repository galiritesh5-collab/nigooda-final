import React from 'react';
import { UserCheck, UserX, HelpCircle } from 'lucide-react';
import { CompatibilityGridBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const CompatibilityGridBlock: React.FC<{ data: CompatibilityGridBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Compatibility Matrix'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
            item.compatible ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${item.compatible ? 'text-emerald-900' : 'text-rose-900'}`}>
                {item.label}
              </span>
              {item.compatible ? <UserCheck className="w-4 h-4 text-emerald-600" /> : <UserX className="w-4 h-4 text-rose-600" />}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              — {item.reason}
            </p>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
