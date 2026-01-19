import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Logo from "@/components/Logo";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Balancing Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat animate-scale-balance"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-glow-pulse delay-1000 opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Logo with Tagline */}
          <div className="animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <Logo size="lg" showTagline={true} className="justify-center mx-auto" />
          </div>

          {/* Main Heading - Updated */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mt-8 mb-8 leading-tight animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            Legal Salahkaar{" "}
            <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
              Aap k saath
            </span>
          </h1>

          {/* Subtitle - Updated */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed animate-reveal-up" style={{ animationDelay: '0.5s' }}>
            Confused about a legal issue? Get expert legal advice and connect with the right advocate for your case, quickly and confidentially.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-reveal-up" style={{ animationDelay: '0.7s' }}>
            <Button variant="hero" size="xl">
              Schedule Consultation
            </Button>
            <Button variant="heroOutline" size="xl">
              Explore Our Expertise
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.9s' }}>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2 font-body">Years Experience</div>
            </div>
            <div className="text-center border-x border-border animate-scale-in" style={{ animationDelay: '1.1s' }}>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2 font-body">Success Rate</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '1.3s' }}>
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2 font-body">Cases Won</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown size={28} />
      </a>
    </section>
  );
};

export default Hero;