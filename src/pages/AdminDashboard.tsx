import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LogOut, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const { user, role, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded border-2 border-primary flex items-center justify-center animate-pulse">
          <span className="text-primary font-display font-bold text-xl">U</span>
        </div>
      </div>
    );
  }

  // Redirect if not logged in or not an admin
  if (!user || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Admin Control Panel
          </h1>
          <Button variant="outline" onClick={signOut} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-card border-gold/20 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-display text-primary">
                Welcome, Administrator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This is the central hub for managing users, lawyers, and system settings.
              </p>
              <p className="text-sm text-foreground/70">
                Current User: {user.email} (Role: {role})
              </p>
              <div className="flex gap-4 pt-4">
                <Button variant="hero">Manage Users</Button>
                <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">System Logs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;