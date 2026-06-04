import React from 'react';
import { Activity } from 'lucide-react';
import { SpecializedPerformanceBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const SpecializedPerformanceBlock: React.FC<{ data: SpecializedPerformanceBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Performance Metrics'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex flex-col p-4 rounded-xl bg-indigo-50/30 border border-indigo-100/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Activity className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{item.label}</span>
            </div>
            <div className="text-3xl font-bold text-indigo-900 mb-2">
              {item.value}
            </div>
            <p className="text-xs text-indigo-600/70 font-medium leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
