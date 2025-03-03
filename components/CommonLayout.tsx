import NavBar from './NavBar'
import UserMenu from './NavBar/UserMenu'

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <NavBar userMenu={<UserMenu />} />
      {children}
    </>
  )
}

export default CommonLayout
