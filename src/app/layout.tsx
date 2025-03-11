import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'by ali ogutcen'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
