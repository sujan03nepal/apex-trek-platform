import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

interface Settings {
  // Brand & Visual
  companyName: string;
  tagline: string;
  logoUrl: string;
  darkLogoUrl: string;
  faviconUrl: string;
  heroImageUrl: string;
  footerBannerUrl: string;

  // Contact Information
  phoneNumbers: string[];
  emailAddresses: string[];
  whatsapp: string;
  viber: string;
  emergencyContact: string;

  // Office Location
  officeAddress: string;
  mapEmbedLink: string;
  latitude: string;
  longitude: string;

  // Social Media
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  twitterUrl: string;
  linkedinUrl: string;

  // SEO Defaults
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;

  // Footer
  footerText: string;
  copyrightText: string;

  // Global Scripts
  googleAnalyticsCode: string;
  tagManagerCode: string;
  facebookPixelCode: string;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("brand");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const [settings, setSettings] = useState<Settings>({
    companyName: "Nepal Treks",
    tagline: "Adventure Awaits",
    logoUrl: "",
    darkLogoUrl: "",
    faviconUrl: "",
    heroImageUrl: "",
    footerBannerUrl: "",
    phoneNumbers: ["+977 123 456 7890"],
    emailAddresses: ["info@nepaltreks.com"],
    whatsapp: "+977 987 654 3210",
    viber: "+977 9876543210",
    emergencyContact: "+977 9841234567",
    officeAddress: "Thamel, Kathmandu, Nepal",
    mapEmbedLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0478619839087!2d85.30755831506293!3d27.71473798279149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4f3%3A0x58099b1deffed8d4!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1645012345678!5m2!1sen!2sus",
    latitude: "27.7149",
    longitude: "85.3076",
    facebookUrl: "https://facebook.com/nepaltreks",
    instagramUrl: "https://instagram.com/nepaltreks",
    youtubeUrl: "https://youtube.com/nepaltreks",
    tiktokUrl: "https://tiktok.com/@nepaltreks",
    twitterUrl: "https://twitter.com/nepaltreks",
    linkedinUrl: "https://linkedin.com/company/nepaltreks",
    defaultMetaTitle: "Nepal Trekking Adventures",
    defaultMetaDescription:
      "Explore the most beautiful treks in Nepal with expert guides and authentic experiences",
    defaultKeywords: ["Nepal", "trekking", "Himalayas", "adventure", "hiking"],
    defaultOgImage: "",
    footerText:
      "Nepal Treks is your trusted partner for authentic Himalayan adventures since 2010.",
    copyrightText: `© ${new Date().getFullYear()} Nepal Treks. All rights reserved.`,
    googleAnalyticsCode: "G-XXXXXXX",
    tagManagerCode: "GTM-XXXXXXX",
    facebookPixelCode: "123456789",
  });

