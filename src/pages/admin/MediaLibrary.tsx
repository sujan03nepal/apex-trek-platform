import { useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";
import { Upload, Trash2, Copy, Grid, List, Search, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function MediaLibrary() {
  const { media, loading, deleteMedia, addMedia } = useMediaLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Map<string, number>>(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["all", "hero", "gallery", "logo", "blog"];

  const filteredMedia = media.filter(
    (item) =>
      (item.file_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) &&
      (selectedCategory === "all" || item.category === selectedCategory)
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    const { error } = await deleteMedia(id);
    if (error) {
      toast.error("Failed to delete file: " + error);
    } else {
      toast.success("File deleted successfully!");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = `${Date.now()}-${i}`;
      setUploadingFiles(prev => new Map(prev).set(fileId, 0));

      uploadPromises.push(
        (async () => {
          try {
            // Upload to Supabase Storage
            const fileName = `${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const { data: storageData, error: storageError } = await supabase.storage
              .from('media')
              .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
              });

            if (storageError) throw storageError;

            // Get public URL
            const { data: urlData } = supabase.storage
              .from('media')
              .getPublicUrl(fileName);

            // Add to database
            const { error: dbError } = await addMedia({
              file_name: file.name,
              file_url: urlData.publicUrl,
              file_type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'document',
              mime_type: file.type,
              file_size_bytes: file.size,
              category: selectedCategory === 'all' ? 'general' : selectedCategory,
              tags: [],
              is_public: true,
            });

            if (dbError) throw dbError;

            setUploadingFiles(prev => {
              const newMap = new Map(prev);
              newMap.delete(fileId);
              return newMap;
            });

            toast.success(`${file.name} uploaded successfully!`);
          } catch (error: any) {
            toast.error(`Failed to upload ${file.name}: ${error.message}`);
            setUploadingFiles(prev => {
              const newMap = new Map(prev);
              newMap.delete(fileId);
              return newMap;
            });
          }
        })()
      );
    }

    await Promise.all(uploadPromises);
    setUploading(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${kb.toFixed(2)} KB`;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AdminLayout>
    );
  }

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
          <Button
            variant="gold"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
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
            {filteredMedia.length > 0 ? (
              filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl border border-border overflow-hidden group hover:border-accent/30 transition-colors"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={item.file_url}
                      alt={item.file_name || "Media"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                      {item.file_name}
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(item.file_size_bytes)}</span>
                        {item.category && (
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recently"}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleCopyUrl(item.file_url)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No media files found</p>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {filteredMedia.length > 0 ? (
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
                              src={item.file_url}
                              alt={item.file_name || "Media"}
                              className="w-12 h-12 rounded object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300";
                              }}
                            />
                            <span className="font-medium text-foreground text-sm line-clamp-1">
                              {item.file_name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {formatFileSize(item.file_size_bytes)}
                        </td>
                        <td className="py-4 px-6">
                          {item.category ? (
                            <Badge variant="outline">{item.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recently"}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopyUrl(item.file_url)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No media files found</p>
              </div>
            )}
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground mb-4">No media files found</p>
            <p className="text-sm text-muted-foreground">Upload files to get started</p>
          </div>
        )}

        {/* Storage Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Media Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Files</span>
              <span className="font-semibold text-foreground">{media.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Size</span>
              <span className="font-semibold text-foreground">
                {formatFileSize(media.reduce((acc, m) => (acc || 0) + (m.file_size_bytes || 0), 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
