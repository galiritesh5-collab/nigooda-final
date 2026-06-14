/**
 * NIGOODA Intelligence Parser — V2
 *
 * Converts AI markdown output into IntelligencePayload:
 * a tab-based, dashboard-ready data structure.
 *
 * Key improvements over V1:
 *  - Tab-based architecture (not flat block list)
 *  - Dynamic conditional tab detection
 *  - Score cards with full labels (no truncation)
 *  - Category-aware compatibility sections
 *  - Separate WHY THIS RATING section
 *  - Timeline-based results
 *  - Hero section extraction
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScoreItem {
  label: string;
  score: number;
  maxScore: number;
  reason?: string;
}

export interface CompatibilityItem {
  label: string;
  score: number;
  compatible: boolean;
  reason: string;
}

export interface Ingredient {
  name: string;
  purpose: string;
  group?: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  description?: string;
}

export interface TimelineItem {
  phase: 'immediate' | 'weeks' | 'months' | 'longterm';
  label: string;
  outcomes: string[];
}

export interface AlertItem {
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
}

export interface ConditionalSection {
  id: string;
  title: string;
  content: string[];
  type: 'herbal' | 'uv' | 'circadian' | 'acne' | 'scalp' | 'curl' | 'pigmentation' | 'evidence' | 'generic';
}

export interface HeroData {
  productName: string;
  productProfile: string;
  functionalClassification: string;
  structuralQuality: string;
  finalRating: number;
  maxRating: number;
  ratingLabel: string;
  compatibilityGuidance: string;
  category?: string;
}

export interface IntelligencePayload {
  hero: HeroData;
  overview: {
    productProfile: string[];
    structuralQuality: string[];
    whyThisRating: string[];
    bestSuitedFor: string[];
    quickUsageGuidance: string[];
  };
  coreScores: ScoreItem[];
  specializedScores: ScoreItem[];
  insights: {
    strengths: string[];
    weaknesses: string[];
    structuralInsights: string[];
  };
  compatibility: CompatibilityItem[];
  results: TimelineItem[];
  ingredients: Ingredient[];
  alerts: AlertItem[];
  conditionalSections: ConditionalSection[];
  productCategory: string;
  rawSections: Map<string, string[]>;
}

// ─── Section Detection ────────────────────────────────────────────────────────

type SectionMap = Map<string, string[]>;

function groupSections(lines: string[]): SectionMap {
  const sections: SectionMap = new Map();
  let currentHeader = '__intro__';
  sections.set(currentHeader, []);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed === '***') continue;

    const isHeader =
      trimmed.startsWith('#') ||
      /^[^\w]*[\u{1F300}-\u{1FAFF}]/u.test(trimmed) ||
      /^[A-Z\s⭐⚖🧴📊🧪👍⚠👤📅⏱🔬🧠📌🌿🌼🔍🚨⚕🧬💊🌱🌸].{2,}$/.test(trimmed);

    if (isHeader) {
      const key = trimmed.replace(/^[#\s*_-]+/, '').trim();
      currentHeader = key;
      if (!sections.has(currentHeader)) sections.set(currentHeader, []);
    } else {
      const bucket = sections.get(currentHeader);
      if (bucket) bucket.push(trimmed);
    }
  }

  return sections;
}

function findSection(sections: SectionMap, keywords: string[]): string[] {
  for (const [key, lines] of sections.entries()) {
    if (keywords.some((kw) => key.toUpperCase().includes(kw.toUpperCase()))) {
      return lines;
    }
  }
  return [];
}

function findSectionKey(sections: SectionMap, keywords: string[]): string | null {
  for (const [key] of sections.entries()) {
    if (keywords.some((kw) => key.toUpperCase().includes(kw.toUpperCase()))) {
      return key;
    }
  }
  return null;
}

function cleanBullet(line: string): string {
  return line.replace(/^[-*•·▸▹►→\s]+/, '').trim();
}

function normLines(lines: string[]): string[] {
  return lines.map(cleanBullet).filter(Boolean);
}

// ─── Score Parsing ────────────────────────────────────────────────────────────

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  const normalized = normLines(lines);

  let current: ScoreItem | null = null;

  for (const line of normalized) {
    // Match: "Label — ⭐X.X" or "Label: ⭐X.X" or "Label — ⭐X.X — reason"
    const match = line.match(/^([^—:–\-]+?)\s*[—:–\-]+\s*⭐?\s*(\d+\.?\d*)/);
    if (match) {
      if (current) items.push(current);
      const remaining = line.replace(match[0], '').replace(/^[—:–\-\s]+/, '').trim();
      current = {
        label: match[1].trim(),
        score: parseFloat(match[2]),
        maxScore: 5,
        reason: remaining || undefined,
      };
    } else if (current && line.length > 0) {
      current.reason = ((current.reason || '') + ' ' + line).trim();
    }
  }
  if (current) items.push(current);

  return items.filter((i) => i.score >= 0 && i.score <= 10);
}

// ─── Compatibility Parsing ────────────────────────────────────────────────────

function parseCompatibility(lines: string[]): CompatibilityItem[] {
  const items: CompatibilityItem[] = [];
  const normalized = normLines(lines);

  for (const line of normalized) {
    const match = line.match(/^([^—:–\-→]+?)\s*[—:–\-→]+\s*⭐?\s*(\d+\.?\d*)/);
    if (match) {
      const score = parseFloat(match[2]);
      const remaining = line.replace(match[0], '').replace(/^[—:–\-\s]+/, '').trim();
      items.push({
        label: match[1].trim(),
        score,
        compatible: score >= 3.0,
        reason: remaining || `Compatibility score: ${score}/5`,
      });
    }
  }

  return items.filter((i) => i.score >= 0);
}

// ─── Timeline Parsing ─────────────────────────────────────────────────────────

function parseTimeline(lines: string[]): TimelineItem[] {
  const phases: TimelineItem[] = [
    { phase: 'immediate', label: 'Immediate (1–7 Days)', outcomes: [] },
    { phase: 'weeks', label: 'Weeks (2–8 Weeks)', outcomes: [] },
    { phase: 'months', label: 'Months (2–12 Months)', outcomes: [] },
    { phase: 'longterm', label: 'Long-Term Reality', outcomes: [] },
  ];

  let currentPhase: TimelineItem | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isImmediate = /immediate|1.?7 day|first.?day|days?/i.test(trimmed);
    const isWeeks = /week|short.?term|2.?8 week/i.test(trimmed);
    const isMonths = /month|medium.?term|2.?12/i.test(trimmed);
    const isLongTerm = /long.?term|reality|sustainable|chronic|realistic/i.test(trimmed);

    if (isImmediate && !line.startsWith('-') && !line.startsWith('•')) {
      currentPhase = phases[0];
      const rest = trimmed.replace(/^[^:]+:\s*/, '').trim();
      if (rest && rest.length > 3) currentPhase.outcomes.push(cleanBullet(rest));
    } else if (isWeeks && !line.startsWith('-') && !line.startsWith('•')) {
      currentPhase = phases[1];
      const rest = trimmed.replace(/^[^:]+:\s*/, '').trim();
      if (rest && rest.length > 3) currentPhase.outcomes.push(cleanBullet(rest));
    } else if (isMonths && !line.startsWith('-') && !line.startsWith('•') && !isLongTerm) {
      currentPhase = phases[2];
      const rest = trimmed.replace(/^[^:]+:\s*/, '').trim();
      if (rest && rest.length > 3) currentPhase.outcomes.push(cleanBullet(rest));
    } else if (isLongTerm && !line.startsWith('-') && !line.startsWith('•')) {
      currentPhase = phases[3];
      const rest = trimmed.replace(/^[^:]+:\s*/, '').trim();
      if (rest && rest.length > 3) currentPhase.outcomes.push(cleanBullet(rest));
    } else if (currentPhase && (line.startsWith('-') || line.startsWith('•') || line.startsWith('*'))) {
      const clean = cleanBullet(trimmed);
      if (clean.length > 3) currentPhase.outcomes.push(clean);
    } else if (currentPhase && trimmed.length > 10 && !/^[A-Z\s]+$/.test(trimmed)) {
      currentPhase.outcomes.push(cleanBullet(trimmed));
    }
  }

  return phases.filter((p) => p.outcomes.length > 0);
}

