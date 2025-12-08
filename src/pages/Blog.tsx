import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "ultimate-everest-base-camp-guide",
    title: "The Ultimate Everest Base Camp Trekking Guide 2024",
    excerpt: "Everything you need to know about trekking to Everest Base Camp, from preparation tips to day-by-day itinerary insights.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    category: "Guides",
    author: "Pemba Sherpa",
    date: "2024-03-15",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "2",
    slug: "best-time-to-trek-nepal",
    title: "Best Time to Trek in Nepal: A Seasonal Guide",
    excerpt: "Discover the ideal months for trekking in different regions of Nepal, from spring rhododendrons to clear autumn skies.",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800",
    category: "Tips",
    author: "Maya Tamang",
    date: "2024-03-10",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "3",
    slug: "altitude-sickness-prevention",
    title: "Altitude Sickness: Prevention and Treatment Guide",
    excerpt: "Learn how to recognize, prevent, and treat altitude sickness for a safe and enjoyable Himalayan trekking experience.",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
    category: "Health",
    author: "Dr. Karma Dorje",
    date: "2024-03-05",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "4",
    slug: "packing-list-himalayan-trek",
    title: "Essential Packing List for Your Himalayan Trek",
    excerpt: "A comprehensive packing guide with everything you need for trekking in Nepal, including gear recommendations and tips.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    category: "Guides",
    author: "Pemba Sherpa",
    date: "2024-02-28",
    readTime: "15 min read",
    featured: false,
  },
  {
    id: "5",
    slug: "sherpa-culture-traditions",
    title: "Understanding Sherpa Culture and Traditions",
    excerpt: "Explore the rich cultural heritage of the Sherpa people, from Buddhist traditions to mountain life.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    category: "Culture",
    author: "Tashi Sherpa",
    date: "2024-02-20",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "6",
    slug: "solo-female-trekking-nepal",
    title: "Solo Female Trekking in Nepal: Safety Tips & Insights",
    excerpt: "A comprehensive guide for women traveling solo in Nepal, with safety tips, cultural insights, and inspiring stories.",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800",
    category: "Tips",
    author: "Maya Tamang",
    date: "2024-02-15",
    readTime: "11 min read",
    featured: false,
  },
];

const categories = ["All", "Guides", "Tips", "Health", "Culture", "Stories"];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Blog & Travel Tips
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Expert insights, trekking guides, and inspiring stories from the Himalayas. 
              Everything you need to plan your perfect adventure.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link 
              to={`/blog/${featuredPost.slug}`}
              className="block mb-16 group"
            >
              <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-shadow">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-accent/20 text-accent border-0">
                      Featured
                    </Badge>
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block bg-card rounded-xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
