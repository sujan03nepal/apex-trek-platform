-- Fix security definer views by recreating them with SECURITY INVOKER
DROP VIEW IF EXISTS public.featured_treks_view;
DROP VIEW IF EXISTS public.published_blog_view;

-- Recreate featured_treks_view with SECURITY INVOKER
CREATE VIEW public.featured_treks_view 
WITH (security_invoker = true) AS
SELECT 
    t.id,
    t.name,
    t.slug,
    t.short_description,
    t.difficulty,
    t.duration,
    t.max_altitude,
    t.featured_image_url,
    t.price,
    t.rating,
    t.review_count,
    c.name as category_name,
    c.slug as category_slug
FROM public.treks t
LEFT JOIN public.trek_categories c ON t.category_id = c.id
WHERE t.is_featured = true AND t.is_published = true;

-- Recreate published_blog_view with SECURITY INVOKER
CREATE VIEW public.published_blog_view 
WITH (security_invoker = true) AS
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
FROM public.blog_posts bp
LEFT JOIN public.blog_categories bc ON bp.category_id = bc.id
WHERE bp.is_published = true;