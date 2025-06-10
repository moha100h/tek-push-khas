import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight, X, ShoppingBag, Tag, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function ProfessionalTShirtSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTshirt, setSelectedTshirt] = useState<TshirtImage | null>(null);

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

  const openTshirtDetails = (tshirt: TshirtImage) => {
    setSelectedTshirt(tshirt);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="aspect-[16/9] bg-gray-800 rounded-2xl animate-pulse border border-[var(--bold-red)]/20"></div>
      </div>
    );
  }

  if (activeImages.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto text-center py-20">
        <div className="aspect-[16/9] bg-gray-800 rounded-2xl flex items-center justify-center border border-[var(--bold-red)]/20">
          <p className="text-[var(--ice-white)]/60">هیچ تصویری موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto relative">
        {/* Main Slider Container */}
        <div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-[var(--bold-red)]/30"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          style={{
            boxShadow: `
              0 0 30px rgba(220, 38, 38, 0.2),
              0 0 60px rgba(220, 38, 38, 0.1),
              inset 0 0 30px rgba(220, 38, 38, 0.05)
            `
          }}
        >
          {/* Neon Border Effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[var(--bold-red)]/40 pointer-events-none"></div>
          
          {/* Main Image Display */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-out h-full"
              style={{ transform: `translateX(${currentIndex * -100}%)` }}
            >
              {activeImages.map((image, index) => (
                <div key={image.id} className="min-w-full h-full relative flex items-center justify-center p-6">
                  {/* Background Glow */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `
                        radial-gradient(circle at center, 
                          rgba(220, 38, 38, 0.3) 0%, 
                          rgba(220, 38, 38, 0.1) 50%, 
                          transparent 70%
                        )
                      `
                    }}
                  ></div>

                  {/* T-Shirt Image */}
                  <div className="relative max-w-lg w-full cursor-pointer" onClick={() => openTshirtDetails(image)}>
                    <div 
                      className="relative rounded-xl overflow-hidden bg-white shadow-2xl hover:scale-105 transition-all duration-500"
                      style={{
                        boxShadow: `
                          0 0 20px rgba(220, 38, 38, 0.4),
                          0 10px 30px rgba(0, 0, 0, 0.3)
                        `
                      }}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.alt || `تی‌شرت ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[var(--matte-black)]/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <ShoppingBag className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-lg font-bold">مشاهده جزئیات</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="absolute -bottom-4 left-4 right-4">
                      <div className="bg-[var(--matte-black)]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--bold-red)]/30">
                        <h3 className="text-[var(--ice-white)] text-lg font-bold text-center">
                          {image.title || image.alt || `تی‌شرت ${index + 1}`}
                        </h3>
                        {image.price && (
                          <p className="text-[var(--bold-red)] text-center font-bold mt-1 neon-text">
                            {image.price}
                          </p>
                        )}
                      </div>
                    </div>
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
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--matte-black)]/80 backdrop-blur-sm hover:bg-[var(--bold-red)]/20 border border-[var(--bold-red)]/40 text-[var(--ice-white)] hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--matte-black)]/80 backdrop-blur-sm hover:bg-[var(--bold-red)]/20 border border-[var(--bold-red)]/40 text-[var(--ice-white)] hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {activeImages.length > 1 && (
          <div className="flex justify-center mt-6 space-x-reverse space-x-3 px-4 overflow-x-auto">
            {activeImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-[var(--bold-red)] scale-110 shadow-lg'
                    : 'border-gray-600 hover:border-[var(--bold-red)]/50'
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Progress Indicator */}
        {activeImages.length > 1 && (
          <div className="text-center mt-4">
            <span className="text-[var(--bold-red)] font-bold neon-text text-lg">
              {currentIndex + 1}
            </span>
            <span className="text-[var(--ice-white)]/60 mx-2">از</span>
            <span className="text-[var(--ice-white)] font-bold">
              {activeImages.length}
            </span>
          </div>
        )}
      </div>

      {/* T-Shirt Details Modal */}
      <Dialog open={!!selectedTshirt} onOpenChange={() => setSelectedTshirt(null)}>
        <DialogContent className="bg-[var(--matte-black)] border border-[var(--bold-red)]/30 text-[var(--ice-white)] max-w-2xl">
          <DialogTitle className="sr-only">جزئیات تی‌شرت</DialogTitle>
          
          {selectedTshirt && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--ice-white)]">
                  {selectedTshirt.title || selectedTshirt.alt}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTshirt(null)}
                  className="text-[var(--ice-white)] hover:text-[var(--bold-red)]"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Image and Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedTshirt.imageUrl}
                    alt={selectedTshirt.alt}
                    className="w-full aspect-square object-cover rounded-xl border border-[var(--bold-red)]/20"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {selectedTshirt.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--bold-red)] mb-2">توضیحات</h3>
                      <p className="text-[var(--ice-white)]/80 leading-relaxed">
                        {selectedTshirt.description}
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  {selectedTshirt.price && (
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Tag className="w-5 h-5 text-[var(--bold-red)]" />
                      <span className="text-lg font-bold text-[var(--bold-red)] neon-text">
                        {selectedTshirt.price}
                      </span>
                    </div>
                  )}

                  {/* Size */}
                  {selectedTshirt.size && (
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Ruler className="w-5 h-5 text-[var(--bold-red)]" />
                      <span className="text-[var(--ice-white)]">سایز: </span>
                      <Badge variant="outline" className="border-[var(--bold-red)]/30 text-[var(--bold-red)]">
                        {selectedTshirt.size}
                      </Badge>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-[var(--bold-red)] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      سفارش این محصول
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}