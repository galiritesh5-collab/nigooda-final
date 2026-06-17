import React from "react";

const FAQ = () => {
const faqs = [
{
question: "What is Nigooda?",
answer:
"Nigooda is a Product Discovery and Product Intelligence platform designed to help consumers better understand products, ingredients, formulations, and product characteristics before making purchasing decisions."
},
{
question: "Why was Nigooda created?",
answer:
"Nigooda was created to make product information more transparent and understandable. Many consumers struggle to evaluate products because important information is often hidden behind marketing claims and technical terminology."
},
{
question: "How is Nigooda different from online marketplaces?",
answer:
"Nigooda focuses on helping users understand products through Product Intelligence and educational insights rather than simply selling products."
},
{
question: "Does Nigooda sell products directly?",
answer:
"In most cases, no. Nigooda primarily serves as a discovery and Product Intelligence platform. Products may be sold by third-party retailers, brands, and marketplaces."
},
{
question: "Is Nigooda free to use?",
answer:
"Most Nigooda features are currently available free of charge. Premium services and advanced tools may be introduced in the future."
},
{
question: "What is Product Intelligence?",
answer:
"Product Intelligence is Nigooda's methodology for helping users better understand products through structured analysis systems, category-specific frameworks, and educational insights."
},
{
question: "How does Product Intelligence work?",
answer:
"Product Intelligence combines category-specific evaluation systems, structured methodologies, product information, and AI-assisted analysis to provide deeper understanding of products."
},
{
question: "Why does Nigooda analyze products?",
answer:
"Our goal is to help consumers make more informed purchasing decisions by providing additional context and insights about products."
},
{
question: "What factors influence ratings?",
answer:
"Factors may vary depending on product category and can include transparency, nutritional characteristics, formulation quality, compatibility factors, safety considerations, and other category-specific criteria."
},
{
question: "Can ratings change over time?",
answer:
"Yes. Ratings may evolve as products change, methodologies improve, and new information becomes available."
},
{
question: "How are food products evaluated?",
answer:
"Food products may be evaluated using nutritional characteristics, product composition, processing indicators, transparency factors, and overall product context."
},
{
question: "What nutritional factors are considered?",
answer:
"Factors may include protein, fiber, added sugar, sodium, calories, fats, and overall nutritional composition."
},
{
question: "Are food ratings medical advice?",
answer:
"No. Food ratings are educational and informational tools only and should not replace professional medical or nutritional guidance."
},
{
question: "Why can food ratings change?",
answer:
"Manufacturers may change formulations, ingredients, nutritional values, or product information over time."
},
{
question: "How are skincare products analyzed?",
answer:
"Skincare products may be evaluated using category-specific frameworks that consider formulation quality, safety, transparency, compatibility, and functional characteristics."
},
{
question: "What factors are considered in personal care analysis?",
answer:
"Factors may include ingredient safety, compatibility, formulation quality, potential irritants, transparency, and intended product function."
},
{
question: "Can Nigooda identify potential irritants?",
answer:
"Nigooda may provide educational information regarding ingredients commonly associated with irritation, but users should always perform independent research and consult professionals when needed."
},
{
question: "Can Nigooda replace dermatologist advice?",
answer:
"No. Nigooda does not replace professional medical or dermatological guidance."
},
{
question: "How does AI help Nigooda?",
answer:
"AI may assist with information extraction, product categorization, data organization, educational summaries, and Product Intelligence reports."
},
{
question: "Are AI-generated results always accurate?",
answer:
"No. AI systems may occasionally generate inaccurate or incomplete information. AI outputs should be viewed as informational tools."
},
{
question: "Why does Nigooda use AI?",
answer:
"AI helps simplify complex information and improve accessibility for consumers."
},
{
question: "How often are systems improved?",
answer:
"Nigooda continuously improves methodologies, technologies, and Product Intelligence systems as new information becomes available."
},
{
question: "How does Nigooda make money?",
answer:
"Nigooda may generate revenue through affiliate partnerships, advertising, sponsorships, premium services, and future platform offerings."
},
{
question: "Does affiliate revenue affect ratings?",
answer:
"No. Nigooda aims to maintain transparency and independence. Affiliate relationships do not guarantee favorable ratings."
},
{
question: "Are sponsored products treated differently?",
answer:
"Nigooda strives to maintain transparency and clearly disclose relevant partnerships when applicable."
},
{
question: "Why does Nigooda use affiliate partnerships?",
answer:
"Affiliate partnerships help support platform development, infrastructure, research, and future improvements."
},
{
question: "What data does Nigooda collect?",
answer:
"Data collection practices are described in detail within our Privacy Policy."
},
{
question: "Is my information shared with third parties?",
answer:
"Nigooda may work with service providers and partners as described in the Privacy Policy. We do not sell personal information."
},
{
question: "How is my information protected?",
answer:
"Nigooda implements reasonable security measures designed to protect user information."
},
{
question: "Can brands partner with Nigooda?",
answer:
"Yes. Nigooda may collaborate with brands, retailers, startups, manufacturers, and affiliate networks."
},
{
question: "Can brands submit products?",
answer:
"As the platform grows, opportunities may become available for product submissions and participation in discovery programs."
},
{
question: "How can businesses contact Nigooda?",
answer:
"Businesses may reach out through our Contact Us page or official contact channels."
},
{
question: "What features are planned for Nigooda?",
answer:
"Future plans may include expanded Product Intelligence systems, additional product categories, advanced AI tools, mobile applications, and enhanced user experiences."
},
{
question: "Will Nigooda launch mobile apps?",
answer:
"Mobile applications may be introduced in the future as the platform continues to evolve."
},
{
question: "Will new product categories be added?",
answer:
"Yes. Nigooda plans to expand Product Intelligence coverage across additional categories over time."
}
];

return ( <div className="min-h-screen bg-white"> <div className="max-w-5xl mx-auto px-6 py-16">

    <h1 className="text-5xl font-bold text-slate-900 mb-6">
      Frequently Asked Questions
    </h1>

    <p className="text-slate-600 text-lg mb-12">
      Answers to common questions about Nigooda, Product Intelligence,
      AI-powered analysis, ratings, privacy, partnerships, and the future of the platform.
    </p>

    <div className="space-y-10">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-slate-200 pb-8"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            {faq.question}
          </h2>

          <p className="text-slate-700 leading-8">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>

  </div>
</div>


);
};

export default FAQ;
