import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TablesInsert } from '@/integrations/supabase/types';

type BookingInsert = TablesInsert<'bookings'>;

export function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (booking: BookingInsert) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (dbError) throw dbError;

      return { data, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create booking';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { createBooking, loading, error };
}
