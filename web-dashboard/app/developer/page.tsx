'use client'

import { useState, useEffect } from 'react'

interface Tool {
  name: string
  description: string
  protocol: string
  category: string
}

const TOOLS_DATA: Tool[] = [
  { name: 'jupiter_swap', description: 'Swap tokens using Jupiter aggregator', protocol: 'Jupiter', category: 'DeFi' },
  { name: 'raydium_create_amm_v4', description: 'Create a Raydium AMM v4 pool', protocol: 'Raydium', category: 'DeFi' },
  { name: 'raydium_create_clmm', description: 'Create a Raydium CLMM concentrated liquidity pool', protocol: 'Raydium', category: 'DeFi' },
  { name: 'orca_create_whirlpool', description: 'Create an Orca Whirlpool position', protocol: 'Orca', category: 'DeFi' },
  { name: 'meteora_create_dlmm', description: 'Create a Meteora DLMM pool', protocol: 'Meteora', category: 'DeFi' },
  { name: 'drift_open_perp_trade', description: 'Open a perpetual trade on Drift', protocol: 'Drift', category: 'Perps' },
  { name: 'drift_close_perp_trade', description: 'Close a perpetual trade on Drift', protocol: 'Drift', category: 'Perps' },
  { name: 'metaplex_mint_nft', description: 'Mint an NFT using Metaplex', protocol: 'Metaplex', category: 'NFT' },
  { name: 'metaplex_create_collection', description: 'Create an NFT collection', protocol: 'Metaplex', category: 'NFT' },
  { name: 'spl_transfer_token', description: 'Transfer SPL tokens', protocol: 'SPL Token', category: 'Token' },
  { name: 'spl_mint_token', description: 'Mint new SPL tokens', protocol: 'SPL Token', category: 'Token' },
  { name: 'light_compressed_airdrop', description: 'Send compressed token airdrop via Light Protocol', protocol: 'Light Protocol', category: 'Token' },
  { name: 'mayan_cross_chain_swap', description: 'Cross-chain swap via Mayan Finance', protocol: 'Mayan', category: 'Bridge' },
  { name: 'tiplink_create_wallet', description: 'Create a TipLink wallet link', protocol: 'TipLink', category: 'Utility' },
  { name: 'switchboard_simulate_feed', description: 'Simulate a Switchboard oracle feed', protocol: 'Switchboard', category: 'Oracle' },
  { name: 'pyth_get_price', description: 'Get asset price from Pyth Network', protocol: 'Pyth', category: 'Oracle' },
  { name: 'allora_get_inference', description: 'Get AI price inference from Allora', protocol: 'Allora', category: 'Oracle' },
  { name: 'squads_create_multisig', description: 'Create a Squads multisig wallet', protocol: 'Squads', category: 'Governance' },
  { name: 'bonfida_register_domain', description: 'Register a .sol domain name', protocol: 'Bonfida', category: 'DNS' },
  { name: 'tensor_list_nft', description: 'List an NFT on Tensor marketplace', protocol: 'Tensor', category: 'NFT' },
  { name: 'voltr_deposit_strategy', description: 'Deposit into a Voltr vault strategy', protocol: 'Voltr', category: 'DeFi' },
  { name: 'solutiofi_aggregated_swap', description: 'Execute an aggregated DeFi operation via SolutioFi', protocol: 'SolutioFi', category: 'DeFi' },
  { name: 'flash_open_trade', description: 'Open a trade on Flash Protocol', protocol: 'Flash', category: 'Perps' },
  { name: 'manifest_create_market', description: 'Create a CLOB market on Manifest', protocol: 'Manifest', category: 'DeFi' },
  { name: 'three_land_create_nft', description: 'Create and list NFT on 3.Land', protocol: '3Land', category: 'NFT' },
]

