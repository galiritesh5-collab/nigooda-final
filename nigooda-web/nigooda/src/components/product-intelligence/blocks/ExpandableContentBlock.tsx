/**
 * ExpandableContentBlock
 *
 * Displays: Collapsible accordion card for long-form AI rationale text.
 * Used for: WHY THIS RATING, TRUTH ABOUT CLAIMS, EVIDENCE sections (V1),
 *            SENSITIZATION RISK, and any unknown section fallback.
 *
 * Merge target: src/components/product-intelligence/blocks/ExpandableContentBlock.tsx
 */

import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import type { ExpandableContentBlockData } from '../types';
import { BaseCard } from './BaseCard';

export const ExpandableContentBlock: React.FC<{ data: ExpandableContentBlockData }> = ({ data }) => {
  const [open, setOpen] = useState(data.expanded ?? false);

  // Format content: convert newline bullets to readable paragraphs
  const paragraphs = data.content
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•·▸]+\s*/, '').trim())
    .filter(Boolean);

  return (
    <BaseCard noPadding className="overflow-hidden">
      {/* Trigger header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 ${
          open ? 'bg-gray-50/80' : 'bg-white hover:bg-gray-50/60'
        }`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-indigo-50 rounded-xl flex-shrink-0">
            <FileText className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="min-w-0">
            <span className="text-sm font-bold text-gray-800 truncate block">
              {data.title ?? 'Additional Analysis'}
            </span>
            {!open && (
              <span className="text-xs text-gray-400 font-medium">
                {paragraphs.length} insight{paragraphs.length !== 1 ? 's' : ''} — click to expand
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Collapsible content */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <div className="flex flex-col gap-3 mt-2">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-sm text-gray-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
