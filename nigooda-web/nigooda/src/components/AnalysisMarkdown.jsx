import React, { useMemo, useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

/**
 * AnalysisTabs.jsx
 * ------------------------------------------------------------------
 * Universal, format-agnostic tab system for Nigooda's markdown
 * analysis reports.
 *
 * WHY THIS EXISTS
 * Every Nigooda intelligence engine (food, skincare, shampoo, drinks,
 * household, pet care, and any future category) returns a single
 * markdown string in `result.analysis`. These reports can run very
 * long because they contain many H1 (`# `) sections. Rather than
 * rendering the whole thing as one long scroll, this component:
 *
 *   1. Parses the markdown into top-level (H1) sections.
 *   2. Treats the FIRST TWO sections as a persistent "header" area
 *      (in practice this is usually a product banner + final rating,
 *      but we never check the heading text — position is the only
 *      contract).
 *   3. Turns every remaining H1 section into a clickable tab.
 *   4. Renders only the active tab's markdown with ReactMarkdown,
 *      reusing whatever markdown component overrides the app already
 *      uses for styling (passed in via `markdownComponents`).
 *
 * This component has ZERO knowledge of "Food", "Skin Care",
 * "Shampoo", or any other vertical. It does not match on heading
 * text, emoji, or keyword. It only understands "markdown document
 * split by H1 boundaries." This is what makes it future-proof: a
 * brand-new engine with completely different section names works
 * automatically, with no code change here.
 * ------------------------------------------------------------------
 */

/**
 * Split a markdown string into top-level (H1) sections.
 *
 * Rules:
 * - A "section boundary" is any line that starts with exactly one
 *   `# ` (a single hash + space) at the start of the line. Lines
 *   like `## Heading` (H2+) are NOT boundaries — they stay nested
 *   inside whichever H1 section they appear under.
 * - Code fences (``` ... ```) are tracked so a `#` inside a code
 *   block is never mistaken for a heading.
 * - Any content appearing before the first H1 is kept as an
 *   implicit leading section (title "" ), so nothing is ever
 *   silently dropped.
 *
 * @param {string} markdown
 * @returns {{ title: string, content: string }[]}
 */
export function splitIntoH1Sections(markdown) {
  if (!markdown || typeof markdown !== "string") return [];

  const lines = markdown.split("\n");
  const sections = [];

  let currentTitle = null;
  let currentLines = [];
  let inCodeFence = false;
  let fenceMarker = null;

  const flush = () => {
    // Only push a section if it has a title OR non-trivial content.
    const content = currentLines.join("\n").trim();
    if (currentTitle !== null || content.length > 0) {
      sections.push({
        title: currentTitle !== null ? currentTitle : "",
        content,
      });
    }
    currentLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track fenced code blocks (``` or ~~~) so `#` inside code
    // is never treated as a heading boundary.
    const fenceMatch = trimmed.match(/^(```|~~~)/);
    if (fenceMatch) {
      if (!inCodeFence) {
        inCodeFence = true;
        fenceMarker = fenceMatch[1];
      } else if (trimmed.startsWith(fenceMarker)) {
        inCodeFence = false;
        fenceMarker = null;
      }
      currentLines.push(line);
      continue;
    }

    const isH1 =
      !inCodeFence && /^#{1}\s+\S/.test(line) && !/^#{2,}/.test(line);

    if (isH1) {
      // Close out the previous section before starting a new one.
      flush();
      currentTitle = line.replace(/^#\s+/, "").trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Flush whatever is left (the final section, or everything if no
  // H1 was ever found).
  flush();

  return sections;
}

/**
 * Derive a short, tab-friendly label from a section title.
 * Strips leading emoji/symbols so tabs stay readable, but keeps the
 * original title available for the panel header.
 */
function toTabLabel(title) {
  if (!title) return "Section";
  // Strip a leading emoji/symbol cluster + following whitespace,
  // e.g. "🧪 SPECIALIZED PERFORMANCE" -> "SPECIALIZED PERFORMANCE"
  const stripped = title.replace(
    /^[\p{Extended_Pictographic}\p{Emoji_Presentation}\u2600-\u27BF\uFE0F\s]+/u,
    ""
  ).trim();
  return stripped || title;
}

function SectionMarkdown({ content, components }) {
  return (
    <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-sm prose-li:text-sm prose-p:leading-6 prose-li:leading-6">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}

/**
 * AnalysisTabs
 *
 * @param {object} props
 * @param {string} props.markdown - Raw markdown report (result.analysis).
 * @param {object} [props.markdownComponents] - Optional ReactMarkdown
 *        `components` override map, so existing AnalysisMarkdown.jsx
 *        styling (custom renderers for tables, headings, etc.) can be
 *        reused as-is without duplicating styling logic here.
 * @param {number} [props.headerSectionCount=2] - How many leading H1
 *        sections to treat as the persistent header (default 2:
 *        typically product info + final rating). This is a position-
 *        based contract, never a name-based one.
 * @param {string} [props.className]
 */
export default function AnalysisMarkdown({
  markdown,
  markdownComponents,
  headerSectionCount = 2,
  className = "",
}) {
  const sections = useMemo(() => splitIntoH1Sections(markdown), [markdown]);

  const headerSections = sections.slice(0, headerSectionCount);
  const tabSections = sections.slice(headerSectionCount);

  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef(null);

  // If the report changes (new product analyzed), reset to first tab.
  useEffect(() => {
    setActiveIndex(0);
  }, [markdown]);

  if (!markdown || sections.length === 0) {
    return (
      <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
        No analysis available.
      </div>
    );
  }

  // Edge case: report has no tab-able sections beyond the header —
  // just render everything as header content, no tab bar needed.
  if (tabSections.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        {headerSections.map((section, i) => (
          <div key={i} className="mb-6">
            {section.title && (
              <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                {section.title}
              </h1>
            )}
            <SectionMarkdown
              content={section.content}
              components={markdownComponents}
            />
          </div>
        ))}
      </div>
    );
  }

  const safeActiveIndex = Math.min(activeIndex, tabSections.length - 1);
  const activeSection = tabSections[safeActiveIndex];

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % tabSections.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + tabSections.length) % tabSections.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(tabSections.length - 1);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ---------------------------------------------------------- */}
      {/* HEADER AREA — always the first N (default 2) H1 sections.  */}
      {/* Position-based, never name-based, so it works regardless   */}
      {/* of what the engine actually titles these sections.         */}
      {/* ---------------------------------------------------------- */}
      {headerSections.length > 0 && (
        <div className="mb-6 space-y-6">
          {headerSections.map((section, i) => (
            <div key={i}>
              {section.title && (
                <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  {section.title}
                </h1>
              )}
              <SectionMarkdown
                content={section.content}
                components={markdownComponents}
              />
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* TAB BAR — one tab per remaining H1 section, dynamically.    */}
      {/* ---------------------------------------------------------- */}
      <div className="sticky top-0 z-10 -mx-1 px-1 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Analysis report sections"
          onKeyDown={handleKeyDown}
          className="flex gap-1 overflow-x-auto scrollbar-thin py-2 -mb-px"
        >
          {tabSections.map((section, i) => {
            const isActive = i === safeActiveIndex;
            return (
              <button
                key={i}
                id={`analysis-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`analysis-tabpanel-${i}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                className={[
                  "whitespace-nowrap shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors max-w-[180px] truncate",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500",
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                ].join(" ")}
              >
                {toTabLabel(section.title)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* ACTIVE PANEL — only the selected section is rendered.       */}
      {/* ---------------------------------------------------------- */}
      <div
        id={`analysis-tabpanel-${safeActiveIndex}`}
        role="tabpanel"
        aria-labelledby={`analysis-tab-${safeActiveIndex}`}
        className="pt-5"
      >
        <SectionMarkdown
          content={activeSection.content}
          components={markdownComponents}
        />
      </div>
    </div>
  );
}