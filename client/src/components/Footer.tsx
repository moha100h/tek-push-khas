import { useQuery } from "@tanstack/react-query";
import { SocialLink, CopyrightSettings } from "@shared/schema";
import { Instagram, MessageCircle, Music, Youtube } from "lucide-react";

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

export default function Footer() {
  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: copyrightSettings } = useQuery<CopyrightSettings>({
    queryKey: ["/api/copyright-settings"],
  });

  return (
    <footer className="bg-[var(--matte-black)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Social Media Links */}
          <div className="flex justify-center space-x-reverse space-x-6 mb-8">
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
                  className="text-[var(--ice-white)]/60 hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110 neon-glow"
                >
                  <IconComponent className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          
          {/* Copyright */}
          <p className="text-[var(--ice-white)]/60 text-sm">
            {copyrightSettings?.text || "© ۱۴۰۳ تک پوش خاص. تمامی حقوق محفوظ است."}
          </p>
        </div>
      </div>
    </footer>
  );
}
