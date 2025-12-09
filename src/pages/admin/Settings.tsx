import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { toast } from "sonner";
import {
  Upload,
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  Plus,
  X,
  Code,
  Settings as SettingsIcon,
  Loader2,
} from "lucide-react";

export default function AdminSettings() {
  const { settings, loading, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("brand");
  const [saving, setSaving] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const [formData, setFormData] = useState({
    logo_url: "",
    dark_logo_url: "",
    favicon_url: "",
    hero_image_url: "",
    footer_banner_url: "",
    phone_numbers: [] as string[],
    email_addresses: [] as string[],
    whatsapp: "",
    viber: "",
    emergency_contact: "",
    office_address: "",
    map_embed_link: "",
    latitude: "",
    longitude: "",
    facebook_url: "",
    instagram_url: "",
    youtube_url: "",
    tiktok_url: "",
    twitter_url: "",
    linkedin_url: "",
    default_meta_title: "",
    default_meta_description: "",
    default_keywords: [] as string[],
    default_og_image: "",
    footer_text: "",
    copyright_text: "",
    google_analytics_code: "",
    tag_manager_code: "",
    facebook_pixel_code: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        logo_url: settings.logo_url || "",
        dark_logo_url: settings.dark_logo_url || "",
        favicon_url: settings.favicon_url || "",
        hero_image_url: settings.hero_image_url || "",
        footer_banner_url: settings.footer_banner_url || "",
        phone_numbers: settings.phone_numbers || [],
        email_addresses: settings.email_addresses || [],
        whatsapp: settings.whatsapp || "",
        viber: settings.viber || "",
        emergency_contact: settings.emergency_contact || "",
        office_address: settings.office_address || "",
        map_embed_link: settings.map_embed_link || "",
        latitude: settings.latitude?.toString() || "",
        longitude: settings.longitude?.toString() || "",
        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
        youtube_url: settings.youtube_url || "",
        tiktok_url: settings.tiktok_url || "",
        twitter_url: settings.twitter_url || "",
        linkedin_url: settings.linkedin_url || "",
        default_meta_title: settings.default_meta_title || "",
        default_meta_description: settings.default_meta_description || "",
        default_keywords: settings.default_keywords || [],
        default_og_image: settings.default_og_image || "",
        footer_text: settings.footer_text || "",
        copyright_text: settings.copyright_text || "",
        google_analytics_code: settings.google_analytics_code || "",
        tag_manager_code: settings.tag_manager_code || "",
        facebook_pixel_code: settings.facebook_pixel_code || "",
      });
    }
  }, [settings]);

  const tabs = [
    { id: "brand", label: "Brand & Visual", icon: SettingsIcon },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "location", label: "Location", icon: MapPin },
    { id: "social", label: "Social Media", icon: Globe },
    { id: "seo", label: "SEO Defaults" },
    { id: "footer", label: "Footer" },
    { id: "scripts", label: "Scripts", icon: Code },
  ];

  const addPhone = () => {
    if (newPhone.trim()) {
      setFormData({ ...formData, phone_numbers: [...formData.phone_numbers, newPhone] });
      setNewPhone("");
    }
  };

  const removePhone = (index: number) => {
    setFormData({ ...formData, phone_numbers: formData.phone_numbers.filter((_, i) => i !== index) });
  };

  const addEmail = () => {
    if (newEmail.trim()) {
      setFormData({ ...formData, email_addresses: [...formData.email_addresses, newEmail] });
      setNewEmail("");
    }
  };

  const removeEmail = (index: number) => {
    setFormData({ ...formData, email_addresses: formData.email_addresses.filter((_, i) => i !== index) });
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setFormData({ ...formData, default_keywords: [...formData.default_keywords, newKeyword] });
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setFormData({ ...formData, default_keywords: formData.default_keywords.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateSettings({
      ...formData,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    });
    setSaving(false);
    
    if (error) {
      toast.error("Failed to save settings: " + error);
    } else {
      toast.success("Settings saved successfully!");
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
              Website Settings
            </h1>
            <p className="text-muted-foreground">Manage global website configuration</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <div className="flex gap-2 border-b border-border overflow-x-auto pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "brand" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground mb-4">Media Files</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Logo URL", key: "logo_url" },
                { label: "Dark Logo URL", key: "dark_logo_url" },
                { label: "Favicon URL", key: "favicon_url" },
                { label: "Hero Image URL", key: "hero_image_url" },
                { label: "Footer Banner URL", key: "footer_banner_url" },
                { label: "Default OG Image URL", key: "default_og_image" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type="text"
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Contact Information</h3>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Numbers</label>
              <div className="space-y-2 mb-4">
                {formData.phone_numbers.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                    <span className="flex-1 text-foreground">{phone}</span>
                    <button onClick={() => removePhone(index)} className="p-1 hover:bg-destructive/20 rounded">
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Add new phone number"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button onClick={addPhone}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Addresses</label>
              <div className="space-y-2 mb-4">
                {formData.email_addresses.map((email, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                    <span className="flex-1 text-foreground">{email}</span>
                    <button onClick={() => removeEmail(index)} className="p-1 hover:bg-destructive/20 rounded">
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Add new email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button onClick={addEmail}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "WhatsApp", key: "whatsapp" },
                { label: "Viber", key: "viber" },
                { label: "Emergency Contact", key: "emergency_contact" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type="tel"
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Office Location</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Office Address</label>
              <textarea
                value={formData.office_address}
                onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Latitude</label>
                <input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Longitude</label>
                <input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Google Map Embed Link</label>
              <textarea
                value={formData.map_embed_link}
                onChange={(e) => setFormData({ ...formData, map_embed_link: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Social Media Links</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Facebook", key: "facebook_url" },
                { label: "Instagram", key: "instagram_url" },
                { label: "YouTube", key: "youtube_url" },
                { label: "TikTok", key: "tiktok_url" },
                { label: "Twitter/X", key: "twitter_url" },
                { label: "LinkedIn", key: "linkedin_url" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type="url"
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">SEO Defaults</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Default Meta Title</label>
              <input
                type="text"
                value={formData.default_meta_title}
                onChange={(e) => setFormData({ ...formData, default_meta_title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Default Meta Description</label>
              <textarea
                value={formData.default_meta_description}
                onChange={(e) => setFormData({ ...formData, default_meta_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Default Keywords</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.default_keywords.map((keyword, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                    {keyword}
                    <button onClick={() => removeKeyword(index)}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keyword"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button onClick={addKeyword}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "footer" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Footer Content</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Footer Text</label>
              <textarea
                value={formData.footer_text}
                onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Copyright Text</label>
              <input
                type="text"
                value={formData.copyright_text}
                onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        )}

        {activeTab === "scripts" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">Analytics & Tracking Scripts</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Google Analytics Code</label>
              <input
                type="text"
                value={formData.google_analytics_code}
                onChange={(e) => setFormData({ ...formData, google_analytics_code: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Google Tag Manager Code</label>
              <input
                type="text"
                value={formData.tag_manager_code}
                onChange={(e) => setFormData({ ...formData, tag_manager_code: e.target.value })}
                placeholder="GTM-XXXXXXX"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Facebook Pixel Code</label>
              <input
                type="text"
                value={formData.facebook_pixel_code}
                onChange={(e) => setFormData({ ...formData, facebook_pixel_code: e.target.value })}
                placeholder="123456789"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}