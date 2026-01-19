import { Briefcase, Users, Building2, FileText, Gavel, Lock, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const practices = [
  {
    icon: Gavel,
    title: "Criminal Law",
    description: "Bail, FIR, trials, cheque bounce, and criminal complaints.",
    number: "01",
  },
  {
    icon: FileText,
    title: "Civil Law",
    description: "Property disputes, recovery suits, injunctions, contracts, and civil litigation.",
    number: "02",
  },
  {
    icon: Users,
    title: "Family Law",
    description: "Divorce, maintenance, domestic violence, child custody, and matrimonial disputes.",
    number: "03",
  },
  {
    icon: Briefcase,
    title: "Corporate & Business Law",
    description: "Company incorporation, legal notices, contracts, compliance, and business disputes.",
    number: "04",
  },
  {
    icon: Lock,
    title: "Legal Documentation",
    description: "Agreements, deeds, wills, affidavits, and power of attorney.",
    number: "05",
  },
  {
    icon: Building2,
    title: "Supreme Court & High Court",
    description: "SLPs, writ petitions, appeals, and constitutional matters.",
    number: "06",
  },
];

const PracticeAreas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section id="practice" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-primary animate-line-grow"></span>
              <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">Our Services</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Legal{" "}
              <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
                Guidance
              </span>
            </h2>
          </div>
          
          <div className="max-w-xl lg:text-right animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <p className="text-foreground text-lg font-semibold mb-4">
              We offer expert legal guidance across all major practice areas.
            </p>
            <p className="text-muted-foreground text-base mb-4">
              Our network of verified advocates specializes in providing confidential and precise advice, ensuring you are matched with the right professional for your specific legal challenge.
            </p>
            <p className="text-primary font-semibold text-lg">
              Right advice. Right advocate.
            </p>
          </div>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border/30 rounded-lg overflow-hidden">
          {practices.map((practice, index) => (
            <div
              key={practice.title}
              className={`group relative bg-card p-8 lg:p-10 transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0 animate-reveal-up' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
              
              <div className="relative z-10">
                {/* Number */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-display text-4xl font-bold text-border/50 group-hover:text-primary/30 transition-colors duration-500">
                    {practice.number}
                  </span>
                  <div className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-500 ${hoveredIndex === index ? 'bg-primary border-primary rotate-45' : 'bg-transparent'}`}>
                    <ArrowUpRight className={`w-5 h-5 transition-all duration-500 ${hoveredIndex === index ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 ${hoveredIndex === index ? 'bg-primary/20 scale-110' : 'bg-secondary'}`}>
                  <practice.icon className="text-primary w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {practice.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {practice.description}
                </p>
              </div>

              {/* Bottom Line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-sapphire-light transition-all duration-700 ${hoveredIndex === index ? 'w-full' : 'w-0'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;