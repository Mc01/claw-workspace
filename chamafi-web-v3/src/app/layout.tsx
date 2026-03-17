import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChamaFi — Save Together, Grow Together',
  description: 'The future of savings circles is on-chain. ChamaFi digitizes Africa\'s Chamas with DeFi yield on Celo.',
  keywords: ['ChamaFi', 'Chama', 'DeFi', 'Celo', 'MiniPay', 'Africa', 'savings', 'crypto'],
  openGraph: {
    title: 'ChamaFi — Neon Africa DeFi',
    description: 'Digitize your savings circle. Earn DeFi yield. Powered by Celo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChamaFi — Save Together, Grow Together',
    description: 'Savings circles supercharged with DeFi on Celo.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanlines bg-black text-gray-200 font-mono antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
