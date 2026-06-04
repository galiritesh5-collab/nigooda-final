export type BlockType =
  | 'hero-rating'
  | 'score-grid'
  | 'specialized-performance-grid'
  | 'insight-split'
  | 'alert-list'
  | 'ingredient-list'
  | 'timeline-results'
  | 'compatibility-grid'
  | 'structural-summary'
  | 'evidence-analysis'
  | 'critical-alerts'
  | 'expandable-content-block';

export interface BaseBlock {
  type: BlockType;
  id: string;
  title?: string;
}

export interface HeroRatingBlockData extends BaseBlock {
  type: 'hero-rating';
  rating: number;
  maxRating?: number;
  summary: string;
  tags?: string[];
}

export interface ScoreItem {
  label: string;
  score: number;
  reason?: string;
  color?: string;
}

export interface ScoreGridBlockData extends BaseBlock {
  type: 'score-grid';
  items: ScoreItem[];
}

export interface SpecializedPerformanceBlockData extends BaseBlock {
  type: 'specialized-performance-grid';
  items: {
    label: string;
    value: string | number;
    description: string;
    icon?: string;
  }[];
}

export interface InsightSplitBlockData extends BaseBlock {
  type: 'insight-split';
  left: {
    title: string;
    content: string[];
    variant: 'positive' | 'neutral' | 'negative';
  };
  right: {
    title: string;
    content: string[];
    variant: 'positive' | 'neutral' | 'negative';
  };
}

export interface AlertItem {
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
}

export interface AlertListBlockData extends BaseBlock {
  type: 'alert-list';
  alerts: AlertItem[];
}

export interface Ingredient {
  name: string;
  purpose: string;
  riskLevel: 1 | 2 | 3 | 4 | 5; // 1 lowest, 5 highest
  description?: string;
}

export interface IngredientListBlockData extends BaseBlock {
  type: 'ingredient-list';
  ingredients: Ingredient[];
}

export interface TimelineItem {
  label: string;
  value: string;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface TimelineResultsBlockData extends BaseBlock {
  type: 'timeline-results';
  items: TimelineItem[];
}

export interface CompatibilityGridBlockData extends BaseBlock {
  type: 'compatibility-grid';
  items: {
    label: string;
    compatible: boolean;
    reason: string;
  }[];
}

export interface StructuralSummaryBlockData extends BaseBlock {
  type: 'structural-summary';
  summary: string;
  highlights: string[];
}

export interface EvidenceItem {
  claim: string;
  source: string;
  confidence: number;
}

export interface EvidenceAnalysisBlockData extends BaseBlock {
  type: 'evidence-analysis';
  items: EvidenceItem[];
}

export interface CriticalAlertsBlockData extends BaseBlock {
  type: 'critical-alerts';
  alerts: {
    type: string;
    message: string;
    action?: string;
  }[];
}

export interface ExpandableContentBlockData extends BaseBlock {
  type: 'expandable-content-block';
  content: string;
  expanded?: boolean;
}

export type AnalysisBlock =
  | HeroRatingBlockData
  | ScoreGridBlockData
  | SpecializedPerformanceBlockData
  | InsightSplitBlockData
  | AlertListBlockData
  | IngredientListBlockData
  | TimelineResultsBlockData
  | CompatibilityGridBlockData
  | StructuralSummaryBlockData
  | EvidenceAnalysisBlockData
  | CriticalAlertsBlockData
  | ExpandableContentBlockData;

export interface AnalysisPayload {
  pageType: string;
  productId?: string;
  blocks: AnalysisBlock[];
}
