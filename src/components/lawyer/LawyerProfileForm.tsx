import React, { useState, useEffect } from 'react';
import { useLawyerProfile } from '@/hooks/useLawyerProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Briefcase, MapPin, GraduationCap } from 'lucide-react';

interface LawyerProfileFormProps {
  onSave: () => void;
}

const LawyerProfileForm: React.FC<LawyerProfileFormProps> = ({ onSave }) => {
  const { profile, isProfileLoading, updateProfile, isUpdating } = useLawyerProfile();
  
  // Personal Details
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fatherHusbandName, setFatherHusbandName] = useState('');
  const [nationality, setNationality] = useState('Indian');
  
  // Professional Details
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [lawDegreeUniversity, setLawDegreeUniversity] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [practiceAreas, setPracticeAreas] = useState(''); // Comma separated string
  const [bio, setBio] = useState(''); 

  // Contact & Location
  const [phone, setPhone] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setBio(profile.bio || '');
      
      // Load new fields
      setDateOfBirth(profile.date_of_birth || '');
      setFatherHusbandName(profile.father_husband_name || '');
      setNationality(profile.nationality || 'Indian');
      setEnrollmentNumber(profile.enrollment_number || '');
      setEnrollmentDate(profile.enrollment_date || '');
      setLawDegreeUniversity(profile.law_degree_university || '');
      setYearsOfExperience(profile.years_of_experience?.toString() || '');
      setPracticeAreas(Array.isArray(profile.practice_areas) ? profile.practice_areas.join(', ') : '');
      setOfficeAddress(profile.office_address || '');
      setCity(profile.city || '');
      setState(profile.state || '');
      setLinkedinUrl(profile.linkedin_url || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !enrollmentNumber.trim() || !lawDegreeUniversity.trim()) {
      toast.error("Please fill in all required fields (Full Name, Enrollment Number, University).");
      return;
    }

    const updatePayload = {
      full_name: fullName,
      phone: phone,
      bio: bio,
      date_of_birth: dateOfBirth || null,
      father_husband_name: fatherHusbandName || null,
      nationality: nationality || null,
      enrollment_number: enrollmentNumber,
      enrollment_date: enrollmentDate || null,
      law_degree_university: lawDegreeUniversity,
      years_of_experience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
      practice_areas: practiceAreas.split(',').map(area => area.trim()).filter(area => area.length > 0),
      office_address: officeAddress || null,
      city: city || null,
      state: state || null,
      linkedin_url: linkedinUrl || null,
    };

    updateProfile(updatePayload, {
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
        <CardTitle className="text-2xl font-display text-foreground flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-gold" />
          Professional Profile Setup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Personal & Contact */}
          <div>
            <h3 className="font-display text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Personal & Contact Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherHusbandName">Father's/Husband's Name</Label>
                <Input id="fatherHusbandName" value={fatherHusbandName} onChange={(e) => setFatherHusbandName(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Secure contact number" className="bg-background border-gold/20 focus:border-gold" />
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Section 2: Professional Qualifications */}
          <div>
            <h3 className="font-display text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Qualifications & Enrollment
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="enrollmentNumber">Bar Enrollment Number *</Label>
                <Input id="enrollmentNumber" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} required className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input id="enrollmentDate" type="date" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="lawDegreeUniversity">Law Degree University *</Label>
                <Input id="lawDegreeUniversity" value={lawDegreeUniversity} onChange={(e) => setLawDegreeUniversity(e.target.value)} required className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input id="yearsOfExperience" type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} min="0" className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input id="linkedinUrl" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." className="bg-background border-gold/20 focus:border-gold" />
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Section 3: Practice & Location */}
          <div>
            <h3 className="font-display text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Practice & Bio
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="practiceAreas">Practice Areas (Comma separated)</Label>
                <Input id="practiceAreas" value={practiceAreas} onChange={(e) => setPracticeAreas(e.target.value)} placeholder="Corporate Law, Criminal Defense, Family Law" className="bg-background border-gold/20 focus:border-gold" />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={state} onChange={(e) => setState(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeAddress">Office Address Line 1</Label>
                  <Input id="officeAddress" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} className="bg-background border-gold/20 focus:border-gold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief summary of your expertise and experience..."
                  className="bg-background border-gold/20 focus:border-gold"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-3"
          >
            {isUpdating ? 'Saving Profile...' : 'Save Complete Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LawyerProfileForm;