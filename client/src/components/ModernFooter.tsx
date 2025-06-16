import { useQuery } from "@tanstack/react-query";
import { SocialLink, CopyrightSettings } from "@shared/schema";
import { Instagram, MessageCircle, Music, Youtube, Heart } from "lucide-react";

const socialIcons = {
  instagram: Instagram,
  telegram: MessageCircle,
  tiktok: Music,
  youtube: Youtube,
};

const socialTooltips = {
  instagram: "پیج اینستاگرام ما",
  telegram: "کانال تلگرامی ما", 
  tiktok: "پیج تیک تاک ما",
  youtube: "کانال یوتیوب ما",
};

export default function ModernFooter() {
  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: copyrightSettings } = useQuery<CopyrightSettings>({
    queryKey: ["/api/copyright-settings"],
  });

  return (
    <footer className="bg-[var(--ice-white)] border-t border-[var(--medium-gray)] mt-20">
      {/* Top Separator */}
      <div className="red-separator"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          
          {/* Brand Section */}
          <div className="space-y-4 fade-in">
            <h3 className="text-2xl font-bold red-text">
              تک پوش خاص
            </h3>
            <p className="text-[var(--text-gray)] max-w-md mx-auto leading-relaxed">
              برند منحصر به فرد طراحی تی‌شرت که سبک شما را متفاوت می‌کند
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center items-center space-x-reverse space-x-8 slide-up">
            {socialLinks?.map((link) => {
              const IconComponent = socialIcons[link.platform as keyof typeof socialIcons];
              if (!IconComponent || !link.url) return null;
              
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={socialTooltips[link.platform as keyof typeof socialTooltips]}
                  className="group relative p-4 bg-[var(--pure-white)] rounded-2xl border border-[var(--medium-gray)] shadow-lg hover:shadow-xl transition-all duration-300 interactive-scale hover:border-[var(--primary-red)]/30"
                >
                  <IconComponent className="h-6 w-6 text-[var(--text-gray)] group-hover:text-[var(--primary-red)] transition-colors duration-300" />
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-red)]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="max-w-xs mx-auto">
            <div className="red-separator"></div>
          </div>

          {/* Copyright & Credits */}
          <div className="space-y-4 scale-in">
            <p className="text-[var(--text-gray)] text-sm">
              {copyrightSettings?.text || "© ۱۴۰۳ تک پوش خاص. تمامی حقوق محفوظ است."}
            </p>
            
            <div className="flex items-center justify-center space-x-reverse space-x-2 text-sm text-[var(--text-gray)]">
              <span>ساخته شده با</span>
              <Heart className="h-4 w-4 text-[var(--primary-red)] fill-current" />
              <span>برای مد و سبک</span>
            </div>
          </div>

          {/* Tech Badge */}
          <div className="pt-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[var(--light-gray)] to-[var(--soft-gray)] rounded-full border border-[var(--medium-gray)]">
              <span className="text-xs text-[var(--text-gray)] font-medium">
                پلتفرم مدرن تجارت الکترونیک
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Separator */}
      <div className="red-separator"></div>
    </footer>
  );
}