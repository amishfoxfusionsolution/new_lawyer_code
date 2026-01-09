import { useState } from 'react';
import { Shield, Briefcase, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import AnimatedScales from '@/components/AnimatedScales';

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 border-b border-primary/10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border-2 border-primary flex items-center justify-center">
              <span className="text-primary font-display font-bold text-lg">U</span>
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-foreground tracking-wide">
                UNSEEN
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Law Firm
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={openLogin} className="text-muted-foreground hover:text-primary">
              Login
            </Button>
            <Button variant="hero" onClick={openSignup}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-glow-pulse delay-1000" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
              <div className="p-6 rounded-full bg-primary/15 border-2 border-primary/30 shadow-sapphire">
                <AnimatedScales size={100} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
              Justice in the{' '}
              <span className="bg-gradient-to-r from-sapphire via-sapphire-light to-sapphire bg-clip-text text-transparent">
                Shadows
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-reveal-up" style={{ animationDelay: '0.5s' }}>
              Where discretion meets excellence. Your most sensitive legal matters deserve the utmost privacy and expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-reveal-up" style={{ animationDelay: '0.7s' }}>
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

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <Shield className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">For Clients</h3>
                <p className="text-muted-foreground text-sm">Access top-tier legal services with complete confidentiality</p>
              </div>
              <div className="p-6 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
                <Briefcase className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">For Lawyers</h3>
                <p className="text-muted-foreground text-sm">Join an elite network of legal professionals</p>
              </div>
              <div className="p-6 rounded-lg bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
                <Users className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Trusted Network</h3>
                <p className="text-muted-foreground text-sm">Connect with verified professionals worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-primary/10 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 Unseen Lawyers. All rights reserved. Your privacy is our priority.
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