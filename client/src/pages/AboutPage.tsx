import PremiumHeader from "@/components/PremiumHeader";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { AboutContent } from "@shared/schema";

interface AboutPageProps {
  onNavigate: (section: 'home' | 'about') => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { data: aboutContent } = useQuery<AboutContent>({
    queryKey: ["/api/about-content"],
  });
  return (
    <div className="min-h-screen bg-[var(--matte-black)]">
      <PremiumHeader onNavigate={onNavigate} currentSection="about" />
      
      {/* About & Contact Section */}
      <main className="min-h-screen pt-20">
        <section className="py-20 bg-[var(--matte-black)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[var(--ice-white)] mb-6 neon-text">
                  {aboutContent?.title || "درباره تک پوش خاص"}
                </h2>
                <p className="text-lg text-[var(--ice-white)]/80">
                  {aboutContent?.subtitle || "ما برندی هستیم که در خلق پوشاک منحصر به فرد تخصص داریم"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6 p-6 rounded-xl bg-gray-900/50 border border-[var(--bold-red)]/20">
                  <h3 className="text-2xl font-bold text-[var(--bold-red)] neon-text">
                    {aboutContent?.philosophyTitle || "فلسفه ما"}
                  </h3>
                  <p className="text-[var(--ice-white)] leading-relaxed">
                    {aboutContent?.philosophyText1 || "در تک پوش خاص، ما معتقدیم که هر فرد منحصر به فرد است و پوشاک او نیز باید این منحصر به فرد بودن را منعکس کند."}
                  </p>
                  <p className="text-[var(--ice-white)] leading-relaxed">
                    {aboutContent?.philosophyText2 || "شعار ما \"یک از یک\" نشان‌دهنده تعهد ما به ارائه محصولاتی است که در هیچ جای دیگری پیدا نخواهید کرد."}
                  </p>
                </div>
                <div className="space-y-6 p-6 rounded-xl bg-gray-900/50 border border-[var(--bold-red)]/20">
                  <h3 className="text-2xl font-bold text-[var(--bold-red)] neon-text">
                    {aboutContent?.contactTitle || "تماس با ما"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--bold-red)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <span className="text-[var(--ice-white)]">{aboutContent?.contactEmail || "info@tekpooshkhaas.com"}</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--bold-red)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                      </div>
                      <span className="text-[var(--ice-white)]">{aboutContent?.contactPhone || "۰۹۱۲۳۴۵۶۷۸۹"}</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--bold-red)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-[var(--ice-white)]">{aboutContent?.contactAddress || "تهران، ایران"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
