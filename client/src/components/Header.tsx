import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrandSettings } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Settings, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import AdminPanel from "./AdminPanel";

function AuthControls({ onShowAdmin }: { onShowAdmin: () => void }) {
  const { isAuthenticated, user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLocation("/auth")}
        className="border-[var(--bold-red)] text-[var(--bold-red)] hover:bg-[var(--bold-red)] hover:text-white transition-all duration-300"
      >
        <LogIn className="h-4 w-4 mr-2" />
        ورود مدیر
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-reverse space-x-3">
      <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600">
        <User className="h-4 w-4" />
        <span>{user?.username}</span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowAdmin}
        className="text-gray-500 hover:text-[var(--bold-red)] transition-colors duration-300"
      >
        <Settings className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        className="text-gray-500 hover:text-red-600 transition-colors duration-300"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface HeaderProps {
  onNavigate: (section: 'home' | 'about') => void;
  currentSection: 'home' | 'about';
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const { data: brandSettings } = useQuery<BrandSettings>({
    queryKey: ["/api/brand-settings"],
  });

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="w-10 h-10 bg-[var(--bold-red)] rounded-full flex items-center justify-center">
                {brandSettings?.logoUrl ? (
                  <img 
                    src={brandSettings.logoUrl} 
                    alt="لوگو" 
                    className="w-8 h-8 rounded-full object-contain"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">ت</span>
                )}
              </div>
              <h1 className="text-xl font-bold text-[var(--matte-black)]">
                {brandSettings?.name || "تک پوش خاص"}
              </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-reverse space-x-6">
              <button
                onClick={() => onNavigate('home')}
                className={`transition-colors duration-300 ${
                  currentSection === 'home' 
                    ? 'text-[var(--bold-red)]' 
                    : 'text-[var(--matte-black)] hover:text-[var(--bold-red)]'
                }`}
              >
                خانه
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`transition-colors duration-300 ${
                  currentSection === 'about' 
                    ? 'text-[var(--bold-red)]' 
                    : 'text-[var(--matte-black)] hover:text-[var(--bold-red)]'
                }`}
              >
                درباره ما
              </button>
              
              {/* Auth Controls */}
              <AuthControls onShowAdmin={() => setShowAdminPanel(true)} />
            </div>
          </nav>
        </div>
      </header>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
}
