import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Plus, Trash2, Edit2, Loader2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutContent {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  metadata: any;
  display_order: number | null;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

export default function AboutManager() {
  const [sections, setSections] = useState<AboutContent[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [editedSections, setEditedSections] = useState<Record<string, AboutContent>>({});
  
  // Team member form
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    image_url: "",
    bio: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const [sectionsRes, teamRes] = await Promise.all([
      supabase.from('about_content').select('*').order('display_order'),
      supabase.from('team_members').select('*').order('display_order'),
    ]);
    
    if (sectionsRes.data) {
      setSections(sectionsRes.data);
      const edited: Record<string, AboutContent> = {};
      sectionsRes.data.forEach(s => { edited[s.id] = { ...s }; });
      setEditedSections(edited);
    }
    if (teamRes.data) setTeamMembers(teamRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSectionChange = (id: string, field: string, value: any) => {
    setEditedSections(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const section of Object.values(editedSections)) {
      await supabase.from('about_content').update({
        title: section.title,
        content: section.content,
        metadata: section.metadata,
        updated_at: new Date().toISOString(),
      }).eq('id', section.id);
    }
    setSaving(false);
    toast.success("About page content saved!");
  };

  const openMemberForm = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setMemberForm({
        name: member.name,
        role: member.role,
        image_url: member.image_url || "",
        bio: member.bio || "",
      });
    } else {
      setEditingMember(null);
      setMemberForm({ name: "", role: "", image_url: "", bio: "" });
    }
    setIsTeamFormOpen(true);
  };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      const { error } = await supabase.from('team_members').update({
        ...memberForm,
        updated_at: new Date().toISOString(),
      }).eq('id', editingMember.id);
      if (error) toast.error("Failed to update"); else toast.success("Team member updated");
    } else {
      const { error } = await supabase.from('team_members').insert({
        ...memberForm,
        display_order: teamMembers.length + 1,
      });
      if (error) toast.error("Failed to add"); else toast.success("Team member added");
    }
    setIsTeamFormOpen(false);
    fetchData();
  };

  const deleteMember = async (id: string) => {
    if (confirm("Delete this team member?")) {
      await supabase.from('team_members').delete().eq('id', id);
      toast.success("Team member deleted");
      fetchData();
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
              About Page Manager
            </h1>
            <p className="text-muted-foreground">Edit about page content and team members</p>
          </div>
          {activeTab === "content" && (
            <Button onClick={handleSaveAll} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save All Changes
            </Button>
          )}
        </div>

        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "content" ? "border-accent text-accent" : "border-transparent text-muted-foreground"
            }`}
          >
            Page Content
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "team" ? "border-accent text-accent" : "border-transparent text-muted-foreground"
            }`}
          >
            Team Members
          </button>
        </div>

        {activeTab === "content" && (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4 capitalize">
                  {section.section_key.replace('_', ' ')} Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={editedSections[section.id]?.title || ""}
                      onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                      value={editedSections[section.id]?.content || ""}
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => openMemberForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  {member.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
                    <p className="text-sm text-accent">{member.role}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => openMemberForm(member)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => deleteMember(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Dialog open={isTeamFormOpen} onOpenChange={setIsTeamFormOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleMemberSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                      type="text"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role *</label>
                    <input
                      type="text"
                      value={memberForm.role}
                      onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      type="text"
                      value={memberForm.image_url}
                      onChange={(e) => setMemberForm({ ...memberForm, image_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={memberForm.bio}
                      onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsTeamFormOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingMember ? "Update" : "Add"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}