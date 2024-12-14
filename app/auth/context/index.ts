import { User } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: false,
  setLoading: () => {},
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}
