-- Create FAQs table for managing frequently asked questions
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public can read active FAQs
CREATE POLICY "Public can read active FAQs" ON public.faqs
  FOR SELECT USING (is_active = true);

-- Authenticated users can manage FAQs  
CREATE POLICY "Authenticated users can manage FAQs" ON public.faqs
  FOR ALL USING (true) WITH CHECK (true);

-- Insert default FAQ categories
INSERT INTO public.faqs (category, question, answer, display_order) VALUES
('General Questions', 'What is the best time to trek in Nepal?', 'The best trekking seasons in Nepal are spring (March-May) and autumn (September-November). During these periods, you''ll have clear skies, stable weather, and excellent mountain visibility.', 1),
('General Questions', 'Do I need any special permits?', 'Most popular treks in Nepal require permits such as TIMS (Trekkers'' Information Management System) and conservation permits. We handle all permits as part of our trek packages.', 2),
('Physical & Health', 'What is the fitness requirement?', 'Fitness requirements depend on the trek. Easy treks require basic fitness and the ability to walk for 4-5 hours daily. Challenging treks require regular cardiovascular exercise.', 1),
('Physical & Health', 'What about altitude sickness?', 'Altitude sickness is a natural response to reduced oxygen at higher elevations. Prevention strategies include gradual ascent, proper acclimatization, and staying hydrated.', 2),
('Booking & Payment', 'How do I book a trek?', 'You can book through our website by selecting your trek, filling in your details, and making a 50% deposit. The remaining balance is due 30 days before the trek starts.', 1),
('Booking & Payment', 'What is your cancellation policy?', 'Cancellation within 60 days: 25% refund. Cancellation within 30 days: No refund. We may cancel for weather/safety concerns with full refund.', 2);