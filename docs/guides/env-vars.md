# Environment Variables

## SDK (Root)

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `RPC_URL` | Yes | Solana RPC endpoint URL |
| `SOLANA_PRIVATE_KEY` | Yes | Base58-encoded wallet private key |
| `OPENAI_API_KEY` | Yes | OpenAI API key for AI agent |
| `GROQ_API_KEY` | No | Groq API key (alternative LLM provider) |
| `ANTHROPIC_API_KEY` | No | Anthropic API key (alternative LLM provider) |

---

## Web Dashboard (`web-dashboard/`)

Copy `web-dashboard/.env.example` and fill in your values:

```bash
cp web-dashboard/.env.example web-dashboard/.env.local
```

### Required

| Variable | Description | Example |
|---|---|---|
| `NEXTAUTH_SECRET` | Secret for JWT signing. Generate: `openssl rand -base64 32` | `abc123...` |
| `NEXTAUTH_URL` | Full URL of the application | `http://localhost:3000` |

### Solana RPC

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SOLANA_MAINNET_RPC` | Mainnet RPC endpoint | `https://api.mainnet-beta.solana.com` |
| `NEXT_PUBLIC_SOLANA_DEVNET_RPC` | Devnet RPC endpoint | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_SOLANA_TESTNET_RPC` | Testnet RPC endpoint | `https://api.testnet.solana.com` |
| `NEXT_PUBLIC_DEFAULT_NETWORK` | Default network | `mainnet-beta` |

### Optional — OAuth Providers

| Variable | Description |
|---|---|
| `GITHUB_ID` | GitHub OAuth App Client ID |
| `GITHUB_SECRET` | GitHub OAuth App Client Secret |

### Optional — Feature Flags

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_ADMIN_DEMO_MODE` | Show demo credentials on login page | `false` |

---

## Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Security Notes

- **Never commit real secrets** to version control
- Use `.env.local` for local development (it is `.gitignore`d by Next.js)
- In production, inject secrets via your deployment platform (Vercel env vars, GitHub Secrets, etc.)
- The `SOLANA_PRIVATE_KEY` grants full control of the wallet — keep it secure
