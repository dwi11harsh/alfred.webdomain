import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
}

interface UserActions {
  setUser: (user: User | null) => void
  logout: () => void
}

type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>()(
  subscribeWithSelector((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
)

// Selectors for optimized subscriptions
export const useUser = () => useUserStore((state) => state.user)
export const useIsAuthenticated = () => useUserStore((state) => state.isAuthenticated)
export const useSetUser = () => useUserStore((state) => state.setUser)
export const useLogout = () => useUserStore((state) => state.logout)

