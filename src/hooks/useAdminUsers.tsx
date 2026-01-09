import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from 'sonner';

// Define a combined type for user data needed in the admin panel
export type AdminUser = Tables<'profiles'> & {
  role: Tables<'user_roles'>['role'];
  email: string;
  id: string; // Auth user ID
  // Mocked fields for dashboard stats
  status?: 'active' | 'inactive' | 'available';
  casesCount?: number;
};

const fetchAllUsers = async (): Promise<AdminUser[]> => {
  // 1. Fetch all profiles
  const { data: profilesData, error: profileError } = await supabase
    .from('profiles')
    .select('*');

  if (profileError) {
    throw new Error(`Failed to fetch profiles: ${profileError.message}`);
  }
  
  // 2. Fetch all user roles separately
  const { data: rolesData, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id, role');

  if (rolesError) {
    throw new Error(`Failed to fetch user roles: ${rolesError.message}`);
  }

  // Create a map for quick role lookup
  const roleMap = new Map(rolesData.map(r => [r.user_id, r.role]));

  // 3. Merge data and mock dashboard specific fields
  const users: AdminUser[] = profilesData.map(profile => {
    const role = roleMap.get(profile.user_id) || 'user';
    
    let status: 'active' | 'inactive' | 'available' = 'inactive';
    let casesCount = 0;

    if (role === 'user') {
      status = Math.random() > 0.5 ? 'active' : 'inactive';
      casesCount = Math.floor(Math.random() * 5);
    } else if (role === 'lawyer') {
      status = Math.random() > 0.7 ? 'available' : 'inactive';
    }

    return {
      ...profile,
      role, 
      email: profile.email || 'Email not available',
      id: profile.user_id,
      status,
      casesCount,
    };
  });

  return users;
};

export const useAdminUsers = () => {
  const { data: users, isLoading, error } = useQuery<AdminUser[], Error>({
    queryKey: ['adminUsers'],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (error) {
    // We still toast the error, but the underlying fetch should now work.
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