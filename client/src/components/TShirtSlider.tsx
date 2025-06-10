import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TShirtSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: images = [] } = useQuery<TshirtImage[]>({
    queryKey: ["/api/tshirt-images"],
  });

  const totalSlides = images.length;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play functionality
  useEffect(() => {
    if (totalSlides === 0) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  if (images.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mb-16">
        <div className="slider-container rounded-2xl shadow-2xl bg-white overflow-hidden h-96 flex items-center justify-center">
          <p className="text-gray-500">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="slider-container rounded-2xl shadow-2xl bg-white overflow-hidden relative group">
        <div 
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image) => (
            <div key={image.id} className="slider-item">
              <img
                src={image.imageUrl}
                alt={image.alt}
                className="w-full h-96 object-cover"
                loading={image.id === images[0]?.id ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--matte-black)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[var(--matte-black)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
