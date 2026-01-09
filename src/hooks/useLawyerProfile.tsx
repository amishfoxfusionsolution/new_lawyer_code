import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Profile = TablesInsert<'profiles'> & { id: string };
type ProfileUpdate = TablesUpdate<'profiles'>;

const fetchLawyerProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Profile | null;
};

const updateLawyerProfile = async (profileData: ProfileUpdate & { user_id: string }) => {
  const { user_id, ...updatePayload } = profileData;
  
  // Check if profile exists
  const existingProfile = await fetchLawyerProfile(user_id);

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } else {
    // Insert new profile (shouldn't happen if RLS is set up correctly, but as a fallback)
    const { data, error } = await supabase
      .from('profiles')
      .insert({ ...updatePayload, user_id })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};

export const useLawyerProfile = () => {
  const { user, role, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;
  const isLawyer = role === 'lawyer';

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['lawyerProfile', userId],
    queryFn: () => {
      if (!userId || !isLawyer) return null;
      return fetchLawyerProfile(userId);
    },
    enabled: !!userId && isLawyer && !authLoading,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateMutation = useMutation({
    mutationFn: (data: Omit<ProfileUpdate, 'user_id'>) => {
      if (!userId) throw new Error("User ID is missing for profile update.");
      return updateLawyerProfile({ ...data, user_id: userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lawyerProfile', userId] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  return {
    profile,
    isProfileLoading: isProfileLoading || authLoading,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};