# Backend API Route: SEO Optimization

This file contains the complete implementation for the `/api/seo-optimize` endpoint that powers the AI SEO engine.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install openai dotenv cors
```

### 2. Add Environment Variables

Add to your `.env` file:

```bash
OPENAI_API_KEY="sk-your-key-here"
```

---

## Implementation

### Option A: Node.js + Express

**server.js**
```javascript
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post('/api/seo-optimize', async (req, res) => {
  try {
    const {
      title,
      content,
      contentType,
      region,
      difficulty,
      duration,
      altitude,
      companyName = 'Nepal Treks'
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: 'Title and content are required'
      });
    }

    const contextInfo = {
      trek: `
        Trek Type: ${contentType}
        Region: ${region || 'Nepal'}
        Difficulty: ${difficulty || 'Not specified'}
        Duration: ${duration || 'Not specified'}
        Max Altitude: ${altitude || 'Not specified'}
      `,
      blog: `Blog Post about Nepal trekking`,
      page: `Website page for ${companyName}`
    };

    const prompt = `You are an expert SEO consultant for a Nepal trekking company. Analyze this content and provide comprehensive SEO recommendations.

${contextInfo[contentType] || ''}

Title: ${title}
Content Preview: ${content.substring(0, 800)}

Provide ONLY a valid JSON response (no markdown, no code blocks) with exactly these fields. Use double quotes for all strings. Return valid JSON:

{
  "metaTitle": "SEO-optimized title (50-60 chars including key keywords)",
  "metaDescription": "Compelling description (150-160 chars) with primary keyword",
  "slug": "url-friendly-slug",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "longTailKeywords": ["long tail phrase 1", "long tail phrase 2", "long tail phrase 3", "long tail phrase 4", "long tail phrase 5"],
  "schema": {
    "@context": "https://schema.org",
    "@type": "${contentType === 'trek' ? 'TouristAttraction' : contentType === 'blog' ? 'BlogPosting' : 'WebPage'}",
    "name": "${title}",
    "description": "meta description here"
  },
  "ogTags": {
    "ogTitle": "social media title (50-70 chars)",
    "ogDescription": "social share description (100-160 chars)"
  },
  "twitterTags": {
    "twitterTitle": "twitter headline (50-70 chars)",
    "twitterDescription": "twitter description (100-120 chars)"
  },
  "contentImprovements": ["improvement1", "improvement2", "improvement3"],
  "internalLinkSuggestions": ["link suggestion 1", "link suggestion 2", "link suggestion 3"],
  "missingSections": ["missing section 1", "missing section 2"],
  "readabilityScore": 75,
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const content_response = message.choices[0].message.content;
    if (!content_response) {
      throw new Error('No response from OpenAI');
    }

    const suggestions = JSON.parse(content_response);

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('SEO Optimization Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SEO API server running on port ${PORT}`);
});
```

---

### Option B: Next.js API Routes (Recommended)

**pages/api/seo-optimize.ts**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SEOOptimizationRequest {
  title: string;
  content: string;
  contentType: 'trek' | 'blog' | 'page';
  region?: string;
  difficulty?: string;
  duration?: string;
  altitude?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  companyName?: string;
}

interface SEOOptimizationResponse {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  longTailKeywords: string[];
  schema: Record<string, any>;
  ogTags: {
    ogTitle: string;
    ogDescription: string;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SEOOptimizationResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      title,
      content,
      contentType,
      region,
      difficulty,
      duration,
      altitude,
      itinerary,
      companyName = 'Nepal Treks'
    } = req.body as SEOOptimizationRequest;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        error: 'Title and content are required'
      });
    }

    // Build context information
    let contextInfo = '';
    if (contentType === 'trek') {
      contextInfo = `
        Trek Information:
        - Region: ${region || 'Nepal'}
        - Difficulty: ${difficulty || 'Not specified'}
        - Duration: ${duration || 'Not specified'}
        - Max Altitude: ${altitude || 'Not specified'}
        ${itinerary ? `- Itinerary: ${itinerary.length} days` : ''}
      `;
    }

    const prompt = `You are an expert SEO consultant specializing in travel and trekking websites. 
Analyze this content and provide comprehensive, actionable SEO recommendations.

Content Type: ${contentType}
${contextInfo}
Company: ${companyName}

Title: ${title}

Content (first 1000 chars):
${content.substring(0, 1000)}

${itinerary ? `
Itinerary:
${itinerary.map(day => `Day ${day.day}: ${day.title} - ${day.description}`).join('\n')}
` : ''}

