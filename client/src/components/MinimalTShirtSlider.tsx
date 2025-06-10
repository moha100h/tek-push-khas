import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinimalTShirtSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: images = [], isLoading } = useQuery<TshirtImage[]>({
    queryKey: ["/api/tshirt-images"],
  });

  const activeImages = images.filter(img => img.isActive);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || activeImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeImages.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % activeImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="aspect-square bg-[var(--soft-gray)] rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (activeImages.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-20">
        <div className="aspect-square bg-[var(--soft-gray)] rounded-3xl flex items-center justify-center">
          <p className="text-[var(--matte-black)]/60">هیچ تصویری موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Main Image Container */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-white shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${currentIndex * -100}%)` }}
        >
          {activeImages.map((image, index) => (
            <div key={image.id} className="min-w-full aspect-square relative">
              <img
                src={image.imageUrl}
                alt={image.alt || `تی‌شرت ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--matte-black)]/20 via-transparent to-transparent"></div>
              
              {/* Image Info */}
              {image.alt && (
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
                    {image.alt}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {activeImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 text-white hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 text-white hover:text-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Minimal Dot Indicators */}
      {activeImages.length > 1 && (
        <div className="flex justify-center mt-8 space-x-reverse space-x-3">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[var(--bold-red)] scale-125'
                  : 'bg-[var(--matte-black)]/30 hover:bg-[var(--matte-black)]/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {activeImages.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-3xl overflow-hidden">
          <div 
            className="h-full bg-[var(--bold-red)] transition-all duration-75 ease-linear"
            style={{
              width: `${((currentIndex + 1) / activeImages.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}