import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LawyerProfileSummary from '@/components/lawyer/LawyerProfileSummary';
import LawyerDetailsForm from '@/components/lawyer/LawyerDetailsForm';
import { LogOut, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar'; 
import { useLawyerProfile } from '@/hooks/useLawyerProfile';

const LawyerDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const { profile, isProfileLoading } = useLawyerProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (loading || isProfileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded border-2 border-primary flex items-center justify-center animate-pulse">
          <span className="text-primary font-display font-bold text-xl">U</span>
        </div>
      </div>
    );
  }

  // Redirect if not logged in or not a lawyer
  if (!user || role !== 'lawyer') {
    return <Navigate to="/" replace />;
  }

  // Determine if we should force the form view (e.g., if profile is loaded but full_name is missing)
  const shouldForceEdit = profile && !profile.full_name;
  const currentViewIsEditing = isEditing || shouldForceEdit;

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Lawyer Dashboard
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'} 
              className="border-gold/30 text-gold hover:bg-gold/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Website
            </Button>
            <Button variant="outline" onClick={signOut} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {currentViewIsEditing ? (
            <>
              {!shouldForceEdit && ( // Only show back button if not forced into editing
                <Button 
                  variant="ghost" 
                  onClick={() => setIsEditing(false)} 
                  className="mb-6 text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Summary
                </Button>
              )}
              <LawyerDetailsForm onSave={() => setIsEditing(false)} />
            </>
          ) : (
            <LawyerProfileSummary onEdit={() => setIsEditing(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;