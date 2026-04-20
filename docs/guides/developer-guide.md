# Developer Guide

## Prerequisites

- Node.js >= 22
- pnpm >= 9.15.3
- Git

---

## Local Setup

### SDK

```bash
# Clone the repository
git clone https://github.com/SMSDAO/solana-agent-kit.git
cd solana-agent-kit

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your RPC URL, private key, and API keys

# Build the SDK
pnpm build

# Run tests (requires OPENAI_API_KEY in .env)
pnpm test
```

### Web Dashboard

```bash
cd web-dashboard

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local

# Run development server
npm run dev
# → http://localhost:3000
```

---

## SDK Architecture

See [architecture.md](./architecture.md) for a full structural overview.

### Adding a New Protocol Integration

1. Create an action file: `src/actions/your-protocol/action-name.ts`
2. Export it from `src/actions/index.ts`
3. Add the method to `SolanaAgentKit` in `src/agent/index.ts`
4. Create a LangChain tool wrapper in `src/langchain/`
5. Create a Vercel AI tool wrapper in `src/vercel-ai/`
6. Add to the MCP server in `src/mcp/`
7. Write tests in `test/`

### LangChain Tool Naming Rules

Tool names must be unique across all LangChain tools. Run the duplicate checker before committing:

```bash
pnpm check-tool-names:langchain
```

---

## Testing

```bash
# Main agent test
pnpm test

# Vercel AI SDK test
pnpm test:vercel-ai

# MCP server test
pnpm test:mcp

# Check LangChain tool name duplicates
pnpm check-tool-names:langchain
```

Tests require real API keys and RPC access. They make live Solana network calls (devnet by default).

---

## Building

```bash
# Build TypeScript to dist/
pnpm build

# Generate TypeDoc documentation
pnpm docs

# Lint
pnpm lint

# Lint + auto-fix
pnpm lint:fix

# Format with Prettier
pnpm format
```

---

## Developer Dashboard

The Developer Dashboard at `/developer` provides:

- **Tool Explorer** — browse all 30+ Solana protocol tool definitions with their input schemas
- **API Monitoring** — live metrics from `/api/metrics`
- **Log Viewer** — agent execution logs
- **Environment Management** — RPC endpoint configuration, model selection
- **Integration Testing** — run agent actions interactively in the browser

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests and lint: `pnpm lint && pnpm build`
5. Commit with a descriptive message
6. Open a Pull Request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full contributing guide.

---

## CI/CD

| Workflow | File | Trigger |
|---|---|---|
| SDK CI | `.github/workflows/build.yml` | push / PR to main |
| Dashboard CI | `.github/workflows/dashboard-ci.yml` | push / PR (web-dashboard changes) |
| Security | `.github/workflows/security.yml` | push / PR + weekly |
| Release | `.github/workflows/release.yml` | tag push (`v*`) |

---

## Release Process

1. Update `CHANGELOG.md` with the new version section
2. Bump version in `package.json`
3. Commit: `git commit -m "chore: release v1.x.x"`
4. Tag: `git tag v1.x.x`
5. Push with tags: `git push --follow-tags`
6. The `release.yml` workflow creates the GitHub Release automatically
