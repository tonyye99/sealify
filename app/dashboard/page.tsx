'use client'

import { Button } from '@/components/ui/button'
import { logout } from '../auth/action'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
