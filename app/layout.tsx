import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
// import './globals.css'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sealify',
  description: 'Your digital seal of distinction.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className}`}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  )
}
