import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

// Define a combined type for user data needed in the admin panel
export type AdminUser = Tables<'profiles'> & {
  role: Tables<'user_roles'>['role'];
  email: string;
  id: string; // Auth user ID
};

const fetchAllUsers = async (): Promise<AdminUser[]> => {
  // Fetch all profiles and join with user_roles
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select(`
      *,
      user_roles ( role )
    `);

  if (profileError) {
    throw new Error(`Failed to fetch profiles: ${profileError.message}`);
  }

  // Fetch all auth users to get emails (since profiles.email might be null)
  // NOTE: This requires RLS policies to allow admin to view all profiles and user_roles.
  // Assuming the current user (admin) has the necessary permissions.
  
  // For simplicity and to avoid fetching all auth users (which might be restricted), 
  // we rely on the email stored in the profile table, which is populated on sign up.
  // If profile.email is null, we use the user_id as a fallback identifier.

  const users: AdminUser[] = profiles.map(profile => ({
    ...profile,
    role: profile.user_roles?.role || 'user', // Default to 'user' if role is missing
    email: profile.email || 'Email not available',
    id: profile.user_id,
  }));

  return users;
};

export const useAdminUsers = () => {
  const { data: users, isLoading, error } = useQuery<AdminUser[], Error>({
    queryKey: ['adminUsers'],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (error) {
    toast.error(`Error loading user data: ${error.message}`);
  }

  const clients = users?.filter(u => u.role === 'user') || [];
  const lawyers = users?.filter(u => u.role === 'lawyer') || [];
  const admins = users?.filter(u => u.role === 'admin') || [];

  return {
    users,
    clients,
    lawyers,
    admins,
    isLoading,
  };
};