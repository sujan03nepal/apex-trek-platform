/**
 * AI SEO Optimization Service
 * 
 * This service handles AI-powered SEO optimization suggestions for:
 * - Trek pages
 * - Blog posts
 * - Homepage content
 * 
 * Requires OpenAI API key in environment variables: VITE_OPENAI_API_KEY
 */

export interface SEOOptimizationInput {
  contentType: "trek" | "blog" | "page";
  title: string;
  content: string;
  currentKeywords?: string[];
  region?: string;
  language?: string;
}

export interface SEOOptimizationOutput {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  longTailKeywords: string[];
  schema: object;
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
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Call AI SEO Optimization API
 * 
 * This would be called on your backend server
 * Example implementation for Node.js/Express:
 * 
 * POST /api/seo-optimize
 * 
 * @param input SEO optimization input
 * @returns Promise<SEOOptimizationOutput>
 */
export async function optimizeForSEO(
  input: SEOOptimizationInput
): Promise<SEOOptimizationOutput> {
  try {
    // Call your backend API endpoint
    const response = await fetch("/api/seo-optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as SEOOptimizationOutput;
  } catch (error) {
    console.error("SEO Optimization Error:", error);
    // Return default/fallback suggestions
    return generateDefaultSEOSuggestions(input);
  }
}

/**
 * Generate default SEO suggestions when API is not available
 */
function generateDefaultSEOSuggestions(
  input: SEOOptimizationInput
): SEOOptimizationOutput {
  const slug = generateSlug(input.title);
  const keywords = extractKeywords(input.content, input.currentKeywords);
  const longTailKeywords = generateLongTailKeywords(keywords, input.region);

  return {
    metaTitle: generateMetaTitle(input.title),
    metaDescription: generateMetaDescription(input.content),
    slug,
    keywords,
    longTailKeywords,
    schema: generateSchema(input),
    ogTags: {
      ogTitle: input.title,
      ogDescription: generateMetaDescription(input.content),
    },
    twitterTags: {
      twitterTitle: input.title,
      twitterDescription: generateMetaDescription(input.content),
    },
    contentImprovements: [
      "Add more specific details and examples",
      "Include traveler testimonials",
      "Add practical tips and advice",
    ],
    internalLinkSuggestions: [
      "Link to related trek guides",
      "Link to accommodation guides",
      "Link to travel tips blog posts",
    ],
    missingSections: [
      "FAQ section",
      "Gallery or photo examples",
      "Booking information",
    ],
    readabilityScore: 72,
    recommendations: [
      "Improve title to be more compelling and keyword-rich",
      "Add more structural headings (H2, H3)",
      "Include actionable advice and tips",
      "Add user-generated content or testimonials",
    ],
  };
}

/**
 * Generate meta title with optimal length and keywords
 */
function generateMetaTitle(title: string): string {
  // Meta titles should be 50-60 characters for optimal display
  if (title.length <= 60) {
    return title;
  }
  return title.substring(0, 57) + "...";
}

/**
 * Generate meta description
 */
function generateMetaDescription(content: string): string {
  // Meta descriptions should be 150-160 characters
  const description = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .substring(0, 160)
    .trim();

  return description.length > 150
    ? description.substring(0, 157) + "..."
    : description;
}

/**
 * Extract keywords from content
 */
function extractKeywords(
  content: string,
  currentKeywords?: string[]
): string[] {
  if (currentKeywords && currentKeywords.length > 0) {
    return currentKeywords;
  }

  // Simple keyword extraction (in production, use proper NLP)
  const words = content
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 4);

  // Count frequency and return top keywords
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}

/**
 * Generate long-tail keyword variations
 */
function generateLongTailKeywords(
  keywords: string[],
  region?: string
): string[] {
  const longTails: string[] = [];

  keywords.forEach((keyword) => {
    longTails.push(`${keyword} guide`);
    longTails.push(`best ${keyword}`);
    longTails.push(`${keyword} tips`);
    if (region) {
      longTails.push(`${keyword} in ${region}`);
    }
  });

  return longTails.slice(0, 15);
}

/**
 * Generate JSON-LD schema for rich snippets
 */
function generateSchema(input: SEOOptimizationInput): object {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": input.contentType === "trek" ? "TouristAttraction" : "Article",
    name: input.title,
    description: generateMetaDescription(input.content),
  };

  if (input.contentType === "trek") {
    return {
      ...baseSchema,
      "@type": "TouristAttraction",
      areaServed: input.region || "Nepal",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NP",
        addressRegion: input.region || "Nepal",
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
        name: "Nepal Treks",
      },
    };
  }

  return baseSchema;
}

/**
 * Backend API Handler Example
 * 
 * This is how you would implement the SEO optimization on your backend:
 * 
 * File: api/seo-optimize.ts (or .js)
 * 
 * import { OpenAI } from "openai";
 * 
 * const openai = new OpenAI({
 *   apiKey: process.env.OPENAI_API_KEY,
 * });
 * 
 * export default async function handler(req, res) {
 *   if (req.method !== "POST") {
 *     return res.status(405).json({ error: "Method not allowed" });
 *   }
 * 
 *   try {
 *     const { title, content, contentType, region } = req.body;
 * 
 *     const prompt = `
 *       You are an SEO expert optimizing content for search engines.
 *       
 *       Content Type: ${contentType}
 *       Title: ${title}
 *       Content: ${content.substring(0, 1000)}
 *       Region: ${region || "Nepal"}
 *       
 *       Generate SEO optimizations as JSON with:
 *       - metaTitle (50-60 chars)
 *       - metaDescription (150-160 chars)
 *       - keywords (array of 8-10)
 *       - longTailKeywords (array of 10-15)
 *       - contentImprovements (array of 3-5 suggestions)
 *       - internalLinkSuggestions (array of 3-5)
 *       - missingSections (array of 2-4)
 *       - recommendations (array of 3-5)
 *     `;
 * 
 *     const message = await openai.chat.completions.create({
 *       model: "gpt-4",
 *       messages: [{ role: "user", content: prompt }],
 *       temperature: 0.7,
 *     });
 * 
 *     const suggestions = JSON.parse(message.content);
 * 
 *     res.status(200).json({
 *       metaTitle: suggestions.metaTitle,
 *       metaDescription: suggestions.metaDescription,
 *       slug: generateSlug(title),
 *       keywords: suggestions.keywords,
 *       longTailKeywords: suggestions.longTailKeywords,
 *       schema: generateSchema({ title, contentType, region }),
 *       // ... other fields
 *     });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * }
 */

export default {
  optimizeForSEO,
  generateSlug,
  generateDefaultSEOSuggestions,
};
