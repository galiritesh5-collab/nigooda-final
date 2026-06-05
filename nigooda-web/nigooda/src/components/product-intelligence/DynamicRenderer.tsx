/**
 * NIGOODA DynamicRenderer
 *
 * Orchestrates rendering of a schema-driven AnalysisPayload into
 * staggered, animated block components via the COMPONENT_REGISTRY.
 *
 * Key behaviors:
 *  - Unknown block types → UnknownBlockFallback (never crash)
 *  - Empty payload → EmptyState
 *  - Staggered entry animations (100ms per block delay)
 *
 * Merge target: src/components/product-intelligence/DynamicRenderer.tsx
 */

import React from 'react';
import { AlertTriangle, LayoutGrid } from 'lucide-react';
import { COMPONENT_REGISTRY } from './registry';
import type{ AnalysisPayload, AnalysisBlock } from './types';

// ─── Unknown Block Fallback ───────────────────────────────────────────────────

const UnknownBlockFallback: React.FC<{ block: AnalysisBlock }> = ({ block }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50/60">
    <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
      <AlertTriangle className="w-4 h-4 text-amber-600" />
    </div>
    <div>
      <p className="text-sm font-semibold text-amber-800">
        Unknown block type: <code className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-xs">{block.type}</code>
      </p>
      <p className="text-xs text-amber-600 mt-1">
        Register this block type in <code className="font-mono">registry.ts</code> to render it.
      </p>
    </div>
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-5">
    <div className="p-5 bg-gray-100 rounded-3xl">
      <LayoutGrid className="w-10 h-10 text-gray-400" />
    </div>
    <div className="text-center">
      <p className="text-base font-semibold text-gray-500">No analysis data available</p>
      <p className="text-sm text-gray-400 mt-1">The AI engine returned no blocks to display.</p>
    </div>
  </div>
);

// ─── DynamicRenderer ─────────────────────────────────────────────────────────

interface DynamicRendererProps {
  data: AnalysisPayload;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ data }) => {
  if (!data || !data.blocks || data.blocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {data.blocks.map((block: AnalysisBlock, index: number) => {
        const BlockComponent = COMPONENT_REGISTRY[block.type];

        if (!BlockComponent) {
          console.warn(`[DynamicRenderer] Unknown block type: "${block.type}". Add it to registry.ts.`);
          return (
            <div
              key={block.id || `unknown-${index}`}
              className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <UnknownBlockFallback block={block} />
            </div>
          );
        }

        return (
          <div
            key={block.id || `${block.type}-${index}`}
            className="opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <BlockComponent data={block} />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicRenderer;
