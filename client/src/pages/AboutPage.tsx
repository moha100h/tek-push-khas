import { useQuery } from "@tanstack/react-query";
import { AboutContent } from "@shared/schema";
import ModernHeader from "@/components/ModernHeader";
import ModernFooter from "@/components/ModernFooter";
import { Heart, Star, Users, Award } from "lucide-react";

interface AboutPageProps {
  onNavigate: (section: 'home' | 'about') => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { data: aboutContent } = useQuery<AboutContent>({
    queryKey: ["/api/about-content"],
  });

  return (
    <div className="min-h-screen bg-[var(--ice-white)]">
      {/* Header */}
      <ModernHeader 
        onNavigate={onNavigate} 
        currentSection="about"
      />

      {/* Main Content */}
      <main className="pt-32">
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-red)] via-transparent to-[var(--primary-red)]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              
              {/* Title */}
              <div className="fade-in">
                <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-black)] leading-tight">
                  درباره{" "}
                  <span className="red-text text-gradient">
                    تک پوش خاص
                  </span>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[var(--primary-red)] to-transparent mx-auto mt-6"></div>
              </div>

              {/* Subtitle */}
              <div className="slide-up">
                <h2 className="text-2xl md:text-3xl text-[var(--text-gray)] leading-relaxed">
                  {aboutContent?.subtitle || "داستان ما، هنر و عشق به طراحی"}
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <div className="space-y-8 fade-in">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-[var(--text-black)]">
                    {aboutContent?.title || "داستان تک پوش خاص"}
                  </h3>
                  
                  <div className="space-y-4 text-lg text-[var(--text-gray)] leading-relaxed">
                    <p>
                      {aboutContent?.philosophyText1 || "تک پوش خاص متولد شد از عشق به هنر و طراحی. ما باور داریم که هر فرد منحصر به فرد است و لباسش باید این تمایز را نشان دهد."}
                    </p>
                    <p>
                      {aboutContent?.philosophyText2 || "هر طراحی ما داستانی دارد، هر رنگ معنایی، و هر خط احساسی. ما فقط تی‌شرت نمی‌سازیم، بلکه هویتی خلق می‌کنیم که شما با آن همراه می‌شوید."}
                    </p>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="p-6 bg-[var(--pure-white)] rounded-2xl border border-[var(--medium-gray)] shadow-lg">
                  <h4 className="text-xl font-bold text-[var(--text-black)] mb-4 flex items-center">
                    <Heart className="w-6 h-6 text-[var(--primary-red)] ml-3" />
                    مأموریت ما
                  </h4>
                  <p className="text-[var(--text-gray)] leading-relaxed">
                    {aboutContent?.philosophyTitle || "خلق طراحی‌های منحصر به فرد که شخصیت شما را بیان کند و سبک شما را متمایز سازد."}
                  </p>
                </div>
              </div>

              {/* Visual Content */}
              <div className="scale-in">
                <div className="relative">
                  {/* Main Card */}
                  <div className="modern-card p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[var(--text-black)]">
                        کیفیت پریمیوم
                      </h3>
                      <p className="text-[var(--text-gray)] leading-relaxed">
                        از بهترین مواد اولیه و تکنیک‌های مدرن چاپ استفاده می‌کنیم
                      </p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--primary-red)]/20 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[var(--primary-red)]/15 to-transparent rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-[var(--ice-white)] to-[var(--soft-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold text-[var(--text-black)] mb-6">
                ارزش‌های ما
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary-red)] to-transparent mx-auto"></div>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Value 1 */}
              <div className="text-center space-y-6 slide-up">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">عشق به هنر</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  هر طراحی با عشق و دقت خلق می‌شود تا احساسات شما را بیان کند
                </p>
              </div>

              {/* Value 2 */}
              <div className="text-center space-y-6 scale-in">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">مشتری محوری</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  رضایت شما اولویت اصلی ما است و تلاش می‌کنیم بهترین تجربه را ارائه دهیم
                </p>
              </div>

              {/* Value 3 */}
              <div className="text-center space-y-6 fade-in">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-black)]">تعهد به کیفیت</h3>
                <p className="text-[var(--text-gray)] leading-relaxed">
                  از انتخاب مواد تا تحویل نهایی، کیفیت در تمام مراحل حفظ می‌شود
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              {/* Stat 1 */}
              <div className="text-center space-y-3 fade-in">
                <div className="text-3xl md:text-4xl font-bold red-text">100+</div>
                <p className="text-[var(--text-gray)]">طراحی منحصر به فرد</p>
              </div>

              {/* Stat 2 */}
              <div className="text-center space-y-3 slide-up">
                <div className="text-3xl md:text-4xl font-bold red-text">500+</div>
                <p className="text-[var(--text-gray)]">مشتری راضی</p>
              </div>

              {/* Stat 3 */}
              <div className="text-center space-y-3 scale-in">
                <div className="text-3xl md:text-4xl font-bold red-text">2+</div>
                <p className="text-[var(--text-gray)]">سال تجربه</p>
              </div>

              {/* Stat 4 */}
              <div className="text-center space-y-3 fade-in">
                <div className="text-3xl md:text-4xl font-bold red-text">99%</div>
                <p className="text-[var(--text-gray)]">رضایت مشتریان</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[var(--soft-gray)] to-[var(--ice-white)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-black)] mb-6">
                آماده برای تجربه <span className="red-text">تک پوش خاص</span>؟
              </h2>
              <p className="text-lg text-[var(--text-gray)] mb-8">
                مجموعه منحصر به فرد ما را کشف کنید و سبک خود را پیدا کنید
              </p>
            </div>
            
            <div className="scale-in">
              <button
                onClick={() => onNavigate('home')}
                className="modern-btn text-lg px-8 py-4 rounded-2xl"
              >
                مشاهده مجموعه محصولات
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <ModernFooter />
    </div>
  );
}