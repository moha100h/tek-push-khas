import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import PremiumHeader from "@/components/PremiumHeader";
import Footer from "@/components/Footer";
import PremiumTShirtSlider from "@/components/PremiumTShirtSlider";
import AboutPage from "./AboutPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Palette, Gem, Star, ArrowDown, Sparkles } from "lucide-react";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<'home' | 'about'>('home');

  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  const handleNavigate = (section: 'home' | 'about') => {
    setCurrentSection(section);
  };

  if (currentSection === 'about') {
    return <AboutPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ice-white)] via-[var(--soft-gray)] to-white">
      <PremiumHeader 
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />
      
      <main className="relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--bold-red)]/5 rounded-full blur-3xl float"></div>
          <div className="absolute top-60 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative text-center pt-24 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-6 text-[var(--bold-red)] border-[var(--bold-red)]/30 bg-[var(--bold-red)]/5 scale-in">
              <Sparkles className="w-3 h-3 mr-1" />
              کلکسیون ویژه ۱۴۰۳
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 fade-in">
              به دنیای{" "}
              <span className="gradient-text relative">
                {brandSettings?.name || "تک پوش خاص"}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--bold-red)] to-transparent rounded-full"></div>
              </span>{" "}
              خوش آمدید
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--matte-black)]/70 max-w-4xl mx-auto mb-12 slide-up">
              {brandSettings?.slogan || "طراحی‌های منحصر به فرد، کیفیت بی‌نظیر و تولید محدود برای افرادی که متفاوت بودن را دوست دارند"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-reverse sm:space-x-6 scale-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[var(--bold-red)] to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Crown className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                مشاهده کلکسیون
                <Sparkles className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleNavigate('about')}
                className="border-[var(--matte-black)]/20 hover:border-[var(--bold-red)] hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-105"
              >
                درباره برند
              </Button>
            </div>

            <div className="mt-16 animate-bounce">
              <ArrowDown className="w-6 h-6 text-[var(--matte-black)]/40 mx-auto" />
            </div>
          </div>
        </section>

        {/* T-Shirt Slider */}
        <section className="px-4 py-16">
          <PremiumTShirtSlider />
        </section>

        {/* Premium Features Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-[var(--bold-red)] border-[var(--bold-red)]/30 bg-[var(--bold-red)]/5">
                ویژگی‌های منحصر به فرد
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                چرا تک پوش خاص؟
              </h2>
              <p className="text-xl text-[var(--matte-black)]/70 max-w-3xl mx-auto">
                تجربه‌ای متفاوت از پوشیدن، با کیفیتی که حس می‌شود
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-8 glass-card rounded-2xl hover-lift glow-red">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[var(--bold-red)] to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">۱</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[var(--matte-black)] mb-4">
                  طراحی منحصر به فرد
                </h3>
                <p className="text-[var(--matte-black)]/70 leading-relaxed">
                  هر طراحی با دقت، عشق و خلاقیت بی‌نظیر خلق می‌شود تا شخصیت منحصر به فرد شما را منعکس کند
                </p>
                <div className="mt-6 flex justify-center space-x-reverse space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ))}
                </div>
              </div>
              
              <div className="group text-center p-8 glass-card rounded-2xl hover-lift glow-red">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Gem className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">۲</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[var(--matte-black)] mb-4">
                  کیفیت پریمیوم
                </h3>
                <p className="text-[var(--matte-black)]/70 leading-relaxed">
                  از بهترین مواد اولیه و فناوری‌های روز دنیا استفاده می‌کنیم تا تجربه‌ای فراموش‌نشدنی داشته باشید
                </p>
                <div className="mt-6 flex justify-center space-x-reverse space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ))}
                </div>
              </div>
              
              <div className="group text-center p-8 glass-card rounded-2xl hover-lift glow-red">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">۳</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[var(--matte-black)] mb-4">
                  تولید محدود
                </h3>
                <p className="text-[var(--matte-black)]/70 leading-relaxed">
                  هر طراحی در تعداد بسیار محدود تولید می‌شود تا انحصار و ارزش آن حفظ شود
                </p>
                <div className="mt-6 flex justify-center space-x-reverse space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl">
              <h2 className="text-4xl font-bold gradient-text mb-6">
                آماده برای متفاوت بودن؟
              </h2>
              <p className="text-xl text-[var(--matte-black)]/70 mb-8">
                به خانواده تک پوش خاص بپیوندید و تجربه‌ای منحصر به فرد داشته باشید
              </p>
              <Button 
                size="lg"
                onClick={() => handleNavigate('about')}
                className="bg-gradient-to-r from-[var(--bold-red)] to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                شروع سفر
                <Crown className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
