import React from 'react';
import { COMPONENT_REGISTRY } from './registry';
import { AnalysisPayload, AnalysisBlock } from './types';

interface DynamicRendererProps {
  data: AnalysisPayload;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ data }) => {
  if (!data || !data.blocks) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">No analysis data available to render.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-8">
      {data.blocks.map((block: AnalysisBlock, index: number) => {
        const BlockComponent = COMPONENT_REGISTRY[block.type];

        if (!BlockComponent) {
          console.warn(`[DynamicRenderer] Unknown block type: ${block.type}`);
          return null;
        }

        return (
          <div 
            key={block.id || `${block.type}-${index}`}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <BlockComponent data={block} />
          </div>
        );
      })}
    </div>
  );
};

export default DynamicRenderer;