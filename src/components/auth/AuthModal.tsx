import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Briefcase, Shield, ArrowLeft } from 'lucide-react';
import AnimatedScales from '@/components/AnimatedScales';

type AppRole = 'user' | 'lawyer' | 'admin';
type AuthView = 'login' | 'signup' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const roleOptions: { value: AppRole; label: string; icon: React.ReactNode; description: string }[] = [
  { 
    value: 'user', 
    label: 'Client', 
    icon: <User className="w-5 h-5" />,
    description: 'Looking for legal services'
  },
  { 
    value: 'lawyer', 
    label: 'Lawyer', 
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Legal professional'
  },
  { 
    value: 'admin', 
    label: 'Admin', 
    icon: <Shield className="w-5 h-5" />,
    description: 'System administrator'
  },
];

const loginRoleOptions: { value: 'user' | 'lawyer'; label: string; icon: React.ReactNode }[] = [
  { 
    value: 'user', 
    label: 'Client', 
    icon: <User className="w-5 h-5" />
  },
  { 
    value: 'lawyer', 
    label: 'Lawyer', 
    icon: <Briefcase className="w-5 h-5" />
  },
];

export const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('user');
  const [loading, setLoading] = useState(false);
  const [loginIntentRole, setLoginIntentRole] = useState<'user' | 'lawyer'>('user');
  const { signIn, signUp } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: The actual role is determined by the backend after successful sign-in, 
      // but the selection provides user clarity on the intended login path.
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome back!');
        onClose();
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName, selectedRole, phone);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created successfully! Please check your email for confirmation.');
        onClose();
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset link sent! Check your email.');
        setView('login');
        setEmail('');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setPhone('');
    setFullName('');
    setSelectedRole('user');
    setView('login');
    setLoginIntentRole('user');
  };

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Join Unseen Lawyers';
      case 'forgot-password':
        return 'Reset Password';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-secondary border-primary/20">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <AnimatedScales size={48} />
          </div>
          <DialogTitle className="text-2xl font-serif text-center text-foreground">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        {view === 'forgot-password' ? (
          <form onSubmit={handleForgotPassword} className="space-y-6 mt-4">
            <p className="text-muted-foreground text-sm text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-muted-foreground">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-primary/20 focus:border-primary"
                placeholder="you@example.com"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-sapphire-light text-background font-semibold py-3"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <button
              type="button"
              onClick={() => setView('login')}
              className="flex items-center justify-center gap-2 w-full text-primary hover:text-sapphire-light text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </form>
        ) : view === 'login' ? (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-6 mt-4">
              {/* Role Selection for Login Intent */}
              <div className="space-y-3">
                <Label className="text-muted-foreground">I am logging in as a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  {loginRoleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLoginIntentRole(option.value)}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        loginIntentRole === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-primary/20 bg-background hover:border-primary/40 text-muted-foreground'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {option.icon}
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* End Role Selection */}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                  <button
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="text-xs text-primary hover:text-sapphire-light transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-sapphire-light text-background font-semibold py-3"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setView('signup')}
                className="text-primary hover:text-sapphire-light text-sm transition-colors"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSignupSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-muted-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-muted-foreground">I am a...</Label>
                <div className="grid grid-cols-3 gap-3">
                  {roleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedRole(option.value)}
                      className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                        selectedRole === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-primary/20 bg-background hover:border-primary/40 text-muted-foreground'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {option.icon}
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-muted-foreground">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone" className="text-muted-foreground">Phone Number</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-muted-foreground">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background border-primary/20 focus:border-primary"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-sapphire-light text-background font-semibold py-3"
              >
                {loading ? 'Please wait...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-primary hover:text-sapphire-light text-sm transition-colors"
              >
                Already have an account? Sign in
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};