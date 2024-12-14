import { ReactNode, useCallback, useState } from 'react'
import { AuthContext } from './context'
import { User } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (authData.user) {
        setUser(authData.user)
      }
    } catch (error) {
      console.error('Error login', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (authData.user) {
        setUser(authData.user)
      }
    } catch (error) {
      console.error('Error Registering', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
