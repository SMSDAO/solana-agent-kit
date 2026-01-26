'use client'

import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()

  useEffect(() => {
    if (connected && publicKey) {
      router.push('/dashboard')
    }
  }, [connected, publicKey, router])

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="text-center space-y-8">
            {/* Logo/Header */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Solana Agent Kit
              </h1>
              <p className="text-xl md:text-2xl text-blue-200">
                Full Dashboard & Admin Panel
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 text-left my-8">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-lg font-semibold text-white mb-1">Dashboard</h3>
                <p className="text-sm text-gray-300">View your portfolio, transactions, and analytics</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="text-lg font-semibold text-white mb-1">Admin Panel</h3>
                <p className="text-sm text-gray-300">Manage users with role-based access control</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="text-lg font-semibold text-white mb-1">Wallet Auth</h3>
                <p className="text-sm text-gray-300">Secure login with Phantom, Solflare, and more</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="text-lg font-semibold text-white mb-1">Multi-Network</h3>
                <p className="text-sm text-gray-300">Support for Mainnet, Testnet, and Devnet</p>
              </div>
            </div>

            {/* Wallet Connect Button */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-300">Connect your Solana wallet to get started</p>
              <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
            </div>

            {/* Footer Info */}
            <div className="text-sm text-gray-400 mt-8 pt-8 border-t border-white/10">
              <p>Powered by Solana Agent Kit • Deployable on Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
