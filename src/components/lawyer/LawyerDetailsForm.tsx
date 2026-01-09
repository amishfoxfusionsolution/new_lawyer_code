import React, { useState, useEffect } from 'react';
import { useLawyerProfile } from '@/hooks/useLawyerProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface LawyerDetailsFormProps {
  onSave: () => void;
}

const LawyerDetailsForm: React.FC<LawyerDetailsFormProps> = ({ onSave }) => {
  const { profile, isProfileLoading, updateProfile, isUpdating } = useLawyerProfile();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState(''); 

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      // Note: 'bio' is not a standard Supabase profile field, but included for future expansion.
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    updateProfile({
      full_name: fullName,
      phone: phone,
      // email is handled by auth
    }, {
      onSuccess: () => {
        onSave();
      }
    });
  };

  if (isProfileLoading) {
    return (
      <Card className="bg-card border-gold/20 animate-pulse">
        <CardHeader><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full bg-muted rounded"></div>
          <div className="h-10 w-full bg-muted rounded"></div>
          <div className="h-10 w-1/4 bg-primary/50 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-gold/20 shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl font-display text-foreground">
          Update Your Professional Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full professional name"
              className="bg-background border-gold/20 focus:border-gold"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address (Read-only)</Label>
            <Input
              id="email"
              value={profile?.email || ''}
              disabled
              className="bg-background/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Secure contact number"
              className="bg-background border-gold/20 focus:border-gold"
            />
          </div>

          {/* Placeholder for future fields like specialty/bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio (Optional)</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief summary of your expertise and experience..."
              className="bg-background border-gold/20 focus:border-gold"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-3"
          >
            {isUpdating ? 'Saving...' : 'Save Profile Details'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LawyerDetailsForm;