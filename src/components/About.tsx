import { Scale, Shield, Award, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Scale,
    title: "Fair Justice",
    description: "Balanced approach to every case with unwavering ethics",
    stat: "100%",
    statLabel: "Ethical Standards",
  },
  {
    icon: Shield,
    title: "Full Protection",
    description: "Your privacy and interests are our top priority",
    stat: "24/7",
    statLabel: "Confidential Support",
  },
  {
    icon: Award,
    title: "Elite Results",
    description: "Proven track record of victories that matter",
    stat: "500+",
    statLabel: "Cases Won",
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-card to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
            <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">About Us</span>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            The Silent Force Behind{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
                Your Victory
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-sapphire-light rounded-full animate-line-grow" style={{ animationDelay: '0.5s' }}></span>
            </span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Text Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-xl text-foreground/90 leading-relaxed mb-8 font-light animate-fade-in-left" style={{ animationDelay: '0.7s' }}>
              Legal Salahkaar helps individuals understand their legal problems before choosing a lawyer. We provide clear, reliable legal guidance in simple language and connect users with the right advocate when needed.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg animate-fade-in-left" style={{ animationDelay: '0.9s' }}>
              Our focus is on clarity, <span className="text-primary font-medium">confidentiality</span>, and <span className="text-primary font-medium">honest advice</span> — without pressure or legal jargon.
              <br/><br/>
              <span className="font-display text-xl font-semibold text-primary">Right advice. Right advocate.</span>
            </p>

            <div className="flex items-center gap-6 animate-fade-in-left" style={{ animationDelay: '1.1s' }}>
              <a href="#contact" className="group inline-flex items-center gap-3 text-primary hover:text-sapphire-light transition-colors">
                <span className="text-lg font-medium">Start Your Case</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <span className="w-px h-8 bg-border"></span>
              <a href="#practice" className="text-muted-foreground hover:text-foreground transition-colors text-lg">
                Our Expertise
              </a>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative animate-scale-in" style={{ animationDelay: '0.7s' }}>
              {/* Main Quote Card */}
              <div className="bg-gradient-to-br from-card via-noir-medium to-card border border-border/50 rounded-lg p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <Scale className="text-primary w-16 h-16 mb-8 opacity-80" />
                  <blockquote className="font-display text-2xl md:text-3xl text-foreground italic leading-relaxed mb-6">
                    "In silence, we find strength.<br/>In shadows, we find truth."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-primary"></div>
                    <p className="text-primary uppercase tracking-[0.2em] text-sm">Founding Philosophy</p>
                  </div>
                </div>
              </div>

              {/* Floating Decoration */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-lg animate-float delay-500"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 border border-primary/20 rounded-full animate-float"></div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-gradient-to-b from-card to-background border border-border/50 rounded-lg p-8 hover:border-primary/40 transition-all duration-500 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0 animate-reveal-up' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="text-primary w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl font-bold text-primary">{feature.stat}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{feature.statLabel}</div>
                  </div>
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-sapphire-light group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;