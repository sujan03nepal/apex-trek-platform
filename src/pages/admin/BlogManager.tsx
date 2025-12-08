import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, Search, Eye, EyeOff } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "The Ultimate Everest Base Camp Trekking Guide 2024",
    author: "Pemba Sherpa",
    category: "Guides",
    status: "published",
    date: "2024-03-15",
    views: 1245,
  },
  {
    id: "2",
    title: "Best Time to Trek in Nepal: A Seasonal Guide",
    author: "Maya Tamang",
    category: "Tips",
    status: "draft",
    date: "2024-03-10",
    views: 0,
  },
  {
    id: "3",
    title: "Altitude Sickness: Prevention and Treatment Guide",
    author: "Dr. Karma Dorje",
    category: "Health",
    status: "published",
    date: "2024-03-05",
    views: 856,
  },
];

export default function BlogManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedPosts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Blog Management
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Button asChild variant="gold">
            <Link to="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Title
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Author
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">
                    Views
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-foreground line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {post.author}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{post.category}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={
                          post.status === "published"
                            ? "bg-forest/20 text-forest border-0"
                            : "bg-accent/20 text-accent border-0"
                        }
                      >
                        {post.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {post.status === "published" ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                        {post.views}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/blog/${post.id}`}>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts found</p>
              <Button asChild variant="gold">
                <Link to="/admin/blog/new">Write Your First Post</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{filteredPosts.length}</span> posts
            {selectedPosts.length > 0 && (
              <span className="ml-4">
                Selected: <span className="font-semibold text-accent">{selectedPosts.length}</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
