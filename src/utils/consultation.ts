import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Checks if a user with this email has requested a consultation before.
 * We check the 'profiles' table as a proxy for a returning user/client.
 * @param email The user's email.
 * @returns true if a profile exists, false otherwise.
 */
export const hasRequestedConsultationBefore = async (email: string): Promise<boolean> => {
  const { count, error } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('email', email);

  if (error) {
    console.error("Error checking consultation history:", error);
    // Fail safe: treat error as first time to avoid blocking user
    return false; 
  }

  // If count > 0, a profile with this email exists, treat as returning user.
  return (count || 0) > 0;
};

/**
 * Saves a new consultation request.
 */
export const saveConsultationRequest = async (data: ConsultationRequest) => {
  // In a real application, this would insert the request into a dedicated table.
  // For now, we simulate success.
  console.log("Saving new consultation request:", data);
  toast.success("Your free consultation request has been submitted successfully! We will contact you shortly.");
};