import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PremiumTShirtSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const { data: images = [], isLoading } = useQuery<TshirtImage[]>({
    queryKey: ["/api/tshirt-images"],
  });

  const totalSlides = images.length;

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const resetSlider = () => {
    setCurrentSlide(0);
    setIsPlaying(true);
  };

  // Auto-play functionality with enhanced control
  useEffect(() => {
    if (!isPlaying || totalSlides === 0) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mb-20">
        <div className="slider-container h-96 flex items-center justify-center glass-card animate-pulse">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--bold-red)] border-t-transparent mx-auto"></div>
            <p className="text-[var(--matte-black)]/70 font-medium">در حال بارگذاری کلکسیون...</p>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mb-20">
        <div className="slider-container h-96 flex items-center justify-center glass-card">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--bold-red)]/20 to-[var(--bold-red)]/10 rounded-full flex items-center justify-center mx-auto">
              <RotateCcw className="w-12 h-12 text-[var(--bold-red)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--matte-black)] mb-2">
                کلکسیون در حال آماده‌سازی
              </h3>
              <p className="text-[var(--matte-black)]/70">
                طراحی‌های جدید به زودی اضافه می‌شوند
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mb-20 fade-in">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 text-[var(--bold-red)] border-[var(--bold-red)]/30 bg-[var(--bold-red)]/5">
          کلکسیون ویژه
        </Badge>
        <h2 className="text-4xl font-bold gradient-text mb-4">
          آخرین طراحی‌های تک پوش خاص
        </h2>
        <p className="text-[var(--matte-black)]/70 text-lg max-w-2xl mx-auto">
          هر طراحی داستانی منحصر به فرد دارد، با کیفیت پریمیوم و تولید محدود
        </p>
      </div>

      {/* Main Slider */}
      <div className="slider-container group relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--bold-red) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div 
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="slider-item">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Image Info */}
                <div className="absolute bottom-6 right-6 left-6">
                  <div className="glass-card p-4 rounded-xl">
                    <h3 className="text-lg font-bold text-[var(--matte-black)] mb-1">
                      {image.alt}
                    </h3>
                    <p className="text-sm text-[var(--matte-black)]/70">
                      طراحی شماره {index + 1} از {totalSlides}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="lg"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6 text-[var(--matte-black)]" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6 text-[var(--matte-black)]" />
        </Button>

        {/* Play/Pause Control */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 left-4 glass-card opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-[var(--matte-black)]" />
          ) : (
            <Play className="h-4 w-4 text-[var(--matte-black)]" />
          )}
        </Button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
          <div 
            className="h-full bg-gradient-to-r from-[var(--bold-red)] to-red-600 transition-all duration-1000"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-reverse space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[var(--bold-red)] shadow-lg scale-125' 
                : 'bg-[var(--matte-black)]/20 hover:bg-[var(--matte-black)]/40'
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-[var(--bold-red)] animate-ping opacity-75"></div>
            )}
          </button>
        ))}
      </div>

      {/* Slider Stats */}
      <div className="flex justify-center mt-6 space-x-reverse space-x-8 text-sm text-[var(--matte-black)]/60">
        <span>تصویر {currentSlide + 1} از {totalSlides}</span>
        <span>•</span>
        <span>{isPlaying ? 'در حال پخش خودکار' : 'متوقف شده'}</span>
      </div>
    </div>
  );
}