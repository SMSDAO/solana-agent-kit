'use client'

import { useEffect, useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { DashboardStats } from '@/components/DashboardStats'
import { TransactionHistory } from '@/components/TransactionHistory'
import { TokenHoldings } from '@/components/TokenHoldings'
import { NetworkSelector } from '@/components/NetworkSelector'

export default function DashboardPage() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!connected) {
      router.push('/')
    }
  }, [connected, router])

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const bal = await connection.getBalance(publicKey)
          setBalance(bal / LAMPORTS_PER_SOL)
        } catch (error) {
          console.error('Error fetching balance:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchBalance()
  }, [publicKey, connection])

  if (!connected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Solana Remix AI</h1>
              <nav className="hidden md:flex space-x-4">
                <a href="/dashboard" className="text-white hover:text-blue-300 transition-colors">
                  Dashboard
                </a>
                <a href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Admin
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <NetworkSelector />
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-300">
            Wallet: {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
          </p>
        </div>

        {/* Stats Overview */}
        <DashboardStats balance={balance} loading={loading} />

        {/* Grid Layout for Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Token Holdings */}
          <TokenHoldings />

          {/* Transaction History */}
          <TransactionHistory />
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Send SOL
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Swap Tokens
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Stake SOL
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              View NFTs
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-400 text-sm border-t border-white/10 pt-8">
          <p>© 2024 Solana Remix AI Dashboard • Built with Next.js • Deployable on Vercel</p>
        </div>
      </footer>
    </div>
  )
}