  const tabs = [
    { id: "brand", label: "Brand & Visual", icon: SettingsIcon },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "location", label: "Location", icon: MapPin },
    { id: "social", label: "Social Media", icon: Globe },
    { id: "seo", label: "SEO Defaults", icon: "📊" },
    { id: "footer", label: "Footer", icon: "📄" },
    { id: "scripts", label: "Scripts", icon: Code },
  ];

  const addPhone = () => {
    if (newPhone.trim()) {
      setSettings({
        ...settings,
        phoneNumbers: [...settings.phoneNumbers, newPhone],
      });
      setNewPhone("");
    }
  };

  const removePhone = (index: number) => {
    setSettings({
      ...settings,
      phoneNumbers: settings.phoneNumbers.filter((_, i) => i !== index),
    });
  };

  const addEmail = () => {
    if (newEmail.trim()) {
      setSettings({
        ...settings,
        emailAddresses: [...settings.emailAddresses, newEmail],
      });
      setNewEmail("");
    }
  };

  const removeEmail = (index: number) => {
    setSettings({
      ...settings,
      emailAddresses: settings.emailAddresses.filter((_, i) => i !== index),
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setSettings({
        ...settings,
        defaultKeywords: [...settings.defaultKeywords, newKeyword],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setSettings({
      ...settings,
      defaultKeywords: settings.defaultKeywords.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
    // Here you would call your API to save settings
  };

  const FileUploadBox = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer bg-muted/30">
        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="font-medium text-foreground mb-1">Upload File</p>
        <p className="text-xs text-muted-foreground">PNG, JPG, ICO up to 5MB</p>
        {value && (
          <p className="text-xs text-accent mt-2">✓ File selected</p>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Website Settings
          </h1>
          <p className="text-muted-foreground">
            Manage global website configuration
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
                Media Files
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FileUploadBox
                  label="Logo"
                  value={settings.logoUrl}
                  onChange={(value) =>
                    setSettings({ ...settings, logoUrl: value })
                  }
                />
                <FileUploadBox
                  label="Dark Logo"
                  value={settings.darkLogoUrl}
                  onChange={(value) =>
                    setSettings({ ...settings, darkLogoUrl: value })
                  }
                />
                <FileUploadBox
                  label="Favicon"
                  value={settings.faviconUrl}
                  onChange={(value) =>
                    setSettings({ ...settings, faviconUrl: value })
                  }
                />
                <FileUploadBox
                  label="Hero Image"
                  value={settings.heroImageUrl}
                  onChange={(value) =>
                    setSettings({ ...settings, heroImageUrl: value })
                  }
                />
              </div>
              <div className="mt-6">
                <FileUploadBox
                  label="Footer Banner"
                  value={settings.footerBannerUrl}
                  onChange={(value) =>
                    setSettings({ ...settings, footerBannerUrl: value })
                  }
                />
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Numbers
              </label>
              <div className="space-y-2 mb-4">
                {settings.phoneNumbers.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted p-3 rounded-lg"
                  >
                    <span className="flex-1 text-foreground">{phone}</span>
                    <button
                      onClick={() => removePhone(index)}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors"
                    >
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
                <Button onClick={addPhone}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Addresses
              </label>
              <div className="space-y-2 mb-4">
                {settings.emailAddresses.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted p-3 rounded-lg"
                  >
                    <span className="flex-1 text-foreground">{email}</span>
                    <button
                      onClick={() => removeEmail(index)}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors"
                    >
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
                <Button onClick={addEmail}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Viber Number
                </label>
                <input
                  type="tel"
                  value={settings.viber}
                  onChange={(e) =>
                    setSettings({ ...settings, viber: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  value={settings.emergencyContact}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emergencyContact: e.target.value,
                    })
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
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Office Address
              </label>
              <textarea
                value={settings.officeAddress}
                onChange={(e) =>
                  setSettings({ ...settings, officeAddress: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Map Embed Link
              </label>
              <textarea
                value={settings.mapEmbedLink}
                onChange={(e) =>
                  setSettings({ ...settings, mapEmbedLink: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono text-xs"
                placeholder="Paste your Google Maps iframe embed code here"
              />
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
                {
                  key: "facebookUrl",
                  label: "Facebook",
                  placeholder: "https://facebook.com/...",
                },
                {
                  key: "instagramUrl",
                  label: "Instagram",
                  placeholder: "https://instagram.com/...",
                },
                {
                  key: "youtubeUrl",
                  label: "YouTube",
                  placeholder: "https://youtube.com/...",
                },
                {
                  key: "tiktokUrl",
                  label: "TikTok",
                  placeholder: "https://tiktok.com/@...",
                },
                {
                  key: "twitterUrl",
                  label: "Twitter/X",
                  placeholder: "https://twitter.com/...",
                },
                {
                  key: "linkedinUrl",
                  label: "LinkedIn",
                  placeholder: "https://linkedin.com/company/...",
                },
              ].map((social) => (
                <div key={social.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {social.label}
                  </label>
                  <input
                    type="url"
                    value={
                      settings[social.key as keyof Settings] as string
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        [social.key]: e.target.value,
                      })
                    }
                    placeholder={social.placeholder}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default Meta Title
              </label>
              <input
                type="text"
                value={settings.defaultMetaTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultMetaTitle: e.target.value,
                  })
                }
                maxLength={60}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {settings.defaultMetaTitle.length}/60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default Meta Description
              </label>
              <textarea
                value={settings.defaultMetaDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultMetaDescription: e.target.value,
                  })
                }
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {settings.defaultMetaDescription.length}/160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default Keywords
              </label>
              <div className="space-y-2 mb-4">
                {settings.defaultKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted p-3 rounded-lg"
                  >
                    <Badge className="bg-accent text-accent-foreground">
                      {keyword}
                    </Badge>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="p-1 hover:bg-destructive/20 rounded ml-auto transition-colors"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
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
                <Button onClick={addKeyword}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Default OG Image
              </label>
              <FileUploadBox
                label="OG Image"
                value={settings.defaultOgImage}
                onChange={(value) =>
                  setSettings({ ...settings, defaultOgImage: value })
                }
              />
            </div>
          </div>
        )}

        {/* Footer Settings */}
        {activeTab === "footer" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Footer Content
            </h3>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Footer Text
              </label>
              <textarea
                value={settings.footerText}
                onChange={(e) =>
                  setSettings({ ...settings, footerText: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) =>
                  setSettings({ ...settings, copyrightText: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        )}

        {/* Scripts Settings */}
        {activeTab === "scripts" && (
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <h3 className="font-semibold text-lg text-foreground">
              Global Scripts & Codes
            </h3>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-600">
                ⚠️ Add tracking and analytics codes carefully. Invalid codes
                may break your website.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    googleAnalyticsCode: e.target.value,
                  })
                }
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Google Tag Manager ID
              </label>
              <input
                type="text"
                value={settings.tagManagerCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    tagManagerCode: e.target.value,
                  })
                }
                placeholder="GTM-XXXXXXX"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Facebook Pixel ID
              </label>
              <input
                type="text"
                value={settings.facebookPixelCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebookPixelCode: e.target.value,
                  })
                }
                placeholder="123456789"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end sticky bottom-6">
          <Button onClick={handleSave} variant="gold" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
