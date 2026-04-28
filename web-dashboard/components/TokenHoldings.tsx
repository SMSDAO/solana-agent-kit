'use client'

export function TokenHoldings() {
  const tokens = [
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: '10.5',
      value: '$1,050.00',
      change: '+5.2%',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '500.00',
      value: '$500.00',
      change: '+0.0%',
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">Token Holdings</h3>
      <div className="space-y-3">
        {tokens.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No tokens found</p>
        ) : (
          tokens.map((token, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{token.symbol}</p>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{token.balance}</p>
                  <p className="text-gray-400 text-sm">{token.value}</p>
                  <p className={`text-xs ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
