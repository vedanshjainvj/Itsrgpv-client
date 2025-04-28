import { create } from 'zustand';

const useNavStore = create((set) => ({
  isMenuOpen: false,
  activeRoute: '/',
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setActiveRoute: (route) => set({ activeRoute: route }),
}));

export default useNavStore;