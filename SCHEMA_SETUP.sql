-- ============================================================================
-- NEPAL TREK PLATFORM - COMPLETE SQL SCHEMA
-- For PostgreSQL (compatible with Supabase, Neon, etc.)
-- ============================================================================

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE (for admin authentication)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- admin, editor, viewer
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================================================
-- 2. SETTINGS TABLE (Single row for global configuration)
-- ============================================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Brand & Visual Settings
  logo_url VARCHAR(500),
  dark_logo_url VARCHAR(500),
  favicon_url VARCHAR(500),
  hero_image_url VARCHAR(500),
  footer_banner_url VARCHAR(500),
  
  -- Contact Information
  phone_numbers TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of phone numbers
  email_addresses TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of emails
  whatsapp VARCHAR(50),
  viber VARCHAR(50),
  emergency_contact VARCHAR(50),
  
  -- Office Location
  office_address TEXT,
  map_embed_link TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Social Media Links
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  youtube_url VARCHAR(500),
  tiktok_url VARCHAR(500),
  twitter_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  
  -- SEO & Metadata Defaults
  default_meta_title VARCHAR(255),
  default_meta_description VARCHAR(500),
  default_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  default_og_image VARCHAR(500),
  
  -- Footer Content
  footer_text TEXT,
  copyright_text VARCHAR(255),
  
  -- Global Scripts
  google_analytics_code TEXT,
  tag_manager_code TEXT,
  facebook_pixel_code TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. TREK CATEGORIES TABLE (for organizing treks by region)
-- ============================================================================
CREATE TABLE IF NOT EXISTS trek_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE, -- Everest, Annapurna, Langtang, etc.
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trek_categories_slug ON trek_categories(slug);

-- ============================================================================
-- 4. TREKS TABLE (Main trek data)
-- ============================================================================
CREATE TABLE IF NOT EXISTS treks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category_id UUID REFERENCES trek_categories(id),
  
  -- Basic Info
  short_description TEXT,
  description TEXT,
  
  -- Trek Details
  duration VARCHAR(50), -- "14 Days"
  max_altitude VARCHAR(50), -- "5,364m"
  difficulty VARCHAR(50), -- Easy, Moderate, Challenging, Strenuous
  price DECIMAL(10, 2),
  
  -- Seasons & Availability
  best_seasons TEXT[] DEFAULT ARRAY[]::TEXT[],
  available_months INT[] DEFAULT ARRAY[]::INT[],
  
  -- Ratings & Reviews
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  
  -- Images & Media
  featured_image_url VARCHAR(500),
  gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  seo_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  long_tail_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Content
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
  includes TEXT[] DEFAULT ARRAY[]::TEXT[],
  excludes TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Schema & OG Tags (JSON)
  schema_data JSONB,
  og_image_url VARCHAR(500),
  twitter_image_url VARCHAR(500),
  
  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_treks_slug ON treks(slug);
CREATE INDEX idx_treks_category ON treks(category_id);
CREATE INDEX idx_treks_featured ON treks(is_featured);

-- ============================================================================
-- 5. TREK ITINERARIES TABLE (Day-by-day breakdown)
-- ============================================================================
CREATE TABLE IF NOT EXISTS trek_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trek_id UUID NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  altitude VARCHAR(50),
  distance VARCHAR(50),
  activities TEXT[] DEFAULT ARRAY[]::TEXT[],
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT unique_trek_day UNIQUE(trek_id, day_number)
);

CREATE INDEX idx_itineraries_trek ON trek_itineraries(trek_id);

-- ============================================================================
-- 6. TREK REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS trek_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trek_id UUID NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  helpful_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_trek ON trek_reviews(trek_id);

-- ============================================================================
-- 7. BLOG CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- ============================================================================
-- 8. BLOG POSTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category_id UUID REFERENCES blog_categories(id),
  
  -- Media
  featured_image_url VARCHAR(500),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  seo_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Schema & OG
  schema_data JSONB,
  og_image_url VARCHAR(500),
  
  -- Author & Status
  author_id UUID REFERENCES users(id),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP,
  
  -- Engagement
  view_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_category ON blog_posts(category_id);
CREATE INDEX idx_blog_published ON blog_posts(is_published);
CREATE INDEX idx_blog_featured ON blog_posts(is_featured);