// ─── Ingredient Parsing ───────────────────────────────────────────────────────

const INGREDIENT_GROUPS: Record<string, string[]> = {
  Humectants: ['glycerin', 'hyaluronic', 'sodium pca', 'urea', 'sorbitol', 'amino acid', 'panthenol', 'aloe'],
  'Barrier Lipids': ['ceramide', 'cholesterol', 'fatty acid', 'sphingosine', 'phytosphingosine'],
  Actives: ['niacinamide', 'retinol', 'vitamin c', 'ascorbic', 'salicylic', 'glycolic', 'lactic', 'kojic', 'azelaic', 'peptide'],
  Surfactants: ['sulfate', 'sulfonate', 'betaine', 'glucoside', 'sarcosinate', 'glutamate'],
  Emollients: ['dimethicone', 'squalane', 'jojoba', 'argan', 'shea', 'cocoa butter', 'mineral oil', 'petrolatum'],
  Sensitizers: ['fragrance', 'parfum', 'essential oil', 'limonene', 'linalool', 'eugenol', 'cinnamyl'],
  Preservatives: ['methylparaben', 'propylparaben', 'phenoxyethanol', 'benzalkonium', 'methylisothiazolinone', 'formaldehyde'],
};

function inferIngredientGroup(name: string): string {
  const lower = name.toLowerCase();
  for (const [group, keywords] of Object.entries(INGREDIENT_GROUPS)) {
    if (keywords.some((k) => lower.includes(k))) return group;
  }
  return 'Other';
}

