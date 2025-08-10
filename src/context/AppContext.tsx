import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { AppState, AppContextValue, User } from '../types/app'
import { getFromStorage, setToStorage, removeFromStorage } from '../utils/helpers'

const getInitialState = (): AppState => {
  return {
    user: getFromStorage<User | null>('user', null),
    theme: getFromStorage<'light' | 'dark'>('theme', 'light'),
    loading: false,
  }
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppState>(getInitialState)

  const setUser = (user: User | null) => {
    setState(prev => ({ ...prev, user }))
    if (user) {
      setToStorage('user', user)
    } else {
      removeFromStorage('user')
    }
  }

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prev => ({ ...prev, theme }))
    setToStorage('theme', theme)
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