import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-primary uppercase tracking-[0.4em] text-sm mb-6 animate-fade-in font-body">
            Justice in the Shadows
          </p>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight animate-fade-in">
            Where{" "}
            <span className="bg-gradient-to-r from-primary to-gold-light bg-clip-text text-transparent">
              Discretion
            </span>{" "}
            Meets{" "}
            <span className="bg-gradient-to-r from-gold-light to-primary bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed animate-fade-in-delayed">
            Elite legal representation for those who value privacy, precision, and unwavering dedication 
            to protecting what matters most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed-2">
            <Button variant="hero" size="xl">
              Schedule Consultation
            </Button>
            <Button variant="heroOutline" size="xl">
              Explore Our Expertise
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto animate-fade-in-delayed-3">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2 font-body">Years Experience</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider mt-2 font-body">Success Rate</div>
            </div>
            <div className="text-center">
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
