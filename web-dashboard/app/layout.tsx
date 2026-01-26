import './globals.css'
import type { Metadata } from 'next'
import { WalletProvider } from '@/components/WalletProvider'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Solana Agent Kit Dashboard',
  description: 'Full-featured dashboard for Solana Agent Kit with wallet authentication and admin panels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
