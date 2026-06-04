import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { StructuralSummaryBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const StructuralSummaryBlock: React.FC<{ data: StructuralSummaryBlockData }> = ({ data }) => {
  return (
    <BaseCard className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold">{data.title || 'Executive AI Summary'}</h3>
      </div>
      
      <p className="text-lg text-gray-200 leading-relaxed mb-8 font-medium">
        {data.summary}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-300 font-medium">{highlight}</span>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
