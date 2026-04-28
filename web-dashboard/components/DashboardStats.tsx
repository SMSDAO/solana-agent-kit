'use client'

interface DashboardStatsProps {
  balance: number
  loading: boolean
}

export function DashboardStats({ balance, loading }: DashboardStatsProps) {
  const stats = [
    {
      title: 'SOL Balance',
      value: loading ? '...' : `${balance.toFixed(4)} SOL`,
      change: '+0%',
      icon: '💰',
    },
    {
      title: 'Portfolio Value',
      value: loading ? '...' : `$${(balance * 100).toFixed(2)}`,
      change: '+0%',
      icon: '📊',
    },
    {
      title: 'Transactions',
      value: '0',
      change: '+0%',
      icon: '📝',
    },
    {
      title: 'NFTs Owned',
      value: '0',
      change: '+0%',
      icon: '🖼️',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:border-primary-500 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{stat.icon}</span>
            <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
          </div>
          <h3 className="text-gray-300 text-sm mb-2">{stat.title}</h3>
          <p className="text-white text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
