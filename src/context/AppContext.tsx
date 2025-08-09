import { createContext, useContext, useState, ReactNode } from 'react'
import { AppState, AppContextValue, User } from '../types/app'

const initialState: AppState = {
  user: null,
  theme: 'light',
  loading: false,
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppState>(initialState)

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }))
  }

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prev => ({ ...prev, theme }))
  }

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }))
  }

  const value: AppContextValue = {
    state,
    setUser,
    setTheme,
    setLoading,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}