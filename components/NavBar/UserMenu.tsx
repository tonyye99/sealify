import { createClient } from '@/lib/supabase/server'
import { MenuContent, MenuItem, MenuItemGroup, MenuRoot, MenuTrigger } from '../ui/menu'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'
import { Avatar } from '../ui/avatar'
import { logout } from '@/app/auth/action'

export default async function UserMenu() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  console.log(data.user)

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="plain" size="sm" outline="none">
          <Avatar src="https://bit.ly/broken-link" colorPalette="blue" />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup title={data.user?.email}>
          <MenuItem value="profile">Profile</MenuItem>
        </MenuItemGroup>
        <MenuItem value="logout" onClick={logout}>
          Log Out
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
