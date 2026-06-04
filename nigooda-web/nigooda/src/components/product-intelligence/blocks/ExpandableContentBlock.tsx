import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { ExpandableContentBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const ExpandableContentBlock: React.FC<{ data: ExpandableContentBlockData }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(data.expanded || false);

  return (
    <BaseCard className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-indigo-50 transition-colors">
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{data.title || 'Technical Details'}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </div>
      
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed font-medium">
            {data.content.split('\n').map((line, i) => (
              <p key={i} className="mb-4">{line}</p>
            ))}
          </div>
        </div>
      )}
    </BaseCard>
  );
};
