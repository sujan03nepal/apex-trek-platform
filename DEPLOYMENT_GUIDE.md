# Nepal Treks - Deployment & Setup Guide

This guide covers everything needed to deploy the Nepal Treks platform to production.

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Environment Variables](#environment-variables)
4. [Deployment to Vercel](#deployment-to-vercel)
5. [Deployment to Other Platforms](#deployment-to-other-platforms)
6. [Admin Setup](#admin-setup)
7. [SEO & Performance](#seo--performance)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git
- PostgreSQL or Neon account (for database)

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nepal-treks
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
```
The app will be available at `http://localhost:8080`

---

## Database Setup

### Option 1: Using Supabase (Recommended)

1. **Create a Supabase project**
   - Go to https://supabase.com
   - Click "New Project"
   - Fill in project details
   - Copy your connection string

2. **Import SQL Schema**
   - Open Supabase SQL Editor
   - Copy the entire SQL from `SCHEMA_SETUP.sql`
   - Execute in the SQL Editor
   - Verify all tables are created

3. **Set up Authentication**
   - In Supabase, go to Authentication > Users
   - Create your admin account
   - Note the user ID for later

### Option 2: Using Neon

1. **Create a Neon project**
   - Go to https://neon.tech
   - Create a new project
   - Copy the PostgreSQL connection string

2. **Import SQL Schema**
   - Use any PostgreSQL client (psql, pgAdmin, etc.)
   - Connect using the Neon connection string
   - Execute `SCHEMA_SETUP.sql`

---

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/nepal_treks"

# Supabase (if using Supabase)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
VITE_SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI/OpenAI (for SEO optimization)
VITE_OPENAI_API_KEY="sk-..."

# AWS S3 (for media uploads - optional)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="nepal-treks-media"

# Analytics
VITE_GOOGLE_ANALYTICS_ID="G-XXXXXXX"

# Email Service (for booking confirmations)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@nepaltreks.com"
```

**Note:** Never commit `.env.local` to version control!

---

## Deployment to Vercel

### Step 1: Prepare Repository
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables

In Vercel Project Settings → Environment Variables:

1. Add all variables from `.env.local`
2. Make sure to add separate keys for each environment (Production, Preview, Development)
3. Click "Save"

### Step 4: Deploy

```bash
# Vercel will automatically build and deploy when you push to main
# Monitor deployment in Vercel dashboard
```

### Step 5: Set Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., nepaltreks.com)
3. Update DNS records at your domain provider
4. Wait for SSL certificate to be issued

---

## Deployment to Other Platforms

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Add environment variables
8. Deploy

### AWS Amplify

1. Go to AWS Amplify Console
2. Click "New App" → "Host web app"
3. Select GitHub and your repository
4. Set build settings:
   - Build command: `npm run build`
   - Base directory: `/`
   - Build output directory: `dist`
5. Add environment variables
6. Deploy

---

## Admin Setup

### First-Time Admin User Setup

1. **Access Admin Login**
   - Go to `https://yourdomain.com/admin/login`

2. **Default Demo Credentials** (for testing)
   - Email: `admin@nepaltreks.com`
   - Password: `admin123`

3. **Create Production Admin Users**
   - Go to Database → Users table
   - Create new admin user record
   - Hash password before storing
   - Set role to "admin"

### Admin Panel Features

- **Dashboard**: Overview of bookings, stats, and quick actions
- **Trek Management**: Add, edit, delete trek packages
- **Blog Management**: Publish blog posts and guides
- **Media Library**: Upload and manage website images
- **Settings**: Configure website branding, contact info, SEO metadata

---

## SEO & Performance

### 1. Meta Tags & Open Graph

All pages automatically include:
- Meta title and description
- Open Graph tags for social sharing
- Twitter card tags
- Structured data (JSON-LD)

### 2. Sitemap

The sitemap is automatically generated at:
```
https://yourdomain.com/sitemap.xml
```

### 3. Robots.txt

Ensure robots.txt exists and allows crawling:
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://yourdomain.com/sitemap.xml
```

### 4. Performance Optimization

- Images are optimized and lazy-loaded
- CSS and JavaScript are minified
- Static assets are cached aggressively
- Use CDN for images (Cloudinary, Imgix, or AWS CloudFront)

### 5. AI SEO Optimization

To enable AI-powered SEO optimization:

1. Get OpenAI API key from https://openai.com/api/
2. Add `VITE_OPENAI_API_KEY` to environment variables
3. Use Admin Panel → SEO Tools to get suggestions

---

## Monitoring & Maintenance

### 1. Monitor Application Health

- **Vercel Dashboards**: Monitor builds, deployments, analytics
- **Google Analytics**: Track user behavior and traffic
- **Sentry** (optional): Monitor errors and crashes

### 2. Database Maintenance

Regular tasks:
```sql
-- Optimize database
VACUUM ANALYZE;

-- Check for unused indexes
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;

-- Monitor table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('information_schema', 'pg_catalog')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 3. Backup Strategy

- **Daily Automated Backups**: Enabled in Supabase/Neon settings
- **Weekly Manual Backups**: Export important data
- **Disaster Recovery**: Keep backups in multiple locations

### 4. Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update major versions (requires manual review)
npm install -g npm-check-updates
ncu -u
npm install
```

### 5. Security Checklist

- [ ] All environment variables are secure
- [ ] Admin passwords are hashed
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] SQL injections are prevented (using parameterized queries)
- [ ] XSS protection is enabled
- [ ] Rate limiting is implemented
- [ ] API endpoints are properly authenticated

---

## Troubleshooting

### Issue: Build Fails
**Solution:**
- Check Node version matches requirement (18+)
- Clear node_modules and reinstall
- Check for TypeScript errors: `npm run build`

### Issue: Database Connection Error
**Solution:**
- Verify `DATABASE_URL` is correct
- Check database is running and accessible
- Test connection: `psql $DATABASE_URL`

### Issue: Admin Login Not Working
**Solution:**
- Verify user exists in database
- Check password hash algorithm
- Clear browser cache and cookies

### Issue: Images Not Loading
**Solution:**
- Verify image URLs are correct
- Check CORS headers
- Ensure storage bucket is public (if using S3)

---

## Post-Deployment Checklist

- [ ] Domain is configured and SSL certificate is issued
- [ ] Admin login is working
- [ ] Database backups are enabled
- [ ] Google Analytics is tracking traffic
- [ ] Email notifications are configured
- [ ] SEO metadata is set in admin panel
- [ ] All trek pages are visible in search engines
- [ ] Blog posts are published
- [ ] Contact form is working
- [ ] Booking system is functional
- [ ] Mobile responsiveness is tested
- [ ] Performance is acceptable (Core Web Vitals)

---

## Need Help?

For support and updates:
- GitHub: https://github.com/yourusername/nepal-treks
- Email: support@nepaltreks.com
- Discord: Join our community server
- Documentation: https://docs.nepaltreks.com

---

## Version History

- **v1.0.0** (2024-03): Initial release with full public website and admin panel
- **v1.1.0** (Planned): API improvements and mobile app
- **v2.0.0** (Planned): Advanced booking features and AI recommendations

---

**Last Updated:** March 2024
