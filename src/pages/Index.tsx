import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import { Navigate, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";

const Index = () => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-40 h-10 flex items-center justify-center">
              <Logo size="lg" />
            </div>
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
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;