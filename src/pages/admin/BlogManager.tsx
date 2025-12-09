import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, Search, Eye, EyeOff, Loader2 } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BlogManager() {
  const { posts: blogPosts, loading, createPost: createBlogPost, updatePost: updateBlogPost, deletePost: deleteBlogPost } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    is_published: true,
    is_featured: false,
    meta_title: "",
    meta_description: "",
  });

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const openCreateForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image_url: "",
      is_published: true,
      is_featured: false,
      meta_title: "",
      meta_description: "",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image_url: post.featured_image_url || "",
      is_published: post.is_published ?? true,
      is_featured: post.is_featured ?? false,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    if (editingPost) {
      const { error } = await updateBlogPost(editingPost.id, postData);
      if (error) {
        toast.error("Failed to update post");
      } else {
        toast.success("Post updated successfully");
        setIsFormOpen(false);
      }
    } else {
      const { error } = await createBlogPost(postData);
      if (error) {
        toast.error("Failed to create post");
      } else {
        toast.success("Post created successfully");
        setIsFormOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await deleteBlogPost(id);
      if (error) {
        toast.error("Failed to delete post");
      } else {
        toast.success("Post deleted successfully");
      }
    }
  };

  const togglePublish = async (post: any) => {
    const { error } = await updateBlogPost(post.id, { 
      is_published: !post.is_published,
      published_at: !post.is_published ? new Date().toISOString() : null
    });
    if (error) {
      toast.error("Failed to update post");
    } else {
      toast.success(post.is_published ? "Post unpublished" : "Post published");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Blog Management
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <input
                      type="text"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    />
                    <span className="text-sm">Published</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingPost ? "Update Post" : "Create Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Title</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Views</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Created</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground">/{post.slug}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={post.is_published ? "bg-accent/20 text-accent border-0" : "bg-muted text-muted-foreground border-0"}>
                        {post.is_published ? "Published" : "Draft"}
                      </Badge>
                      {post.is_featured && (
                        <Badge className="ml-2 bg-primary/20 text-primary border-0">Featured</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.view_count || 0}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => togglePublish(post)}>
                        {post.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditForm(post)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(post.id)}>
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
              <Button onClick={openCreateForm}>Write Your First Post</Button>
            </div>
          )}
        </div>

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