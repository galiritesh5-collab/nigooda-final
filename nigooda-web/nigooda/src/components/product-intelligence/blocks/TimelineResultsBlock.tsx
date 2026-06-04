import React from 'react';
import { History, CheckCircle, Clock, Circle } from 'lucide-react';
import { TimelineResultsBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const TimelineResultsBlock: React.FC<{ data: TimelineResultsBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Analysis Timeline'}>
      <div className="relative border-l-2 border-indigo-100 ml-3 py-2 space-y-8">
        {data.items.map((item, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute -left-[9px] top-0 p-1 bg-white border-2 border-indigo-100 rounded-full">
              {item.status === 'completed' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" /> :
               item.status === 'in-progress' ? <Clock className="w-3.5 h-3.5 text-indigo-500" /> :
               <Circle className="w-3.5 h-3.5 text-gray-300" />}
            </div>
            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-1">{item.label}</h5>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
