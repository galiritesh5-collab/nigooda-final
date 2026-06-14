import React, { useState, useRef, useMemo } from "react";

// ─── DRINKCARE METADATA ──────────────────────────────────────────────────────
const DC_BRAND    = "NIGOODA";
const DC_TITLE    = "Drink Intelligence";
const DC_SUBTITLE = "Decode beverage formulation and metabolic balance";
const DC_BADGE    = "Formulation Analysis";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ScoreItem      { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem     { label: string; score: number; compatible: boolean; reason: string; }
interface Ingredient     { name: string; role: string; group: string; tier: "primary" | "secondary" | "trace"; color: ColorSet; }
interface ContribSignal  { name: string; tier: "primary" | "secondary" | "trace"; description: string; dot: string; }
interface MindfulGroup   { icon: string; label: string; level: "high" | "moderate"; reason: string; }
interface AllergenItem   { label: string; detected: boolean; }
interface EvidenceItem   { label: string; body: string; }
interface ColorSet       { bg: string; dot: string; text: string; border: string; }
interface Tab            { id: string; label: string; icon: string; }
interface DrinkStructure { processingStyle: string; ingredientCount: string; primaryBase: string; estimatedPH: string; caffeine: string; carbonated: string; }

// ─── DRINK TYPE DETECTION ─────────────────────────────────────────────────────
type DrinkType =
  | "energy_drink" | "coffee" | "tea" | "soda" | "juice" | "water"
  | "sports_drink" | "dairy" | "alcohol" | "smoothie" | "plant_milk" | "generic";

function detectDrinkType(md: string): DrinkType {
  const lower = md.toLowerCase();
  if (/energy drink|monster|red bull|rockstar|bang energy/i.test(lower)) return "energy_drink";
  if (/coffee|espresso|latte|cappuccino|cold brew/i.test(lower))         return "coffee";
  if (/tea|matcha|kombucha|yerba/i.test(lower))                          return "tea";
  if (/soda|cola|carbonated soft drink|sparkling/i.test(lower))          return "soda";
  if (/juice|nectar|fruit drink/i.test(lower))                           return "juice";
  if (/water|hydration|mineral water/i.test(lower))                      return "water";
  if (/sports drink|electrolyte|gatorade|powerade/i.test(lower))         return "sports_drink";
  if (/milk|dairy|yogurt drink|kefir/i.test(lower))                      return "dairy";
  if (/beer|wine|spirits|alcohol/i.test(lower))                          return "alcohol";
  if (/smoothie|blend|protein shake/i.test(lower))                       return "smoothie";
  if (/oat milk|almond milk|soy milk|plant.based milk/i.test(lower))     return "plant_milk";
  return "generic";
}

const DRINK_ICONS: Record<DrinkType, string> = {
  energy_drink : "⚡",
  coffee       : "☕",
  tea          : "🍵",
  soda         : "🥤",
  juice        : "🍊",
  water        : "💧",
  sports_drink : "🏃",
  dairy        : "🥛",
  alcohol      : "🍷",
  smoothie     : "🫐",
  plant_milk   : "🌱",
  generic      : "🥤",
};

const DRINK_GRADIENT: Record<DrinkType, string> = {
  energy_drink : "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #7C3AED 100%)",
  coffee       : "linear-gradient(135deg, #1C0A00 0%, #78350F 60%, #D97706 100%)",
  tea          : "linear-gradient(135deg, #052E16 0%, #065F46 50%, #059669 100%)",
  soda         : "linear-gradient(135deg, #0C4A6E 0%, #0891B2 50%, #22D3EE 100%)",
  juice        : "linear-gradient(135deg, #7C2D12 0%, #EA580C 50%, #FB923C 100%)",
  water        : "linear-gradient(135deg, #082F49 0%, #0369A1 50%, #38BDF8 100%)",
  sports_drink : "linear-gradient(135deg, #14532D 0%, #15803D 50%, #4ADE80 100%)",
  dairy        : "linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 50%, #60A5FA 100%)",
  alcohol      : "linear-gradient(135deg, #3B0764 0%, #7E22CE 50%, #C084FC 100%)",
  smoothie     : "linear-gradient(135deg, #4A044E 0%, #BE185D 50%, #F472B6 100%)",
  plant_milk   : "linear-gradient(135deg, #1A2E05 0%, #3F6212 50%, #84CC16 100%)",
  generic      : "linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #3B82F6 100%)",
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  // Primaries — electric, high-contrast
  electric    : "#6366F1",
  electricDim : "#4338CA",
  electricGlow: "#A5B4FC",
  electricPale: "#EEF2FF",
  cyan        : "#06B6D4",
  cyanDim     : "#0891B2",
  cyanPale    : "#ECFEFF",
  // Signal colors
  green       : "#10B981",
  greenPale   : "#D1FAE5",
  amber       : "#F59E0B",
  amberPale   : "#FEF3C7",
  red         : "#EF4444",
  redPale     : "#FEE2E2",
  orange      : "#F97316",
  // Neutrals — dark, sleek
  ink         : "#0A0E1A",
  inkMid      : "#111827",
  inkSoft     : "#1F2937",
  textDark    : "#F9FAFB",
  textMid     : "#D1D5DB",
  textMuted   : "#9CA3AF",
  textFaint   : "#6B7280",
  // Surfaces
  surface     : "#111827",
  surfaceAlt  : "#1F2937",
  surfaceHigh : "#0F172A",
  border      : "#374151",
  borderMid   : "#4B5563",
  bg          : "#0A0E1A",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION I — PARSING UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseMarkdown(md: string): Map<string, string[]> {
  const lines    = md.split(/\r?\n/);
  const sections = new Map<string, string[]>();
  let currentKey = "__intro__";
  sections.set(currentKey, []);

  for (const line of lines) {
    const t = line.trim();
    if (!t || t === "---") continue;
    if (/^#\s/.test(t)) {
      const key = t.replace(/^#\s+/, "").trim();
      currentKey = key;
      if (!sections.has(currentKey)) sections.set(currentKey, []);
    } else {
      sections.get(currentKey)?.push(t);
    }
  }
  return sections;
}

function norm(s: string): string {
  return s
    .toUpperCase()
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/gu, "")
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSection(sections: Map<string, string[]>, keywords: string[]): { key: string | null; lines: string[] } {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) return { key, lines };
  }
  return { key: null, lines: [] };
}

function findSections(sections: Map<string, string[]>, keywords: string[]): Array<{ key: string; lines: string[] }> {
  const results: Array<{ key: string; lines: string[] }> = [];
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) results.push({ key, lines });
  }
  return results;
}

