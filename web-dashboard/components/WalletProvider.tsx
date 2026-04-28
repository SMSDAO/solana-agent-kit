'use client'

import { FC, ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Get network from environment or default to mainnet
  const network = (process.env.NEXT_PUBLIC_DEFAULT_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Mainnet
  
  // Get RPC endpoint from environment or use default
  const endpoint = useMemo(() => {
    switch (network) {
      case WalletAdapterNetwork.Mainnet:
        return process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC || clusterApiUrl(WalletAdapterNetwork.Mainnet)
      case WalletAdapterNetwork.Testnet:
        return process.env.NEXT_PUBLIC_SOLANA_TESTNET_RPC || clusterApiUrl(WalletAdapterNetwork.Testnet)
      case WalletAdapterNetwork.Devnet:
        return process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC || clusterApiUrl(WalletAdapterNetwork.Devnet)
      default:
        return clusterApiUrl(WalletAdapterNetwork.Mainnet)
    }
  }, [network])

  // Initialize wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
