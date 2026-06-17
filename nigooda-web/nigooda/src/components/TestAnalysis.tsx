import ReactMarkdown from "react-markdown";

export default function TestAnalysis() {
  const report = `
# ⭐ FINAL RATING

## 4.4 / 5 — Excellent

# 📊 CORE SCORES

### Safety — ⭐4.5

Very good safety profile.

### Effectiveness — ⭐4.3

Strong performance.

# 📌 STRUCTURAL INSIGHT

## Strengths

- Good formulation
- Strong performance

## Concerns

- Moderate fragrance load
`;

  return (
    <div className="prose max-w-none bg-white rounded-xl border p-6 mt-10">
      <ReactMarkdown>{report}</ReactMarkdown>
    </div>
  );
}