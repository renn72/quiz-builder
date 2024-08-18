import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { ThemeProvider } from '@/app/_components/theme-provider'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import { TRPCReactProvider } from '@/trpc/react'
import Navbar from './_components/navbar'

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Quiz App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang='en'
        className={`${GeistSans.variable}`}
      >
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              disableTransitionOnChange
            >
            <Navbar />
            {children}
            </ThemeProvider>
            </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
