/**
 * AI SEO Optimization Engine
 * 
 * Provides AI-powered SEO recommendations for trek pages, blog posts, and content
 * Generates metadata, keywords, schema, and content improvements
 */

export interface SEOOptimizationInput {
  // Content Information
  title: string;
  content: string;

  // Trek-Specific (optional)
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    altitude?: string;
    distance?: string;
  }>;

  // Trek Facts (optional)
  duration?: string;
  altitude?: string;
  difficulty?: string;
  region?: string;

  // Content Type
  contentType: "trek" | "blog" | "page";

  // Settings Data (from admin settings)
  companyName?: string;
  companyKeywords?: string[];
}

export interface SEOOptimizationOutput {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  longTailKeywords: string[];
  schema: Record<string, any>;
  ogTags: {
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
  };
  twitterTags: {
    twitterTitle: string;
    twitterDescription: string;
  };
  contentImprovements: string[];
  internalLinkSuggestions: string[];
  missingSections: string[];
  readabilityScore: number;
  recommendations: string[];
}

/**
 * Generate URL-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Analyze content readability
 */
export function analyzeReadability(content: string): number {
  // Simple readability scoring
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).length;
  const paragraphs = content.split(/\n\n+/).length;

  let score = 60; // Base score

  // Adjust based on content structure
  if (words > 300) score += 10;
  if (words > 500) score += 5;
  if (sentences > 20) score += 5;
  if (paragraphs > 3) score += 10;

  // Deduct for very long paragraphs
  const avgWordsPerParagraph = words / paragraphs;
  if (avgWordsPerParagraph > 150) score -= 10;

  return Math.min(score, 100);
}

/**
 * Extract keywords from content
 */
