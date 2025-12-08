import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, MapPin, Phone, Mail, Globe } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("brand");
  const [settings, setSettings] = useState({
    companyName: "Nepal Treks",
    tagline: "Adventure Awaits",
    logo: null as string | null,
    favicon: null as string | null,
    phone: "+977 123 456 7890",
    email: "info@nepaltreks.com",
    whatsapp: "+977 987 654 3210",
    address: "Thamel, Kathmandu, Nepal",
    latitude: "27.7149",
    longitude: "85.3076",
    facebook: "https://facebook.com/nepaltreks",
    instagram: "https://instagram.com/nepaltreks",
    youtube: "https://youtube.com/nepaltreks",
    metaTitle: "Nepal Trekking Adventures",
    metaDescription: "Explore the most beautiful treks in Nepal with expert guides",
  });

  const tabs = [
    { id: "brand", label: "Brand & Visual" },
    { id: "contact", label: "Contact Information" },
    { id: "location", label: "Office Location" },
    { id: "social", label: "Social Media" },
    { id: "seo", label: "SEO Defaults" },
  ];

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Website Settings
          </h1>
          <p className="text-muted-foreground">
            Manage global website configuration and settings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border overflow-x-auto pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Brand Settings */}
        {activeTab === "brand" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Brand Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) =>
                      setSettings({ ...settings, companyName: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) =>
                      setSettings({ ...settings, tagline: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Logo & Favicon
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="font-medium text-foreground mb-1">Logo</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="font-medium text-foreground mb-1">Favicon</p>
                  <p className="text-xs text-muted-foreground">
                    ICO or PNG up to 1MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Settings */}
        {activeTab === "contact" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Main Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={settings.whatsapp}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Location Settings */}
        {activeTab === "location" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Office Location
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Office Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={settings.latitude}
                    onChange={(e) =>
                      setSettings({ ...settings, latitude: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={settings.longitude}
                    onChange={(e) =>
                      setSettings({ ...settings, longitude: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === "social" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Social Media Links
            </h3>
            <div className="space-y-4">
              {[
                { key: "facebook", label: "Facebook", icon: "f" },
                { key: "instagram", label: "Instagram", icon: "@" },
                { key: "youtube", label: "YouTube", icon: "▶" },
              ].map((social) => (
                <div key={social.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {social.label}
                  </label>
                  <input
                    type="url"
                    value={
                      settings[social.key as keyof typeof settings] || ""
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        [social.key]: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={`https://${social.key}.com/nepaltreks`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Settings */}
        {activeTab === "seo" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              SEO Defaults
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, metaTitle: e.target.value })
                  }
                  maxLength={60}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {settings.metaTitle.length}/60 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Meta Description
                </label>
                <textarea
                  value={settings.metaDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      metaDescription: e.target.value,
                    })
                  }
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {settings.metaDescription.length}/160 characters
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} variant="gold" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
