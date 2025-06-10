import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TShirtSlider from "@/components/TShirtSlider";
import AboutPage from "./AboutPage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-[var(--off-white)]">
      <Header onNavigate={handleNavigate} currentSection={currentSection} />
      
      {/* Homepage Content */}
      <main className="min-h-screen">
        <section className="py-20 fade-in">
          <div className="container mx-auto px-4 text-center">
            
            {/* Hero Content */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-[var(--matte-black)] mb-6">
                {brandSettings?.slogan || "یک از یک"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                مجموعه‌ای منحصر به فرد از تی‌شرت‌های طراحی شده که هر کدام تنها در یک نسخه تولید می‌شود
              </p>
            </div>

            {/* T-Shirt Slider */}
            <TShirtSlider />

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-gray-600 mb-8">
                هر طرح تنها در یک نسخه موجود است. زودتر اقدام کنید!
              </p>
              <Button
                onClick={() => handleNavigate('about')}
                className="inline-flex items-center px-8 py-4 bg-[var(--bold-red)] hover:bg-red-700 text-white rounded-full transition-colors duration-300 hover-lift"
              >
                <span>بیشتر بدانید</span>
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
