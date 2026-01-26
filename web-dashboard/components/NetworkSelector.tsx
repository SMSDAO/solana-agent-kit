'use client'

import { useState } from 'react'

export function NetworkSelector() {
  const [network, setNetwork] = useState('mainnet')

  const networks = [
    { id: 'mainnet', name: 'Mainnet', color: 'bg-green-500' },
    { id: 'testnet', name: 'Testnet', color: 'bg-yellow-500' },
    { id: 'devnet', name: 'Devnet', color: 'bg-blue-500' },
  ]

  return (
    <div className="relative">
      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
        className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 pr-8 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {networks.map((net) => (
          <option key={net.id} value={net.id} className="bg-gray-900">
            {net.name}
          </option>
        ))}
      </select>
      <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${networks.find(n => n.id === network)?.color}`} />
    </div>
  )
}
