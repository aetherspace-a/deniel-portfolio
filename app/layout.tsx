import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://deniel.lol'),
  title: 'Deniel John Prado — Useful things, with a pulse',
  description: 'Deniel John Prado is a student developer from the Philippines building full stack applications, Discord bots, automation, and useful software.',
  applicationName: 'Deniel John Prado',
  authors: [{ name: 'Deniel John Prado', url: 'https://github.com/aetherspace-a' }],
  creator: 'Deniel John Prado',
  publisher: 'Deniel John Prado',
  keywords: ['Deniel John Prado', 'aetherspace-a', 'student developer', 'full stack development', 'Discord bots', 'automation', 'JavaScript', 'Python', 'Next.js', 'backend engineering'],
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

export const viewport: Viewport = { colorScheme: 'light dark', themeColor: '#f2f3e9', userScalable: false }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" style={{ '--font-display': 'Fraunces, Georgia, "Times New Roman", serif', '--font-body': 'IBM Plex Sans, "Helvetica Neue", Arial, sans-serif', '--font-meta': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', '--font-mono-face': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' } as React.CSSProperties}><body><SmoothScrollProvider>{children}</SmoothScrollProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
