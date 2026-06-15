import { createClient } from '@supabase/supabase-js';

// We fetch variables dynamically, supporting both Next.js/Node context (process.env) 
// and Vite context (import.meta.env) for seamless portability.
const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) || 
  ((import.meta as any).env?.VITE_SUPABASE_URL) || 
  '';

const supabaseAnonKey = 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) || 
  ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 
  '';

// Lazy initialization pattern to avoid crashing the dev server if environment variables are missing.
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // If keys are missing, we return null. The UI will detect this and fallback 
    // gracefully to a fully reactive local mock database, ensuring the app 
    // remains interactive and visually functional under all hosting scenarios.
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      return null;
    }
  }

  return supabaseClient;
}

// Export the singleton instance - might be null if credentials are not configured inside the environment.
export const supabase = getSupabaseClient();
