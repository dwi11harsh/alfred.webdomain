import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bolt.newer',
  description: 'Bolt.newer Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  )
}

