/**
 * Authentication related type definitions
 */

export interface AuthCredentials {
  email: string
  password: string
}

export interface SignupCredentials extends AuthCredentials {
  confirmPassword?: string
}

export interface AuthResponse {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
  }
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface User {
  id: string
  email: string
  createdAt?: string
  updatedAt?: string
  lastSignInAt?: string
}

export type AuthError = {
  message: string
  status?: number
  code?: string
}
