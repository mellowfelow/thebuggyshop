import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientStoreProvider from '@/src/components/ClientStoreProvider';
import { SITE, BRAND, CONTACT } from '@/src/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: 'Golf Buggies Australia | Electric, Remote & Push Buggies',
    template: '%s'
  },
  description: 'Shop golf buggies in Australia: electric, remote control and push models plus ride-on carts. Local warranty and tail-lift delivery. Browse the range today.',
  keywords: [
    'golf buggy for sale',
    'golf buggy',
    'golf buggy for sale used',
    'used golf buggy for sale',
    'golf buggy sales',
    'golf buggy sale',
    'remote control golf buggy',
    'golf push buggy',
    'push golf buggy',
    'golf buggy with seat',
    'golf trolley',
    'golf buggy accessories',
    'off road buggies',
    'off road buggies for sale',
    'buggies for sale',
    'mgi golf buggy',
    'electric golf buggy Australia',
    'luxury golf cart Australia'
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  verification: {
    ...(SITE.gscVerification && SITE.gscVerification !== 'pending' ? { google: SITE.gscVerification } : {}),
    ...(SITE.bingVerification && SITE.bingVerification !== 'pending' ? { other: { 'msvalidate.01': SITE.bingVerification } } : {}),
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `https://${SITE.domain}/`,
    siteName: SITE.name,
    title: 'Golf Buggies Australia | Electric, Remote & Push Buggies',
    description: 'Shop golf buggies in Australia: electric, remote control and push models plus ride-on carts. Local warranty and tail-lift delivery. Browse the range today.',
    images: [
      {
        url: '/images/hero/hero-1.webp',
        width: 1200,
        height: 630,
        alt: `${SITE.name} Luxury Australian Golf Buggies for Sale`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Buggies Australia | Electric, Remote & Push Buggies',
    description: 'Shop golf buggies in Australia: electric, remote control and push models plus ride-on carts. Local warranty and tail-lift delivery. Browse the range today.',
    images: ['/images/hero/hero-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B111E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script src="/js/webmcp.js" defer></script>
      </head>
      <body suppressHydrationWarning className="antialiased bg-[#F8F8F5] text-[#0E2A1E]">
        <ClientStoreProvider>
          {children}
        </ClientStoreProvider>
      </body>
    </html>
  );
}
