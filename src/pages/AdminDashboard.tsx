import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Shield, Home, Users, Briefcase, TrendingUp, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminUsers } from '@/hooks/useAdminUsers';
import UserTable from '@/components/admin/UserTable';
import LawyerTable from '@/components/admin/LawyerTable';
import StatCard from '@/components/admin/StatCard';
import { toast } from 'sonner';
import logoMark from "@/assets/logo.png";

const AdminDashboard = () => {
  const { user, role, loading, signOut } = useAuth();
  const { clients, lawyers, isLoading } = useAdminUsers();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse p-2">
          <img src={logoMark} alt="Loading Logo" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }
  
  // Redirect if not logged in or not an admin
  if (!user || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Calculate stats based on user request
  const totalAttorneys = lawyers.length;
  const totalClients = clients.length;
  const totalCases = clients.reduce((sum, c) => sum + (c.casesCount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 gradient-gold rounded-full" />
                <span className="text-sm font-medium uppercase tracking-widest text-primary">Dashboard</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Admin Control Panel
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage your firm's attorneys and client relationships
              </p>
            </div>
            
            <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <Button 
                asChild
                variant="outline" 
                className="border-border/50 text-foreground hover:bg-muted hover:border-primary/30 transition-all duration-300"
              >
                <Link to="/?bypass_redirect=true">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut} 
                className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
              <StatCard
                title="Total Attorneys"
                value={totalAttorneys}
                subtitle="Licensed professionals"
                icon={Briefcase}
                trend={{ value: 12, isPositive: true }}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <StatCard
                title="Total Clients"
                value={totalClients}
                subtitle={`Registered users`}
                icon={Users}
                trend={{ value: 8, isPositive: true }}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
              <StatCard
                title="Available Lawyers"
                value={totalAttorneys}
                subtitle="Total lawyers in network"
                icon={Shield}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <StatCard
                title="Active Cases"
                value={totalCases}
                subtitle="Currently managed"
                icon={TrendingUp}
                trend={{ value: 23, isPositive: true }}
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="animate-fade-in" style={{ animationDelay: '350ms' }}>
            <Tabs defaultValue="lawyers" className="w-full">
              <TabsList className="w-full max-w-md bg-card border border-border/50 rounded-xl p-1 h-auto">
                <TabsTrigger 
                  value="lawyers" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300
                             text-muted-foreground 
                             data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                             data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
                >
                  <Briefcase className="w-4 h-4" />
                  Attorneys
                </TabsTrigger>
                <TabsTrigger 
                  value="clients" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300
                             text-muted-foreground 
                             data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                             data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
                >
                  <Users className="w-4 h-4" />
                  Clients
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lawyers" className="mt-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">Attorney Records</h2>
                    <p className="text-sm text-muted-foreground">Manage your legal team members</p>
                  </div>
                  <Button 
                    onClick={() => toast.info("Feature not yet implemented: Add Attorney")}
                    className="gradient-gold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Add Attorney
                  </Button>
                </div>
                <LawyerTable lawyers={lawyers} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="clients" className="mt-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">Client Records</h2>
                    <p className="text-sm text-muted-foreground">View and manage client information</p>
                  </div>
                  <Button 
                    onClick={() => toast.info("Feature not yet implemented: Add Client")}
                    className="gradient-gold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
                <UserTable clients={clients} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;