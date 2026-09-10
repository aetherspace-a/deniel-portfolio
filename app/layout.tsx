import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deniel John Prado — Community, documentation, code',
  description: 'The portfolio of Deniel John Prado, a generalist working across community coordination, technical documentation, design, and code.',
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#000000', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" style={{ '--font-display': 'Fraunces, Georgia, "Times New Roman", serif', '--font-body': 'IBM Plex Sans, "Helvetica Neue", Arial, sans-serif', '--font-meta': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' } as React.CSSProperties}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