function cleanBullet(s: string): string {
  return s.replace(/^[-*•·▸→#\s]+/, "").trim();
}

function previewText(reason: string, maxLen = 90): string {
  if (!reason) return "";
  const first = reason.split(/[.!?]/)[0]?.trim() ?? reason;
  const clean = first.slice(0, maxLen);
  return clean.length < reason.length ? clean + "…" : clean;
}

function linesAsText(lines: string[]): string {
  return lines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION II — DOMAIN PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^(?:#{1,4}\s+)?(.+?)\s+[→|]\s+⭐?\s*(\d+\.?\d*)/);
    // Also match "Label → ⭐X.X" and "Label | ⭐X.X" and "Label — ⭐X.X"
    const m2 = !m ? t.match(/^(?:#{1,4}\s+)?(.+?)\s+[—–\-]\s+⭐?\s*(\d+\.?\d*)/) : null;
    const match = m || m2;
    if (match) {
      if (current) items.push(current);
      const remaining = t.slice(match[0].length).replace(/^[—:–\-\s→|]+/, "").trim();
      current = {
        label   : cleanBullet(match[1]).trim(),
        score   : Math.min(5, Math.max(0, parseFloat(match[2]))),
        maxScore: 5,
        reason  : remaining || "",
      };
    } else if (current && t.length > 0 && !/^#{1,4}\s/.test(t)) {
      const clean = cleanBullet(t);
      if (clean.length > 2) current.reason = current.reason ? current.reason + " " + clean : clean;
    }
  }
  if (current) items.push(current);
  return items.filter((i) => i.score >= 0 && i.score <= 5);
}

function parseCompatibility(lines: string[]): CompatItem[] {
  const items: CompatItem[] = [];
  let current: CompatItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m  = t.match(/^(?:#{1,4}\s+)?(.+?)\s+[→|]\s+⭐?\s*(\d+\.?\d*)/);
    const m2 = !m ? t.match(/^(?:#{1,4}\s+)?(.+?)\s+[—–\-]\s+⭐?\s*(\d+\.?\d*)/) : null;
    const match = m || m2;
    if (match) {
      if (current) items.push(current);
      const remaining = t.slice(match[0].length).replace(/^[—:–\-\s→|]+/, "").trim();
      const score = Math.min(5, Math.max(0, parseFloat(match[2])));
      current = { label: cleanBullet(match[1]).trim(), score, compatible: score >= 3.0, reason: remaining || "" };
    } else if (current && t.length > 0 && !/^#{1,4}\s/.test(t)) {
      const clean = cleanBullet(t);
      if (clean.length > 2) current.reason = current.reason ? current.reason + " " + clean : clean;
    }
  }
  if (current) items.push(current);
  return items.filter((i) => i.score >= 0);
}

function parseDrinkStructure(lines: string[]): DrinkStructure {
  const struct: DrinkStructure = { processingStyle: "", ingredientCount: "", primaryBase: "", estimatedPH: "", caffeine: "", carbonated: "" };
  let curField = "";
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/processing style/i.test(t))   { curField = "processingStyle"; continue; }
    if (/ingredient count/i.test(t))   { curField = "ingredientCount"; continue; }
    if (/primary base/i.test(t))       { curField = "primaryBase"; continue; }
    if (/estimated ph|ph/i.test(t))    { curField = "estimatedPH"; continue; }
    if (/caffeine/i.test(t))           { curField = "caffeine"; continue; }
    if (/carbonated/i.test(t))         { curField = "carbonated"; continue; }
    const clean = cleanBullet(t);
    if (clean && curField && !struct[curField as keyof DrinkStructure]) {
      (struct as any)[curField] = clean;
    }
  }
  return struct;
}

function parseBullets(lines: string[]): string[] {
  return lines
    .filter((l) => !/^#{1,4}\s/.test(l.trim()) && l.trim().length > 2)
    .map(cleanBullet)
    .filter(Boolean);
}

function parseMindfulGroups(lines: string[]): MindfulGroup[] {
  const groups: MindfulGroup[] = [];
  let current: MindfulGroup | null = null;

  const MINDFUL_ICONS: Record<string, string> = {
    children: "🧒", dental: "🦷", blood: "🩸", heart: "❤️",
    pressure: "🧂", pregnancy: "🤰", weight: "⚖️", sleep: "😴",
    kidney: "🫘", gut: "🦠", sport: "🏃",
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;

    // Detect heading lines with level indicator
    const headingMatch = t.match(/^(?:#{1,4}\s+)?(.*?)\s*[|]\s*(🔴|🟡)\s*(.+)/);
    if (headingMatch) {
      if (current) groups.push(current);
      const rawLabel = cleanBullet(headingMatch[1]);
      const levelEmoji = headingMatch[2];
      const iconKey = Object.keys(MINDFUL_ICONS).find((k) => rawLabel.toLowerCase().includes(k)) ?? "";
      current = {
        icon : MINDFUL_ICONS[iconKey] || "⚠️",
        label: rawLabel,
        level: levelEmoji === "🔴" ? "high" : "moderate",
        reason: "",
      };
    } else if (t.match(/^#{1,4}\s/)) {
      // Heading line — try to infer level
      if (current) groups.push(current);
      const rawLabel = t.replace(/^#{1,4}\s+/, "").trim();
      const hasHigh = /high consideration|high/i.test(rawLabel);
      const iconKey = Object.keys(MINDFUL_ICONS).find((k) => rawLabel.toLowerCase().includes(k)) ?? "";
      // Only add if it seems to be a mindful group header
      if (iconKey || /children|dental|blood|heart|pregnancy|weight|sleep|kidney|gut|sport/i.test(rawLabel)) {
        current = {
          icon : MINDFUL_ICONS[iconKey] || "⚠️",
          label: rawLabel.replace(/\s*[|–—]\s*(🔴|🟡).*$/, "").trim(),
          level: hasHigh ? "high" : "moderate",
          reason: "",
        };
      }
    } else if (current) {
      const clean = cleanBullet(t);
      if (clean.length > 2) current.reason = current.reason ? current.reason + " " + clean : clean;
    }
  }
  if (current) groups.push(current);
  return groups.filter((g) => g.label.length > 1);
}

function parseAllergens(lines: string[]): AllergenItem[] {
  const ALL_ALLERGENS = ["Milk", "Soy", "Gluten", "Tree Nuts", "Peanuts", "Eggs", "Sesame", "Fish", "Sulfites", "Shellfish", "Wheat"];
  const text = lines.join(" ");
  const noneDetected = /no major allergen/i.test(text);
  if (noneDetected) return ALL_ALLERGENS.map((a) => ({ label: a, detected: false }));
  return ALL_ALLERGENS.map((a) => ({ label: a, detected: new RegExp(a, "i").test(text) }));
}

function parseContribSignals(lines: string[]): ContribSignal[] {
  const signals: ContribSignal[] = [];
  let current: ContribSignal | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^#{1,4}\s/.test(t)) {
      if (current) signals.push(current);
      const label = t.replace(/^#{1,4}\s+/, "").trim();
      const greenMatch = /🟢/.test(t);
      const yellowMatch = /🟡/.test(t);
      const whiteMatch  = /⚪/.test(t);
      const tier: ContribSignal["tier"] = greenMatch ? "primary" : yellowMatch ? "secondary" : "trace";
      const dot = greenMatch ? T.green : yellowMatch ? T.amber : T.textFaint;
      current = { name: cleanBullet(label.replace(/[🟢🟡⚪]/g, "").trim()), tier, description: "", dot };
    } else if (current) {
      const clean = cleanBullet(t);
      if (clean.length > 2) current.description = current.description ? current.description + " " + clean : clean;
    }
  }
  if (current) signals.push(current);
  return signals.filter((s) => s.name.length > 1);
}

function parseEvidenceItems(lines: string[]): EvidenceItem[] {
  const items: EvidenceItem[] = [];
  let current: EvidenceItem | null = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^#{2,4}\s/.test(t)) {
      if (current) items.push(current);
      current = { label: t.replace(/^#{2,4}\s+/, "").trim(), body: "" };
    } else if (/^#\s/.test(t)) {
      // skip
    } else {
      const clean = cleanBullet(t);
      if (clean.length > 2) {
        if (current) current.body = current.body ? current.body + " " + clean : clean;
        else current = { label: "Overview", body: clean };
      }
    }
  }
  if (current) items.push(current);
  return items;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — DRINK INGREDIENT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DRINK_ING_GROUPS: Record<string, string[]> = {
  "Sugars & Sweeteners"       : ["sugar", "sucrose", "glucose", "fructose", "corn syrup", "stevia", "sucralose", "aspartame", "acesulfame", "erythritol", "xylitol", "monk fruit", "agave"],
  "Acids & pH Agents"         : ["citric acid", "phosphoric acid", "malic acid", "tartaric acid", "ascorbic acid", "lactic acid", "acetic acid", "carbonic"],
  "Caffeine & Stimulants"     : ["caffeine", "guarana", "taurine", "l-theanine", "ginseng", "yerba mate", "green tea extract", "theacrine"],
  "Preservatives"             : ["sodium benzoate", "potassium sorbate", "potassium benzoate", "sorbic acid", "benzoic acid", "dimethyl dicarbonate"],
  "Flavors"                   : ["natural flavor", "artificial flavor", "flavoring", "flavor"],
  "Colors"                    : ["caramel color", "color", "e150", "e102", "e129", "tartrazine", "red 40", "yellow 5"],
  "Electrolytes & Minerals"   : ["sodium", "potassium", "magnesium", "calcium", "chloride", "phosphate", "bicarbonate"],
  "Functional Additives"      : ["vitamin b", "vitamin c", "niacin", "pantothenic", "biotin", "inositol", "glucuronolactone", "l-carnitine"],
  "Botanical & Herbal"        : ["green tea", "chamomile", "hibiscus", "elderflower", "lavender", "rose", "mint", "turmeric", "ginger"],
  "Dairy Components"          : ["milk", "cream", "whey", "lactose", "casein"],
  "Fruit Components"          : ["juice", "puree", "concentrate", "lemon", "lime", "orange", "apple", "berry", "grape"],
  "Carbonation"               : ["carbon dioxide", "co2", "carbonated water", "sparkling water"],
};

const DRINK_ING_COLORS: Record<string, ColorSet> = {
  "Sugars & Sweeteners"    : { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  "Acids & pH Agents"      : { bg:"#FFF1F2", dot:"#EF4444", text:"#7F1D1D", border:"#FECDD3" },
  "Caffeine & Stimulants"  : { bg:"#1E1B4B", dot:"#A5B4FC", text:"#C7D2FE", border:"#3730A3" },
  "Preservatives"          : { bg:"#F1F5F9", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  "Flavors"                : { bg:"#FDF4FF", dot:"#C084FC", text:"#581C87", border:"#E9D5FF" },
  "Colors"                 : { bg:"#ECFEFF", dot:"#06B6D4", text:"#0C4A6E", border:"#A5F3FC" },
  "Electrolytes & Minerals": { bg:"#ECFDF5", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  "Functional Additives"   : { bg:"#EFF6FF", dot:"#3B82F6", text:"#1E3A8A", border:"#BFDBFE" },
  "Botanical & Herbal"     : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  "Dairy Components"       : { bg:"#EFF6FF", dot:"#60A5FA", text:"#1E3A8A", border:"#BFDBFE" },
  "Fruit Components"       : { bg:"#FFF7ED", dot:"#FB923C", text:"#7C2D12", border:"#FDBA74" },
  "Carbonation"            : { bg:"#F0F9FF", dot:"#38BDF8", text:"#0C4A6E", border:"#BAE6FD" },
  "Other"                  : { bg:"#F8FAFC", dot:"#CBD5E1", text:"#475569", border:"#E2E8F0" },
};

function inferDrinkIngGroup(name: string): string {
  const lower = name.toLowerCase();
  for (const [g, kws] of Object.entries(DRINK_ING_GROUPS)) {
    if (kws.some((k) => lower.includes(k))) return g;
  }
  return "Other";
}

function parseDrinkIngredients(lines: string[]): Ingredient[] {
  return lines
    .filter((l) => !/^#{1,4}\s/.test(l.trim()))
    .map((l) => {
      const clean = cleanBullet(l);
      if (!clean || clean.length < 2) return null;
      const parts  = clean.split(/[:—–\-]/);
      const name   = parts[0]?.trim() ?? clean;
      if (name.length < 2) return null;
      const role  = parts[1]?.trim() ?? "Ingredient";
      const group = inferDrinkIngGroup(name);
      return { name, role, group, tier: "secondary" as const, color: DRINK_ING_COLORS[group] || DRINK_ING_COLORS.Other };
    })
    .filter(Boolean) as Ingredient[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IV — SCORE UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scoreColor(score: number, max = 5): string {
  const pct = (score / max) * 100;
  if (pct >= 76) return T.green;
  if (pct >= 60) return T.cyan;
  if (pct >= 44) return T.amber;
  return T.red;
}

function scoreLabel(score: number, max = 5): string {
  const pct = (score / max) * 100;
  if (pct >= 90) return "Exceptional";
  if (pct >= 76) return "Strong";
  if (pct >= 60) return "Good";
  if (pct >= 44) return "Moderate";
  if (pct >= 28) return "Weak";
  return "Poor";
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION V — PRIMITIVE COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoreBar({ score, max = 5 }: { score: number; max?: number }) {
  const pct   = Math.min(100, (score / max) * 100);
  const color = scoreColor(score, max);
  return (
    <div style={{ height: 3, background: T.border, borderRadius: 99, overflow: "hidden", flex: 1, minWidth: 40 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)", boxShadow: `0 0 6px ${color}80` }} />
    </div>
  );
}

function RatingRing({ score, max, color }: { score: number; max: number; color: string }) {
  const r    = 38;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(1, score / max) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#1F2937" strokeWidth="7" />
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)", filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
      <text x="48" y="44" textAnchor="middle" fill={color} fontSize="18" fontWeight="800" fontFamily="'Inter', system-ui, sans-serif">{score.toFixed(1)}</text>
      <text x="48" y="61" textAnchor="middle" fill={T.textFaint} fontSize="11" fontFamily="'Inter', system-ui, sans-serif">/ {max}</text>
    </svg>
  );
}

function Stars({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => ({
        filled: i < Math.floor(score), half: i >= Math.floor(score) && i < score,
      })).map((s, i) => (
        <span key={i} style={{ fontSize: 15, color: s.filled || s.half ? "#FBBF24" : T.border, filter: s.filled ? "drop-shadow(0 0 3px #FBBF2480)" : "none" }}>
          {s.filled ? "★" : s.half ? "⯨" : "☆"}
        </span>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VI — STRUCTURAL SIGNAL CHIPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SignalChipData { label: string; value: string; icon: string; accentColor: string; }

function inferDrinkSignals(struct: DrinkStructure, scores: ScoreItem[]): SignalChipData[] {
  const signals: SignalChipData[] = [];

  if (struct.estimatedPH) {
    const phVal = struct.estimatedPH;
    const phNum = parseFloat(phVal.match(/[\d.]+/)?.[0] ?? "7");
    const danger = phNum < 3.5;
    signals.push({ label: "Est. pH", value: phVal.replace(/estimated ph/i, "").trim() || phVal, icon: "⚗️", accentColor: danger ? T.red : T.green });
  }

  if (struct.caffeine) {
    const caf = struct.caffeine;
    const high = /high/i.test(caf);
    signals.push({ label: "Caffeine", value: caf, icon: "⚡", accentColor: high ? T.amber : T.cyan });
  }

  if (struct.carbonated) {
    const carb = struct.carbonated;
    signals.push({ label: "Carbonated", value: carb, icon: "🫧", accentColor: /yes/i.test(carb) ? T.cyan : T.textFaint });
  }

  const acidScore = scores.find((s) => /acid|dental/i.test(s.label));
  if (acidScore) {
    signals.push({ label: "Acid Risk", value: `${acidScore.score.toFixed(1)}/5`, icon: "🦷", accentColor: scoreColor(acidScore.score) });
  }

  const sugarScore = scores.find((s) => /sugar|sweetener|metabolic/i.test(s.label));
  if (sugarScore) {
    signals.push({ label: "Sugar Impact", value: `${sugarScore.score.toFixed(1)}/5`, icon: "🍬", accentColor: scoreColor(sugarScore.score) });
  }

  const addScore = scores.find((s) => /additive|preservative/i.test(s.label));
  if (addScore) {
    signals.push({ label: "Additive Load", value: `${addScore.score.toFixed(1)}/5`, icon: "🧪", accentColor: scoreColor(addScore.score) });
  }

  return signals.slice(0, 6);
}

function SignalChip({ chip }: { chip: SignalChipData }) {
  return (
    <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, minWidth: 100 }}>
      <span style={{ fontSize: 14 }}>{chip.icon}</span>
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: chip.accentColor, letterSpacing: "0.01em" }}>{chip.value}</div>
        <div style={{ fontSize: 9.5, color: T.textFaint, fontWeight: 600, letterSpacing: "0.05em", marginTop: 1 }}>{chip.label.toUpperCase()}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VII — CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionCard({ title, icon, accent, children }: { title?: string; icon?: string; accent?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${accent ? `${accent}30` : T.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: `0 2px 12px rgba(0,0,0,0.3)` }}>
      {(title || icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
          {title && <span style={{ fontWeight: 700, fontSize: 12.5, color: accent || T.textMid, letterSpacing: "0.04em" }}>{title.toUpperCase()}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function ScoreCard({ item }: { item: ScoreItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score, item.maxScore);
  const label   = scoreLabel(item.score, item.maxScore);
  const preview = previewText(item.reason, 88);

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background: T.surfaceAlt, border: `1px solid ${open ? T.electric + "50" : T.border}`,
        borderRadius: 12, padding: "13px 15px",
        cursor: item.reason ? "pointer" : "default",
        boxShadow: open ? `0 4px 20px ${T.electric}20` : "0 1px 4px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>{item.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 14, color }}>{item.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 0 : 7 }}>
            <ScoreBar score={item.score} max={item.maxScore} />
            <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}20`, padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{label}</span>
          </div>
          {preview && !open && <p style={{ margin: 0, fontSize: 11.5, color: T.textFaint, lineHeight: 1.6, marginTop: 7 }}>{preview}</p>}
        </div>
        {item.reason && (
          <span style={{ fontSize: 10, color: T.textFaint, flexShrink: 0, marginTop: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        )}
      </div>
      {open && item.reason && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>{item.reason}</div>
      )}
    </div>
  );
}

function CompatCard({ item }: { item: CompatItem }) {
  const [open, setOpen] = useState(false);
  const color = scoreColor(item.score, 5);
  const preview = previewText(item.reason, 88);
  const c = item.compatible
    ? { border: "#065F46", bg: "#022C22", dot: T.green }
    : { border: "#7F1D1D", bg: "#1C0505", dot: T.red };

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{ background: c.bg, border: `1px solid ${open ? (item.compatible ? T.green + "80" : T.red + "80") : c.border}`, borderRadius: 12, padding: "12px 14px", cursor: item.reason ? "pointer" : "default", transition: "box-shadow 0.2s, border-color 0.2s" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, marginTop: 4, flexShrink: 0, boxShadow: `0 0 4px ${c.dot}80` }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, wordBreak: "break-word", lineHeight: 1.4 }}>{item.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 13, color }}>{item.score.toFixed(1)}</span>
          <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
          {item.reason && <span style={{ fontSize: 10, color: T.textFaint, marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>}
        </div>
      </div>
      <ScoreBar score={item.score} max={5} />
      {preview && !open && <p style={{ margin: "7px 0 0", fontSize: 11.5, color: T.textFaint, lineHeight: 1.6 }}>{preview}</p>}
      {open && item.reason && <p style={{ margin: "10px 0 0", fontSize: 12.5, color: T.textMid, lineHeight: 1.65, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>{item.reason}</p>}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VIII — TAB BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TabBar({ tabs, activeTab, onTabChange }: { tabs: Tab[]; activeTab: number; onTabChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", borderTop: `1px solid ${T.border}`, marginLeft: -22, marginRight: -22, paddingLeft: 22 }}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(i)}
          style={{
            background: "none", border: "none",
            borderBottom: activeTab === i ? `2px solid ${T.electric}` : "2px solid transparent",
            padding: "11px 16px", fontSize: 12,
            fontWeight: activeTab === i ? 700 : 500,
            color: activeTab === i ? T.electricGlow : T.textFaint,
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s",
          }}
        >
          <span style={{ fontSize: 11 }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — TAB CONTENT PANELS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoresPanel({ keyScores, catScores }: { keyScores: ScoreItem[]; catScores: ScoreItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {keyScores.length > 0 && (
        <SectionCard title="Key Formulation Scores" icon="📊" accent={T.electric}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {keyScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {catScores.length > 0 && (
        <SectionCard title="Ingredient Category Scores" icon="🧪" accent={T.cyan}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {catScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function IngredientsPanel({ ingGroups, contribs }: { ingGroups: Record<string, Ingredient[]>; contribs: ContribSignal[] }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const toggle = (g: string) => setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {contribs.length > 0 && (
        <SectionCard title="Formulation Contribution Signals" icon="🌿" accent={T.green}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contribs.map((c, i) => (
              <div key={i} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.dot, marginTop: 3, flexShrink: 0, boxShadow: `0 0 5px ${c.dot}80` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, marginBottom: 3 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: T.textFaint, lineHeight: 1.6 }}>{c.description}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: c.dot, background: `${c.dot}20`, padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {c.tier === "primary" ? "Primary" : c.tier === "secondary" ? "Secondary" : "Trace"}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {Object.keys(ingGroups).length > 0 && (
        <SectionCard title="Ingredient Architecture" icon="🔬" accent={T.cyan}>
          {Object.entries(ingGroups).map(([group, items]) => {
            const color  = items[0]?.color || DRINK_ING_COLORS.Other;
            const isOpen = openGroups[group] !== false; // default open
            return (
              <div key={group} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => toggle(group)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: color.bg, border: `1px solid ${color.border}`, borderRadius: 10, padding: "8px 12px", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color.dot }} />
                    <span style={{ fontWeight: 700, fontSize: 12, color: color.text }}>{group}</span>
                    <span style={{ fontSize: 11, color: color.text + "80" }}>({items.length})</span>
                  </div>
                  <span style={{ fontSize: 10, color: color.text + "80", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
                </button>
                {isOpen && (
                  <div style={{ marginTop: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                    {items.map((ing, j) => (
                      <div key={j} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textDark }}>{ing.name}</div>
                          <div style={{ fontSize: 11, color: T.textFaint, marginTop: 2 }}>{ing.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </SectionCard>
      )}
    </div>
  );
}

function AcidDentalPanel({ acidScores }: { acidScores: ScoreItem[] }) {
  const phNote = acidScores.find((s) => /acid|dental|ph|enamel/i.test(s.label));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Acid & Dental Safety" icon="🦷" accent={T.red}>
        {acidScores.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {acidScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        ) : (
          <div style={{ padding: "20px 0", textAlign: "center", fontSize: 13, color: T.textFaint }}>No acid/dental scores detected in this analysis.</div>
        )}
      </SectionCard>
      <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textFaint, letterSpacing: "0.06em", marginBottom: 8 }}>ENAMEL RISK GUIDE</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[["pH < 3.0", "Extreme risk", T.red], ["pH 3.0–4.0", "High risk", T.orange], ["pH 4.0–5.0", "Moderate", T.amber], ["pH > 5.5", "Safe range", T.green]].map(([range, label, color]) => (
            <div key={range as string} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: color as string }} />
              <span style={{ fontSize: 11.5, color: T.textMid }}>{range as string}</span>
              <span style={{ fontSize: 11, color: T.textFaint }}>— {label as string}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetabolicPanel({ metabolicScores, positives, concerns }: { metabolicScores: ScoreItem[]; positives: string[]; concerns: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {metabolicScores.length > 0 && (
        <SectionCard title="Metabolic & Sugar Analysis" icon="🩸" accent={T.amber}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {metabolicScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {positives.length > 0 && (
          <SectionCard title="Positive Formulation Signals" icon="✅" accent={T.green}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {positives.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#022C22", border: `1px solid #065F46`, borderRadius: 9, padding: "9px 11px" }}>
                  <span style={{ color: T.green, fontWeight: 800, flexShrink: 0, fontSize: 13 }}>+</span>
                  <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
        {concerns.length > 0 && (
          <SectionCard title="Things to Be Aware Of" icon="⚠️" accent={T.amber}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {concerns.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#1C1100", border: `1px solid #78350F`, borderRadius: 9, padding: "9px 11px" }}>
                  <span style={{ color: T.amber, fontWeight: 800, flexShrink: 0, fontSize: 13 }}>!</span>
                  <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

function CaffeinePanel({ cafScores, insights }: { cafScores: ScoreItem[]; insights: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {cafScores.length > 0 && (
        <SectionCard title="Caffeine & Stimulant Systems" icon="⚡" accent={T.electric}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {cafScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {insights.length > 0 && (
        <SectionCard title="Formulation Insights" icon="🔍" accent={T.electricGlow}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {insights.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 9, padding: "10px 12px" }}>
                <span style={{ color: T.electric, flexShrink: 0, marginTop: 2, fontSize: 13 }}>›</span>
                <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function InsightsPanel({ positives, concerns }: { positives: string[]; concerns: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
      {positives.length > 0 && (
        <SectionCard title="Positive Formulation Signals" icon="✅" accent={T.green}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {positives.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#022C22", border: `1px solid #065F46`, borderRadius: 9, padding: "9px 11px" }}>
                <span style={{ color: T.green, fontWeight: 800, flexShrink: 0, fontSize: 14 }}>+</span>
                <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {concerns.length > 0 && (
        <SectionCard title="Things to Be Aware Of" icon="⚠️" accent={T.amber}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {concerns.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#1C1100", border: `1px solid #78350F`, borderRadius: 9, padding: "9px 11px" }}>
                <span style={{ color: T.amber, fontWeight: 800, flexShrink: 0, fontSize: 14 }}>!</span>
                <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function MindfulGroupsPanel({ groups }: { groups: MindfulGroup[] }) {
  const high     = groups.filter((g) => g.level === "high");
  const moderate = groups.filter((g) => g.level === "moderate");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {high.length > 0 && (
        <SectionCard title="High Consideration Groups" icon="🔴" accent={T.red}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {high.map((g, i) => (
              <div key={i} style={{ background: "#1C0505", border: `1px solid #7F1D1D`, borderRadius: 11, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 16 }}>{g.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark }}>{g.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.red, background: `${T.red}20`, padding: "1px 7px", borderRadius: 99, marginLeft: "auto" }}>HIGH</span>
                </div>
                {g.reason && <div style={{ fontSize: 12, color: T.textFaint, lineHeight: 1.6 }}>{g.reason}</div>}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {moderate.length > 0 && (
        <SectionCard title="Moderate Consideration Groups" icon="🟡" accent={T.amber}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {moderate.map((g, i) => (
              <div key={i} style={{ background: "#1C1100", border: `1px solid #78350F`, borderRadius: 11, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 16 }}>{g.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark }}>{g.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.amber, background: `${T.amber}20`, padding: "1px 7px", borderRadius: 99, marginLeft: "auto" }}>MOD</span>
                </div>
                {g.reason && <div style={{ fontSize: 12, color: T.textFaint, lineHeight: 1.6 }}>{g.reason}</div>}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function AllergensPanel({ allergens }: { allergens: AllergenItem[] }) {
  const detected = allergens.filter((a) => a.detected);
  const none     = detected.length === 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Allergen Advisory" icon="⚠️" accent={none ? T.green : T.red}>
        {none ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0" }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>No major allergens detected in this formulation.</span>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.red, letterSpacing: "0.06em", marginBottom: 8 }}>DETECTED ALLERGENS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {detected.map((a, i) => (
                  <span key={i} style={{ fontSize: 12, fontWeight: 700, color: T.red, background: `${T.red}20`, border: `1px solid ${T.red}40`, padding: "4px 12px", borderRadius: 99 }}>{a.label}</span>
                ))}
              </div>
            </div>
          </>
        )}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textFaint, letterSpacing: "0.06em", marginBottom: 8 }}>FULL PANEL</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {allergens.map((a, i) => (
              <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: a.detected ? T.red : T.textFaint, background: a.detected ? `${T.red}15` : T.surfaceAlt, border: `1px solid ${a.detected ? T.red + "40" : T.border}`, padding: "3px 10px", borderRadius: 99 }}>
                {a.detected ? "⚠ " : ""}{a.label}
              </span>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function ConsumptionPanel({ lines }: { lines: string[] }) {
  const items = parseEvidenceItems(lines);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Consumption Guidance" icon="🍽" accent={T.cyan}>
        {items.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item, i) => (
              <div key={i} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 11, padding: "12px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: T.cyan, marginBottom: 5 }}>{item.label}</div>
                <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.65 }}>{item.body}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "16px 0", textAlign: "center", fontSize: 13, color: T.textFaint }}>No consumption guidance found in this analysis.</div>
        )}
      </SectionCard>
    </div>
  );
}

function SciencePanel({ verdictLines, finalRating, maxRating, ratingSubtitle, rLabel, gradient, highScoreLines }: {
  verdictLines: string[]; finalRating: number; maxRating: number; ratingSubtitle: string; rLabel: string; gradient: string; highScoreLines: string[];
}) {
  const verdict = linesAsText(verdictLines);
  const hsItems = parseBullets(highScoreLines);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: gradient, borderRadius: 16, padding: "22px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.65, marginBottom: 5, color: "#FFF" }}>FINAL VERDICT</div>
          <div style={{ fontWeight: 900, fontSize: 48, letterSpacing: "-1.5px", lineHeight: 1, color: "#FFF" }}>{finalRating.toFixed(1)}</div>
          <div style={{ fontSize: 12, opacity: 0.65, marginTop: 3, color: "#FFF" }}>/ {maxRating} · {rLabel}</div>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <Stars score={finalRating} max={maxRating} />
          {ratingSubtitle && <div style={{ fontSize: 12.5, opacity: 0.8, lineHeight: 1.55, marginTop: 8, color: "#FFF" }}>{ratingSubtitle}</div>}
        </div>
      </div>

      {verdict && (
        <SectionCard title="Formulation Verdict" icon="📌" accent={T.electric}>
          <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>{verdict}</div>
        </SectionCard>
      )}

      {hsItems.length > 0 && (
        <SectionCard title="High-Score Eligibility" icon="🏆" accent={T.amber}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {hsItems.map((s, i) => {
              const pass = s.startsWith("✅") || s.startsWith("✓");
              const fail = s.startsWith("❌") || s.startsWith("✗");
              const warn = s.startsWith("⚠");
              const color = pass ? T.green : fail ? T.red : T.amber;
              return (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: T.surfaceAlt, border: `1px solid ${color}30`, borderRadius: 9, padding: "9px 12px" }}>
                  <span style={{ color, flexShrink: 0, fontSize: 13 }}>{pass ? "✓" : fail ? "✗" : "!"}</span>
                  <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.55 }}>{s.replace(/^[✅❌⚠️✓✗!]\s*/, "")}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function TransparencyPanel({ structureData }: { structureData: DrinkStructure }) {
  const rows = [
    { label: "Processing Style",  value: structureData.processingStyle },
    { label: "Ingredient Count",  value: structureData.ingredientCount },
    { label: "Primary Base",      value: structureData.primaryBase     },
    { label: "Estimated pH",      value: structureData.estimatedPH     },
    { label: "Caffeine Level",    value: structureData.caffeine        },
    { label: "Carbonated",        value: structureData.carbonated      },
  ].filter((r) => r.value);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Drink Transparency Dashboard" icon="📦" accent={T.cyan}>
        {rows.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rows.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <span style={{ fontSize: 12.5, color: T.textFaint, fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontSize: 12.5, color: T.textDark, fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{r.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "16px 0", textAlign: "center", fontSize: 13, color: T.textFaint }}>Drink structure data not detected.</div>
        )}
      </SectionCard>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION X — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface DrinkCareProps { markdown: string; }

export default function DrinkCare({ markdown }: DrinkCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🥤</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No drink analysis found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid drink product analysis result.</div>
        </div>
      </div>
    );
  }

  const drinkType = useMemo(() => detectDrinkType(markdown), [markdown]);
  const gradient  = DRINK_GRADIENT[drinkType];

  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // Section extraction
  const { lines: ratingLines, key: ratingKey } = findSection(sections, ["FINAL RATING"]);
  const { lines: structLines }   = findSection(sections, ["DRINK STRUCTURE"]);
  const { lines: keyScoreLines } = findSection(sections, ["KEY FORMULATION SCORES", "FORMULATION SCORES"]);
  const { lines: catScoreLines } = findSection(sections, ["INGREDIENT CATEGORY SCORES", "CATEGORY SCORES"]);
  const { lines: contribLines }  = findSection(sections, ["FORMULATION CONTRIBUTION SIGNALS", "CONTRIBUTION SIGNALS"]);
  const { lines: insightLines }  = findSection(sections, ["MAIN FORMULATION INSIGHTS", "FORMULATION INSIGHTS"]);
  const { lines: positiveLines } = findSection(sections, ["POSITIVE FORMULATION SIGNALS", "POSITIVES"]);
  const { lines: concernLines }  = findSection(sections, ["THINGS TO BE AWARE", "CONCERNS", "AWARE OF"]);
  const { lines: mindfulLines }  = findSection(sections, ["WHO SHOULD BE MINDFUL", "MINDFUL", "CONSIDERATION"]);
  const { lines: allergenLines } = findSection(sections, ["ALLERGEN ADVISORY", "ALLERGEN"]);
  const { lines: consumeLines }  = findSection(sections, ["CONSUMPTION GUIDANCE", "CONSUMPTION"]);
  const { lines: verdictLines }  = findSection(sections, ["FINAL VERDICT", "VERDICT"]);
  const { lines: highScoreLines }= findSection(sections, ["HIGH-SCORE ELIGIBILITY", "HIGH SCORE"]);

  // Acid/dental and metabolic/caffeine sections from cat scores
  const acidScoreItems = useMemo(() => parseScores(catScoreLines).filter((s) => /acid|dental|ph/i.test(s.label)), [catScoreLines]);
  const metabolicItems = useMemo(() => parseScores(catScoreLines).filter((s) => /sugar|sweetener|metabolic|additive|preservative/i.test(s.label)), [catScoreLines]);
  const caffeineItems  = useMemo(() => parseScores(catScoreLines).filter((s) => /caffeine|stimulant/i.test(s.label)), [catScoreLines]);

  // Extract rating
  const ratingText = ratingKey ? [ratingKey, ...(sections.get(ratingKey) || [])].join(" ") : "";
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";
  const rm    = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
  if (rm)     { finalRating = parseFloat(rm[1]); maxRating = parseInt(rm[2]); }
  const rmSub = ratingText.match(/\d+\.?\d*\s*\/\s*\d+\s*[—–\-]+\s*(.+)/);
  if (rmSub)  { ratingSubtitle = rmSub[1].trim(); }

  const rColor = scoreColor(finalRating, maxRating);
  const rLabel = scoreLabel(finalRating, maxRating);

  // Parse data
  const keyScores     = useMemo(() => parseScores(keyScoreLines),                   [keyScoreLines]);
  const catScores     = useMemo(() => parseScores(catScoreLines),                   [catScoreLines]);
  const structureData = useMemo(() => parseDrinkStructure(structLines),             [structLines]);
  const contribs      = useMemo(() => parseContribSignals(contribLines),            [contribLines]);
  const positives     = useMemo(() => parseBullets(positiveLines),                  [positiveLines]);
  const concerns      = useMemo(() => parseBullets(concernLines),                   [concernLines]);
  const insights      = useMemo(() => parseBullets(insightLines),                   [insightLines]);
  const mindfulGroups = useMemo(() => parseMindfulGroups(mindfulLines),             [mindfulLines]);
  const allergens     = useMemo(() => parseAllergens(allergenLines),                [allergenLines]);
  const ingredients   = useMemo(() => parseDrinkIngredients(catScoreLines.concat(contribLines)), [catScoreLines, contribLines]);

  // Group ingredients
  const ingGroups = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of ingredients) {
      if (!groups[ing.group]) groups[ing.group] = [];
      groups[ing.group].push(ing);
    }
    return groups;
  }, [ingredients]);

  // Signal chips for executive panel
  const allScores = [...keyScores, ...catScores];
  const signals   = useMemo(() => inferDrinkSignals(drinkType, allScores), [drinkType, allScores]);

  const hasStructure   = Object.values(structureData).some(Boolean);
  const hasAllergens   = allergenLines.length > 0;
  const hasMindful     = mindfulGroups.length > 0;
  const hasInsights    = positives.length > 0 || concerns.length > 0 || insights.length > 0;
  const hasCaffeine    = caffeineItems.length > 0 || insights.some((i) => /caffeine|stimulant/i.test(i));
  const hasAcid        = acidScoreItems.length > 0;
  const hasMetabolic   = metabolicItems.length > 0 || positives.length > 0 || concerns.length > 0;
  const hasIngredients = ingredients.length > 0 || contribs.length > 0;

  const TABS: Tab[] = [
    { id: "scores",      label: "Scores",        icon: "◎"  },
    { id: "ingredients", label: "Ingredients",   icon: "🔬" },
    { id: "acid",        label: "Acid & Dental", icon: "🦷" },
    { id: "metabolic",   label: "Metabolic",     icon: "🩸" },
    { id: "caffeine",    label: "Caffeine",       icon: "⚡" },
    { id: "insights",    label: "Insights",       icon: "💡" },
    { id: "mindful",     label: "Mindful Groups", icon: "🛡️" },
    { id: "allergens",   label: "Allergens",      icon: "⚠️" },
    { id: "consumption", label: "Consumption",    icon: "🍽" },
    { id: "science",     label: "Science",        icon: "🧠" },
    { id: "transparency",label: "Transparency",   icon: "📦" },
  ].filter((tab) => {
    if (tab.id === "scores")       return keyScores.length > 0 || catScores.length > 0;
    if (tab.id === "ingredients")  return hasIngredients;
    if (tab.id === "acid")         return hasAcid;
    if (tab.id === "metabolic")    return hasMetabolic;
    if (tab.id === "caffeine")     return hasCaffeine;
    if (tab.id === "insights")     return hasInsights;
    if (tab.id === "mindful")      return hasMindful;
    if (tab.id === "allergens")    return hasAllergens;
    if (tab.id === "consumption")  return consumeLines.length > 0;
    if (tab.id === "science")      return true;
    if (tab.id === "transparency") return hasStructure;
    return false;
  });

  const safeActiveTab = Math.min(activeTab, TABS.length - 1);
  const currentTabId  = TABS[safeActiveTab]?.id;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: T.bg, borderRadius: 24, overflow: "hidden", color: T.textDark }}>

      {/* ── HEADER ── */}
      <div style={{ background: T.inkMid, borderBottom: `1px solid ${T.border}`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, background: gradient, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
          {DRINK_ICONS[drinkType]}
        </div>
        <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.1em", color: T.electric }}>{DC_BRAND}</span>
        <span style={{ fontSize: 12, color: T.border, margin: "0 4px" }}>·</span>
        <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>{DC_TITLE}</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 11, color: T.textFaint, background: T.surfaceAlt, padding: "4px 12px", borderRadius: 99, border: `1px solid ${T.border}` }}>{DC_BADGE}</span>
        </div>
      </div>

      {/* ── SUBTITLE BANNER ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 16px", background: `${T.electric}15`, borderBottom: `1px solid ${T.electric}30` }}>
        <span style={{ fontSize: 12, color: T.electricGlow, flexShrink: 0 }}>✦</span>
        <span style={{ fontSize: 11.5, color: T.electricGlow, fontWeight: 500, letterSpacing: "0.01em" }}>{DC_SUBTITLE}</span>
      </div>

      {/* ── EXECUTIVE DASHBOARD ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>

            {/* Left column */}
            <div>
              {/* Hero rating card */}
              <div style={{ background: gradient, borderRadius: 16, padding: "22px 24px", color: "#FFF", marginBottom: 14, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>⭐ DRINK INTELLIGENCE</div>
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalRating.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: ratingSubtitle ? 4 : 0 }}>{rLabel}</div>
                {ratingSubtitle && <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>}
                <div style={{ marginTop: 12 }}><Stars score={finalRating} max={maxRating} /></div>
              </div>

              {/* Drink structure quick-view */}
              {hasStructure && (
                <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 13, padding: "13px 16px", marginBottom: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {structureData.processingStyle && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.textFaint, letterSpacing: "0.06em", marginBottom: 3 }}>PROCESSING</div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.textDark }}>{structureData.processingStyle}</div>
                      </div>
                    )}
                    {structureData.primaryBase && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.textFaint, letterSpacing: "0.06em", marginBottom: 3 }}>PRIMARY BASE</div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.textDark }}>{structureData.primaryBase}</div>
                      </div>
                    )}
                    {structureData.carbonated && (
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.textFaint, letterSpacing: "0.06em", marginBottom: 3 }}>CARBONATED</div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.cyan }}>{structureData.carbonated}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Positives / Concerns mini preview */}
              {(positives.length > 0 || concerns.length > 0) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {positives.length > 0 && (
                    <div style={{ background: "#022C22", border: `1px solid #065F46`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.green, marginBottom: 8, letterSpacing: "0.05em" }}>✓ POSITIVE SIGNALS</div>
                      {positives.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: T.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: T.green, fontWeight: 800, flexShrink: 0 }}>+</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {concerns.length > 0 && (
                    <div style={{ background: "#1C1100", border: `1px solid #78350F`, borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.amber, marginBottom: 8, letterSpacing: "0.05em" }}>! BE AWARE OF</div>
                      {concerns.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: T.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: T.amber, fontWeight: 800, flexShrink: 0 }}>!</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column — ring + signal chips */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {signals.map((chip, i) => (
                <SignalChip key={i} chip={chip} />
              ))}
            </div>
          </div>

          {/* ── TAB BAR ── */}
          <TabBar tabs={TABS} activeTab={safeActiveTab} onTabChange={(i) => setActiveTab(i)} />
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 22px" }}>

        {currentTabId === "scores" && (
          <ScoresPanel keyScores={keyScores} catScores={catScores} />
        )}

        {currentTabId === "ingredients" && (
          <IngredientsPanel ingGroups={ingGroups} contribs={contribs} />
        )}

        {currentTabId === "acid" && (
          <AcidDentalPanel acidScores={acidScoreItems} />
        )}

        {currentTabId === "metabolic" && (
          <MetabolicPanel metabolicScores={metabolicItems} positives={positives} concerns={concerns} />
        )}

        {currentTabId === "caffeine" && (
          <CaffeinePanel cafScores={caffeineItems} insights={insights} />
        )}

        {currentTabId === "insights" && (
          <InsightsPanel positives={positives} concerns={concerns} />
        )}

        {currentTabId === "mindful" && (
          <MindfulGroupsPanel groups={mindfulGroups} />
        )}

        {currentTabId === "allergens" && (
          <AllergensPanel allergens={allergens} />
        )}

        {currentTabId === "consumption" && (
          <ConsumptionPanel lines={consumeLines} />
        )}

        {currentTabId === "science" && (
          <SciencePanel
            verdictLines={verdictLines}
            finalRating={finalRating}
            maxRating={maxRating}
            ratingSubtitle={ratingSubtitle}
            rLabel={rLabel}
            gradient={gradient}
            highScoreLines={highScoreLines}
          />
        )}

        {currentTabId === "transparency" && (
          <TransparencyPanel structureData={structureData} />
        )}

      </div>
    </div>
  );
}