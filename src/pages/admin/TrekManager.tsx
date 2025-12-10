import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Plus, Search, Filter, Loader2, Eye, EyeOff, X, ChevronDown, ChevronUp } from "lucide-react";
import { useTreks } from "@/hooks/useTreks";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TrekManager() {
  const { treks, loading, createTrek, updateTrek, deleteTrek } = useTreks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTreks, setSelectedTreks] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrek, setEditingTrek] = useState<any>(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryItems, setItineraryItems] = useState<any[]>([]);
  const [newItinerary, setNewItinerary] = useState({
    day_number: 1,
    title: "",
    description: "",
    altitude: "",
    distance: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    description: "",
    duration: "",
    max_altitude: "",
    difficulty: "Moderate",
    price: "",
    is_published: true,
    is_featured: false,
    featured_image_url: "",
    best_seasons: [] as string[],
    highlights: [] as string[],
    includes: [] as string[],
    excludes: [] as string[],
  });

  const filteredTreks = treks.filter(trek =>
    trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trek.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedTreks.length === filteredTreks.length) {
      setSelectedTreks([]);
    } else {
      setSelectedTreks(filteredTreks.map(t => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedTreks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const openCreateForm = () => {
    setEditingTrek(null);
    setFormData({
      name: "",
      slug: "",
      short_description: "",
      description: "",
      duration: "",
      max_altitude: "",
      difficulty: "Moderate",
      price: "",
      is_published: true,
      is_featured: false,
      featured_image_url: "",
      best_seasons: [],
      highlights: [],
      includes: [],
      excludes: [],
    });
    setItineraryItems([]);
    setShowItinerary(false);
    setIsFormOpen(true);
  };

  const openEditForm = (trek: any) => {
    setEditingTrek(trek);
    setFormData({
      name: trek.name,
      slug: trek.slug,
      short_description: trek.short_description || "",
      description: trek.description || "",
      duration: trek.duration || "",
      max_altitude: trek.max_altitude || "",
      difficulty: trek.difficulty || "Moderate",
      price: trek.price?.toString() || "",
      is_published: trek.is_published ?? true,
      is_featured: trek.is_featured ?? false,
      featured_image_url: trek.featured_image_url || "",
      best_seasons: trek.best_seasons || [],
      highlights: trek.highlights || [],
      includes: trek.includes || [],
      excludes: trek.excludes || [],
    });
    fetchItineraryItems(trek.id);
    setShowItinerary(false);
    setIsFormOpen(true);
  };

  const fetchItineraryItems = async (trekId: string) => {
    const { data } = await supabase
      .from('trek_itineraries')
      .select('*')
      .eq('trek_id', trekId)
      .order('day_number');
    setItineraryItems(data || []);
  };

  const handleAddItinerary = async () => {
    if (!newItinerary.title || !editingTrek) return;

    const { error } = await supabase
      .from('trek_itineraries')
      .insert({
        trek_id: editingTrek.id,
        day_number: newItinerary.day_number,
        title: newItinerary.title,
        description: newItinerary.description || null,
        altitude: newItinerary.altitude || null,
        distance: newItinerary.distance || null,
        activities: [],
      });

    if (error) {
      toast.error("Failed to add itinerary item");
    } else {
      toast.success("Itinerary item added");
      fetchItineraryItems(editingTrek.id);
      setNewItinerary({ day_number: 1, title: "", description: "", altitude: "", distance: "" });
    }
  };

  const handleDeleteItinerary = async (id: string) => {
    const { error } = await supabase
      .from('trek_itineraries')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete itinerary item");
    } else {
      toast.success("Itinerary item deleted");
      fetchItineraryItems(editingTrek.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trekData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
    };

    if (editingTrek) {
      const { error } = await updateTrek(editingTrek.id, trekData);
      if (error) {
        toast.error("Failed to update trek");
      } else {
        toast.success("Trek updated successfully");
        setIsFormOpen(false);
      }
    } else {
      const { error } = await createTrek(trekData);
      if (error) {
        toast.error("Failed to create trek");
      } else {
        toast.success("Trek created successfully");
        setIsFormOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this trek?")) {
      const { error } = await deleteTrek(id);
      if (error) {
        toast.error("Failed to delete trek");
      } else {
        toast.success("Trek deleted successfully");
      }
    }
  };

  const togglePublish = async (trek: any) => {
    const { error } = await updateTrek(trek.id, { is_published: !trek.is_published });
    if (error) {
      toast.error("Failed to update trek");
    } else {
      toast.success(trek.is_published ? "Trek unpublished" : "Trek published");
    }
  };

  const addArrayItem = (field: 'includes' | 'excludes' | 'highlights' | 'best_seasons', value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value]
    }));
  };

  const removeArrayItem = (field: 'includes' | 'excludes' | 'highlights' | 'best_seasons', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
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
              Trek Management
            </h1>
            <p className="text-muted-foreground">
              Manage your trek packages, pricing, and details
            </p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Trek
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTrek ? "Edit Trek" : "Create New Trek"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label className="block text-sm font-medium mb-1">Short Description</label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="14 Days"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Altitude</label>
                    <input
                      type="text"
                      value={formData.max_altitude}
                      onChange={(e) => setFormData({ ...formData, max_altitude: e.target.value })}
                      placeholder="5,364m"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                      <option value="Strenuous">Strenuous</option>
                    </select>
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
                    {editingTrek ? "Update Trek" : "Create Trek"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedTreks.length === filteredTreks.length && filteredTreks.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Trek Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Duration</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Difficulty</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-right py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTreks.map((trek) => (
                  <tr key={trek.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedTreks.includes(trek.id)}
                        onChange={() => toggleSelect(trek.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-foreground">{trek.name}</p>
                      <p className="text-xs text-muted-foreground">/{trek.slug}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">
                      ${trek.price || 0}
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{trek.duration}</td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{trek.difficulty}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={trek.is_published ? "bg-accent/20 text-accent border-0" : "bg-muted text-muted-foreground border-0"}>
                        {trek.is_published ? "Published" : "Draft"}
                      </Badge>
                      {trek.is_featured && (
                        <Badge className="ml-2 bg-primary/20 text-primary border-0">Featured</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => togglePublish(trek)}>
                        {trek.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditForm(trek)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(trek.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTreks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No treks found</p>
              <Button onClick={openCreateForm}>Create Your First Trek</Button>
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{filteredTreks.length}</span> treks
            {selectedTreks.length > 0 && (
              <span className="ml-4">
                Selected: <span className="font-semibold text-accent">{selectedTreks.length}</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
