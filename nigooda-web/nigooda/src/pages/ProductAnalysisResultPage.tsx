/**
 * ProductAnalysisResultPage
 *
 * Full-page rendering of a NIGOODA product intelligence analysis result.
 *
 * Handles three backend response shapes:
 *  1. Structured block JSON (rawResult.blocks[]) → renders directly
 *  2. Markdown string (rawResult.analysis) → parses via markdownParser
 *  3. Legacy/unknown → extracts what it can, shows fallback hero block
 *
 * Also supports direct navigation (no state) with exampleData as preview.
 *
 * Merge target: src/pages/ProductAnalysisResultPage.tsx
 */

import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, BarChart2, Share2 } from 'lucide-react';
import DynamicRenderer from '../components/product-intelligence/DynamicRenderer';
import { parseMarkdownToBlocks } from '../utils/markdownParser';
import type { AnalysisPayload } from '../components/product-intelligence/types';
import exampleDataRaw from '../components/product-intelligence/exampleData.json';

// exampleData.json is now an array; use the first entry as default preview
const exampleData = Array.isArray(exampleDataRaw) ? exampleDataRaw[0] : exampleDataRaw;

// ─── Helper ───────────────────────────────────────────────────────────────────

function resolvePayload(rawResult: any): AnalysisPayload {
  if (!rawResult) return exampleData as AnalysisPayload;

  // Shape 1: already a block payload
  if (rawResult.blocks && Array.isArray(rawResult.blocks)) {
    return rawResult as AnalysisPayload;
  }

  // Shape 2: markdown string in 'analysis' field
  if (rawResult.analysis && typeof rawResult.analysis === 'string') {
    const label = rawResult.cleanser_type ?? rawResult.productType ?? 'PRODUCT';
    return parseMarkdownToBlocks(rawResult.analysis, label);
  }

  // Shape 3: legacy format with top-level markdown string
  if (rawResult.result && typeof rawResult.result === 'string') {
    return parseMarkdownToBlocks(rawResult.result, rawResult.productType ?? 'PRODUCT');
  }

  // Shape 4: bare markdown string passed directly
  if (typeof rawResult === 'string') {
    return parseMarkdownToBlocks(rawResult, 'PRODUCT');
  }

  // Fallback: extract what we can
  return {
    pageType: 'product-analysis',
    productId: `NIG-FALLBACK-${Date.now().toString().slice(-4)}`,
    blocks: [
      {
        type: 'hero-rating',
        id: 'hero-fallback',
        title: 'Product Analysis',
        rating: rawResult.finalRating ?? rawResult.rating ?? 3.0,
        maxRating: 5,
        summary: rawResult.productType ?? rawResult.category ?? 'Product Analysis',
        tags: [rawResult.productType ?? 'Analysis'],
      },
    ],
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ProductAnalysisResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { analysisResult?: any } | null;
  const rawResult = state?.analysisResult;

  const payload = useMemo(() => resolvePayload(rawResult), [rawResult]);

  const displayTitle = useMemo(() => {
    if (rawResult?.productType) return rawResult.productType;
    if (rawResult?.cleanser_type) return rawResult.cleanser_type.replace(/_/g, ' ');
    const heroBlock = payload.blocks.find((b) => b.type === 'hero-rating') as any;
    return heroBlock?.summary ?? 'Product Intelligence';
  }, [rawResult, payload]);

  const isPreview = !rawResult;

  return (
    <div className="min-h-screen bg-[#F8F9FC] relative overflow-x-hidden font-sans pb-24">
      {/* Global background blobs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-200/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-200/12 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-8">
        {/* ── Top Bar ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate('/product-intelligence')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            {isPreview && (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                Preview Mode
              </span>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-xs font-bold text-indigo-600">
              <Sparkles className="w-3.5 h-3.5" />
              AI Verified
            </div>
          </div>
        </div>

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Analysis Report
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {payload.productId ?? 'NIG-REPORT'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none uppercase">
              {displayTitle}
            </h1>

            <button
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-gray-500 bg-white border border-gray-200 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
              title="Share this report"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          <p className="text-sm text-gray-400 font-medium mt-3">
            <span className="inline-flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              Generated in real-time by NIGOODA Core AI Engine
            </span>
          </p>
        </div>

        {/* ── Dynamic Blocks ───────────────────────────────────────────── */}
        <DynamicRenderer data={payload} />

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center gap-5 border-t border-gray-200/60 pt-12">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 mb-1">Need another analysis?</p>
            <p className="text-sm text-gray-400">NIGOODA evaluates formulations on molecular evidence.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/product-intelligence')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              Analyze Another Product
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-4 rounded-2xl bg-white text-gray-600 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysisResultPage;
