import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "When my corporation faced its darkest hour, Legal Salahkaar emerged from the shadows and orchestrated a victory that saved everything we had built. Their discretion was unmatched.",
    author: "Anonymous CEO",
    company: "Fortune 500 Company",
    rating: 5,
  },
  {
    quote: "In a case where my reputation and freedom hung in the balance, they moved with precision and secrecy. The outcome exceeded every expectation.",
    author: "Private Client",
    company: "High-Profile Case",
    rating: 5,
  },
  {
    quote: "They understood that some matters require not just legal expertise, but absolute confidentiality. Legal Salahkaar delivered both flawlessly.",
    author: "Family Office Representative",
    company: "Estate Matter",
    rating: 5,
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Large Quote Mark Background */}
      <div className="absolute top-20 left-10 opacity-[0.03]">
        <Quote className="w-96 h-96 text-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
            <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">Testimonials</span>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            Words From{" "}
            <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
              The Shadows
            </span>
          </h2>
          <p className="text-muted-foreground text-lg animate-reveal-up" style={{ animationDelay: '0.5s' }}>
            Our clients speak only in whispers, but their gratitude echoes loudly.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 animate-scale-in' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-br from-card via-card to-noir-medium border border-border/50 rounded-lg p-10 md:p-16 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-glow-pulse">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Testimonial Content */}
              <div className="min-h-[120px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute'}`}
                  >
                    <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-relaxed italic mb-8">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                        <span className="text-primary font-display font-bold">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className="absolute bottom-4 right-4 w-full h-full border-b-2 border-r-2 border-primary/20 rounded-br-lg"></div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-500 rounded-full ${activeIndex === index ? 'w-10 h-3 bg-primary' : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
            />
          ))}
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0 animate-reveal-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center p-6 border-r border-border/50 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 border-r border-border/50 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="text-center p-6 animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wider">Years Trusted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;