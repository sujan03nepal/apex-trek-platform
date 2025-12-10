import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type TeamMember = Tables<'team_members'>;
type TeamMemberInsert = TablesInsert<'team_members'>;
type TeamMemberUpdate = TablesUpdate<'team_members'>;

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeamMember = useCallback(async (member: TeamMemberInsert) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single();

      if (error) throw error;
      setTeamMembers(prev => [...prev, data]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const updateTeamMember = useCallback(async (id: string, updates: TeamMemberUpdate) => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTeamMembers(prev => prev.map(m => m.id === id ? data : m));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const deleteTeamMember = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTeamMembers(prev => prev.filter(m => m.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return { teamMembers, loading, error, fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };
}
