import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Calendar, Clock, ArrowRight, User, Loader2 } from "lucide-react";

export default function Blog() {
  const { posts, loading } = useBlogPosts();

  // Get featured posts
  const featuredPost = posts.find(post => post.is_featured && post.is_published);
  const regularPosts = posts.filter(post => !post.is_featured && post.is_published);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </Layout>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";

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
          {/* Featured Post */}
          {featuredPost && (
            <Link 
              to={`/blog/${featuredPost.slug}`}
              className="block mb-16 group"
            >
              <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-shadow">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.featured_image_url || defaultImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-accent/20 text-accent border-0">
                      Featured
                    </Badge>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt || "Interesting read"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.created_at 
                        ? new Date(featuredPost.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })
                        : 'Recently'
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredPost.view_count || 0} views
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="block bg-card rounded-xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-all group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.featured_image_url || defaultImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt || "Interesting read"}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })
                          : 'Recently'
                        }
                      </span>
                      <span>{post.view_count || 0} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blog posts published yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
