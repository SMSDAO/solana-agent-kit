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
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
      {/* Background glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-blob"
             style={{ background: 'radial-gradient(circle, #9945FF, transparent)' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 animate-blob animation-delay-2000"
             style={{ background: 'radial-gradient(circle, #14F195, transparent)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-10 animate-blob animation-delay-4000"
             style={{ background: 'radial-gradient(circle, #00C2FF, transparent)' }} />
      </div>

      <div className="max-w-4xl w-full relative">
        <div className="neo-card p-8 md:p-12">
          <div className="text-center space-y-8">
            {/* Logo/Header */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                   style={{ background: 'linear-gradient(135deg, #9945FF, #14F195)' }}>
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Solana Agent Kit
              </h1>
              <p className="text-xl md:text-2xl" style={{ color: '#c4b5fd' }}>
                Enterprise Dashboard &amp; Admin Panel
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 text-left my-8">
              {[
                { icon: '📊', title: 'Dashboard', desc: 'Portfolio tracking, transactions, and analytics' },
                { icon: '🛡️', title: 'Admin Panel', desc: 'Manage users with role-based access control' },
                { icon: '⚙️', title: 'Developer Tools', desc: '30+ Solana protocol tool explorer and testing console' },
                { icon: '🔐', title: 'Wallet Auth', desc: 'Secure login with Phantom, Solflare, and more' },
              ].map(f => (
                <div key={f.title} className="neo-card p-4">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Wallet Connect Button */}
            <div className="flex flex-col items-center space-y-4">
              <p className="text-gray-400">Connect your Solana wallet to get started</p>
              <WalletMultiButton />
            </div>

            {/* Footer Info */}
            <div className="text-sm text-gray-500 mt-8 pt-8 border-t border-white/10">
              <p>Powered by Solana Agent Kit v1.4.8 &bull; Deployable on Vercel</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
