import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useFaqs } from "@/hooks/useFaqs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, HelpCircle, Save, X } from "lucide-react";

export default function FAQManager() {
  const { faqs, loading, createFaq, updateFaq, deleteFaq } = useFaqs();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
    display_order: 0,
    is_active: true,
  });

  const categories = [...new Set(faqs.map(f => f.category))];

  const resetForm = () => {
    setFormData({ category: "", question: "", answer: "", display_order: 0, is_active: true });
    setIsEditing(null);
    setIsCreating(false);
  };

  const handleEdit = (faq: typeof faqs[0]) => {
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      display_order: faq.display_order || 0,
      is_active: faq.is_active ?? true,
    });
    setIsEditing(faq.id);
  };

  const handleSave = async () => {
    if (!formData.category || !formData.question || !formData.answer) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    if (isEditing) {
      const { error } = await updateFaq(isEditing, formData);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "FAQ updated!" });
        resetForm();
      }
    } else {
      const { error } = await createFaq(formData);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "FAQ added!" });
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const { error } = await deleteFaq(id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "FAQ deleted!" });
    }
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

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
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">FAQ Manager</h1>
            <p className="text-muted-foreground">Manage frequently asked questions</p>
          </div>
          {!isCreating && !isEditing && (
            <Button variant="gold" onClick={() => setIsCreating(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add FAQ
            </Button>
          )}
        </div>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-lg text-foreground">
              {isEditing ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  placeholder="e.g., General Questions, Booking & Payment"
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Question *</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  placeholder="What is the best time to trek in Nepal?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Answer *</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
                  rows={4}
                  placeholder="The best trekking seasons in Nepal are..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="is_active" className="text-sm text-foreground">Active</label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="gold" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* FAQ List by Category */}
        {Object.keys(groupedFaqs).length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No FAQs yet. Add your first FAQ!</p>
          </div>
        ) : (
          Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-foreground">{category}</h2>
              <div className="space-y-3">
                {items.map((faq) => (
                  <div key={faq.id} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{faq.question}</h3>
                          {!faq.is_active && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">Inactive</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
