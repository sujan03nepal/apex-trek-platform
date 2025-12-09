-- ============================================================================
-- ADMIN SETUP & RLS POLICIES FOR NEPAL TREKS
-- ============================================================================

-- ============================================================================
-- 1. DISABLE RLS ON TABLES FOR NOW (Security concern: Enable after testing)
-- ============================================================================
-- WARNING: Only use in development! Re-enable RLS in production with proper policies

ALTER TABLE treks DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE media_library DISABLE ROW LEVEL SECURITY;
ALTER TABLE trek_itineraries DISABLE ROW LEVEL SECURITY;
ALTER TABLE trek_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE trek_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE seo_suggestions DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. ALLOW PUBLIC READ ACCESS TO ALL TABLES
-- ============================================================================
-- This allows anyone to read data (public website)

ALTER TABLE treks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON treks FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON treks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON treks FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON treks FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON blog_posts FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON settings FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON settings FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read own" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update" ON bookings FOR UPDATE WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON contact_submissions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update" ON contact_submissions FOR UPDATE WITH CHECK (auth.role() = 'authenticated');

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read public files" ON media_library FOR SELECT USING (is_public = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated all" ON media_library FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON media_library FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON media_library FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE trek_itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON trek_itineraries FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON trek_itineraries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON trek_itineraries FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON trek_itineraries FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE trek_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read approved" ON trek_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public insert" ON trek_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated all" ON trek_reviews FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON trek_reviews FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE trek_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON trek_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON trek_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON trek_categories FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON trek_categories FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write" ON blog_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON blog_categories FOR UPDATE WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON blog_categories FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE seo_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated all" ON seo_suggestions FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- 3. INSERT DEFAULT SETTINGS
-- ============================================================================
INSERT INTO settings (
  id,
  logo_url,
  hero_image_url,
  phone_numbers,
  email_addresses,
  office_address,
  footer_text,
  copyright_text,
  default_meta_title,
  default_meta_description,
  default_keywords,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'https://via.placeholder.com/200x50?text=Nepal+Treks',
  'https://via.placeholder.com/1200x600?text=Nepal+Treks+Hero',
  ARRAY['+977 1 123 4567'],
  ARRAY['info@nepaltreks.com'],
  'Thamel, Kathmandu, Nepal',
  'Your trusted partner for authentic Himalayan adventures since 2010.',
  '© 2024 Nepal Treks. All rights reserved.',
  'Nepal Trekking Adventures - Explore the Himalayas',
  'Experience the most beautiful treks in Nepal with expert guides. Adventure awaits.',
  ARRAY['nepal', 'trekking', 'hiking', 'adventure', 'himalaya'],
  NOW(),
  NOW()
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. INSERT SAMPLE TREK DATA (Optional - for testing)
-- ============================================================================
INSERT INTO trek_categories (id, name, slug, description, is_active, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Popular Treks', 'popular-treks', 'Most popular and accessible treks', true, NOW(), NOW()),
  (gen_random_uuid(), 'Challenging Treks', 'challenging-treks', 'Advanced and challenging treks', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- DONE! Your database is now ready for the admin panel
-- ============================================================================
-- Next steps:
-- 1. Create an admin user in Supabase Auth console
--    - Go to https://app.supabase.com/ → Authentication → Users
--    - Create user with email: sujan1nepal@gmail.com, password: precioussn
-- 2. Refresh the app and try logging in
-- 3. Navigate to /admin/blog, /admin/treks, etc.