function extractKeywords(content: string): string[] {
  const text = content.toLowerCase().replace(/[^\w\s]/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 3);

  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    // Filter out common words
    const commonWords = [
      "the",
      "and",
      "this",
      "that",
      "with",
      "from",
      "have",
      "been",
      "will",
      "your",
      "which",
      "about",
      "more",
      "also",
      "trek",
    ];
    if (!commonWords.includes(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Return top keywords
  return Object.entries(frequency)
    .filter(([, count]) => count >= 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}

/**
 * Generate long-tail keywords
 */
function generateLongTailKeywords(
  title: string,
  keywords: string[],
  region?: string
): string[] {
  const longTails: string[] = [];
  const titleWords = title.split(" ").slice(0, 3);

  keywords.forEach((keyword) => {
    longTails.push(`${keyword} guide`);
    longTails.push(`best ${keyword}`);
    longTails.push(`${keyword} tips`);
    longTails.push(`how to ${keyword}`);
    if (region) {
      longTails.push(`${keyword} in ${region}`);
      longTails.push(`${region} ${keyword}`);
    }
  });

  // Add title-based long tails
  if (titleWords.length > 0) {
    longTails.push(`${titleWords.join(" ")} guide`);
    if (region) {
      longTails.push(`${titleWords.join(" ")} in ${region}`);
    }
  }

  return [...new Set(longTails)].slice(0, 15);
}

/**
 * Generate meta title optimized for search engines
 */
function generateMetaTitle(title: string, keyword?: string): string {
  let metaTitle = title;

  // Optimize length (50-60 characters is ideal)
  if (metaTitle.length > 60) {
    metaTitle = metaTitle.substring(0, 57) + "...";
  }

  // Add keyword if not already present and space allows
  if (
    keyword &&
    !metaTitle.toLowerCase().includes(keyword.toLowerCase()) &&
    metaTitle.length + keyword.length < 60
  ) {
    metaTitle = `${keyword} - ${metaTitle}`;
  }

  return metaTitle;
}

/**
 * Generate meta description
 */
function generateMetaDescription(content: string, title: string): string {
  // Extract first compelling sentence
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  let description = sentences[0]?.trim() || content.substring(0, 160);

  // Ensure it includes the main topic
  if (!description.includes(title.split(" ")[0])) {
    description = `${title.substring(0, 20)}... ${description}`;
  }

  // Trim to 150-160 characters
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}

/**
 * Generate JSON-LD schema for rich snippets
 */
function generateSchema(
  input: SEOOptimizationInput,
  output: Partial<SEOOptimizationOutput>
): Record<string, any> {
  const baseSchema = {
    "@context": "https://schema.org",
    name: input.title,
    description: output.metaDescription || input.content.substring(0, 160),
    url: `https://nepaltreks.com/${output.slug || input.title}`,
  };

  if (input.contentType === "trek") {
    return {
      ...baseSchema,
      "@type": "TouristAttraction",
      areaServed: {
        "@type": "Place",
        name: input.region || "Nepal",
      },
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "300",
      },
    };
  }

  if (input.contentType === "blog") {
    return {
      ...baseSchema,
      "@type": "BlogPosting",
      datePublished: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: input.companyName || "Nepal Treks",
      },
      articleBody: input.content.substring(0, 500),
    };
  }

  return {
    ...baseSchema,
    "@type": "WebPage",
  };
}

/**
 * Analyze content for missing sections
 */
function identifyMissingSections(
  content: string,
  contentType: string
): string[] {
  const missing: string[] = [];
  const lowerContent = content.toLowerCase();

  if (contentType === "trek") {
    if (!lowerContent.includes("itinerary")) missing.push("Day-by-day itinerary");
    if (!lowerContent.includes("cost") && !lowerContent.includes("price"))
      missing.push("Pricing information");
    if (!lowerContent.includes("difficulty"))
      missing.push("Difficulty level information");
    if (!lowerContent.includes("best time") && !lowerContent.includes("season"))
      missing.push("Best time to visit");
    if (!lowerContent.includes("altitude"))
      missing.push("Altitude information");
    if (!lowerContent.includes("map") && !lowerContent.includes("route"))
      missing.push("Map or route visualization");
  }

  if (contentType === "blog") {
    if (!lowerContent.includes("image") && !lowerContent.includes("photo"))
      missing.push("Supporting images/photos");
    if (content.split(/\n/).length < 5) missing.push("Better formatting/headers");
    if (!lowerContent.includes("tips") && !lowerContent.includes("advice"))
      missing.push("Practical tips or advice");
  }

  // General missing sections
  if (!lowerContent.includes("conclusion") && content.length > 1000)
    missing.push("Conclusion section");
  if (!lowerContent.includes("faq")) missing.push("FAQ section");

  return missing;
}

/**
 * Generate content improvement suggestions
 */
function generateContentImprovements(
  content: string,
  contentType: string
): string[] {
  const improvements: string[] = [];
  const wordCount = content.split(/\s+/).length;

  // Length recommendations
  if (wordCount < 300) {
    improvements.push("Expand content to at least 300 words for better SEO");
  } else if (wordCount < 500) {
    improvements.push(
      "Consider adding more detailed information (500+ words recommended)"
    );
  }

  // Structure recommendations
  const headingCount = (content.match(/#+/g) || []).length;
  if (headingCount < 3) {
    improvements.push("Add more heading sections to improve readability");
  }

  // Content quality
  if (!content.includes("•") && !content.includes("-")) {
    improvements.push("Add bullet points or lists for better readability");
  }

  if (contentType === "trek") {
    improvements.push("Add specific elevation gain/loss data");
    improvements.push("Include accommodation details and options");
    improvements.push("Add information about local culture or wildlife");
  }

  if (contentType === "blog") {
    improvements.push("Add personal experiences or anecdotes");
    improvements.push("Include practical examples or case studies");
    improvements.push("Add actionable takeaways for readers");
  }

  return improvements;
}

/**
 * Generate internal linking suggestions
 */
function generateInternalLinkSuggestions(
  title: string,
  region?: string
): string[] {
  const suggestions: string[] = [];

  // Trek-related suggestions
  if (region) {
    suggestions.push(`Link to ${region} region guide page`);
    suggestions.push(`Link to other treks in ${region}`);
  }

  suggestions.push("Link to trek preparation guide");
  suggestions.push("Link to packing list article");
  suggestions.push("Link to accommodation guide");
  suggestions.push("Link to booking/pricing page");

  return suggestions;
}

/**
 * Main function: Generate SEO optimizations
 */
export async function optimizeForSEO(
  input: SEOOptimizationInput
): Promise<SEOOptimizationOutput> {
  try {
    // Call backend API
    const response = await fetch("/api/seo-optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return (await response.json()) as SEOOptimizationOutput;
  } catch (error) {
    console.warn("Using fallback SEO suggestions:", error);
    // Fallback: Generate suggestions locally
    return generateLocalSEOSuggestions(input);
  }
}

/**
 * Generate SEO suggestions locally (without AI)
 */
export function generateLocalSEOSuggestions(
  input: SEOOptimizationInput
): SEOOptimizationOutput {
  const slug = generateSlug(input.title);
  const keywords = extractKeywords(input.content);
  const longTailKeywords = generateLongTailKeywords(
    input.title,
    keywords,
    input.region
  );
  const metaTitle = generateMetaTitle(input.title, keywords[0]);
  const metaDescription = generateMetaDescription(input.content, input.title);

  return {
    metaTitle,
    metaDescription,
    slug,
    keywords,
    longTailKeywords,
    schema: generateSchema(input, { metaDescription, slug }),
    ogTags: {
      ogTitle: input.title.substring(0, 100),
      ogDescription: metaDescription,
    },
    twitterTags: {
      twitterTitle: input.title.substring(0, 70),
      twitterDescription: metaDescription.substring(0, 100),
    },
    contentImprovements: generateContentImprovements(
      input.content,
      input.contentType
    ),
    internalLinkSuggestions: generateInternalLinkSuggestions(
      input.title,
      input.region
    ),
    missingSections: identifyMissingSections(input.content, input.contentType),
    readabilityScore: analyzeReadability(input.content),
    recommendations: [
      `Update meta title to: "${metaTitle}"`,
      `Add keywords: ${keywords.join(", ")}`,
      `Consider using long-tail keywords: ${longTailKeywords.slice(0, 3).join(", ")}`,
      "Ensure all images have descriptive alt text",
      "Add internal links to related pages",
    ],
  };
}

export default {
  optimizeForSEO,
  generateLocalSEOSuggestions,
  generateSlug,
  analyzeReadability,
};
