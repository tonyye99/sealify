/**
 * Authentication service for handling user authentication
 * Centralizes all auth-related logic and provides a consistent interface
 */

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { AuthCredentials, AuthResponse, SignupCredentials, User, AuthError } from '@/types/auth'

// Supabase client for server-side operations
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Create a browser client instance
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing environment variables for Supabase')
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Export client for browser usage
export const browserClient = createBrowserClient()

class AuthService {
  /**
   * Sign in with email and password
   */
  public async signIn(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await browserClient.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
      }
    } catch (error) {
      const authError = error as AuthError
      return {
        success: false,
        error: authError.message || 'An error occurred during sign in',
      }
    }
  }

  /**
   * Sign up with email and password
   */
  public async signUp(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await browserClient.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email || '',
            }
          : undefined,
      }
    } catch (error) {
      const authError = error as AuthError
      return {
        success: false,
        error: authError.message || 'An error occurred during sign up',
      }
    }
  }

  /**
   * Sign out the current user
   */
  public async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await browserClient.auth.signOut()

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
      }
    } catch (error) {
      const authError = error as AuthError
      return {
        success: false,
        error: authError.message || 'An error occurred during sign out',
      }
    }
  }

  /**
   * Get the current user
   */
  public async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await browserClient.auth.getUser()

      if (!data.user) {
        return null
      }

      return {
        id: data.user.id,
        email: data.user.email || '',
        createdAt: data.user.created_at,
        lastSignInAt: data.user.last_sign_in_at,
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  /**
   * Reset password
   */
  public async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await browserClient.auth.resetPasswordForEmail(email)

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
      }
    } catch (error) {
      const authError = error as AuthError
      return {
        success: false,
        error: authError.message || 'An error occurred while resetting password',
      }
    }
  }
}

// Export a singleton instance
export const authService = new AuthService()
