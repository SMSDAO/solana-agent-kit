'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const tabs = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Users', href: '/users', icon: '👥', adminOnly: true },
  { label: 'Admin', href: '/admin', icon: '🛡️', adminOnly: true },
  { label: 'Developer', href: '/developer', icon: '🔧' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
  { label: 'Docs', href: '/docs', icon: '📚' },
]

export function Navigation() {
  const pathname = usePathname()
  const { connected } = useWallet()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAdmin = session?.user?.role === 'admin'

  const visibleTabs = tabs.filter(tab => {
    if (tab.adminOnly && !isAdmin) return false
    return true
  })

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
            style={{ boxShadow: '0 4px 24px rgba(153, 69, 255, 0.1)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #9945FF, #14F195)' }}>
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">Solana Agent Kit</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {visibleTabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(153,69,255,0.2), rgba(20,241,149,0.05))',
                    boxShadow: '0 0 12px rgba(153,69,255,0.2)',
                    borderBottom: '2px solid #9945FF',
                  } : {}}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {connected && <WalletMultiButton />}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-400 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-white/10 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
            {visibleTabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-purple-500/20 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
