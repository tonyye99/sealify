'use client'

import { Input, Heading, Box, Flex, Fieldset, Stack } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { login, signup } from '@/app/auth/action'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'
import { Field } from '@/components/ui/field'

interface AuthFormProps {
  type: 'login' | 'signup'
}

const RedirectLinkComponent: FC<AuthFormProps> = ({ type }) => {
  const router = useRouter()

  return (
    <>
      {type === 'login' ? (
        <Button variant="ghost" color="blue.500" onClick={() => router.push('/auth/sign-up')}>
          Don&apos;t have an account? Sign up
        </Button>
      ) : (
        <Button variant="ghost" color="blue.500" onClick={() => router.push('/auth/login')}>
          Already have an account? Log in
        </Button>
      )}
    </>
  )
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      if (type === 'login') {
        await login(formData)
      } else {
        await signup(formData)
      }
      toaster.create({ title: 'Success', description: 'Successfully logged in', type: 'success' })
      router.push('/dashboard')
    } catch (error) {
      toaster.create({ title: 'Error', description: 'An error occurred', type: 'error' })
      console.log('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4} bg="white" shadow="md" rounded="md">
      <form onSubmit={handleSubmit}>
        <Fieldset.Root>
          <Stack>
            <Fieldset.Legend>
              <Heading as="h2" size="lg">
                {type === 'login' ? 'Log in' : 'Sign up'}
              </Heading>
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Enter your email and password to
              {type === 'login' ? ' log in' : 'sign up'}
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Email">
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </Field>
          </Fieldset.Content>
          <Fieldset.Content>
            <Field label="Password">
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Field>
          </Fieldset.Content>
          {type === 'signup' && (
            <Fieldset.Content>
              <Field label="Confirm Password">
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </Field>
            </Fieldset.Content>
          )}

          <Flex justifyContent="space-between" mt={10}>
            <RedirectLinkComponent type={type} />
            <Button type="submit" loading={loading}>
              {type === 'login' ? 'Log in' : 'Sign up'}
            </Button>
          </Flex>
        </Fieldset.Root>
      </form>
    </Box>
  )
}

export default AuthForm
