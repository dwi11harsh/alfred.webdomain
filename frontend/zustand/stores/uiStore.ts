import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  loading: boolean
}

interface UIActions {
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setTheme: (theme: 'dark' | 'light') => void
  setLoading: (loading: boolean) => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>()(
  subscribeWithSelector((set) => ({
    sidebarOpen: false,
    theme: 'dark',
    loading: false,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setTheme: (theme) => set({ theme }),
    setLoading: (loading) => set({ loading }),
  }))
)

// Selectors for optimized subscriptions
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen)
export const useSetSidebarOpen = () => useUIStore((state) => state.setSidebarOpen)
export const useToggleSidebar = () => useUIStore((state) => state.toggleSidebar)
export const useLoading = () => useUIStore((state) => state.loading)
export const useSetLoading = () => useUIStore((state) => state.setLoading)

