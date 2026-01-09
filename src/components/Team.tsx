import { Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  {
    name: "Victoria Blackwood",
    role: "Managing Partner",
    specialty: "Corporate Law & Mergers",
    initials: "VB",
    bio: "25+ years leading high-stakes M&A transactions",
  },
  {
    name: "Marcus Steele",
    role: "Senior Partner",
    specialty: "Criminal Defense",
    initials: "MS",
    bio: "Former prosecutor with unmatched courtroom presence",
  },
  {
    name: "Elena Vasquez",
    role: "Partner",
    specialty: "Family Law & Estate Planning",
    initials: "EV",
    bio: "Trusted advisor for generations of prominent families",
  },
  {
    name: "James Crawford",
    role: "Associate",
    specialty: "Civil Litigation",
    initials: "JC",
    bio: "Rising star with a perfect settlement record",
  },
];

const Team = () => {
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
    <section id="team" ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-card to-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-glow-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
            <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">Our Team</span>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            The Minds Behind{" "}
            <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
              Your Defense
            </span>
          </h2>
          <p className="text-muted-foreground text-lg animate-reveal-up" style={{ animationDelay: '0.5s' }}>
            Hand-selected from the most prestigious institutions, our attorneys combine 
            exceptional intellect with unwavering discretion.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 animate-reveal-up' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative bg-gradient-to-b from-card to-noir-medium border border-border/50 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10">
                {/* Avatar Area */}
                <div className="relative h-64 bg-gradient-to-br from-noir-medium via-secondary to-noir-light overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-display text-6xl font-bold transition-all duration-500 ${hoveredIndex === index ? 'text-primary scale-110' : 'text-primary/40'}`}>
                      {member.initials}
                    </span>
                  </div>
                  
                  {/* Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent flex items-end justify-center pb-6 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                        <Linkedin className="w-4 h-4 text-primary hover:text-primary-foreground" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                        <Mail className="w-4 h-4 text-primary hover:text-primary-foreground" />
                      </a>
                    </div>
                  </div>

                  {/* Decorative Circle */}
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-primary/20 transition-all duration-700 ${hoveredIndex === index ? 'scale-150 border-primary/40' : 'scale-100'}`}></div>
                </div>

                {/* Info */}
                <div className="p-6 relative">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-2">{member.specialty}</p>
                  <p className={`text-muted-foreground/70 text-xs italic transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;