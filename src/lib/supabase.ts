import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('Supabase URL exists:', !!supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Missing Supabase credentials!
    Make sure you have a .env file with:
    VITE_SUPABASE_URL=your-url
    VITE_SUPABASE_ANON_KEY=your-anon-key
  `);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


