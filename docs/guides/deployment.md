# Deployment Guide

## Vercel Deployment (Recommended)

### Dashboard Deployment

1. Fork or clone this repository
2. Connect to Vercel: [vercel.com/new](https://vercel.com/new)
3. Set the **Root Directory** to `web-dashboard`
4. Set the **Framework Preset** to `Next.js`
5. Configure environment variables (see below)
6. Click **Deploy**

### Required Environment Variables for Vercel

```
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_DEVNET_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_DEFAULT_NETWORK=mainnet-beta
```

Optional:
```
NEXT_PUBLIC_ADMIN_DEMO_MODE=false
GITHUB_ID=<GitHub OAuth app client ID>
GITHUB_SECRET=<GitHub OAuth app client secret>
```

---

## Self-Hosted Deployment

### Prerequisites

- Node.js >= 20
- npm or pnpm
- A reverse proxy (nginx / Caddy)

### Steps

```bash
# Clone the repository
git clone https://github.com/SMSDAO/solana-agent-kit.git
cd solana-agent-kit/web-dashboard

# Install dependencies
npm ci

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Build
npm run build

# Start
npm start
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## SDK NPM Package

The core SDK is published to npm as `solana-agent-kit`.

```bash
npm install solana-agent-kit
# or
pnpm add solana-agent-kit
```

---

## Docker (Web Dashboard)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build
cd web-dashboard
docker build -t solana-agent-dashboard .

# Run
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  solana-agent-dashboard
```

---

## CI/CD

The repository includes GitHub Actions workflows:

| Workflow | Trigger | Purpose |
|---|---|---|
| `build.yml` | push / PR | SDK build + lint |
| `dashboard-ci.yml` | push / PR (web-dashboard changes) | Dashboard build + lint |
| `security.yml` | push / PR + weekly | Dependency audit + secret scanning |
| `release.yml` | tag push (`v*`) | GitHub Release creation |
