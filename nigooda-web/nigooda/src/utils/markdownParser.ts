/**
 * NIGOODA Markdown Parser — V1
 *
 * Converts AI-generated markdown text output into the NIGOODA
 * Universal Block Schema (AnalysisPayload).
 *
 * This is a TEMPORARY V1 bridge while backend is refactored to
 * return structured block JSON directly.
 *
 * Design principles:
 *  - Fail gracefully: never throw on bad input
 *  - Category-agnostic: no product-specific logic
 *  - Unknown sections → expandable-content-block (not discarded)
 *  - Each section parse is isolated (one failure won't crash the rest)
 *
 * Merge target: src/utils/markdownParser.ts
 */

import type {
  AnalysisPayload,
  AnalysisBlock,
  ScoreItem,
  Ingredient,
  TimelineItem,
  AlertItem,
  AlertSeverity,
  CompatibilityItem,
} from '../components/product-intelligence/types';

// ─── Section Header Detection ─────────────────────────────────────────────────

/**
 * Known section header keywords (emoji + label patterns).
 * Order matters: more specific patterns should come before generic ones.
 */
const KNOWN_HEADERS: string[] = [
  '⭐ FINAL RATING',
  '⚖ STRUCTURAL QUALITY',
  '🧴 CLEANSER PROFILE',
  '🌿 HERBAL/ORGANIC PROFILE',
  '🌿 ORGANIC PROFILE',
  '📊 CORE SCORES',
  '🧪 SPECIALIZED PERFORMANCE',
  '🌱 HERBAL EVIDENCE QUALITY',
  '🌼 SENSITIZATION RISK',
  '👍 STRENGTHS',
  '⚠ CONCERNS',
  '🔍 THE TRUTH ABOUT',
  '👤 SKIN TYPE COMPATIBILITY',
  '👤 USER COMPATIBILITY',
  '📅 LONG-TERM USABILITY',
  '⏱ EXPECTED RESULTS',
  '🔬 KEY STRUCTURAL INGREDIENTS',
  '🔬 KEY INGREDIENTS',
  '🧠 WHY THIS RATING',
  '📌 STRUCTURAL INSIGHT',
  '⚠️ CRITICAL ALERTS',
  '🚨 WARNINGS',
];

function isKnownHeader(line: string): boolean {
  return KNOWN_HEADERS.some((h) => line.includes(h));
}

function isGenericHeader(line: string): boolean {
  // Markdown headings or ALL-CAPS lines with emoji indicators
  return (
    line.startsWith('#') ||
    /^[^\w]*[\u{1F300}-\u{1FAFF}]/u.test(line)
  );
}

// ─── Section Grouping ─────────────────────────────────────────────────────────

type SectionMap = Map<string, string[]>;

