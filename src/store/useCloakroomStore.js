import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Store principal para gestión local + remota de prendas (Gestión Exclusiva Operativa)
export const useCloakroomStore = create((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  // Agregar nueva prenda (Staff)
  addItem: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const newItem = {
        id: crypto.randomUUID(),
        code,
        status: 'deposited',
        created_at: new Date().toISOString()
      };

      // Intentamos insertar en Supabase, si falla o usamos mock, guardamos en state local
      const { data, error } = await supabase.from('cloakroom_items').insert([newItem]).select();
      
      if (error) {
        console.warn("No se pudo insertar en Supabase, usando estado mock", error);
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

  // Obtener métricas de operación
  getMetrics: () => {
    const items = get().items;
    const activeItems = items.filter(i => i.status === 'deposited').length;
    const retrievedItems = items.filter(i => i.status === 'retrieved').length;
    
    return { 
      total: items.length, 
      active: activeItems, 
      retrieved: retrievedItems 
    };
  }
}));
