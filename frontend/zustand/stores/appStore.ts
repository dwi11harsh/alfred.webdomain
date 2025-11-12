import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface AppState {
  count: number
  message: string
}

interface AppActions {
  increment: () => void
  decrement: () => void
  setMessage: (message: string) => void
  reset: () => void
}

type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set) => ({
    count: 0,
    message: '',
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    setMessage: (message) => set({ message }),
    reset: () => set({ count: 0, message: '' }),
  }))
)

// Selectors for optimized subscriptions
export const useCount = () => useAppStore((state) => state.count)
export const useMessage = () => useAppStore((state) => state.message)
export const useIncrement = () => useAppStore((state) => state.increment)
export const useDecrement = () => useAppStore((state) => state.decrement)
export const useSetMessage = () => useAppStore((state) => state.setMessage)
export const useReset = () => useAppStore((state) => state.reset)

