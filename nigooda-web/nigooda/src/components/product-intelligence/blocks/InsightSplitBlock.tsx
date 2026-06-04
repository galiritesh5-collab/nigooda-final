import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { InsightSplitBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const InsightSplitBlock: React.FC<{ data: InsightSplitBlockData }> = ({ data }) => {
  const renderSide = (side: any, type: 'left' | 'right') => {
    const isPositive = side.variant === 'positive';
    const isNegative = side.variant === 'negative';
    
    return (
      <div className={`p-6 rounded-2xl ${
        isPositive ? 'bg-emerald-50 border-emerald-100' : 
        isNegative ? 'bg-amber-50 border-amber-100' : 
        'bg-blue-50 border-blue-100'
      } border flex-1`}>
        <div className="flex items-center gap-3 mb-6">
          {isPositive ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : 
           isNegative ? <AlertCircle className="w-5 h-5 text-amber-600" /> : 
           <Info className="w-5 h-5 text-blue-600" />}
          <h4 className={`font-bold ${
            isPositive ? 'text-emerald-900' : 
            isNegative ? 'text-amber-900' : 
            'text-blue-900'
          }`}>{side.title}</h4>
        </div>
        <ul className="space-y-3">
          {side.content.map((item: string, idx: number) => (
            <li key={idx} className="flex gap-2 text-sm">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                isPositive ? 'bg-emerald-400' : 
                isNegative ? 'bg-amber-400' : 
                'bg-blue-400'
              }`} />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <BaseCard title={data.title}>
      <div className="flex flex-col md:flex-row gap-6">
        {renderSide(data.left, 'left')}
        {renderSide(data.right, 'right')}
      </div>
    </BaseCard>
  );
};
