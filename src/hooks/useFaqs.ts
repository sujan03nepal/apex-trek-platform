import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category')
        .order('display_order');

      if (error) throw error;
      setFaqs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFaq = useCallback(async (faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert(faq)
        .select()
        .single();

      if (error) throw error;
      setFaqs(prev => [...prev, data]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const updateFaq = useCallback(async (id: string, updates: Partial<FAQ>) => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setFaqs(prev => prev.map(f => f.id === id ? data : f));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, []);

  const deleteFaq = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFaqs(prev => prev.filter(f => f.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  return { faqs, loading, error, fetchFaqs, createFaq, updateFaq, deleteFaq };
}