function inferRiskLevel(name: string): 1 | 2 | 3 | 4 | 5 {
  const lower = name.toLowerCase();
  if (lower.includes('fragrance') || lower.includes('parfum') || lower.includes('formaldehyde')) return 4;
  if (lower.includes('methylisothiazolinone') || lower.includes('methylchloroisothiazolinone')) return 5;
  if (lower.includes('sulfate') || lower.includes('paraben')) return 3;
  if (lower.includes('alcohol') || lower.includes('acid') || lower.includes('retinol')) return 2;
  return 1;
}

function parseIngredients(lines: string[]): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (const line of lines) {
    const clean = cleanBullet(line);
    if (!clean || clean.length < 2) continue;
    const parts = clean.split(/[:—–\-]/);
    const name = parts[0]?.trim() ?? clean;
    const purpose = parts[1]?.trim() ?? 'Active Component';
    const description = parts.slice(2).join(' ').trim() || undefined;
    if (name.length < 2) continue;
    ingredients.push({
      name,
      purpose,
      group: inferIngredientGroup(name),
      riskLevel: inferRiskLevel(name),
      description,
    });
  }
  return ingredients;
}

// ─── Alert Parsing ────────────────────────────────────────────────────────────

function parseAlerts(lines: string[]): AlertItem[] {
  const alerts: AlertItem[] = [];
  for (const line of normLines(lines)) {
    if (!line || line.length < 5) continue;
    const severity = inferAlertSeverity(line);
    alerts.push({
      severity,
      title: extractAlertTitle(line),
      description: line,
    });
  }
  return alerts;
}

function inferAlertSeverity(text: string): AlertItem['severity'] {
  const lower = text.toLowerCase();
  if (lower.includes('critical') || lower.includes('avoid') || lower.includes('dangerous')) return 'critical';
  if (lower.includes('high') || lower.includes('significant') || lower.includes('severe')) return 'high';
  if (lower.includes('moderate') || lower.includes('caution') || lower.includes('sensitization')) return 'medium';
  return 'low';
}

function extractAlertTitle(text: string): string {
  const parts = text.split(/[:—–]/);
  if (parts[0] && parts[0].length < 60) return parts[0].trim();
  return text.substring(0, 50) + (text.length > 50 ? '...' : '');
}

// ─── Category Compatibility Guidance ─────────────────────────────────────────

const CATEGORY_GUIDANCE: Record<string, string> = {
  'skin-care': 'Check Skin Compatibility tab for personalized suitability analysis.',
  'skincare': 'Check Skin Compatibility tab for personalized suitability analysis.',
  'hair-care': 'Check Hair Compatibility tab for scalp and hair-type suitability.',
  'haircare': 'Check Hair Compatibility tab for scalp and hair-type suitability.',
  'body-care': 'Check Compatibility tab for long-term body skin suitability.',
  'bodycare': 'Check Compatibility tab for long-term body skin suitability.',
  'oral-care': 'Check Compatibility tab for oral safety and sensitivity suitability.',
  'hygiene': 'Check Compatibility tab for skin and sensitivity suitability.',
  'baby-care': 'Check Compatibility tab for baby skin safety and suitability.',
};

