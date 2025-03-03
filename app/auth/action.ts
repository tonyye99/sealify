'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createServerSupabaseClient } from '@/lib/services/auth.service'
import { AuthCredentials, SignupCredentials } from '@/types/auth'

export async function login(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const credentials: AuthCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(credentials)

  if (error) {
    throw new Error(`Sign in error: ${error.message}`)
  }

  revalidatePath('/', 'layout')
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const credentials: SignupCredentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(credentials)

  if (error) {
    throw new Error(`Sign up error: ${error.message}`)
  }

  revalidatePath('/', 'layout')
}

export async function logout() {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`Logout error: ${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
