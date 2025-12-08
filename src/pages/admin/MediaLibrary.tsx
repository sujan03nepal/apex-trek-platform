import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Copy, Grid, List, Search, Filter } from "lucide-react";

const mediaItems = [
  {
    id: 1,
    name: "everest-hero.jpg",
    type: "image",
    size: "2.4 MB",
    uploaded: "2024-03-15",
    category: "hero",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300",
  },
  {
    id: 2,
    name: "annapurna-gallery.jpg",
    type: "image",
    size: "1.8 MB",
    uploaded: "2024-03-14",
    category: "gallery",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
  },
  {
    id: 3,
    name: "nepal-treks-logo.png",
    type: "image",
    size: "540 KB",
    uploaded: "2024-03-13",
    category: "logo",
    url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=300",
  },
];

export default function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "hero", "gallery", "logo", "blog"];

  const filteredMedia = mediaItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "all" || item.category === selectedCategory)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Media Library
            </h1>
            <p className="text-muted-foreground">
              Manage your website images and media files
            </p>
          </div>
          <Button variant="gold">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border overflow-hidden group hover:border-accent/30 transition-colors"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="p-4">
                  <p className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                    {item.name}
                  </p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.uploaded}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Size
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-foreground">
                      Uploaded
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <span className="font-medium text-foreground text-sm">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {item.size}
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {item.uploaded}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
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
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground mb-4">No media files found</p>
            <Button variant="gold">
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First File
            </Button>
          </div>
        )}

        {/* Storage Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Storage Usage</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="font-semibold text-foreground">4.2 GB / 10 GB</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: "42%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
