import React from 'react';
import { BookOpen, ExternalLink, Activity } from 'lucide-react';
import { EvidenceAnalysisBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const EvidenceAnalysisBlock: React.FC<{ data: EvidenceAnalysisBlockData }> = ({ data }) => {
  return (
    <BaseCard title={data.title || 'Evidence & Citations'}>
      <div className="space-y-4">
        {data.items.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-100 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <h5 className="font-bold text-gray-900 flex-1 leading-tight">{item.claim}</h5>
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 ml-4">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase">{Math.round(item.confidence * 100)}% Match</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold bg-indigo-50/50 self-start px-3 py-1.5 rounded-full border border-indigo-100/50 hover:bg-indigo-100 cursor-pointer transition-colors max-w-fit">
              <BookOpen className="w-3 h-3" />
              <span>Source: {item.source}</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};
