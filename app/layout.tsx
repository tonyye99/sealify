import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
// import './globals.css'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { ColorModeProvider } from '@/components/ui/color-mode'

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
    <html suppressHydrationWarning>
      <body className={`${nunito.className}`}>
        <Provider>
          <ColorModeProvider>
            <Toaster />
            {children}
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  )
}
