import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import { Navigate, useLocation } from "react-router-dom";

const Index = () => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded border-2 border-primary flex items-center justify-center animate-pulse">
            <span className="text-primary font-display font-bold text-xl">U</span>
          </div>
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Check for bypass parameter
  const params = new URLSearchParams(location.search);
  const bypassRedirect = params.get('bypass_redirect') === 'true';

  // Show landing page if not authenticated
  if (!user) {
    return <LandingPage />;
  }

  // If authenticated, redirect to dashboard unless bypass is active
  if (user && !bypassRedirect) {
    if (role === 'lawyer') {
      return <Navigate to="/dashboard/lawyer" replace />;
    }
    if (role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  // If authenticated as 'user' or if bypass is active, show main content.
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <PracticeAreas />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;