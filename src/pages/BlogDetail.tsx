import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, User, Calendar, ArrowLeft, ArrowRight, 
  Share2, Bookmark, MessageCircle 
} from "lucide-react";

const blogDatabase: Record<string, any> = {
  "ultimate-everest-base-camp-guide": {
    title: "The Ultimate Everest Base Camp Trekking Guide 2024",
    slug: "ultimate-everest-base-camp-guide",
    excerpt: "Everything you need to know about trekking to Everest Base Camp, from preparation tips to day-by-day itinerary insights.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    category: "Guides",
    author: "Pemba Sherpa",
    date: "2024-03-15",
    readTime: "12 min read",
    content: `
      <h2>Introduction</h2>
      <p>Mount Everest, at 8,848 meters, is the world's highest peak. The trek to Everest Base Camp is one of the most rewarding trekking experiences in the world, offering stunning Himalayan views, encounters with the Sherpa culture, and a sense of achievement few can match.</p>
      
      <h2>Physical Fitness Requirements</h2>
      <p>While EBC trek isn't a technical climb, it does require good physical fitness. You should be able to walk for 5-7 hours daily over challenging terrain with altitude. Training for 2-3 months before the trek is recommended.</p>
      
      <h2>Best Time to Trek</h2>
      <p>The ideal times to trek to Everest Base Camp are:</p>
      <ul>
        <li><strong>Spring (March-May):</strong> Clear skies, rhododendrons blooming, comfortable temperatures</li>
        <li><strong>Autumn (September-November):</strong> Best visibility, stable weather, less rain</li>
      </ul>
      
      <h2>Acclimatization Strategy</h2>
      <p>The most important aspect of EBC trekking is proper acclimatization. We recommend:</p>
      <ul>
        <li>Rest day in Namche Bazaar (3,440m)</li>
        <li>Rest day in Dingboche (4,410m)</li>
        <li>Slow ascent above 3,500m</li>
        <li>Proper hydration and light meals</li>
      </ul>
      
      <h2>What to Pack</h2>
      <p>Essential gear includes proper hiking boots, warm layers, sleeping bag (rated to -15°C), and good trekking poles. Don't over-pack – you'll have porters, but limit yourself to 15kg.</p>
      
      <h2>Budget Breakdown</h2>
      <p>A typical 14-day Everest Base Camp trek costs between $1,500-2,500 depending on accommodation quality and season. This includes guides, porters, permits, and meals.</p>
      
      <h2>Health & Safety</h2>
      <p>Common concerns include altitude sickness, cold temperatures, and physical strain. These can be minimized through proper acclimatization, quality gear, and experienced guides. Travel insurance covering high altitude is essential.</p>
      
      <h2>Cultural Tips</h2>
      <p>Show respect to local traditions, learn basic Nepali phrases, and support local communities by buying from local shops and hiring local guides. The Sherpa culture is integral to the Everest region.</p>
      
      <h2>Conclusion</h2>
      <p>The Everest Base Camp trek is an unforgettable adventure that should be on every trekker's bucket list. With proper preparation and a good guide, you'll create memories that will last a lifetime.</p>
    `,
    relatedPosts: [
      "best-time-to-trek-nepal",
      "altitude-sickness-prevention",
      "packing-list-himalayan-trek"
    ]
  },
  "best-time-to-trek-nepal": {
    title: "Best Time to Trek in Nepal: A Seasonal Guide",
    slug: "best-time-to-trek-nepal",
    excerpt: "Discover the ideal months for trekking in different regions of Nepal, from spring rhododendrons to clear autumn skies.",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200",
    category: "Tips",
    author: "Maya Tamang",
    date: "2024-03-10",
    readTime: "8 min read",
    content: `
      <h2>Nepal's Four Seasons</h2>
      <p>Nepal experiences four distinct seasons, each offering unique advantages for trekking.</p>
      
      <h2>Spring (March-May)</h2>
      <p>Spring is widely considered the best season for trekking in Nepal. The sky is clear, and the rhododendrons bloom in spectacular colors, especially in the Annapurna and Langtang regions. Temperatures are mild, and visibility of the mountains is excellent.</p>
      
      <h2>Summer/Monsoon (June-August)</h2>
      <p>The monsoon brings heavy rains and reduced visibility. However, it's the best time for upper regions where temperatures are cooler, and the landscape turns lush green.</p>
      
      <h2>Autumn (September-November)</h2>
      <p>Autumn offers the clearest skies and most stable weather conditions. It's considered equally as good as spring for trekking, with slightly less crowded trails.</p>
      
      <h2>Winter (December-February)</h2>
      <p>Winter brings snow to higher elevations and cold temperatures. Lower altitude treks like Pikey Peak are still accessible and less crowded.</p>
      
      <h2>Regional Considerations</h2>
      <p>Different regions have different optimal times. Higher altitude treks like Everest are best in spring and autumn, while lower altitude treks can be done year-round.</p>
    `,
    relatedPosts: [
      "ultimate-everest-base-camp-guide",
      "packing-list-himalayan-trek"
    ]
  },
  "altitude-sickness-prevention": {
    title: "Altitude Sickness: Prevention and Treatment Guide",
    slug: "altitude-sickness-prevention",
    excerpt: "Learn how to recognize, prevent, and treat altitude sickness for a safe and enjoyable Himalayan trekking experience.",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
    category: "Health",
    author: "Dr. Karma Dorje",
    date: "2024-03-05",
    readTime: "10 min read",
    content: `
      <h2>Understanding Altitude Sickness</h2>
      <p>Acute Mountain Sickness (AMS) is a natural response to reduced oxygen levels at higher elevations. Most trekkers experience some symptoms.</p>
      
      <h2>Symptoms to Watch For</h2>
      <ul>
        <li>Headache</li>
        <li>Nausea</li>
        <li>Fatigue</li>
        <li>Sleep disturbance</li>
        <li>Shortness of breath</li>
      </ul>
      
      <h2>Prevention Strategies</h2>
      <ul>
        <li>Gradual ascent with acclimatization days</li>
        <li>Stay hydrated</li>
        <li>Avoid alcohol and sleeping pills</li>
        <li>Eat high-carb meals</li>
        <li>Get quality sleep</li>
      </ul>
      
      <h2>When to Seek Help</h2>
      <p>If symptoms worsen or include difficulty walking, confusion, or severe breathlessness, descend immediately and seek medical help.</p>
    `,
    relatedPosts: [
      "ultimate-everest-base-camp-guide",
      "packing-list-himalayan-trek"
    ]
  }
};

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogDatabase[slug || ""];

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedPosts = post.relatedPosts.map((slug: string) => blogDatabase[slug]).filter(Boolean);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="absolute inset-0 bg-sapphire-dark/30" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-accent/20 text-accent">{post.category}</Badge>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-foreground space-y-6 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/<h2>/g, '<h2 class="font-serif text-3xl font-bold text-foreground mt-8 mb-4">')
                      .replace(/<h3>/g, '<h3 class="font-serif text-2xl font-bold text-foreground mt-6 mb-3">')
                      .replace(/<p>/g, '<p class="text-muted-foreground leading-relaxed">')
                      .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-muted-foreground">')
                      .replace(/<li>/g, '<li class="text-muted-foreground">')
                  }}
                />
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border flex items-center gap-4">
                <span className="text-muted-foreground">Share this post:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* About Author */}
              <div className="bg-card rounded-xl border border-border p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">About the Author</h3>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                    <User className="h-8 w-8 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Experienced trek guide and adventure enthusiast with years of knowledge about Himalayan trekking.</p>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Related Posts</h3>
                  <div className="space-y-3">
                    {relatedPosts.map((relPost: any) => (
                      <Link
                        key={relPost.slug}
                        to={`/blog/${relPost.slug}`}
                        className="block p-3 rounded-lg bg-card border border-border hover:border-accent/30 transition-colors"
                      >
                        <p className="font-medium text-foreground text-sm line-clamp-2 hover:text-accent">
                          {relPost.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{relPost.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-xl border border-border p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Comments
            </h2>
            <p className="text-muted-foreground mb-6">Comments are coming soon. In the meantime, feel free to contact us with your questions.</p>
            <Button asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-mountain">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Use this knowledge to plan your perfect trek with our expert guides.
          </p>
          <Button variant="gold" size="xl" asChild>
            <Link to="/treks">
              Explore Treks
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
