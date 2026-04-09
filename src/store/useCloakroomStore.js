import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Store principal para gestión local + remota simulada de prendas
export const useCloakroomStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  // Agregar nueva prenda (Staff)
  addItem: async (code, isFree = false) => {
    set({ isLoading: true, error: null });
    try {
      const newItem = {
        id: crypto.randomUUID(),
        code,
        status: 'deposited',
        is_free: isFree,
        created_at: new Date().toISOString()
      };

      // Intentamos insertar en Supabase, si falla o usamos mock, guardamos en state
      const { data, error } = await supabase.from('cloakroom_items').insert([newItem]).select();
      
      if (error) {
        console.warn("No se pudo insertar en Supabase, usando estado mock", error);
        // Fallback a Store local si Supabase no está configurado (Mock mode)
        set((state) => ({ items: [...state.items, newItem], isLoading: false }));
        return newItem;
      }
      
      set((state) => ({ items: [...state.items, data[0]], isLoading: false }));
      return data[0];
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Retirar prenda (Staff)
  retrieveItem: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('cloakroom_items')
        .update({ status: 'retrieved' })
        .eq('code', code)
        .select();

      if (error) {
        // Fallback Mock
        set((state) => ({
          items: state.items.map(item => item.code === code ? { ...item, status: 'retrieved' } : item),
          isLoading: false
        }));
        return { success: true, isMock: true };
      }

      set((state) => ({
        items: state.items.map(item => item.code === code ? { ...item, status: 'retrieved' } : item),
        isLoading: false
      }));
      return data[0];
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Obtener métricas para admin
  getMetrics: () => {
    const items = get().items;
    const activeItems = items.filter(i => i.status === 'deposited').length;
    const retrievedItems = items.filter(i => i.status === 'retrieved').length;
    // Mock base 1500 per item not free
    const revenue = items.filter(i => !i.is_free).length * 1500; 

    return { total: items.length, active: activeItems, retrieved: retrievedItems, revenue };
  }
}));
