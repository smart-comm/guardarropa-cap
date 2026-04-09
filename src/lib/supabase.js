import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si no hay variables de entorno, mostramos un warning para no crashear de inmediato y permitir Mocks
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Faltan variables de entorno para Supabase. La aplicación podría no funcionar correctamente o usar mocks de respaldo.");
}

export const supabase = createClient(
  supabaseUrl || 'https://mock-project.supabase.co',
  supabaseAnonKey || 'mock-anon-key'
);