const categories = ['All', ...Array.from(new Set(TOOLS_DATA.map(t => t.category)))]

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState<'tools' | 'monitoring' | 'environment' | 'testing'>('tools')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [metrics, setMetrics] = useState<any>(null)
  const [testOutput, setTestOutput] = useState<string>('')
  const [testLoading, setTestLoading] = useState(false)

  useEffect(() => {
    if (activeTab === 'monitoring') {
      fetch('/api/metrics')
        .then(r => r.json())
        .then(setMetrics)
        .catch(() => null)
    }
  }, [activeTab])

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.protocol.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const runHealthCheck = async () => {
    setTestLoading(true)
    setTestOutput('')
    try {
      const res = await fetch('/api/health')
      const data = await res.json()
      setTestOutput(JSON.stringify(data, null, 2))
    } catch (e) {
      setTestOutput(`Error: ${e}`)
    } finally {
      setTestLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Developer Dashboard</h1>
        <p className="text-gray-400">Explore tools, monitor APIs, and manage your development environment</p>
      </div>

      {/* Tab Bar */}
      <div className="flex space-x-1 neo-card p-1 mb-8 w-fit">
        {(['tools', 'monitoring', 'environment', 'testing'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            style={activeTab === tab ? {
              background: 'linear-gradient(135deg, rgba(153,69,255,0.3), rgba(20,241,149,0.05))',
              boxShadow: '0 0 12px rgba(153,69,255,0.2)',
            } : {}}
          >
            {tab === 'tools' ? '🔧 Tools' :
             tab === 'monitoring' ? '📈 Monitoring' :
             tab === 'environment' ? '🌍 Environment' : '🧪 Testing'}
          </button>
        ))}
      </div>

      {/* Tool Explorer */}
      {activeTab === 'tools' && (
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="search"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="neo-input flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white neo-card'
                  }`}
                  style={selectedCategory === cat ? {
                    background: 'linear-gradient(135deg, #7c3aed, #9945FF)',
                    boxShadow: '0 0 12px rgba(153,69,255,0.3)',
                  } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4">{filteredTools.length} tools found</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div key={tool.name} className="neo-card p-4 group">
                <div className="flex items-start justify-between mb-2">
                  <span className="badge-purple">{tool.protocol}</span>
                  <span className="text-xs text-gray-500">{tool.category}</span>
                </div>
                <h3 className="text-white font-mono text-sm font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-xs">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Monitoring */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          {metrics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="neo-card p-6">
                  <p className="text-gray-400 text-sm mb-1">Total API Calls (24h)</p>
                  <p className="text-3xl font-bold text-white">{metrics.calls_24h ?? '—'}</p>
                </div>
                <div className="neo-card p-6">
                  <p className="text-gray-400 text-sm mb-1">Error Rate</p>
                  <p className="text-3xl font-bold text-green-400">{metrics.error_rate ?? '0.0'}%</p>
                </div>
                <div className="neo-card p-6">
                  <p className="text-gray-400 text-sm mb-1">Uptime</p>
                  <p className="text-3xl font-bold text-green-400">{metrics.uptime ?? '100'}%</p>
                </div>
              </div>
              <div className="neo-card p-6">
                <h3 className="text-white font-semibold mb-4">Raw Metrics</h3>
                <pre className="text-green-400 text-xs font-mono overflow-auto">
                  {JSON.stringify(metrics, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="neo-card p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading metrics...</p>
            </div>
          )}
        </div>
      )}

      {/* Environment */}
      {activeTab === 'environment' && (
        <div className="space-y-6">
          <div className="neo-card p-6">
            <h3 className="text-white font-semibold mb-4">RPC Configuration</h3>
            <div className="space-y-3">
              {[
                { label: 'Mainnet RPC', env: 'NEXT_PUBLIC_SOLANA_MAINNET_RPC', default: 'https://api.mainnet-beta.solana.com' },
                { label: 'Devnet RPC', env: 'NEXT_PUBLIC_SOLANA_DEVNET_RPC', default: 'https://api.devnet.solana.com' },
                { label: 'Testnet RPC', env: 'NEXT_PUBLIC_SOLANA_TESTNET_RPC', default: 'https://api.testnet.solana.com' },
              ].map(item => (
                <div key={item.env} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                  <span className="text-purple-300 text-xs font-mono">{item.default}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="neo-card p-6">
            <h3 className="text-white font-semibold mb-4">Environment Variables</h3>
            <p className="text-gray-400 text-sm mb-4">
              Configure via <code className="text-purple-300 bg-purple-500/10 px-1 rounded">.env.local</code> in the web-dashboard directory.
              See <a href="https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/env-vars.md"
                className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">
                env-vars.md
              </a> for the full list.
            </p>
            <div className="space-y-2">
              {['NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'NEXT_PUBLIC_SOLANA_MAINNET_RPC', 'NEXT_PUBLIC_DEFAULT_NETWORK'].map(v => (
                <div key={v} className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integration Testing */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          <div className="neo-card p-6">
            <h3 className="text-white font-semibold mb-4">Health Check</h3>
            <p className="text-gray-400 text-sm mb-4">Test the <code className="text-purple-300 bg-purple-500/10 px-1 rounded">GET /api/health</code> endpoint.</p>
            <button
              onClick={runHealthCheck}
              disabled={testLoading}
              className="neo-btn text-white text-sm px-6 py-2 disabled:opacity-50"
            >
              {testLoading ? 'Running...' : 'Run Health Check'}
            </button>
            {testOutput && (
              <pre className="mt-4 text-green-400 text-xs font-mono bg-black/30 p-4 rounded-lg overflow-auto border border-white/10">
                {testOutput}
              </pre>
            )}
          </div>

          <div className="neo-card p-6">
            <h3 className="text-white font-semibold mb-2">SDK Integration Test</h3>
            <p className="text-gray-400 text-sm">
              To test SDK agent actions, use the CLI test runner:
            </p>
            <pre className="mt-3 text-purple-300 text-xs font-mono bg-black/30 p-4 rounded-lg border border-white/10">
{`# From the repository root:
pnpm test              # Main agent test
pnpm test:vercel-ai    # Vercel AI SDK
pnpm test:mcp          # MCP server`}
            </pre>
          </div>
        </div>
      )}
    </main>
  )
}
