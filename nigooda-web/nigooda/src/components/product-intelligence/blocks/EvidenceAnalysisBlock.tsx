/**
 * EvidenceAnalysisBlock — V1
 *
 * V1 behavior: Renders evidence items as structured cards.
 * Parser in V1 produces expandable-content-block for markdown evidence sections.
 * This component handles direct JSON evidence-analysis block payloads.
 *
 * V2 upgrade path: Parser will produce structured evidence-analysis blocks
 * with claim/source/confidence from backend.
 *
 * Merge target: src/components/product-intelligence/blocks/EvidenceAnalysisBlock.tsx
 */

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { EvidenceAnalysisBlockData } from '../types';
import { BaseCard } from './BaseCard';

const ConfidenceBar: React.FC<{ confidence: number }> = ({ confidence }) => {
  const pct = Math.min(Math.max(confidence, 0), 100);
  const color =
    pct >= 80 ? 'from-emerald-400 to-teal-500'
    : pct >= 60 ? 'from-indigo-400 to-violet-500'
    : pct >= 40 ? 'from-amber-400 to-orange-500'
    : 'from-rose-400 to-red-500';

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums text-gray-500 w-10 text-right">
        {pct}%
      </span>
    </div>
  );
};

export const EvidenceAnalysisBlock: React.FC<{ data: EvidenceAnalysisBlockData }> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? data.items : data.items.slice(0, 3);
  const hasMore = data.items.length > 3;

  return (
    <BaseCard label="Evidence Quality" title={data.title ?? 'Clinical & Botanical Evidence'}>
      <div className="flex flex-col gap-4">
        {visible.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:bg-white transition-all duration-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="p-1.5 bg-indigo-50 rounded-lg flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800 leading-snug flex-1">
                {item.claim}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-3 ml-9">
              <ExternalLink className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 italic">{item.source}</span>
            </div>

            <div className="ml-9">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                Confidence
              </div>
              <ConfidenceBar confidence={item.confidence} />
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-all duration-200"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Show {data.items.length - 3} More Items</>
          )}
        </button>
      )}
    </BaseCard>
  );
};
