import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Shield, Home, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import UserTable from '@/components/admin/UserTable';
import LawyerTable from '@/components/admin/LawyerTable';

const AdminDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const { clients, lawyers, isLoading } = useAdminUsers();

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
          <div className="flex gap-4">
            <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/?bypass_redirect=true">
                <Home className="w-4 h-4 mr-2" />
                Go to Website
              </Link>
            </Button>
            <Button variant="outline" onClick={signOut} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <Tabs defaultValue="lawyers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-noir-medium border border-border/50 rounded-lg h-14 overflow-hidden">
              <TabsTrigger 
                value="lawyers" 
                className="flex items-center gap-2 text-lg h-full py-3 px-4 transition-all duration-300 ease-out
                           text-muted-foreground hover:text-foreground 
                           data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground 
                           data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/50 
                           data-[state=active]:border data-[state=active]:border-primary/50 
                           data-[state=active]:rounded-tr-none data-[state=active]:rounded-br-none rounded-lg"
              >
                <Briefcase className="w-5 h-5" />
                Lawyer Records
              </TabsTrigger>
              <TabsTrigger 
                value="clients" 
                className="flex items-center gap-2 text-lg h-full py-3 px-4 transition-all duration-300 ease-out
                           text-muted-foreground hover:text-foreground 
                           data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground 
                           data-[state=active]:shadow-2xl data-[state=active]:shadow-primary/50 
                           data-[state=active]:border data-[state=active]:border-primary/50 
                           data-[state=active]:rounded-tl-none data-[state=active]:rounded-bl-none rounded-lg"
              >
                <User className="w-5 h-5" />
                Client Records
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lawyers" className="mt-6">
              <LawyerTable lawyers={lawyers} isLoading={isLoading} />
            </TabsContent>
            
            <TabsContent value="clients" className="mt-6">
              <UserTable clients={clients} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;