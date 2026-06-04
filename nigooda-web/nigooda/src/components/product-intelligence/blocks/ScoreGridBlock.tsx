import React from 'react';
import { ScoreGridBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const ScoreGridBlock: React.FC<{ data: ScoreGridBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Analysis Matrix'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.items.map((item, idx) => (
          <div 
            key={idx} 
            className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {item.label}
              </span>
              <div className="text-2xl font-bold text-gray-900">
                {item.score.toFixed(1)}
              </div>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                style={{ width: `${(item.score / 5) * 100}%` }}
              />
            </div>
            
            {item.reason && (
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {item.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
