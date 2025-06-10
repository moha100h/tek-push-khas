import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import PremiumHeader from "@/components/PremiumHeader";
import Footer from "@/components/Footer";
import MinimalTShirtSlider from "@/components/MinimalTShirtSlider";
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
    <div className="min-h-screen bg-[var(--ice-white)]">
      <PremiumHeader 
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />
      
      <main className="relative">{/* Minimal Background */}

        {/* Minimal Hero Section */}
        <section className="relative text-center pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo & Brand */}
            <div className="mb-16 fade-in">
              <div className="flex justify-center items-center space-x-reverse space-x-6 mb-8">
                <div className="w-20 h-20 bg-[var(--matte-black)] rounded-3xl flex items-center justify-center shadow-2xl">
                  {brandSettings?.logoUrl ? (
                    <img 
                      src={brandSettings.logoUrl} 
                      alt="لوگو" 
                      className="w-12 h-12 rounded-2xl object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-3xl">ت</span>
                  )}
                </div>
                <div className="text-right">
                  <h1 className="text-4xl md:text-5xl font-bold text-[var(--matte-black)] mb-2">
                    {brandSettings?.name || "تک پوش خاص"}
                  </h1>
                  <p className="text-xl text-[var(--bold-red)] font-medium">
                    {brandSettings?.slogan || "یک از یک"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* T-Shirt Slider */}
        <section className="px-4 py-16">
          <MinimalTShirtSlider />
        </section>


      </main>

      <Footer />
    </div>
  );
}
