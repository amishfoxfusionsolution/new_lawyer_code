import React from 'react';
import { useLawyerProfile } from '@/hooks/useLawyerProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LawyerProfileSummaryProps {
  onEdit: () => void;
}

const LawyerProfileSummary: React.FC<LawyerProfileSummaryProps> = ({ onEdit }) => {
  const { profile, isProfileLoading } = useLawyerProfile();

  if (isProfileLoading) {
    return (
      <Card className="bg-card border-gold/20 animate-pulse">
        <CardHeader>
          <div className="h-6 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 w-3/4 bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="bg-card border-gold/20">
        <CardHeader>
          <CardTitle className="text-xl font-display text-primary">Profile Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We couldn't load your profile details. Please ensure your account is correctly set up.
          </p>
          <Button onClick={onEdit} variant="hero">
            Set Up Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  const initials = profile.full_name ? profile.full_name.split(' ').map(n => n[0]).join('') : 'UL';

  return (
    <Card className="bg-card border-gold/20 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-display text-foreground">
          Lawyer Profile
        </CardTitle>
        <Button variant="outline" size="sm" onClick={onEdit} className="border-gold/30 text-gold hover:bg-gold/10">
          Edit Details
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16 border-2 border-gold">
            {/* Assuming avatar_url is not implemented yet, use initials */}
            <AvatarFallback className="bg-primary text-primary-foreground font-display text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">{profile.full_name || 'N/A'}</h3>
            <p className="text-sm text-primary flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Lawyer
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Mail className="w-4 h-4 mr-3 text-gold" />
            <span>{profile.email || 'N/A'}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Phone className="w-4 h-4 mr-3 text-gold" />
            <span>{profile.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <User className="w-4 h-4 mr-3 text-gold" />
            <span>Profile ID: {profile.id.substring(0, 8)}...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerProfileSummary;