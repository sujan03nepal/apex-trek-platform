import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Trek = Tables<'treks'>;
type TrekInsert = TablesInsert<'treks'>;
type TrekUpdate = TablesUpdate<'treks'>;

export function useTreks() {
  const [treks, setTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTreks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('treks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTreks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTrek = useCallback(async (trek: TrekInsert) => {
    try {
      const { data, error } = await supabase
        .from('treks')
        .insert(trek)
        .select()
        .single();

      if (error) throw error;
      setTreks(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const updateTrek = useCallback(async (id: string, updates: TrekUpdate) => {
    try {
      const { data, error } = await supabase
        .from('treks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTreks(prev => prev.map(t => t.id === id ? data : t));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const deleteTrek = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('treks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTreks(prev => prev.filter(t => t.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, []);

  useEffect(() => {
    fetchTreks();
  }, [fetchTreks]);

  return { treks, loading, error, fetchTreks, createTrek, updateTrek, deleteTrek };
}
