# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-15

### Added
- **Enterprise Web Dashboard** (`web-dashboard/`) built with Next.js 14, React 18, Tailwind CSS
  - Neo-Glow Solana-themed design system with gradient effects and glow highlights
  - Tab-based navigation: Home, Dashboard, Users, Admin, Developer, Settings, Docs
  - User Dashboard: wallet overview, SOL balance, token holdings, transaction history
  - Admin Dashboard: user management, role management, activity log
  - Developer Dashboard: tool explorer, API monitoring, environment management, integration testing
  - Responsive layout supporting web and mobile viewports
  - PWA manifest for installable web app
- **Authentication & RBAC**
  - Wallet-based authentication via Solana Wallet Adapter (Phantom, Solflare, Torus, Ledger)
  - Email/password authentication via `next-auth` with `bcryptjs` password hashing
  - JWT sessions with 30-day expiry
  - RBAC roles: Admin, Developer, User, Auditor
  - Protected routes with role enforcement
- **Security hardening**
  - Next.js middleware with CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy headers
  - Rate limiting middleware for API routes
  - Input validation throughout API routes
  - CSRF protection via `next-auth`
- **API endpoints**
  - `GET /api/health` — service health check
  - `GET /api/metrics` — system metrics (agent calls, protocol interactions, uptime)
  - `GET /api/tools` — Solana agent tool catalog (30+ protocol integrations)
- **CI/CD Workflows**
  - `dashboard-ci.yml` — builds and lints the web dashboard on every push/PR
  - `security.yml` — dependency audit and secret scanning (weekly + on push)
  - `release.yml` — automated GitHub Release creation on version tags
- **Documentation** (`docs/`)
  - `architecture.md` — SDK architecture, agent design, protocol integrations
  - `deployment.md` — deploy to Vercel and self-hosted environments
  - `env-vars.md` — all required environment variables
  - `user-guide.md` — using the SDK and dashboard as an end user
  - `admin-guide.md` — admin dashboard usage guide
  - `developer-guide.md` — contributing, testing, local dev setup
- `CHANGELOG.md` — this file (Keep-a-Changelog format)
- `README.md` UI Preview section with dashboard screenshots

### Changed
- Updated `web-dashboard/` globals.css with Neo-Glow design tokens and animation utilities
- Updated `web-dashboard/tailwind.config.js` with extended Neo-Glow color palette
- Updated `web-dashboard/.env.example` with all required environment variables
- Updated root `.env.example` with web dashboard variables
- `README.md` expanded with UI preview and updated docs links

### Fixed
- Dashboard navigation tabs now use Next.js `<Link>` for proper client-side routing
- Wallet disconnect now redirects to home page correctly
- Admin login form handles network errors gracefully

### Security
- Removed hardcoded demo credentials from production code paths (guarded by `NEXT_PUBLIC_ADMIN_DEMO_MODE`)
- Security headers applied via Next.js middleware
- Dependency audit integrated into CI pipeline

## [1.4.8] - 2025-01-01

### Changed
- SDK version 1.4.8 — maintenance release with protocol SDK updates

## [1.0.0-beta] - 2024-06-01

### Added
- Initial public release of Solana Agent Kit
- LangChain tool integrations for 30+ Solana protocols
- Vercel AI SDK support
- MCP (Model Context Protocol) server
- LangGraph agent integration
- Support for: Raydium, Orca, Meteora, Drift, Metaplex, Jupiter, SPL tokens, Anchor, Light Protocol, Mayan, TipLink, Voltr, SolutioFi, Switchboard, Squads

[Unreleased]: https://github.com/SMSDAO/solana-agent-kit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SMSDAO/solana-agent-kit/compare/v1.4.8...v1.0.0
[1.4.8]: https://github.com/SMSDAO/solana-agent-kit/compare/v1.0.0-beta...v1.4.8
[1.0.0-beta]: https://github.com/SMSDAO/solana-agent-kit/releases/tag/v1.0.0-beta
