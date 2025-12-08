import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Everest Base Camp Sunrise",
    region: "Everest",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
  },
  {
    id: 2,
    title: "Annapurna Range at Dawn",
    region: "Annapurna",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  {
    id: 3,
    title: "Langtang Valley Trek",
    region: "Langtang",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200"
  },
  {
    id: 4,
    title: "Mountain Lake Reflection",
    region: "Manaslu",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200"
  },
  {
    id: 5,
    title: "Sherpa Village Community",
    region: "Everest",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200"
  },
  {
    id: 6,
    title: "Rhododendron Forest",
    region: "Annapurna",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200"
  },
  {
    id: 7,
    title: "Trekking Through Valleys",
    region: "Langtang",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200"
  },
  {
    id: 8,
    title: "Mountain Meditation",
    region: "Manaslu",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  {
    id: 9,
    title: "Sunset Over Himalayas",
    region: "Everest",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
  }
];

const regions = ["All", "Everest", "Annapurna", "Langtang", "Manaslu"];

interface GalleryImage {
  id: number;
  title: string;
  region: string;
  image: string;
  fullImage: string;
}

export default function Gallery() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedRegion === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.region === selectedRegion);

  return (
    <Layout>
      <section className="py-12 bg-gradient-mountain">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Gallery
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Experience the breathtaking beauty of the Himalayas through our collection 
            of trek photography and mountain landscapes.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Region Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === region
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-foreground hover:border-accent/30"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img: GalleryImage) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-card border border-border"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sapphire-dark/0 group-hover:bg-sapphire-dark/40 transition-colors duration-300" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary-foreground">
                      {img.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-accent/80 text-accent-foreground">
                        {img.region}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(img);
                        }}
                        className="p-2 bg-accent rounded-full hover:bg-accent/80 transition-colors"
                      >
                        <ZoomIn className="h-4 w-4 text-accent-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found for this region.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-sapphire-dark/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 p-2 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative">
              <img
                src={selectedImage.fullImage}
                alt={selectedImage.title}
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sapphire-dark via-transparent to-transparent p-6 rounded-b-xl">
                <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-2">
                  {selectedImage.title}
                </h2>
                <Badge className="bg-accent/80 text-accent-foreground">
                  {selectedImage.region} Region
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
