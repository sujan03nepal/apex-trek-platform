-- Create about_content table for managing about page sections
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key varchar NOT NULL UNIQUE,
  title varchar,
  content text,
  metadata jsonb DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can read about content" ON public.about_content
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage about content" ON public.about_content
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insert default sections
INSERT INTO public.about_content (section_key, title, content, metadata, display_order) VALUES
  ('hero', 'Sharing the Magic of the Himalayas Since 2010', 'What started as a small family operation has grown into one of Nepal''s most trusted adventure companies. Our passion remains the same: creating life-changing experiences in the world''s most spectacular mountains.', '{"tagline": "Our Story"}', 1),
  ('story', 'From the Heart of the Mountains', 'Nepal Treks was founded in 2010 by Pemba Sherpa, who grew up in a small village in the shadow of Mount Everest. Growing up, he watched as trekkers from around the world came to experience the beauty of his homeland, and he dreamed of one day sharing his knowledge and love for these mountains with others.\n\nAfter years of working as a porter and then as a guide for other companies, Pemba started Nepal Treks with a simple mission: to provide authentic, safe, and sustainable trekking experiences that benefit both travelers and local communities.\n\nToday, we''ve grown into a team of over 50 experienced guides and support staff, but our core values remain the same. We''re still a family-run business, and every trekker who joins us becomes part of our extended family.', '{}', 2),
  ('stats', 'Our Achievements', '', '{"items": [{"value": "15,000+", "label": "Happy Trekkers"}, {"value": "14+", "label": "Years Experience"}, {"value": "50+", "label": "Trek Packages"}, {"value": "100%", "label": "Safety Record"}]}', 3),
  ('values', 'Our Values', 'These principles guide everything we do, from planning your trek to supporting our team and the communities we visit.', '{"items": [{"icon": "Shield", "title": "Safety First", "description": "Every decision we make prioritizes the safety and well-being of our trekkers and team."}, {"icon": "Heart", "title": "Passion for Adventure", "description": "We''re not just guides – we''re adventurers who love sharing the magic of the Himalayas."}, {"icon": "Globe", "title": "Sustainable Tourism", "description": "We''re committed to protecting the environment and supporting local communities."}, {"icon": "Users", "title": "Local Expertise", "description": "Our team is born and raised in these mountains, bringing authentic knowledge and experience."}]}', 4);

-- Create team_members table
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  role varchar NOT NULL,
  image_url varchar,
  bio text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read team members" ON public.team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insert default team members
INSERT INTO public.team_members (name, role, image_url, bio, display_order) VALUES
  ('Pemba Sherpa', 'Founder & Lead Guide', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Born in the Khumbu region, Pemba has summited Everest 12 times and has been guiding treks for over 20 years.', 1),
  ('Maya Tamang', 'Operations Director', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'With a background in tourism management, Maya ensures every trek runs smoothly from booking to completion.', 2),
  ('Dorje Lama', 'Senior Trek Leader', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'A certified mountaineer and wilderness first responder with expertise in high-altitude trekking.', 3);