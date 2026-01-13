import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus, LogOut, User, Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoMark from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Practice Areas", href: "#practice" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const roleIcons = {
  user: <User className="w-4 h-4" />,
  lawyer: <Briefcase className="w-4 h-4" />,
  admin: <Shield className="w-4 h-4" />,
};

const roleLabels = {
  user: 'Client',
  lawyer: 'Lawyer',
  admin: 'Admin',
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const { user, role, fullName, signOut, loading } = useAuth();
  
  // Use fullName if available, otherwise fall back to email prefix
  const displayName = fullName || (user?.email?.split('@')[0] || 'Profile');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center group">
              <div className="w-56 h-14 flex items-center justify-start">
                <img src={logoMark} alt="Legal Salahkaar Logo" className="h-full w-auto object-contain" />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {loading ? (
                <div className="w-24 h-10 bg-muted animate-pulse rounded" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-primary/30 hover:border-primary gap-2">
                      {role && roleIcons[role]}
                      <span className="max-w-[120px] truncate">{displayName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-secondary border-primary/20">
                    <DropdownMenuLabel className="text-muted-foreground">
                      {role && (
                        <span className="flex items-center gap-2">
                          {roleIcons[role]}
                          {roleLabels[role]}
                        </span>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/10" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={openLogin} className="text-muted-foreground hover:text-primary">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button variant="hero" onClick={openSignup}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t border-primary/10 pt-4 mt-2 flex flex-col gap-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 text-muted-foreground py-2">
                        {role && roleIcons[role]}
                        <span>{displayName}</span>
                        {role && <span className="text-primary text-xs">({roleLabels[role]})</span>}
                      </div>
                      <Button variant="outline" onClick={handleSignOut} className="border-red-500/30 text-red-400">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" onClick={() => { openLogin(); setIsMobileMenuOpen(false); }} className="justify-start">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                      <Button variant="hero" onClick={() => { openSignup(); setIsMobileMenuOpen(false); }}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Navbar;