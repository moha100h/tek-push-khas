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
      <div className="bg-[var(--matte-black)] border border-[var(--bold-red)]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="grid md:grid-cols-5 gap-0">
          {/* Product Image - Larger */}
          <div className="md:col-span-3 relative bg-gray-900/50 flex items-center justify-center min-h-[500px]">
            <img
              src={product.imageUrl}
              alt={product.title || product.alt}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '600px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
          
          {/* Product Details */}
          <div className="md:col-span-2 p-6 space-y-6 bg-[var(--matte-black)]">
            <div>
              <h3 className="text-2xl font-bold text-[var(--ice-white)] mb-3 neon-text">
                {product.title || product.alt}
              </h3>
              <Badge className="bg-[var(--bold-red)]/20 text-[var(--bold-red)] border-[var(--bold-red)]/30">
                تک پوش خاص
              </Badge>
            </div>
            
            {product.size && (
              <div className="space-y-2">
                <span className="text-[var(--ice-white)]/70 text-sm">سایز:</span>
                <div className="text-[var(--ice-white)] font-medium">{product.size}</div>
              </div>
            )}
            
            <div className="border-t border-gray-700/50 pt-4">
              <span className="text-[var(--ice-white)]/70 text-sm mb-3 block">توضیحات:</span>
              <p className="text-[var(--ice-white)] text-sm leading-relaxed">
                {product.description || "این طراحی منحصر به فرد از مجموعه تک پوش خاص، ترکیبی از هنر مدرن و کیفیت بالا است که سبک منحصر به فرد شما را نمایان می‌کند."}
              </p>
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
      <div className="max-w-6xl mx-auto">
        {/* Grid Layout for T-Shirts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tshirtImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-gray-900/30 rounded-2xl overflow-hidden border border-[var(--bold-red)]/20 backdrop-blur-sm hover:border-[var(--bold-red)]/40 transition-all duration-300 cursor-pointer"
              onClick={() => openProductDetail(image)}
            >
              {/* T-Shirt Image */}
              <div className="relative aspect-[4/5] bg-gray-900/50">
                <img
                  src={image.imageUrl}
                  alt={image.title || image.alt}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 tshirt-image"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                    {image.title || image.alt}
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2">
                    {image.description || "کلیک برای مشاهده جزئیات"}
                  </p>
                </div>
                
                {/* View Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-[var(--bold-red)] rounded-full">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-[var(--ice-white)] font-medium mb-1 line-clamp-1">
                  {image.title || image.alt}
                </h3>
                {image.size && (
                  <p className="text-[var(--ice-white)]/60 text-sm">
                    سایز: {image.size}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {tshirtImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
              <Eye className="w-8 h-8 text-[var(--bold-red)]" />
            </div>
            <h3 className="text-[var(--ice-white)] text-lg font-medium mb-2">
              هنوز طراحی‌ای اضافه نشده
            </h3>
            <p className="text-[var(--ice-white)]/60 text-sm">
              طراحی‌های منحصر به فرد تک پوش خاص به زودی اضافه خواهند شد
            </p>
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