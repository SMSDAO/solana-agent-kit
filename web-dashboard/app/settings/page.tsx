'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NetworkSelector } from '@/components/NetworkSelector'

const SDK_VERSION = process.env.NEXT_PUBLIC_SDK_VERSION || '1.4.8'
const DASHBOARD_VERSION = process.env.NEXT_PUBLIC_DASHBOARD_VERSION || '1.0.0'

export default function SettingsPage() {
  const { connected, publicKey, disconnect } = useWallet()

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your wallet, network, and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Wallet */}
        <div className="neo-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Wallet</h2>
          {connected && publicKey ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-400 text-sm">Connected Address</span>
                <span className="text-white text-sm font-mono">
                  {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <WalletMultiButton />
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 text-sm mb-4">No wallet connected</p>
              <WalletMultiButton />
            </div>
          )}
        </div>

        {/* Network */}
        <div className="neo-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Network</h2>
          <p className="text-gray-400 text-sm mb-3">Select the Solana network to connect to</p>
          <NetworkSelector />
        </div>

        {/* About */}
        <div className="neo-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">About</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">SDK Version</span>
              <span className="text-white">v{SDK_VERSION}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dashboard Version</span>
              <span className="text-white">v{DASHBOARD_VERSION}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network</span>
              <span className="text-purple-300">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
