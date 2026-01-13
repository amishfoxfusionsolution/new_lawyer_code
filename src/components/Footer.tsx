import { Scale, ArrowUp, Linkedin, Twitter } from "lucide-react";
import logoMark from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-noir-light border-t border-border/50 relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={scrollToTop}>
              {/* Updated Logo */}
              <div className="w-48 h-12 flex items-center justify-start">
                <img src={logoMark} alt="Legal Salahkaar Logo" className="h-full w-auto object-contain" />
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Elite legal representation for those who value discretion. 
              Operating in the shadows to bring justice to light.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-primary"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["About", "Practice Areas", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-primary"></span>
              Practice Areas
            </h4>
            <ul className="space-y-4">
              {["Corporate Law", "Criminal Defense", "Family Law", "Civil Litigation", "Privacy & Data"].map((area) => (
                <li key={area}>
                  <a
                    href="#practice"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-primary"></span>
              Contact
            </h4>
            <div className="space-y-4 text-muted-foreground">
              <p className="hover:text-primary transition-colors cursor-pointer">
                +1 (555) SALAHKAAR-1
              </p>
              <p className="hover:text-primary transition-colors cursor-pointer">
                consult@legalsalahkaar.com
              </p>
              <p>
                Private Office<br />
                Available Upon Request
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Legal Salahkaar. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Disclaimer
            </a>
          </div>
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="font-display text-[15vw] font-bold text-border/5 leading-none tracking-tighter whitespace-nowrap translate-y-1/4">
          LEGAL SALAHKAAR
        </div>
      </div>
    </footer>
  );
};

export default Footer;