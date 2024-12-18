import CommonLayout from '@/components/CommonLayout'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <CommonLayout>{children}</CommonLayout>
}

export default DashboardLayout
