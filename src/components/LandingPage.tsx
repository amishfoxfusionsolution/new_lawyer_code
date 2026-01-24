import { useState } from 'react';
import { Shield, Briefcase, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import AnimatedScales from '@/components/AnimatedScales';
import heroBg from '@/assets/auth-bg.jpeg';
import Logo from "@/components/Logo"; // Import Logo component

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements - Moved to root */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-scale-balance"
          style={{ 
            backgroundImage: `url(${heroBg})`,
          }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" />
      </div>
      
      {/* Header - Made transparent */}
      <header className="py-6 px-8 border-b border-primary/10 relative z-20 bg-transparent">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Updated Logo */}
            <div className="w-56 h-14 flex items-center justify-start">
              <Logo size="lg" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={openLogin} className="text-foreground hover:text-primary">
              Login
            </Button>
            <Button variant="hero" onClick={openSignup}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Main content area */}
      <main className="flex-1 flex items-center justify-center relative z-20">
        {/* Subtle background glow - Keeping these for effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-glow-pulse delay-1000" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
              Justice in the{' '}
              <span className="bg-gradient-to-r from-sapphire via-sapphire-light to-sapphire bg-clip-text text-transparent">
                Shadows
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-reveal-up" style={{ animationDelay: '0.3s' }}>
              Where discretion meets excellence. Your most sensitive legal matters deserve the utmost privacy and expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-reveal-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={openSignup}
                className="text-lg px-8 py-6"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={openLogin}
                className="text-lg px-8 py-6 border-primary/30 hover:border-primary"
              >
                Already a Member
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Adding a slight background for separation */}
      <footer className="py-6 px-8 border-t border-primary/10 text-center relative z-20 bg-background/80 backdrop-blur-sm">
        <p className="text-muted-foreground text-sm">
          © 2024 Legal Salahkaar. All rights reserved. Your privacy is our priority.
        </p>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default LandingPage;