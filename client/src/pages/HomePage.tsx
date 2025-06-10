import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import PremiumHeader from "@/components/PremiumHeader";
import Footer from "@/components/Footer";
import ModernTShirtGallery from "@/components/ModernTShirtGallery";
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
    <div className="min-h-screen bg-[var(--matte-black)]">
      <PremiumHeader 
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />
      
      <main className="relative pt-20">
        {/* Professional T-Shirt Slider */}
        <section className="px-4 py-16">
          <ModernTShirtGallery />
        </section>
      </main>

      <Footer />
    </div>
  );
}
