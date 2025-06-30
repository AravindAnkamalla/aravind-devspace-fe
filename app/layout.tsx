import '@/styles/globals.css'

import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import Providers from './providers'

export const metadata = { title: 'Portfolio App' }

export default function RootLayout({ children }: { children: ReactNode }) {
    console.log('Clerk Publishable Key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="en">
        <body className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition">
           <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
