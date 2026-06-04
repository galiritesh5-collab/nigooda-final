import React from 'react';
import { BlockType } from './types';

// Lazy load blocks for better performance
import { HeroRatingBlock } from './blocks/HeroRatingBlock';
import { ScoreGridBlock } from './blocks/ScoreGridBlock';
import { SpecializedPerformanceBlock } from './blocks/SpecializedPerformanceBlock';
import { InsightSplitBlock } from './blocks/InsightSplitBlock';
import { AlertListBlock } from './blocks/AlertListBlock';
import { IngredientListBlock } from './blocks/IngredientListBlock';
import { TimelineResultsBlock } from './blocks/TimelineResultsBlock';
import { CompatibilityGridBlock } from './blocks/CompatibilityGridBlock';
import { StructuralSummaryBlock } from './blocks/StructuralSummaryBlock';
import { EvidenceAnalysisBlock } from './blocks/EvidenceAnalysisBlock';
import { CriticalAlertsBlock } from './blocks/CriticalAlertsBlock';
import { ExpandableContentBlock } from './blocks/ExpandableContentBlock';

export const COMPONENT_REGISTRY: Record<BlockType, React.FC<{ data: any }>> = {
  'hero-rating': HeroRatingBlock,
  'score-grid': ScoreGridBlock,
  'specialized-performance-grid': SpecializedPerformanceBlock,
  'insight-split': InsightSplitBlock,
  'alert-list': AlertListBlock,
  'ingredient-list': IngredientListBlock,
  'timeline-results': TimelineResultsBlock,
  'compatibility-grid': CompatibilityGridBlock,
  'structural-summary': StructuralSummaryBlock,
  'evidence-analysis': EvidenceAnalysisBlock,
  'critical-alerts': CriticalAlertsBlock,
  'expandable-content-block': ExpandableContentBlock,
};
