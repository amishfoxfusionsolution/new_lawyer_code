import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    value: "Private Office, Available Upon Request",
  },
  {
    icon: Phone,
    title: "Secure Line",
    value: "+1 (555) UNSEEN-1",
  },
  {
    icon: Mail,
    title: "Encrypted Email",
    value: "consult@unseenlawyers.com",
  },
  {
    icon: Clock,
    title: "Availability",
    value: "24/7 Emergency Line Available",
  },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [phone, setPhone] = useState("");
  

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
    <section id="contact" ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-card to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-glow-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
            <span className="text-primary uppercase tracking-[0.4em] text-sm font-medium">Contact Us</span>
            <span className="w-12 h-px bg-primary animate-line-grow"></span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
            Begin Your Case{" "}
            <span className="bg-gradient-to-r from-primary to-sapphire-light bg-clip-text text-transparent">
              In Confidence
            </span>
          </h2>
          <p className="text-muted-foreground text-lg animate-reveal-up" style={{ animationDelay: '0.5s' }}>
            Every conversation is protected by attorney-client privilege. Reach out through 
            your preferred secure channel.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Contact Info */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-5 p-5 bg-card/50 border border-border/30 rounded-lg hover:border-primary/30 hover:bg-card transition-all duration-500 animate-fade-in-left"
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <item.icon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-10 p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg animate-scale-in" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-glow-pulse">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground">Protected Communication</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All inquiries are encrypted and protected by attorney-client privilege. 
                Your information will never be shared without your explicit consent.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-card border border-border/50 rounded-lg p-8 lg:p-10 relative overflow-hidden animate-fade-in-right" style={{ animationDelay: '0.7s' }}>
              {/* Form Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
              
              <form className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="firstName" className={`absolute left-4 transition-all duration-300 ${focusedField === 'firstName' ? '-top-2.5 text-xs text-primary bg-card px-2' : 'top-3.5 text-muted-foreground'}`}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={(e) => !e.target.value && setFocusedField(null)}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className={`absolute left-4 transition-all duration-300 ${focusedField === 'lastName' ? '-top-2.5 text-xs text-primary bg-card px-2' : 'top-3.5 text-muted-foreground'}`}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={(e) => !e.target.value && setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className={`absolute left-4 transition-all duration-300 ${focusedField === 'email' ? '-top-2.5 text-xs text-primary bg-card px-2' : 'top-3.5 text-muted-foreground'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                    onFocus={() => setFocusedField('email')}
                    onBlur={(e) => !e.target.value && setFocusedField(null)}
                  />
                </div>
                <div className="relative">
  <label
    htmlFor="phone"
    className={`absolute left-4 transition-all duration-300 ${
      focusedField === "phone"
        ? "-top-2.5 text-xs text-primary bg-card px-2"
        : "top-3.5 text-muted-foreground"
    }`}
  >
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
    onFocus={() => setFocusedField("phone")}
    onBlur={(e) => !e.target.value && setFocusedField(null)}
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder=""
  />
</div>


                <div>
                  <label htmlFor="subject" className="block text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Nature of Matter
                  </label>
                  <select
                    id="subject"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                  >
                    <option value="">Select a practice area</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="family">Family Law</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="privacy">Privacy & Data</option>
                    <option value="other">Other / Confidential</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Brief Description
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                    placeholder="Please provide a brief, non-sensitive description of your matter..."
                  ></textarea>
                </div>

                <Button variant="hero" size="xl" className="w-full group">
                  <span>Request Secure Consultation</span>
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>

                <p className="text-center text-muted-foreground text-xs mt-4 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  All communications are protected by attorney-client privilege.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;