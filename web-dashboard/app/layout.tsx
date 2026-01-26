import './globals.css'
import type { Metadata } from 'next'
import { WalletProvider } from '@/components/WalletProvider'

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
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
