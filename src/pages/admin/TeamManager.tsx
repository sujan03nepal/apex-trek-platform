import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, Users, Save, X } from "lucide-react";

export default function TeamManager() {
  const { teamMembers, loading, createTeamMember, updateTeamMember, deleteTeamMember } = useTeamMembers();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    display_order: 0,
    is_active: true,
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", bio: "", image_url: "", display_order: 0, is_active: true });
    setIsEditing(null);
    setIsCreating(false);
  };

  const handleEdit = (member: typeof teamMembers[0]) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      image_url: member.image_url || "",
      display_order: member.display_order || 0,
      is_active: member.is_active ?? true,
    });
    setIsEditing(member.id);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) {
      toast({ title: "Error", description: "Name and role are required", variant: "destructive" });
      return;
    }

    if (isEditing) {
      const { error } = await updateTeamMember(isEditing, formData);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Team member updated!" });
        resetForm();
      }
    } else {
      const { error } = await createTeamMember(formData);
      if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Team member added!" });
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    const { error } = await deleteTeamMember(id);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Team member deleted!" });
    }
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
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Team Members</h1>
            <p className="text-muted-foreground">Manage your team displayed on the About page</p>
          </div>
          {!isCreating && !isEditing && (
            <Button variant="gold" onClick={() => setIsCreating(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add Member
            </Button>
          )}
        </div>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-lg text-foreground">
              {isEditing ? "Edit Team Member" : "Add New Team Member"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  placeholder="Lead Guide"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
                  rows={3}
                  placeholder="Brief biography..."
                />
              </div>
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

        {/* Team List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No team members yet. Add your first team member!</p>
            </div>
          ) : (
            teamMembers.map((member) => (
              <div key={member.id} className="bg-card rounded-xl border border-border overflow-hidden">
                {member.image_url && (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-accent">{member.role}</p>
                    </div>
                    {!member.is_active && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Inactive</span>
                    )}
                  </div>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4 mr-1 text-destructive" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
