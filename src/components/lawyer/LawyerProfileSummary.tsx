import { useLawyerProfile } from '@/hooks/useLawyerProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, User, Briefcase, MapPin, GraduationCap, Calendar, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LawyerProfileSummaryProps {
  onEdit: () => void;
}

const LawyerProfileSummary = ({ onEdit }: LawyerProfileSummaryProps) => {
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
  const practiceAreas = Array.isArray(profile.practice_areas) ? profile.practice_areas.join(', ') : 'N/A';

  const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null | undefined }) => (
    <div className="flex items-start text-sm">
      <Icon className="w-4 h-4 mr-3 mt-1 text-gold shrink-0" />
      <div>
        <p className="text-muted-foreground/80 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-foreground font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <Card className="bg-card border-gold/20 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-display text-foreground">
          Professional Profile Summary
        </CardTitle>
        <Button variant="outline" size="sm" onClick={onEdit} className="border-gold/30 text-gold hover:bg-gold/10">
          Edit Details
        </Button>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-2 border-gold">
            {/* Use avatar_url if available */}
            <AvatarFallback className="bg-primary text-primary-foreground font-display text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground">{profile.full_name || 'N/A'}</h3>
            <p className="text-sm text-primary flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Lawyer
            </p>
            {profile.father_husband_name && (
              <p className="text-xs text-muted-foreground mt-1">S/o or D/o: {profile.father_husband_name}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="border-l-4 border-gold/50 pl-4 py-2">
            <p className="text-muted-foreground italic">{profile.bio}</p>
          </div>
        )}

        <Separator className="bg-border/50" />

        {/* Professional Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <DetailItem icon={Mail} label="Email Address" value={profile.email} />
          <DetailItem icon={Phone} label="Secure Line" value={profile.phone} />
          
          <DetailItem icon={GraduationCap} label="Enrollment Number" value={profile.enrollment_number} />
          <DetailItem icon={Calendar} label="Enrollment Date" value={profile.enrollment_date} />
          
          <DetailItem icon={GraduationCap} label="Law University" value={profile.law_degree_university} />
          <DetailItem icon={Briefcase} label="Years Experience" value={profile.years_of_experience || 0} />
        </div>

        <Separator className="bg-border/50" />

        {/* Practice & Location */}
        <div className="space-y-4">
          <DetailItem icon={MapPin} label="Office Location" value={`${profile.city || 'N/A'}, ${profile.state || 'N/A'}`} />
          <DetailItem icon={MapPin} label="Office Address" value={profile.office_address} />
          
          <div className="flex items-start text-sm">
            <Briefcase className="w-4 h-4 mr-3 mt-1 text-gold shrink-0" />
            <div>
              <p className="text-muted-foreground/80 text-xs uppercase tracking-wider mb-1">Practice Areas</p>
              <p className="text-foreground font-medium">{practiceAreas}</p>
            </div>
          </div>
          
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:text-gold-light transition-colors">
              <Link className="w-4 h-4 mr-3 text-gold" />
              <span>LinkedIn Profile</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerProfileSummary;