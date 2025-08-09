export interface User {
  id: string
  name: string
  email: string
}

export interface AppState {
  user: User | null
  theme: 'light' | 'dark'
  loading: boolean
}

export interface AppContextValue {
  state: AppState
  setUser: (user: User | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLoading: (loading: boolean) => void
}