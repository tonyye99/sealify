import NavBar from './NavBar'

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default CommonLayout