function getCategoryGuidance(category: string): string {
  const key = category.toLowerCase().replace(/\s+/g, '-');
  return CATEGORY_GUIDANCE[key] ?? 'Check Compatibility tab for personalized suitability analysis.';
}

// ─── Rating Label ─────────────────────────────────────────────────────────────

function getRatingLabel(rating: number, max: number): string {
  const pct = (rating / max) * 100;
  if (pct >= 90) return 'Exceptional';
  if (pct >= 80) return 'Advanced';
  if (pct >= 68) return 'Above Average';
  if (pct >= 50) return 'Moderate';
  if (pct >= 35) return 'Below Average';
  return 'Concerning';
}

// ─── Conditional Section Detection ───────────────────────────────────────────

const CONDITIONAL_SECTION_PATTERNS: Array<{
  keywords: string[];
  type: ConditionalSection['type'];
  label: string;
}> = [
  { keywords: ['HERBAL EVIDENCE', 'BOTANICAL', 'HERBAL QUALITY', 'PHYTOCHEMICAL'], type: 'herbal', label: 'Herbal Analysis' },
  { keywords: ['UV INTELLIGENCE', 'UV ANALYSIS', 'SUN PROTECTION', 'SPF', 'PHOTO'], type: 'uv', label: 'UV Intelligence' },
  { keywords: ['CIRCADIAN', 'NIGHT BIOLOGY', 'SLEEP CYCLE', 'NOCTURNAL'], type: 'circadian', label: 'Circadian Biology' },
  { keywords: ['ACNE ANALYSIS', 'COMEDOGENIC', 'ANTI-ACNE', 'BREAKOUT', 'PORE'], type: 'acne', label: 'Acne Analysis' },
  { keywords: ['SCALP INTELLIGENCE', 'SCALP ANALYSIS', 'SCALP HEALTH'], type: 'scalp', label: 'Scalp Analysis' },
  { keywords: ['CURL', 'CURLY', 'COIL', 'WAVE', 'FRIZZ'], type: 'curl', label: 'Curl Intelligence' },
  { keywords: ['PIGMENTATION', 'MELANIN', 'DARK SPOT', 'BRIGHTENING', 'WHITENING'], type: 'pigmentation', label: 'Pigmentation Analysis' },
  { keywords: ['TRUTH ABOUT', 'CLAIM ANALYSIS', 'MARKETING'], type: 'evidence', label: 'Claims Analysis' },
];

// ─── Main Parser ──────────────────────────────────────────────────────────────

