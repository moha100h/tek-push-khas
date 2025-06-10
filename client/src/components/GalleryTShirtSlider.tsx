import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryTShirtSlider() {
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
    }, 5000);

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
      <div className="w-full max-w-6xl mx-auto">
        <div className="aspect-[4/3] bg-[var(--matte-black)] rounded-2xl animate-pulse border border-[var(--bold-red)]/20"></div>
      </div>
    );
  }

  if (activeImages.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto text-center py-20">
        <div className="aspect-[4/3] bg-[var(--matte-black)] rounded-2xl flex items-center justify-center border border-[var(--bold-red)]/20">
          <p className="text-[var(--ice-white)]/60">هیچ تصویری موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {/* Gallery Container */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--matte-black)] via-gray-900 to-[var(--matte-black)] shadow-2xl border border-[var(--bold-red)]/30"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        style={{
          boxShadow: `
            0 0 50px rgba(220, 38, 38, 0.3),
            0 0 100px rgba(220, 38, 38, 0.1),
            inset 0 0 50px rgba(220, 38, 38, 0.05)
          `
        }}
      >
        {/* Neon Red Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--bold-red)] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--bold-red)] to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--bold-red)] to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--bold-red)] to-transparent"></div>

        {/* Main Gallery Display */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-out h-full"
            style={{ transform: `translateX(${currentIndex * -100}%)` }}
          >
            {activeImages.map((image, index) => (
              <div key={image.id} className="min-w-full h-full relative flex items-center justify-center p-8">
                {/* Spotlight Effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `
                      radial-gradient(circle at center, 
                        rgba(220, 38, 38, 0.4) 0%, 
                        rgba(220, 38, 38, 0.2) 40%, 
                        transparent 70%
                      )
                    `
                  }}
                ></div>

                {/* T-Shirt Image with Frame */}
                <div className="relative max-w-md w-full">
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-[var(--ice-white)] shadow-2xl"
                    style={{
                      boxShadow: `
                        0 0 30px rgba(220, 38, 38, 0.5),
                        0 20px 40px rgba(0, 0, 0, 0.3),
                        inset 0 0 20px rgba(220, 38, 38, 0.1)
                      `
                    }}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.alt || `تی‌شرت ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                    
                    {/* Neon Frame */}
                    <div className="absolute inset-0 border-2 border-[var(--bold-red)]/50 rounded-2xl pointer-events-none"></div>
                  </div>

                  {/* Image Info */}
                  {image.alt && (
                    <div className="absolute -bottom-12 left-0 right-0 text-center">
                      <h3 className="text-[var(--ice-white)] text-xl font-bold drop-shadow-lg neon-text">
                        {image.alt}
                      </h3>
                    </div>
                  )}
                </div>

                {/* Floating Red Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-[var(--bold-red)] rounded-full opacity-60 animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                        boxShadow: `0 0 10px rgba(220, 38, 38, 0.8)`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {activeImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--matte-black)]/80 backdrop-blur-sm hover:bg-[var(--bold-red)]/20 border border-[var(--bold-red)]/40 text-[var(--ice-white)] hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110 neon-glow"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--matte-black)]/80 backdrop-blur-sm hover:bg-[var(--bold-red)]/20 border border-[var(--bold-red)]/40 text-[var(--ice-white)] hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110 neon-glow"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Gallery Dots Indicator */}
      {activeImages.length > 1 && (
        <div className="flex justify-center mt-8 space-x-reverse space-x-4">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[var(--bold-red)] scale-125 neon-glow'
                  : 'bg-[var(--ice-white)]/30 hover:bg-[var(--ice-white)]/50'
              }`}
              style={index === currentIndex ? {
                boxShadow: `0 0 15px rgba(220, 38, 38, 0.8)`
              } : {}}
            />
          ))}
        </div>
      )}

      {/* Gallery Info */}
      <div className="text-center mt-8">
        <p className="text-[var(--ice-white)]/60 text-lg">
          {activeImages.length > 1 && (
            <>
              <span className="text-[var(--bold-red)] font-bold neon-text">{currentIndex + 1}</span>
              {" از "}
              <span className="text-[var(--ice-white)]">{activeImages.length}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}