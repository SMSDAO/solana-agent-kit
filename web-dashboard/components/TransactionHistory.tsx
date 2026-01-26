'use client'

export function TransactionHistory() {
  const transactions = [
    {
      type: 'Received',
      amount: '0.5 SOL',
      from: '8xz...abc',
      timestamp: '2 hours ago',
      status: 'Success',
    },
    {
      type: 'Sent',
      amount: '1.2 SOL',
      to: '9yz...def',
      timestamp: '5 hours ago',
      status: 'Success',
    },
    {
      type: 'Swap',
      amount: '10 USDC → 0.1 SOL',
      timestamp: '1 day ago',
      status: 'Success',
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No transactions yet</p>
        ) : (
          transactions.map((tx, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{tx.type}</p>
                  <p className="text-gray-400 text-sm">{tx.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm font-semibold">{tx.status}</p>
                  <p className="text-gray-400 text-xs">{tx.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {transactions.length > 0 && (
        <button className="mt-4 w-full text-center text-primary-400 hover:text-primary-300 text-sm font-semibold">
          View All Transactions →
        </button>
      )}
    </div>
  )
}
