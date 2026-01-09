import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LawyerProfileSummary from '@/components/lawyer/LawyerProfileSummary';
import LawyerDetailsForm from '@/components/lawyer/LawyerDetailsForm';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar'; 

const LawyerDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
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

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Lawyer Dashboard
          </h1>
          <Button variant="outline" onClick={signOut} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          {isEditing ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => setIsEditing(false)} 
                className="mb-6 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Summary
              </Button>
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