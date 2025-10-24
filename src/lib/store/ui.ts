import {create} from 'zustand';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

interface UIState {
  isSidebarOpen: boolean;
  activeDialog: string | null;
  toasts: Toast[];
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  showDialog: (id: string | null) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  activeDialog: null,
  toasts: [],
  openSidebar: () => set({isSidebarOpen: true}),
  closeSidebar: () => set({isSidebarOpen: false}),
  toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
  showDialog: (id) => set({activeDialog: id}),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, {id: generateId(), ...toast}]
    })),
  dismissToast: (id) =>
    set((state) => ({toasts: state.toasts.filter((toast) => toast.id !== id)}))
}));