-- ============================================================================
-- 9. BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trek_id UUID NOT NULL REFERENCES treks(id),
  
  -- Customer Info
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  country VARCHAR(100),
  
  -- Booking Details
  travelers_count INT NOT NULL DEFAULT 1,
  departure_date DATE NOT NULL,
  dietary_requirements TEXT,
  special_requests TEXT,
  
  -- Pricing & Payment
  total_price DECIMAL(10, 2) NOT NULL,
  paid_amount DECIMAL(10, 2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, partial, completed, cancelled
  payment_method VARCHAR(50),
  
  -- Status
  booking_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
  confirmation_sent_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_trek ON bookings(trek_id);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(booking_status);

-- ============================================================================
-- 10. MEDIA LIBRARY TABLE (for uploaded images, logos, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50), -- image, video, document
  mime_type VARCHAR(100),
  file_size_bytes BIGINT,
  
  -- Media Info
  width INT,
  height INT,
  alt_text VARCHAR(500),
  caption TEXT,
  
  -- Organization
  category VARCHAR(100), -- logo, hero, gallery, blog, etc.
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Usage
  upload_by UUID REFERENCES users(id),
  is_public BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_category ON media_library(category);
CREATE INDEX idx_media_uploaded_by ON media_library(upload_by);

-- ============================================================================
-- 11. CONTACT FORM SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  response_text TEXT,
  responded_at TIMESTAMP,
  responded_by UUID REFERENCES users(id),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_created ON contact_submissions(created_at);

-- ============================================================================
-- 12. SEO SUGGESTIONS TABLE (AI-generated suggestions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS seo_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type VARCHAR(50), -- trek, blog
  content_id UUID NOT NULL,
  
  -- Original Content
  original_title VARCHAR(255),
  original_content TEXT,
  
  -- AI Suggestions
  suggested_title VARCHAR(255),
  suggested_description VARCHAR(500),
  suggested_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  content_improvements TEXT,
  missing_sections TEXT[] DEFAULT ARRAY[]::TEXT[],
  internal_link_suggestions TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Status
  is_applied BOOLEAN DEFAULT false,
  applied_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seo_content ON seo_suggestions(content_type, content_id);

-- ============================================================================
-- 13. AUDIT LOG TABLE (for tracking changes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100), -- CREATE, UPDATE, DELETE
  entity_type VARCHAR(100), -- trek, blog, booking, etc.
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- ============================================================================
-- INITIAL DATA INSERT
-- ============================================================================

-- Insert default settings (single row)
INSERT INTO settings (id, default_meta_title, default_meta_description) 
VALUES (
  uuid_generate_v4(),
  'Nepal Trekking Adventures',
  'Explore the most beautiful treks in Nepal with expert guides and authentic experiences'
)
ON CONFLICT DO NOTHING;

-- Insert trek categories
INSERT INTO trek_categories (name, slug, display_order) VALUES
  ('Everest', 'everest', 1),
  ('Annapurna', 'annapurna', 2),
  ('Langtang', 'langtang', 3),
  ('Manaslu', 'manaslu', 4),
  ('Dolpo', 'dolpo', 5),
  ('Solu Khumbu', 'solu-khumbu', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert blog categories
INSERT INTO blog_categories (name, slug, display_order) VALUES
  ('Trek Guides', 'trek-guides', 1),
  ('Travel Tips', 'travel-tips', 2),
  ('Local Culture', 'local-culture', 3),
  ('Nature & Wildlife', 'nature-wildlife', 4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- VIEWS (Optional - useful for frontend queries)
-- ============================================================================

-- View for featured treks with full details
CREATE OR REPLACE VIEW featured_treks_view AS
SELECT 
  t.id,
  t.name,
  t.slug,
  t.short_description,
  t.price,
  t.difficulty,
  t.duration,
  t.max_altitude,
  t.featured_image_url,
  t.rating,
  t.review_count,
  tc.name as category_name,
  tc.slug as category_slug
FROM treks t
LEFT JOIN trek_categories tc ON t.category_id = tc.id
WHERE t.is_featured = true AND t.is_published = true
ORDER BY t.created_at DESC;

-- View for blog posts with category info
CREATE OR REPLACE VIEW published_blog_view AS
SELECT 
  bp.id,
  bp.title,
  bp.slug,
  bp.excerpt,
  bp.featured_image_url,
  bp.published_at,
  bp.view_count,
  bc.name as category_name,
  bc.slug as category_slug
FROM blog_posts bp
LEFT JOIN blog_categories bc ON bp.category_id = bc.id
WHERE bp.is_published = true
ORDER BY bp.published_at DESC;
