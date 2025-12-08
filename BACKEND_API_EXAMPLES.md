# Backend API Route Examples

This file contains example implementations of backend API routes that should be implemented on your server (Node.js/Express, Next.js API Routes, or similar).

## Setup Instructions

### Option 1: Node.js + Express

```bash
npm install express cors dotenv openai
```

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

// SEO Optimization Endpoint
app.post('/api/seo-optimize', async (req, res) => {
  try {
    const { title, content, contentType, region } = req.body;

    const prompt = `You are an expert SEO consultant. Analyze this content and provide SEO recommendations as a JSON object.

Content Type: ${contentType}
Title: ${title}
Content Preview: ${content.substring(0, 500)}
Target Region: ${region || 'Nepal'}

Return a JSON object with exactly these fields:
{
  "metaTitle": "optimized title (50-60 chars)",
  "metaDescription": "optimized description (150-160 chars)",
  "keywords": ["keyword1", "keyword2", ...],
  "longTailKeywords": ["long tail keyword 1", "long tail keyword 2", ...],
  "contentImprovements": ["suggestion1", "suggestion2"],
  "internalLinkSuggestions": ["link suggestion 1"],
  "missingSections": ["section1", "section2"],
  "readabilityScore": 75,
  "recommendations": ["recommendation1"]
}`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const result = JSON.parse(message.choices[0].message.content);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('SEO Optimization Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Option 2: Next.js API Routes

**pages/api/seo-optimize.ts**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RequestBody {
  title: string;
  content: string;
  contentType: 'trek' | 'blog' | 'page';
  region?: string;
}

interface SEOResponse {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  longTailKeywords: string[];
  contentImprovements: string[];
  internalLinkSuggestions: string[];
  missingSections: string[];
  readabilityScore: number;
  recommendations: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SEOResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, content, contentType, region } = req.body as RequestBody;

    const prompt = `You are an expert SEO consultant. Analyze this ${contentType} content and provide SEO recommendations.

Title: ${title}
Content Preview: ${content.substring(0, 500)}
Region: ${region || 'Nepal'}

Return ONLY a valid JSON object (no markdown, no code blocks) with these exact fields:
{
  "metaTitle": "optimized title for search results (50-60 characters)",
  "metaDescription": "compelling description (150-160 characters)",
  "keywords": ["primary", "keywords", "for", "seo"],
  "longTailKeywords": ["longer", "keyword", "phrases", "specific", "to", "content"],
  "contentImprovements": ["add more details", "improve structure"],
  "internalLinkSuggestions": ["link to related content"],
  "missingSections": ["FAQ", "gallery"],
  "readabilityScore": 75,
  "recommendations": ["improve keyword density", "add more headings"]
}`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content_response = message.choices[0].message.content;
    if (!content_response) {
      throw new Error('No response from OpenAI');
    }

    const suggestions = JSON.parse(content_response) as SEOResponse;

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('SEO Optimization Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

---

## Other API Endpoints

### 1. Trek Management

**POST /api/admin/treks**
```javascript
app.post('/api/admin/treks', authenticateAdmin, async (req, res) => {
  const { name, slug, region, price, duration, description, highlights, includes, excludes } = req.body;
  
  // Validate required fields
  if (!name || !slug || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Insert into database
  const trek = await db.treks.create({
    name,
    slug,
    region,
    price,
    duration,
    description,
    highlights: JSON.stringify(highlights),
    includes: JSON.stringify(includes),
    excludes: JSON.stringify(excludes),
    createdBy: req.user.id
  });
  
  res.json({ success: true, data: trek });
});

app.put('/api/admin/treks/:id', authenticateAdmin, async (req, res) => {
  const trek = await db.treks.update(req.params.id, req.body);
  res.json({ success: true, data: trek });
});

app.delete('/api/admin/treks/:id', authenticateAdmin, async (req, res) => {
  await db.treks.delete(req.params.id);
  res.json({ success: true });
});
```

### 2. Blog Management

**POST /api/admin/blog**
```javascript
app.post('/api/admin/blog', authenticateAdmin, async (req, res) => {
  const { title, slug, content, excerpt, category, authorId, isFeatured } = req.body;
  
  // Generate SEO suggestions
  const seoSuggestions = await generateSEO(title, content);
  
  const post = await db.blogPosts.create({
    title,
    slug,
    content,
    excerpt,
    category,
    authorId: req.user.id,
    isFeatured,
    metaTitle: seoSuggestions.metaTitle,
    metaDescription: seoSuggestions.metaDescription,
    seoKeywords: JSON.stringify(seoSuggestions.keywords)
  });
  
  res.json({ success: true, data: post });
});
```

### 3. Media Upload

**POST /api/admin/media/upload**
```javascript
import multer from 'multer';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/admin/media/upload', authenticateAdmin, upload.single('file'), async (req, res) => {
  const { file } = req;
  const { category, altText } = req.body;
  
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }
  
  // Upload to S3
  const key = `media/${category}/${Date.now()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };
  
  const result = await s3.upload(params).promise();
  
  // Save to database
  const media = await db.mediaLibrary.create({
    fileName: file.originalname,
    fileUrl: result.Location,
    mimeType: file.mimetype,
    fileSizeBytes: file.size,
    category,
    altText,
    uploadedBy: req.user.id
  });
  
  res.json({ success: true, data: media });
});
```

### 4. Booking Creation

**POST /api/bookings**
```javascript
import { sendEmail } from './email';

app.post('/api/bookings', async (req, res) => {
  const { trekId, firstName, lastName, email, phone, travelersCount, departureDate, totalPrice } = req.body;
  
  // Validate required fields
  if (!trekId || !email || !departureDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check availability
  const trek = await db.treks.findById(trekId);
  if (!trek) {
    return res.status(404).json({ error: 'Trek not found' });
  }
  
  // Create booking
  const booking = await db.bookings.create({
    trekId,
    firstName,
    lastName,
    email,
    phone,
    travelersCount,
    departureDate,
    totalPrice,
    bookingStatus: 'pending',
    paymentStatus: 'pending'
  });
  
  // Send confirmation email
  await sendEmail({
    to: email,
    subject: `Booking Confirmation: ${trek.name}`,
    template: 'booking-confirmation',
    data: {
      bookingId: booking.id,
      trekName: trek.name,
      departureDate,
      totalPrice
    }
  });
  
  res.json({ success: true, data: booking });
});
```

### 5. Settings Management

**GET /api/settings**
```javascript
app.get('/api/settings', async (req, res) => {
  const settings = await db.settings.findOne();
  res.json(settings);
});

app.put('/api/admin/settings', authenticateAdmin, async (req, res) => {
  const settings = await db.settings.update(req.body);
  res.json({ success: true, data: settings });
});
```

### 6. Authentication

**POST /api/auth/login**
```javascript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.users.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  if (!user.isActive) {
    return res.status(401).json({ error: 'Account is inactive' });
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  });
});

// Middleware
function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

## Environment Variables for Backend

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/nepal_treks"

# OpenAI
OPENAI_API_KEY="sk-..."

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="nepal-treks-media"

# JWT
JWT_SECRET="your-secret-key-min-32-chars"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASSWORD="..."
SMTP_FROM="noreply@nepaltreks.com"

# Server
NODE_ENV="production"
PORT="3000"
```

---

## Integration with Frontend

Once these backend endpoints are implemented, update the frontend service to call them:

**src/services/seoOptimizer.ts**
```typescript
export async function optimizeForSEO(input: SEOOptimizationInput): Promise<SEOOptimizationOutput> {
  const response = await fetch('/api/seo-optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  
  if (!response.ok) throw new Error('SEO optimization failed');
  return response.json();
}
```

---

## Testing API Endpoints

### Using curl

```bash
# Test SEO Optimization
curl -X POST http://localhost:3000/api/seo-optimize \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Everest Base Camp Trek",
    "content": "The trek to Everest Base Camp...",
    "contentType": "trek",
    "region": "Everest"
  }'

# Test Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nepaltreks.com",
    "password": "secure-password"
  }'
```

### Using Postman

1. Create new Collection "Nepal Treks API"
2. Add requests for each endpoint
3. Use variables for {{BASE_URL}}, {{TOKEN}}
4. Test in Pre-request and Tests tabs

---

## Production Deployment

When deploying to production:

1. **Database**: Use managed PostgreSQL (Supabase, Neon, AWS RDS)
2. **Storage**: Use AWS S3 or Cloudinary for media
3. **Email**: Use SendGrid or AWS SES
4. **Monitoring**: Use Sentry for error tracking
5. **Logging**: Use CloudWatch or Datadog
6. **Rate Limiting**: Use express-rate-limit middleware

---

**Last Updated:** March 2024