Respond with ONLY valid JSON (no markdown formatting, no code blocks). Make sure all field values are strings or arrays of strings. Here's the exact format to follow:

{
  "metaTitle": "Include primary keyword, 50-60 characters max",
  "metaDescription": "Include primary keyword, 150-160 characters max. Make it compelling for click-through",
  "slug": "url-friendly-version-of-title",
  "keywords": ["primary", "secondary", "tertiary", "long phrase", "another phrase"],
  "longTailKeywords": ["long tail phrase 1", "long tail phrase 2", "long tail phrase 3", "long tail phrase 4", "longer specific phrase"],
  "schema": {
    "@context": "https://schema.org",
    "@type": "${contentType === 'trek' ? 'TouristAttraction' : contentType === 'blog' ? 'BlogPosting' : 'WebPage'}",
    "name": "${title}",
    "description": "Description here"
  },
  "ogTags": {
    "ogTitle": "Title for social sharing",
    "ogDescription": "Description for social sharing platforms"
  },
  "twitterTags": {
    "twitterTitle": "Title for Twitter",
    "twitterDescription": "Description for Twitter"
  },
  "contentImprovements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "internalLinkSuggestions": ["link to related trek", "link to guide article", "link to booking page"],
  "missingSections": ["missing section 1", "missing section 2"],
  "readabilityScore": 75,
  "recommendations": ["actionable recommendation 1", "actionable recommendation 2", "actionable recommendation 3"]
}`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = message.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const suggestions = JSON.parse(responseContent) as SEOOptimizationResponse;

    // Validate response structure
    if (!suggestions.metaTitle || !suggestions.metaDescription) {
      throw new Error('Invalid response structure from OpenAI');
    }

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('SEO Optimization Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      error: `SEO optimization failed: ${errorMessage}`
    });
  }
}
```

---

## Integration with Frontend

Once the backend is set up, the frontend will automatically call it:

**src/services/aiSeoEngine.ts**
```typescript
export async function optimizeForSEO(
  input: SEOOptimizationInput
): Promise<SEOOptimizationOutput> {
  const response = await fetch('/api/seo-optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}
```

---

## Usage Example

### From Admin Panel

```typescript
import { optimizeForSEO } from '@/services/aiSeoEngine';

// In your trek creation page
const handleOptimizeForSEO = async () => {
  const suggestions = await optimizeForSEO({
    title: 'Everest Base Camp Trek',
    content: 'Full trek description here...',
    contentType: 'trek',
    region: 'Everest',
    difficulty: 'Challenging',
    duration: '14 Days',
    altitude: '5,364m',
  });

  console.log('SEO Suggestions:', suggestions);
  // Apply suggestions to form fields
};
```

---

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:3000/api/seo-optimize \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Everest Base Camp Trek Guide",
    "content": "The Everest Base Camp trek is one of the most rewarding...",
    "contentType": "trek",
    "region": "Everest",
    "difficulty": "Challenging"
  }'
```

### Using Postman

1. Create POST request to `http://localhost:3000/api/seo-optimize`
2. Set Headers: `Content-Type: application/json`
3. Paste JSON body from cURL example
4. Send and check response

---

## Error Handling

The API handles these error cases:

```typescript
// Missing required fields
if (!title || !content) {
  return { error: 'Title and content are required' }
}

// OpenAI API key not set
if (!process.env.OPENAI_API_KEY) {
  return { error: 'OpenAI API key not configured' }
}

// OpenAI API error
catch (error) {
  return { error: 'Failed to generate SEO suggestions' }
}
```

---

## Performance Tips

1. **Cache Results**: Store SEO suggestions in database to avoid redundant API calls
2. **Rate Limiting**: Implement rate limiting to control OpenAI API costs
3. **Batch Processing**: Process multiple contents together for better efficiency
4. **Async Operations**: Run SEO optimization as background job for bulk operations

---

## Cost Management

OpenAI API pricing:
- GPT-4 Turbo: ~$0.01-0.03 per request (depending on token usage)
- For 100 optimizations: ~$1-3 USD

**Recommendations:**
- Use GPT-3.5 Turbo for faster, cheaper responses (~$0.001 per request)
- Cache suggestions to avoid re-processing same content
- Offer manual SEO entry as fallback to save costs

---

## Security Considerations

1. **API Key Protection**: Never expose OPENAI_API_KEY on frontend
2. **Rate Limiting**: Implement per-user/IP rate limits
3. **Input Validation**: Validate all input parameters
4. **Output Sanitization**: Sanitize API responses before storing
5. **Authentication**: Require admin authentication for SEO optimization

---

**Last Updated:** March 2024
