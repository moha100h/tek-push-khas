import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import { Menu, X, User, LogOut, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface AuthControlsProps {
  onShowAdmin: () => void;
}

function AuthControls({ onShowAdmin }: AuthControlsProps) {
  const { user, logoutMutation } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  // Only show admin controls if user is logged in
  if (!user) {
    return null; // Hide login button completely
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowAdmin}
        className="p-2 text-[var(--text-gray)] hover:text-[var(--primary-red)] transition-colors hover:bg-[var(--light-gray)] rounded-xl"
        title="پنل مدیریت"
      >
        <Settings className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="p-2 text-[var(--text-gray)] hover:text-[var(--primary-red)] transition-colors hover:bg-[var(--light-gray)] rounded-xl"
        title="خروج"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface ModernHeaderProps {
  onNavigate: (section: 'home' | 'about') => void;
  currentSection: 'home' | 'about';
}

export default function ModernHeader({ onNavigate, currentSection }: ModernHeaderProps) {
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
      {/* Modern Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'header-blur shadow-lg' 
          : 'bg-[var(--ice-white)]'
      }`}>
        {/* Top Separator */}
        <div className="red-separator"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4 space-x-reverse fade-in">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary-red)] to-[var(--dark-red)] rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 interactive-scale">
                  {brandSettings?.logoUrl ? (
                    <img 
                      src={brandSettings.logoUrl} 
                      alt="لوگو" 
                      className="w-8 h-8 rounded-xl object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-2xl">ت</span>
                  )}
                </div>
                {/* Sparkle Effect */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-bold red-text">
                  {brandSettings?.name || "تک پوش خاص"}
                </h1>
                <p className="text-sm text-[var(--text-gray)] font-medium">
                  {brandSettings?.slogan || "یک از یک"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-reverse space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`relative px-6 py-3 font-medium rounded-xl transition-all duration-300 ${
                  currentSection === 'home' 
                    ? 'text-[var(--primary-red)] bg-[var(--light-red)] neon-text' 
                    : 'text-[var(--text-black)] hover:text-[var(--primary-red)] hover:bg-[var(--light-gray)]'
                }`}
              >
                خانه
                {currentSection === 'home' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[var(--primary-red)] rounded-full"></div>
                )}
              </button>
              
              <button
                onClick={() => onNavigate('about')}
                className={`relative px-6 py-3 font-medium rounded-xl transition-all duration-300 ${
                  currentSection === 'about' 
                    ? 'text-[var(--primary-red)] bg-[var(--light-red)] neon-text' 
                    : 'text-[var(--text-black)] hover:text-[var(--primary-red)] hover:bg-[var(--light-gray)]'
                }`}
              >
                درباره ما
                {currentSection === 'about' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[var(--primary-red)] rounded-full"></div>
                )}
              </button>
              
              <AuthControls onShowAdmin={() => setShowAdminPanel(true)} />
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-[var(--text-black)] hover:bg-[var(--light-gray)] hover:text-[var(--primary-red)] transition-colors rounded-xl"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-[var(--medium-gray)] slide-up">
              <div className="neon-separator mb-4"></div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-right px-4 py-3 font-medium rounded-xl transition-colors ${
                    currentSection === 'home' 
                      ? 'text-[var(--primary-red)] bg-[var(--light-red)] neon-text' 
                      : 'text-[var(--text-black)] hover:bg-[var(--light-gray)]'
                  }`}
                >
                  خانه
                </button>
                
                <button
                  onClick={() => {
                    onNavigate('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-right px-4 py-3 font-medium rounded-xl transition-colors ${
                    currentSection === 'about' 
                      ? 'text-[var(--primary-red)] bg-[var(--light-red)] neon-text' 
                      : 'text-[var(--text-black)] hover:bg-[var(--light-gray)]'
                  }`}
                >
                  درباره ما
                </button>
                
                <div className="px-4 pt-4 border-t border-[var(--medium-gray)]">
                  <div className="neon-separator mb-4"></div>
                  <AuthControls onShowAdmin={() => {
                    setShowAdminPanel(true);
                    setIsMobileMenuOpen(false);
                  }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Neon Separator */}
        <div className="neon-separator"></div>
      </header>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 z-50">
          {/* Will be implemented separately */}
        </div>
      )}
    </>
  );
}