import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import ModernHeader from "@/components/ModernHeader";
import ModernFooter from "@/components/ModernFooter";
import ModernTShirtGallery from "@/components/ModernTShirtGallery";
import AboutPage from "@/pages/AboutPage";
import AdminPanel from "@/components/AdminPanel";
import { Sparkles, ChevronDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<'home' | 'about'>('home');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    const galleryElement = document.getElementById('gallery-section');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentSection === 'about') {
    return <AboutPage onNavigate={setCurrentSection} />;
  }

  return (
    <div className="min-h-screen bg-[var(--ice-white)] relative">
      {/* Header */}
      <ModernHeader 
        onNavigate={setCurrentSection} 
        currentSection={currentSection}
      />

      {/* Main Content */}
      <main className="pt-32">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-red)] via-transparent to-[var(--primary-red)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              
              {/* Hero Badge */}
              <div className="fade-in">
                <div className="inline-flex items-center space-x-reverse space-x-2 bg-[var(--pure-white)] border border-[var(--medium-gray)] rounded-full px-6 py-3 shadow-lg">
                  <Sparkles className="w-5 h-5 text-[var(--primary-red)]" />
                  <span className="text-sm font-medium text-[var(--text-black)]">
                    برند منحصر به فرد طراحی تی‌شرت
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-6 slide-up">
                <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-black)] leading-tight">
                  <span className="block">تک پوش</span>
                  <span className="block red-text text-gradient">
                    {brandSettings?.name || "خاص"}
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-[var(--text-gray)] max-w-3xl mx-auto leading-relaxed">
                  {brandSettings?.slogan || "طراحی‌های منحصر به فرد که سبک شما را متفاوت می‌کند"}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 scale-in">
                <Button 
                  onClick={scrollToGallery}
                  className="modern-btn text-lg px-8 py-4 rounded-2xl"
                >
                  مشاهده مجموعه
                  <ChevronDown className="w-5 h-5 mr-3 animate-bounce" />
                </Button>
                
                <Button 
                  onClick={() => setCurrentSection('about')}
                  className="modern-btn-outline text-lg px-8 py-4 rounded-2xl"
                >
                  درباره ما
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[var(--primary-red)]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[var(--primary-red)]/15 to-transparent rounded-full blur-2xl"></div>
        </section>

        {/* Gallery Section */}
        <section id="gallery-section" className="relative py-20">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center space-y-6">
              <div className="fade-in">
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-black)]">
                  مجموعه <span className="red-text">محصولات</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary-red)] to-transparent mx-auto mt-4"></div>
              </div>
              
              <p className="text-lg text-[var(--text-gray)] max-w-2xl mx-auto slide-up">
                هر طراحی داستانی منحصر به فرد دارد که با کیفیت برتر و دقت بالا ساخته شده است
              </p>
            </div>
          </div>

          {/* Gallery Component */}
          <div className="scale-in">
            <ModernTShirtGallery />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-[var(--ice-white)] to-[var(--soft-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="text-center space-y-4 fade-in">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">طراحی منحصر به فرد</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  هر تی‌شرت با دقت و هنر طراحی شده تا سبک شما را متمایز کند
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center space-y-4 slide-up">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">★</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">کیفیت پریمیوم</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  از بهترین مواد اولیه و روش‌های چاپ مدرن استفاده می‌کنیم
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center space-y-4 scale-in">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">❤</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">ساخت با عشق</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  هر محصول با دقت و عشق ساخته می‌شود تا شما راضی باشید
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <ModernFooter />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-40 p-4 bg-[var(--primary-red)] text-white rounded-full shadow-xl hover:bg-[var(--dark-red)] transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}