import { Heading, Box, Fieldset, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/app/auth/context'
import { toaster } from './ui/toaster'

interface AuthFormProps {
  type: 'login' | 'register'
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { loading, setLoading, login, register } = useAuthContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (type === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }

      toaster.create({ title: 'Success', type: 'success', description: 'You have successfully logged in.' })
      router.push('/dashboard')
    } catch (error) {
      toaster.create({ title: 'Error', type: 'error', description: 'Error occured while registering' })
      console.error('Authentication error:', error)
    }
    setLoading(false)
  }

  return (
    <Box maxWidth="md" mx="auto" mt={8} p={4} bg="white" shadow="md" rounded="md">
      <Heading as="h2" size="lg" mb={4}>
        {type === 'login' ? 'Login' : 'Register'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field label="Email address">
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                padding="3"
              />
            </Field>

            <Field label="Password">
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                padding="3"
              />
            </Field>

            {type === 'register' && (
              <Field label="Confirm Password">
                <Input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  padding="3"
                />
              </Field>
            )}
          </Fieldset.Content>
        </Fieldset.Root>
        <Button type="submit" width="full" loading={loading} mt={4}>
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </Box>
  )
}

export default AuthForm
