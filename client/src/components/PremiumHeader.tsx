import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, LogIn, LogOut, User, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import AdminPanel from "./AdminPanel";

function AuthControls({ onShowAdmin }: { onShowAdmin: () => void }) {
  const { isAuthenticated, user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center space-x-reverse space-x-3">
      <div className="hidden md:flex items-center space-x-reverse space-x-2">
        <Badge variant="secondary" className="glass-card border-0 text-[var(--matte-black)]/80">
          <User className="h-3 w-3 mr-1" />
          {user?.username}
        </Badge>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowAdmin}
        className="relative p-2 hover:bg-[var(--bold-red)]/10 hover:text-[var(--bold-red)] transition-all duration-300 hover:scale-110 group"
      >
        <Settings className="h-4 w-4 transition-transform group-hover:rotate-90" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--bold-red)] rounded-full animate-pulse"></div>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        className="p-2 text-[var(--matte-black)]/60 hover:text-red-600 transition-all duration-300 hover:scale-110"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface PremiumHeaderProps {
  onNavigate: (section: 'home' | 'about') => void;
  currentSection: 'home' | 'about';
}

export default function PremiumHeader({ onNavigate, currentSection }: PremiumHeaderProps) {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[var(--matte-black)]/95 shadow-lg backdrop-blur-xl border-b border-[var(--bold-red)]/20' 
          : 'bg-[var(--matte-black)]'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-reverse space-x-4 slide-up">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--bold-red)] to-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group">
                  {brandSettings?.logoUrl ? (
                    <img 
                      src={brandSettings.logoUrl} 
                      alt="لوگو" 
                      className="w-8 h-8 rounded-xl object-contain transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl transition-transform group-hover:scale-110">ت</span>
                  )}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-gold)] rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-[var(--ice-white)]">
                  {brandSettings?.name || "تک پوش خاص"}
                </h1>
                <p className="text-sm text-[var(--bold-red)] font-medium neon-text">
                  {brandSettings?.slogan || "یک از یک"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  currentSection === 'home' 
                    ? 'text-[var(--bold-red)] neon-text' 
                    : 'text-[var(--ice-white)] hover:text-[var(--bold-red)]'
                }`}
              >
                خانه
                {currentSection === 'home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--bold-red)] to-red-600 rounded-full neon-glow"></div>
                )}
              </button>
              
              <button
                onClick={() => onNavigate('about')}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  currentSection === 'about' 
                    ? 'text-[var(--bold-red)] neon-text' 
                    : 'text-[var(--ice-white)] hover:text-[var(--bold-red)]'
                }`}
              >
                درباره ما
                {currentSection === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--bold-red)] to-red-600 rounded-full neon-glow"></div>
                )}
              </button>
              
              <AuthControls onShowAdmin={() => setShowAdminPanel(true)} />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--ice-white)] hover:bg-[var(--bold-red)]/20 hover:text-[var(--bold-red)] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-[var(--bold-red)]/20 slide-up">
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-right px-4 py-2 font-medium transition-colors ${
                    currentSection === 'home' 
                      ? 'text-[var(--bold-red)] neon-text' 
                      : 'text-[var(--ice-white)]'
                  }`}
                >
                  خانه
                </button>
                
                <button
                  onClick={() => {
                    onNavigate('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-right px-4 py-2 font-medium transition-colors ${
                    currentSection === 'about' 
                      ? 'text-[var(--bold-red)] neon-text' 
                      : 'text-[var(--ice-white)]'
                  }`}
                >
                  درباره ما
                </button>
                
                <div className="px-4 pt-2 border-t border-[var(--bold-red)]/20">
                  <AuthControls onShowAdmin={() => {
                    setShowAdminPanel(true);
                    setIsMobileMenuOpen(false);
                  }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-[var(--bold-red)] to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-[var(--bold-red)] to-transparent"></div>
      </header>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
}