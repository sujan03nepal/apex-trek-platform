import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fizcohxqjywgjzermsbg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpemNvaHhxanl3Z2p6ZXJtc2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODkwODYsImV4cCI6MjA4MDc2NTA4Nn0.-bmEhGQLGAghvrD0j6xdWggop8EF2ZGLo9nl4RTCi1E";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
