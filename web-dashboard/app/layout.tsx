import './globals.css'
import type { Metadata } from 'next'
import { WalletProvider } from '@/components/WalletProvider'
import { AuthProvider } from '@/components/AuthProvider'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Solana Agent Kit Dashboard',
  description: 'Enterprise dashboard for Solana Agent Kit — AI-powered Solana protocol integrations',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen" style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a0a2e 100%)' }}>
        <AuthProvider>
          <WalletProvider>
            <Navigation />
            {children}
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

