import type { Metadata } from 'next'
import './globals.css'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Shizima',
  description: 'Shazam clone',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
