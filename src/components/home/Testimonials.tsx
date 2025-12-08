import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "United States",
    trek: "Everest Base Camp",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    text: "An absolutely life-changing experience! The guides were incredibly knowledgeable and made sure we were safe and comfortable throughout the entire journey. Standing at Everest Base Camp was a dream come true.",
  },
  {
    id: 2,
    name: "James Chen",
    location: "Australia",
    trek: "Annapurna Circuit",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    text: "The Annapurna Circuit was challenging but incredibly rewarding. The team at Nepal Treks took care of everything - permits, accommodation, and even helped me when I felt the altitude. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "United Kingdom",
    trek: "Langtang Valley",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    text: "I was nervous about trekking alone as a solo female traveler, but Nepal Treks made me feel completely safe. The Langtang Valley is stunning, and our guide Pemba was like family by the end.",
  },
  {
    id: 4,
    name: "Michael Schmidt",
    location: "Germany",
    trek: "Manaslu Circuit",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    text: "The Manaslu Circuit was the adventure of a lifetime. Less crowded than Everest or Annapurna, with equally stunning scenery. The team's attention to detail and professionalism was outstanding.",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-mountain text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our Trekkers Say
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Don't just take our word for it. Here's what adventurers from around 
            the world have to say about their experiences with us.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-8 opacity-20">
            <Quote className="h-24 w-24" />
          </div>

          {/* Main Testimonial */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary-foreground/10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Author Image */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-accent/30"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-primary-foreground/90 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                {/* Author Info */}
                <div>
                  <p className="font-semibold text-lg text-primary-foreground">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-primary-foreground/70">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].trek}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-accent w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
