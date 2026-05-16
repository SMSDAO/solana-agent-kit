import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const TOOLS = [
  { name: 'jupiter_swap', protocol: 'Jupiter', category: 'DeFi', description: 'Swap tokens using Jupiter aggregator' },
  { name: 'raydium_create_amm_v4', protocol: 'Raydium', category: 'DeFi', description: 'Create a Raydium AMM v4 pool' },
  { name: 'orca_create_whirlpool', protocol: 'Orca', category: 'DeFi', description: 'Create an Orca Whirlpool position' },
  { name: 'meteora_create_dlmm', protocol: 'Meteora', category: 'DeFi', description: 'Create a Meteora DLMM pool' },
  { name: 'drift_open_perp_trade', protocol: 'Drift', category: 'Perps', description: 'Open a perpetual trade on Drift' },
  { name: 'metaplex_mint_nft', protocol: 'Metaplex', category: 'NFT', description: 'Mint an NFT using Metaplex' },
  { name: 'spl_transfer_token', protocol: 'SPL Token', category: 'Token', description: 'Transfer SPL tokens' },
  { name: 'light_compressed_airdrop', protocol: 'Light Protocol', category: 'Token', description: 'Send compressed token airdrop' },
  { name: 'mayan_cross_chain_swap', protocol: 'Mayan', category: 'Bridge', description: 'Cross-chain swap via Mayan Finance' },
  { name: 'switchboard_simulate_feed', protocol: 'Switchboard', category: 'Oracle', description: 'Simulate a Switchboard oracle feed' },
]

export async function GET() {
  return NextResponse.json({
    tools: TOOLS,
    count: TOOLS.length,
    timestamp: new Date().toISOString(),
  })
}