export function parseIntelligenceMarkdown(
  markdown: string,
  productType: string = 'PRODUCT',
  category: string = 'personal-care'
): IntelligencePayload {
  if (!markdown || typeof markdown !== 'string') {
    return createEmptyPayload(productType, category);
  }

  const lines = markdown.split(/\r?\n/);
  const sections = groupSections(lines);
  const consumed = new Set<string>(['__intro__']);

  // ── Hero ──────────────────────────────────────────────────────────────────
  let finalRating = 0;
  let maxRating = 5;
  let ratingLabel = 'Moderate';
  let productProfile = '';
  let functionalClassification = productType;
  let structuralQuality = '';

  try {
    const ratingKey = findSectionKey(sections, ['FINAL RATING', 'RATING']);
    if (ratingKey) {
      const ratingText = [ratingKey, ...(sections.get(ratingKey) ?? [])].join(' ');
      const ratingMatch = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
      if (ratingMatch) {
        finalRating = parseFloat(ratingMatch[1]);
        maxRating = parseInt(ratingMatch[2], 10);
      }
      ratingLabel = getRatingLabel(finalRating, maxRating);
      consumed.add(ratingKey);
    }
  } catch { /* skip */ }

  try {
    // Product profile (cleanser/moisturizer/shampoo profile sections)
    const profileKey = findSectionKey(sections, ['PROFILE', 'MOISTURIZER PROFILE', 'CLEANSER PROFILE', 'SHAMPOO PROFILE', 'SERUM PROFILE', 'SUNSCREEN PROFILE']);
    if (profileKey) {
      const profileLines = sections.get(profileKey) ?? [];
      productProfile = normLines(profileLines).join(' ');
      functionalClassification = profileKey.replace(/^[^\w\s]+/, '').trim();
      consumed.add(profileKey);
    }
  } catch { /* skip */ }

  try {
    const sqKey = findSectionKey(sections, ['STRUCTURAL QUALITY']);
    if (sqKey) {
      structuralQuality = normLines(sections.get(sqKey) ?? []).join(' ');
      consumed.add(sqKey);
    }
  } catch { /* skip */ }

  const hero: HeroData = {
    productName: productType.replace(/_/g, ' '),
    productProfile: productProfile || structuralQuality,
    functionalClassification,
    structuralQuality,
    finalRating: finalRating || 3.0,
    maxRating,
    ratingLabel,
    compatibilityGuidance: getCategoryGuidance(category),
    category,
  };

  // ── Overview ──────────────────────────────────────────────────────────────
  const whyRatingKey = findSectionKey(sections, ['WHY THIS RATING', 'RATING RATIONALE']);
  const whyThisRating = whyRatingKey ? normLines(sections.get(whyRatingKey) ?? []) : [];
  if (whyRatingKey) consumed.add(whyRatingKey);

  const structuralInsightKey = findSectionKey(sections, ['STRUCTURAL INSIGHT']);
  const structuralInsightLines = structuralInsightKey ? sections.get(structuralInsightKey) ?? [] : [];
  if (structuralInsightKey) consumed.add(structuralInsightKey);

  const strengthsKey = findSectionKey(sections, ['STRENGTHS', 'STRENGTH']);
  const strengths = strengthsKey ? normLines(sections.get(strengthsKey) ?? []) : [];
  if (strengthsKey) consumed.add(strengthsKey);

  const concernsKey = findSectionKey(sections, ['CONCERNS', 'CONCERN', 'WEAKNESSES']);
  const concerns = concernsKey ? normLines(sections.get(concernsKey) ?? []) : [];
  if (concernsKey) consumed.add(concernsKey);

  // Parse structural insight sub-sections (Strengths / Weaknesses under it)
  let insightStrengths: string[] = strengths;
  let insightWeaknesses: string[] = concerns;
  if (structuralInsightLines.length > 0) {
    let inStrengths = false;
    let inWeaknesses = false;
    for (const line of structuralInsightLines) {
      if (/strength/i.test(line)) { inStrengths = true; inWeaknesses = false; continue; }
      if (/weakness|concern/i.test(line)) { inWeaknesses = true; inStrengths = false; continue; }
      const clean = cleanBullet(line);
      if (!clean) continue;
      if (inStrengths) insightStrengths.push(clean);
      else if (inWeaknesses) insightWeaknesses.push(clean);
    }
  }

  // ── Core Scores ───────────────────────────────────────────────────────────
  const coreKey = findSectionKey(sections, ['CORE SCORES', 'CORE SCORE']);
  const coreScores = coreKey ? parseScores(sections.get(coreKey) ?? []) : [];
  if (coreKey) consumed.add(coreKey);

  // ── Specialized Scores ────────────────────────────────────────────────────
  const specKey = findSectionKey(sections, ['SPECIALIZED PERFORMANCE', 'PERFORMANCE']);
  const specializedScores = specKey ? parseScores(sections.get(specKey) ?? []) : [];
  if (specKey) consumed.add(specKey);

  // ── Compatibility ─────────────────────────────────────────────────────────
  const compatKey = findSectionKey(sections, ['SKIN TYPE COMPATIBILITY', 'USER COMPATIBILITY', 'COMPATIBILITY', 'HAIR TYPE', 'SCALP TYPE']);
  const compatibility = compatKey ? parseCompatibility(sections.get(compatKey) ?? []) : [];
  if (compatKey) consumed.add(compatKey);

  // Long-term usability also relevant
  const ltKey = findSectionKey(sections, ['LONG-TERM USABILITY', 'LONG TERM USABILITY']);
  const ltLines = ltKey ? sections.get(ltKey) ?? [] : [];
  if (ltKey) consumed.add(ltKey);
  // Merge LT usability into compatibility if items found
  const ltCompat = parseCompatibility(ltLines);
  const mergedCompatibility = [...compatibility, ...ltCompat];

  // ── Results Timeline ──────────────────────────────────────────────────────
  const resultsKey = findSectionKey(sections, ['EXPECTED REAL-WORLD RESULTS', 'EXPECTED RESULTS', 'RESULTS TIMELINE']);
  const results = resultsKey ? parseTimeline(sections.get(resultsKey) ?? []) : [];
  if (resultsKey) consumed.add(resultsKey);

  // ── Ingredients ───────────────────────────────────────────────────────────
  const ingKey = findSectionKey(sections, ['KEY STRUCTURAL INGREDIENTS', 'KEY INGREDIENTS', 'INGREDIENTS']);
  const ingredients = ingKey ? parseIngredients(sections.get(ingKey) ?? []) : [];
  if (ingKey) consumed.add(ingKey);

  // ── Alerts ────────────────────────────────────────────────────────────────
  const alertSections = ['CRITICAL ALERTS', 'WARNINGS', 'SENSITIZATION RISK', 'SENSITIZATION', 'ALLERGY'];
  const allAlerts: AlertItem[] = [];
  for (const kw of alertSections) {
    const k = findSectionKey(sections, [kw]);
    if (k && !consumed.has(k)) {
      allAlerts.push(...parseAlerts(sections.get(k) ?? []));
      consumed.add(k);
    }
  }

  // ── Conditional Sections ──────────────────────────────────────────────────
  const conditionalSections: ConditionalSection[] = [];
  for (const pattern of CONDITIONAL_SECTION_PATTERNS) {
    const k = findSectionKey(sections, pattern.keywords);
    if (k && !consumed.has(k)) {
      const content = normLines(sections.get(k) ?? []);
      if (content.length > 0) {
        conditionalSections.push({
          id: k.toLowerCase().replace(/\s+/g, '-'),
          title: pattern.label,
          content,
          type: pattern.type,
        });
      }
      consumed.add(k);
    }
  }

  // Remaining unknown sections as generic conditional
  for (const [key, slines] of sections.entries()) {
    if (consumed.has(key) || key === '__intro__') continue;
    const content = normLines(slines);
    if (content.length >= 2) {
      const title = key.replace(/^[^\w\s]+/, '').trim() || 'Additional Analysis';
      conditionalSections.push({
        id: key.toLowerCase().replace(/\s+/g, '-'),
        title,
        content,
        type: 'generic',
      });
    }
  }

  // ── Best Suited For & Quick Guidance ──────────────────────────────────────
  const bestFor = insightStrengths.slice(0, 3);
  const quickGuidance: string[] = [];
  if (hero.compatibilityGuidance) quickGuidance.push(hero.compatibilityGuidance);

  return {
    hero,
    overview: {
      productProfile: productProfile ? [productProfile] : (structuralQuality ? [structuralQuality] : []),
      structuralQuality: structuralQuality ? [structuralQuality] : [],
      whyThisRating,
      bestSuitedFor: bestFor,
      quickUsageGuidance: quickGuidance,
    },
    coreScores,
    specializedScores,
    insights: {
      strengths: insightStrengths,
      weaknesses: insightWeaknesses,
      structuralInsights: normLines(structuralInsightLines),
    },
    compatibility: mergedCompatibility,
    results,
    ingredients,
    alerts: allAlerts,
    conditionalSections,
    productCategory: category,
    rawSections: sections,
  };
}

// ─── Empty Payload Fallback ───────────────────────────────────────────────────

function createEmptyPayload(productType: string, category: string): IntelligencePayload {
  return {
    hero: {
      productName: productType,
      productProfile: 'Analysis data unavailable',
      functionalClassification: productType,
      structuralQuality: '',
      finalRating: 0,
      maxRating: 5,
      ratingLabel: 'N/A',
      compatibilityGuidance: getCategoryGuidance(category),
      category,
    },
    overview: { productProfile: [], structuralQuality: [], whyThisRating: [], bestSuitedFor: [], quickUsageGuidance: [] },
    coreScores: [],
    specializedScores: [],
    insights: { strengths: [], weaknesses: [], structuralInsights: [] },
    compatibility: [],
    results: [],
    ingredients: [],
    alerts: [],
    conditionalSections: [],
    productCategory: category,
    rawSections: new Map(),
  };
}
