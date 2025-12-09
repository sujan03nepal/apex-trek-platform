import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type MediaItem = Tables<'media_library'>;
type MediaInsert = TablesInsert<'media_library'>;
type MediaUpdate = TablesUpdate<'media_library'>;

export function useMediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMedia = useCallback(async (item: MediaInsert) => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      setMedia(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const updateMedia = useCallback(async (id: string, updates: MediaUpdate) => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setMedia(prev => prev.map(m => m.id === id ? data : m));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const deleteMedia = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMedia(prev => prev.filter(m => m.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, error, fetchMedia, addMedia, updateMedia, deleteMedia };
}
