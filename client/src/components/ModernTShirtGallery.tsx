import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TshirtImage } from "@shared/schema";
import { ChevronLeft, ChevronRight, X, Eye, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailModalProps {
  product: TshirtImage;
  isOpen: boolean;
  onClose: () => void;
}

function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--matte-black)] border border-[var(--bold-red)]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-900/50">
            <img
              src={product.imageUrl}
              alt={product.title || product.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Product Details */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ice-white)] mb-2 neon-text">
                {product.title || product.alt}
              </h3>
              <Badge className="bg-[var(--bold-red)]/20 text-[var(--bold-red)] border-[var(--bold-red)]/30">
                منحصر به فرد
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--ice-white)]/70 text-sm">قیمت:</span>
                <span className="text-xl font-bold text-[var(--bold-red)] neon-text">
                  {product.price || "تماس"} تومان
                </span>
              </div>
              
              <div className="border-t border-gray-700/50 pt-3">
                <p className="text-[var(--ice-white)]/80 text-sm leading-relaxed">
                  {product.description || "طراحی منحصر به فرد تک پوش خاص که سبک شما را متمایز می‌کند."}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4">
              <Button className="w-full bg-[var(--bold-red)] hover:bg-red-700 text-white font-medium">
                <ShoppingBag className="w-4 h-4 mr-2" />
                سفارش محصول
              </Button>
              <Button variant="outline" className="w-full border-[var(--bold-red)]/30 text-[var(--ice-white)] hover:bg-[var(--bold-red)]/10">
                مشاهده جزئیات بیشتر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModernTShirtGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<TshirtImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tshirtImages = [], isLoading } = useQuery<TshirtImage[]>({
    queryKey: ["/api/tshirt-images"],
  });

  // Auto-advance slider
  useEffect(() => {
    if (tshirtImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % tshirtImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [tshirtImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tshirtImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tshirtImages.length) % tshirtImages.length);
  };

  const openProductDetail = (product: TshirtImage) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[var(--bold-red)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tshirtImages.length) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--ice-white)]/60">محصولی برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Gallery Display */}
      <div className="relative bg-gradient-to-br from-gray-900/30 to-black/50 rounded-3xl overflow-hidden border border-[var(--bold-red)]/20 backdrop-blur-sm">
        {/* Main Product Showcase */}
        <div className="relative aspect-[16/10] md:aspect-[16/8]">
          <div className="absolute inset-0">
            <img
              src={tshirtImages[currentIndex]?.imageUrl}
              alt={tshirtImages[currentIndex]?.title || tshirtImages[currentIndex]?.alt}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
          
          {/* Product Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-[var(--bold-red)]/90 text-white border-none px-3 py-1">
                  محدود
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white">
                  جدید
                </Badge>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 neon-text">
                {tshirtImages[currentIndex]?.title || tshirtImages[currentIndex]?.alt}
              </h3>
              
              <p className="text-white/80 text-sm md:text-base mb-4 max-w-lg">
                {tshirtImages[currentIndex]?.description || "طراحی منحصر به فرد از مجموعه تک پوش خاص"}
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-xl md:text-2xl font-bold text-[var(--bold-red)] neon-text">
                  {tshirtImages[currentIndex]?.price || "قیمت تماس"} تومان
                </span>
                
                <Button
                  onClick={() => openProductDetail(tshirtImages[currentIndex])}
                  className="bg-[var(--bold-red)] hover:bg-red-700 text-white px-6"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  مشاهده
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {tshirtImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnail Navigation */}
        {tshirtImages.length > 1 && (
          <div className="p-4 bg-black/30 backdrop-blur-sm border-t border-white/10">
            <div className="flex gap-3 justify-center overflow-x-auto pb-2">
              {tshirtImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-[var(--bold-red)] shadow-lg shadow-[var(--bold-red)]/20 scale-110'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title || image.alt}
                    className="w-full h-full object-cover"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-[var(--bold-red)]/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Progress Indicators */}
        {tshirtImages.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
            {tshirtImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[var(--bold-red)] w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}