function groupIntoSections(lines: string[]): SectionMap {
  const sections: SectionMap = new Map();
  let currentHeader = '__intro__';
  sections.set(currentHeader, []);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---' || trimmed === '***') continue;

    if (isKnownHeader(trimmed) || isGenericHeader(trimmed)) {
      // Normalize header key
      const key = trimmed
        .replace(/^[#\s*_-]+/, '')
        .trim();
      currentHeader = key;
      if (!sections.has(currentHeader)) {
        sections.set(currentHeader, []);
      }
    } else {
      const bucket = sections.get(currentHeader);
      if (bucket) bucket.push(trimmed);
    }
  }

  return sections;
}

// ─── Section Finder ───────────────────────────────────────────────────────────

function findSection(sections: SectionMap, keywords: string[]): string[] | null {
  for (const [key, lines] of sections.entries()) {
    if (keywords.some((kw) => key.toUpperCase().includes(kw.toUpperCase()))) {
      return lines;
    }
  }
  return null;
}

function findSectionKey(sections: SectionMap, keywords: string[]): string | null {
  for (const [key] of sections.entries()) {
    if (keywords.some((kw) => key.toUpperCase().includes(kw.toUpperCase()))) {
      return key;
    }
  }
  return null;
}

// ─── Line Parsers ─────────────────────────────────────────────────────────────

function cleanBullet(line: string): string {
  return line.replace(/^[-*•·▸▹►→\s]+/, '').trim();
}

// ─── Normalize Section Content ────────────────────────────────────────────────

/**
 * Cleans and normalizes all lines in a section before parsing.
 * Removes bullet characters, collapses whitespace, and filters blanks.
 */
function normalizeSectionContent(lines: string[]): string[] {
  return lines
    .map((line) => cleanBullet(line))
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

// ─── Multi-line Metric Parsing ────────────────────────────────────────────────

/**
 * Returns true if a line starts a new score metric entry.
 * e.g. "Hydration — ⭐4.2 — Great moisture retention"
 */
function isScoreMetricLine(line: string): boolean {
  return /^([^—:\-–]+)\s*[—:–\-]\s*⭐?\s*(\d+\.?\d*)/.test(line);
}

/**
 * Parses a block of lines into scored metric items.
 * Supports multi-line descriptions: continuation lines are appended
 * as the reason of the most recently opened metric item.
 */
function parseMetricBlocks(
  lines: string[]
): Array<{ label: string; score: number; reason?: string }> {
  const items: Array<{ label: string; score: number; reason?: string }> = [];

  let currentItem: { label: string; score: number; reason?: string } | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) continue;

    // ── NEW SCORE BLOCK ───────────────────────────────
    if (isScoreMetricLine(line)) {
      // Push previous item before starting next
      if (currentItem) {
        items.push(currentItem);
      }

      const match = line.match(
        /^([^—:\-–]+)\s*[—:–\-]\s*⭐?\s*(\d+\.?\d*)/
      );

      if (!match) continue;

      currentItem = {
        label: match[1].trim(),
        score: parseFloat(match[2]),
        reason: '',
      };

      // Inline reason support
      const remaining = line
        .replace(match[0], '')
        .replace(/^[—:\-–\s]+/, '')
        .trim();

      if (remaining) {
        currentItem.reason = remaining;
      }

      continue;
    }

    // ── APPEND DESCRIPTION TO CURRENT ITEM ───────────
    if (currentItem) {
      currentItem.reason =
        (currentItem.reason ? currentItem.reason + ' ' : '') +
        cleanBullet(line);
    }
  }

  // Push final item
  if (currentItem) {
    items.push(currentItem);
  }

  return items;
}

// ─── Block Builders ───────────────────────────────────────────────────────────

let blockCounter = 0;
function nextId(): string {
  return `block-${++blockCounter}`;
}

// ─── Main Parser ─────────────────────────────────────────────────────────────

/**
 * Parses AI markdown output into a NIGOODA AnalysisPayload.
 *
 * @param markdown - Raw markdown string from backend AI engine
 * @param productType - Label for the product type (used for IDs and tags)
 * @returns AnalysisPayload with zero or more blocks
 */
