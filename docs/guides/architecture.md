# Architecture

## Overview

Solana Agent Kit is a TypeScript SDK that connects AI agents to Solana blockchain protocols. It provides a unified interface for 30+ protocol integrations through LangChain tools, Vercel AI SDK tools, and MCP (Model Context Protocol) servers.

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Agent Frameworks                        │
│   LangChain / LangGraph    Vercel AI SDK    MCP Server       │
└─────────────────┬───────────────┬───────────────┬───────────┘
                  │               │               │
┌─────────────────▼───────────────▼───────────────▼───────────┐
│                    Solana Agent Kit SDK                       │
│  src/langchain/   src/vercel-ai/   src/mcp/                  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │                  SolanaAgentKit                      │     │
│  │  - wallet keypair / public key                       │     │
│  │  - RPC connection                                    │     │
│  │  - protocol action methods                           │     │
│  └────────────────────┬────────────────────────────────┘     │
│                        │                                       │
│  ┌─────────────────────▼──────────────────────────────┐      │
│  │               Protocol Actions (src/actions/)        │      │
│  │  Raydium · Orca · Meteora · Drift · Metaplex        │      │
│  │  Jupiter · SPL · Anchor · Light · Mayan · TipLink   │      │
│  │  Voltr · SolutioFi · Switchboard · Squads · 15+     │      │
│  └─────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                          │
              ┌───────────▼────────────┐
              │  Solana Blockchain      │
              │  Mainnet / Devnet /     │
              │  Testnet                │
              └────────────────────────┘
```

## Core Modules

### `src/agent/`
The `SolanaAgentKit` class — the primary entry point. Holds the wallet keypair, RPC connection, and exposes all protocol action methods.

### `src/actions/`
Individual action implementations organized by protocol. Each action is a standalone async function that accepts the agent and parameters, then executes the on-chain operation.

### `src/langchain/`
LangChain `DynamicStructuredTool` wrappers around each action. These tools conform to the LangChain tool interface and can be used with any LangChain agent or chain.

### `src/vercel-ai/`
Vercel AI SDK tool definitions. These expose the same actions as callable tools for use with the `ai` package from Vercel.

### `src/mcp/`
Model Context Protocol server. Allows AI systems that speak MCP to invoke Solana agent actions as tools.

### `src/tools/`
Shared tool utilities — Zod schemas, input validation helpers, tool descriptors.

### `src/utils/`
Utility functions: keypair generation, connection helpers, token metadata, analytics.

### `src/types/`
Shared TypeScript types and interfaces used across all modules.

### `src/constants/`
Protocol constants, program IDs, cluster endpoints.

## Web Dashboard (`web-dashboard/`)

The enterprise web dashboard is a Next.js 14 application providing:

- **User Dashboard** — wallet overview, portfolio, transaction history
- **Admin Dashboard** — user management, RBAC, audit logs
- **Developer Dashboard** — tool explorer, API monitoring, environment management

### Dashboard Architecture

```
web-dashboard/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (WalletProvider + AuthProvider)
│   ├── page.tsx            # Home / landing page
│   ├── dashboard/          # User dashboard
│   ├── admin/              # Admin dashboard + login
│   ├── developer/          # Developer dashboard
│   ├── users/              # User management (admin-only)
│   ├── settings/           # User settings
│   └── api/                # API routes
│       ├── auth/           # NextAuth.js handler
│       ├── health/         # Health check endpoint
│       ├── metrics/        # Metrics endpoint
│       └── tools/          # Tool catalog endpoint
├── components/             # Reusable React components
└── middleware.ts           # Security headers + rate limiting
```

## Protocol Integrations

| Protocol | Actions |
|---|---|
| Jupiter | Token swaps, limit orders |
| Raydium | AMM pools, liquidity, CLMM |
| Orca | Whirlpool positions |
| Meteora | DLMM pools, alpha vaults |
| Drift | Perpetuals, spot trading, vaults |
| Metaplex | NFT minting, collections, metadata |
| SPL Token | Transfer, mint, burn, create |
| Light Protocol | Compressed tokens |
| Mayan | Cross-chain swaps |
| TipLink | Wallet links |
| Voltr | Vault strategies |
| SolutioFi | DeFi aggregation |
| Switchboard | Oracles |
| Squads | Multisig |
| 3Land | NFT listings |
| Allora | AI price feeds |
| Bonfida | SNS name service |
| Tensor | NFT marketplace |
| Pyth | Price feeds |
| Manifest | CLOB trading |
| Flash | Perpetual protocol |
