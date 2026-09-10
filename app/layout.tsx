import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://deniel.lol'),
  title: 'Deniel John Prado — Community, documentation, code',
  description: 'The portfolio of Deniel John Prado, a generalist working across community, documentation, design, and code.',
  applicationName: 'Deniel John Prado',
  authors: [{ name: 'Deniel John Prado', url: 'https://github.com/aetherspace-a' }],
  creator: 'Deniel John Prado',
  publisher: 'Deniel John Prado',
  keywords: ['Deniel John Prado', 'community', 'documentation', 'design', 'JavaScript', 'Python'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://deniel.lol',
    title: 'Deniel John Prado — Community, documentation, code',
    description: 'Community, documentation, design, and code by Deniel John Prado.',
    siteName: 'Deniel John Prado',
  },
  twitter: {
    card: 'summary',
    title: 'Deniel John Prado — Community, documentation, code',
    description: 'Community, documentation, design, and code by Deniel John Prado.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/djp-mark.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/djp-mark.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/djp-mark.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/djp-mark.svg', sizes: '180x180', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#000000', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" style={{ '--font-display': 'Fraunces, Georgia, "Times New Roman", serif', '--font-body': 'IBM Plex Sans, "Helvetica Neue", Arial, sans-serif', '--font-meta': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' } as React.CSSProperties}><body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