export function parseMarkdownToBlocks(
  markdown: string,
  productType: string = 'PRODUCT'
): AnalysisPayload {
  // Reset counter per parse call
  blockCounter = 0;

  const payload: AnalysisPayload = {
    pageType: 'product-analysis',
    productId: `NIG-${productType.toUpperCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-6)}`,
    blocks: [],
  };

  // ── Guard: empty input ────────────────────────────────────────────────────
  if (!markdown || typeof markdown !== 'string' || markdown.trim().length === 0) {
    console.warn('[markdownParser] Empty or invalid markdown input. Returning minimal payload.');
    payload.blocks.push({
      type: 'hero-rating',
      id: nextId(),
      title: 'Analysis',
      rating: 0,
      maxRating: 5,
      summary: 'Analysis data unavailable',
      tags: [productType],
    });
    return payload;
  }

  const lines = markdown.split(/\r?\n/);
  const sections = groupIntoSections(lines);

  // Track which sections we consumed so we can handle unknowns
  const consumedKeys = new Set<string>(['__intro__']);

  // ── 1. FINAL RATING → hero-rating ────────────────────────────────────────
  try {
    const ratingKey = findSectionKey(sections, ['FINAL RATING', 'RATING']);
    const ratingLines = ratingKey ? sections.get(ratingKey) ?? [] : [];

    let rating = 0;
    let maxRating = 5;
    let summary = productType;

    // Try to extract from the key itself (e.g. "⭐ FINAL RATING — 4.2/5 — Good")
    const textToSearch = [ratingKey ?? '', ...ratingLines].join(' ');
    const ratingMatch = textToSearch.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
    if (ratingMatch) {
      rating = parseFloat(ratingMatch[1]);
      maxRating = parseInt(ratingMatch[2], 10);
    }

    const dashMatch = textToSearch.match(/[—–]\s*([^—–\d\/][^—–]*)$/);
    if (dashMatch) {
      summary = dashMatch[1].trim();
    } else if (ratingLines.length > 0) {
      summary = cleanBullet(ratingLines[0]) || productType;
    }

    // Tags from profile sections — use specific key to avoid collisions
    const tags: string[] = [productType];
    const profileLines =
      findSection(sections, ['HERBAL/ORGANIC PROFILE']) ?? [];
    profileLines.slice(0, 4).forEach((l) => {
      const clean = cleanBullet(l);
      if (clean) tags.push(clean);
    });

    payload.blocks.push({
      type: 'hero-rating',
      id: nextId(),
      title: 'NIGOODA Intelligence Rating',
      rating: rating || 3.0,
      maxRating,
      summary,
      tags,
    });

    if (ratingKey) consumedKeys.add(ratingKey);
    consumedKeys.add('HERBAL/ORGANIC PROFILE');
  } catch (err) {
    console.warn('[markdownParser] Failed to parse FINAL RATING section:', err);
  }

  // ── 2. STRUCTURAL QUALITY → structural-summary ────────────────────────────
  try {
    const key = findSectionKey(sections, ['STRUCTURAL QUALITY', 'STRUCTURAL INSIGHT']);
    const lines2 = key ? sections.get(key) ?? [] : [];

    if (lines2.length > 0) {
      // Readable paragraph chunking instead of a single joined string
      const chunks: string[] = [];
      let currentChunk = '';

      for (const line of lines2) {
        if (line.length < 120 && currentChunk.length > 250) {
          chunks.push(currentChunk.trim());
          currentChunk = line;
        } else {
          currentChunk += ' ' + line;
        }
      }
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }

      payload.blocks.push({
        type: 'structural-summary',
        id: nextId(),
        title: 'Structural Intelligence Summary',
        summary: chunks.join('\n\n'),
        highlights: [], // populated after strengths parse
      });
      if (key) consumedKeys.add(key);
    }
  } catch (err) {
    console.warn('[markdownParser] Failed to parse STRUCTURAL QUALITY section:', err);
  }

  // ── 3. CORE SCORES → score-grid ──────────────────────────────────────────
  try {
    const key = findSectionKey(sections, ['CORE SCORES', 'CORE SCORE']);
    const rawLines = key ? sections.get(key) ?? [] : [];
    const scoreLines = normalizeSectionContent(rawLines);

    const items: ScoreItem[] = parseMetricBlocks(scoreLines).filter(
      (item) => item.score >= 0 && item.score <= 10
    );

    if (items.length > 0) {
      payload.blocks.push({
        type: 'score-grid',
        id: nextId(),
        title: 'Core Intelligence Metrics',
        items,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse CORE SCORES section:', err);
  }

  // ── 4. SPECIALIZED PERFORMANCE → specialized-performance-grid ────────────
  try {
    const key = findSectionKey(sections, ['SPECIALIZED PERFORMANCE', 'PERFORMANCE']);
    const rawLines = key ? sections.get(key) ?? [] : [];
    const perfLines = normalizeSectionContent(rawLines);

    const items: { label: string; value: string | number; description: string }[] =
      parseMetricBlocks(perfLines)
        .filter((item) => item.score >= 0 && item.score <= 10)
        .map((parsed) => ({
          label: parsed.label,
          value: parsed.score,
          description:
            parsed.reason || 'Scientific formulation analysis unavailable',
        }));

    if (items.length > 0) {
      payload.blocks.push({
        type: 'specialized-performance-grid',
        id: nextId(),
        title: 'Specialized Performance Analysis',
        items,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse SPECIALIZED PERFORMANCE section:', err);
  }

  // ── 5. STRENGTHS + CONCERNS → insight-split ──────────────────────────────
  try {
    const strengthKey = findSectionKey(sections, ['STRENGTHS', 'STRENGTH']);
    const concernKey = findSectionKey(sections, ['CONCERNS', 'CONCERN', 'WEAKNESSES']);

    const strengths = (strengthKey ? sections.get(strengthKey) ?? [] : [])
      .map(cleanBullet).filter(Boolean);
    const concerns = (concernKey ? sections.get(concernKey) ?? [] : [])
      .map(cleanBullet).filter(Boolean);

    // Backfill highlights into structural-summary block
    const summaryBlock = payload.blocks.find((b) => b.type === 'structural-summary') as any;
    if (summaryBlock && strengths.length > 0) {
      summaryBlock.highlights = strengths.slice(0, 4);
    }

    if (strengths.length > 0 || concerns.length > 0) {
      payload.blocks.push({
        type: 'insight-split',
        id: nextId(),
        title: 'Pros & Considerations',
        left: {
          title: 'Key Strengths',
          content: strengths.length > 0 ? strengths : ['Baseline formulation safety confirmed'],
          variant: 'positive',
        },
        right: {
          title: 'Potential Concerns',
          content: concerns.length > 0 ? concerns : ['No major alerts detected'],
          variant: 'negative',
        },
      });
    }
    if (strengthKey) consumedKeys.add(strengthKey);
    if (concernKey) consumedKeys.add(concernKey);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse STRENGTHS/CONCERNS section:', err);
  }

  // ── 6. SKIN TYPE COMPATIBILITY → compatibility-grid ───────────────────────
  try {
    const key = findSectionKey(sections, ['SKIN TYPE COMPATIBILITY', 'COMPATIBILITY', 'USER COMPATIBILITY']);
    const rawLines = key ? sections.get(key) ?? [] : [];
    const compatLines = normalizeSectionContent(rawLines);

    const items: CompatibilityItem[] = parseMetricBlocks(compatLines)
      .filter((item) => item.score >= 0 && item.score <= 10)
      .map((parsed) => ({
        label: parsed.label,
        compatible: parsed.score >= 3.0,
        reason: parsed.reason || `Compatibility score: ${parsed.score}/5`,
      }));

    if (items.length > 0) {
      payload.blocks.push({
        type: 'compatibility-grid',
        id: nextId(),
        title: 'Compatibility Analysis',
        items,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse COMPATIBILITY section:', err);
  }

  // ── 7. EXPECTED RESULTS / LONG-TERM USABILITY → timeline-results ──────────
  try {
    const key = findSectionKey(sections, ['EXPECTED RESULTS', 'RESULTS TIMELINE', 'LONG-TERM']);
    const timelineLines = key ? sections.get(key) ?? [] : [];

    const items: TimelineItem[] = [];

    // Updated pattern to also match "Immediate (First 1–7 Applications)" etc.
    const PERIOD_PATTERN =
      /^(Immediate|Short[- ]Term|Medium[- ]Term|Long[- ]Term|First\s*\d+[-–]\d+\s*Applications?|Weeks?\s*\d+[-–]?\d*|Months?\s*\d+[-–]?\d*|Week\s*\d+|Month\s*\d+|Day\s*\d+|Hours?\s*\d*)/i;

    let currentPeriod = '';
    for (const line of timelineLines) {
      try {
        const periodMatch = line.match(PERIOD_PATTERN);
        if (periodMatch) {
          currentPeriod = periodMatch[1].trim();
          const rest = line.replace(PERIOD_PATTERN, '').replace(/^[:\s()\-–]+/, '').trim();
          if (rest) {
            items.push({
              label: currentPeriod,
              value: rest,
              status: deriveTimelineStatus(currentPeriod),
            });
          }
        } else if (currentPeriod && line.match(/^[-•*]/)) {
          items.push({
            label: currentPeriod,
            value: cleanBullet(line),
            status: deriveTimelineStatus(currentPeriod),
          });
        }
      } catch { /* skip */ }
    }

    if (items.length > 0) {
      payload.blocks.push({
        type: 'timeline-results',
        id: nextId(),
        title: 'Expected Formulation Outcomes',
        items,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse EXPECTED RESULTS section:', err);
  }

  // ── 8. KEY INGREDIENTS → ingredient-list ─────────────────────────────────
  try {
    const key = findSectionKey(sections, ['KEY STRUCTURAL INGREDIENT', 'KEY INGREDIENT', 'INGREDIENTS']);
    const ingredientLines = key ? sections.get(key) ?? [] : [];

    const ingredients: Ingredient[] = [];
    for (const line of ingredientLines) {
      try {
        const clean = cleanBullet(line);
        if (!clean) continue;

        const parts = clean.split(/[:—–\-]/);
        const name = parts[0]?.trim() ?? clean;
        const purpose = parts[1]?.trim() ?? 'Active Component';
        const description = parts.slice(2).join(' ').trim() || undefined;

        ingredients.push({
          name,
          purpose,
          riskLevel: inferRiskLevel(name),
          description,
        });
      } catch { /* skip */ }
    }

    if (ingredients.length > 0) {
      payload.blocks.push({
        type: 'ingredient-list',
        id: nextId(),
        title: 'Key Structural Ingredients',
        ingredients,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse INGREDIENTS section:', err);
  }

  // ── 9. WHY THIS RATING → expandable-content-block ────────────────────────
  try {
    const key = findSectionKey(sections, ['WHY THIS RATING', 'RATING RATIONALE']);
    const lines3 = key ? sections.get(key) ?? [] : [];
    if (lines3.length > 0) {
      payload.blocks.push({
        type: 'expandable-content-block',
        id: nextId(),
        title: 'AI Rating Rationale & Evidence',
        content: lines3.join('\n'),
        expanded: true,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse WHY THIS RATING section:', err);
  }

  // ── 10. TRUTH ABOUT CLAIMS → expandable-content-block ────────────────────
  try {
    const key = findSectionKey(sections, ['THE TRUTH ABOUT', 'TRUTH ABOUT']);
    const lines4 = key ? sections.get(key) ?? [] : [];
    if (lines4.length > 0) {
      payload.blocks.push({
        type: 'expandable-content-block',
        id: nextId(),
        title: 'The Truth About Natural Claims',
        content: lines4.join('\n'),
        expanded: false,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse THE TRUTH ABOUT section:', err);
  }

  // ── 11. HERBAL EVIDENCE QUALITY → expandable-content-block (V1) ──────────
  try {
    const key = findSectionKey(sections, ['HERBAL EVIDENCE', 'EVIDENCE QUALITY', 'BOTANICAL']);
    const lines5 = key ? sections.get(key) ?? [] : [];
    if (lines5.length > 0) {
      payload.blocks.push({
        type: 'expandable-content-block',
        id: nextId(),
        title: 'Botanical & Clinical Evidence Strength',
        content: lines5.join('\n'),
        expanded: false,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse HERBAL EVIDENCE section:', err);
  }

  // ── 12. SENSITIZATION RISK → expandable-content-block ────────────────────
  try {
    const key = findSectionKey(sections, ['SENSITIZATION RISK', 'ALLERGY', 'SENSITIZATION']);
    const lines6 = key ? sections.get(key) ?? [] : [];
    if (lines6.length > 0) {
      payload.blocks.push({
        type: 'expandable-content-block',
        id: nextId(),
        title: 'Sensitization & Allergy Assessment',
        content: lines6.join('\n'),
        expanded: false,
      });
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse SENSITIZATION section:', err);
  }

  // ── 13. CRITICAL ALERTS / WARNINGS → critical-alerts ─────────────────────
  try {
    const key = findSectionKey(sections, ['CRITICAL ALERTS', 'WARNINGS', '🚨']);
    const alertLines = key ? sections.get(key) ?? [] : [];
    if (alertLines.length > 0) {
      const alerts = alertLines.map((line) => {
        const clean = cleanBullet(line);
        return {
          type: 'Safety Warning',
          message: clean,
          action: undefined,
        };
      }).filter((a) => a.message);

      if (alerts.length > 0) {
        payload.blocks.push({
          type: 'critical-alerts',
          id: nextId(),
          title: 'Critical Usage Alerts',
          alerts,
        });
      }
    }
    if (key) consumedKeys.add(key);
  } catch (err) {
    console.warn('[markdownParser] Failed to parse CRITICAL ALERTS section:', err);
  }

  // ── 14. FALLBACK: Unknown sections → expandable-content-block ─────────────
  // Any section that wasn't consumed but has content gets appended as expandable blocks.
  try {
    for (const [key, lines7] of sections.entries()) {
      if (consumedKeys.has(key)) continue;
      if (key === '__intro__') continue;

      const content = lines7.map(cleanBullet).filter(Boolean).join('\n');
      if (content.length > 20) { // only if meaningful content
        payload.blocks.push({
          type: 'expandable-content-block',
          id: nextId(),
          title: key.replace(/^[^\w\s]+/, '').trim() || 'Additional Analysis',
          content,
          expanded: false,
        });
      }
    }
  } catch (err) {
    console.warn('[markdownParser] Failed to process unknown sections:', err);
  }

  return payload;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveTimelineStatus(label: string): 'completed' | 'in-progress' | 'pending' {
  const lower = label.toLowerCase();
  if (lower.includes('immediate') || lower.includes('day') || lower.includes('hour')) return 'completed';
  if (lower.includes('medium') || lower.includes('week') || lower.includes('short')) return 'in-progress';
  return 'pending';
}

function inferRiskLevel(ingredientName: string): 1 | 2 | 3 | 4 | 5 {
  const name = ingredientName.toLowerCase();
  if (name.includes('fragrance') || name.includes('parfum') || name.includes('formaldehyde')) return 4;
  if (name.includes('sulfate') || name.includes('paraben') || name.includes('phthalate')) return 3;
  if (name.includes('retinol') || name.includes('acid') || name.includes('preservative') || name.includes('alcohol')) return 2;
  return 1;
}
