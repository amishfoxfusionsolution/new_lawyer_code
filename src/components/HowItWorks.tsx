import { Briefcase, Lightbulb, MessageSquare, CheckCircle, Lock, FileText, Globe, Scale } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: MessageSquare, title: "Share Your Legal Issue", description: "Confidential submission of your matter details." },
  { icon: Lightbulb, title: "Get Expert Guidance", description: "Receive clear, initial legal direction from our team." },
  { icon: Briefcase, title: "Connect with the Right Advocate", description: "We match you with a verified, specialized lawyer." },
];

const features = [
  { icon: CheckCircle, label: "Verified Advocates" },
  { icon: Lock, label: "Confidential Consultations" },
  { icon: FileText, label: "Case-Specific Guidance" },
  { icon: Globe, label: "Pan-India Support" },
];

const HowItWorks = () => {
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
    <section id="how-it-works" ref={sectionRef} className="py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* How It Works Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
            <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">Process</span>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </div>

        {/* How It Works Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "relative p-8 rounded-lg border border-border/50 bg-background transition-all duration-700 group",
                isVisible ? 'opacity-100 translate-y-0 animate-reveal-up' : 'opacity-0 translate-y-10'
              )}
              style={{ animationDelay: `${500 + index * 150}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <span className="font-display text-5xl font-bold text-primary/20 mr-4">{index + 1}</span>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Legal Salahkaar & Disclaimer */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Why Legal Salahkaar */}
          <div className={`p-8 bg-noir-medium rounded-lg border border-border/50 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="font-display text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Scale className="w-6 h-6 text-gold" />
              Why Legal Salahkaar
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-lg text-foreground">
                  <feature.icon className="w-5 h-5 text-primary shrink-0" />
                  {feature.label}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-xl font-semibold text-primary">
              Right advice. Right advocate.
            </p>
          </div>

          {/* Right: Disclaimer */}
          <div className={`p-8 bg-background rounded-lg border border-border/50 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="font-display text-2xl font-semibold text-destructive mb-4">
              Disclaimer
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Legal Salahkaar is a legal facilitation platform. Legal services are provided by independent advocates. 
              Information on this website does not constitute legal advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;