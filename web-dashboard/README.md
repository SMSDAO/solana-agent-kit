# Solana Agent Kit Dashboard

A full-featured dashboard for Solana Agent Kit with wallet authentication, email-secured admin panels, and role-based access control.

## Features

- 🚀 **Deployable on Vercel** - Ready for one-click deployment
- 📊 **Full Dashboard** - View portfolio, transactions, and analytics
- 👥 **Admin Panels** - User and role management with RBAC
- 🔐 **Dual Authentication** - Smart wallet login for users, secure email login for admins
- 🌐 **Multi-Network Support** - Mainnet, Testnet, and Devnet RPCs

## Quick Start

### Prerequisites

- Node.js >= 18
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SMSDAO/solana-agent-kit.git
cd solana-agent-kit/web-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
- `NEXTAUTH_URL` - Your application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- Optional: Custom RPC URLs for better performance

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

### Email Authentication

The admin panel is secured with email/password authentication using NextAuth.js.

**Demo Credentials:**
- Email: `admin@aiagentkit.com`
- Password: `admin123`

**Access the admin panel at:** [http://localhost:3000/admin](http://localhost:3000/admin)

### Adding Admin Users

To add more admin users, edit the `ADMIN_USERS` array in:
```
app/api/auth/[...nextauth]/route.ts
```

For production, replace the hardcoded users with a database lookup.

## Deployment on Vercel

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSMSDAO%2Fsolana-agent-kit&project-name=solana-agent-kit-dashboard&repository-name=solana-agent-kit)

### Method 2: Manual Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd web-dashboard
vercel
```

3. Follow the prompts to complete deployment.

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set root directory to `web-dashboard`
6. Configure environment variables:
   - `NEXTAUTH_URL` - Your production URL
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXT_PUBLIC_SOLANA_MAINNET_RPC`
   - `NEXT_PUBLIC_SOLANA_TESTNET_RPC`
   - `NEXT_PUBLIC_SOLANA_DEVNET_RPC`
   - `NEXT_PUBLIC_DEFAULT_NETWORK`
7. Click "Deploy"

## Environment Variables

### Required Variables

- `NEXTAUTH_URL` - Application URL (e.g., https://yourdomain.vercel.app)
- `NEXTAUTH_SECRET` - Secret key for session encryption
- `NEXT_PUBLIC_DEFAULT_NETWORK` - Default network (mainnet, testnet, or devnet)

### Preset Public RPCs

The dashboard comes with preset public RPC endpoints:

- **Mainnet**: `https://api.mainnet-beta.solana.com`
- **Testnet**: `https://api.testnet.solana.com`
- **Devnet**: `https://api.devnet.solana.com`

### Optional Variables

For production deployments, consider using premium RPC providers:

```env
# Helius
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# QuickNode
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_KEY/

# Alchemy
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY
```

## Admin Configuration

To set up admin access:

1. Connect your wallet to get your public key
2. Add your wallet address to `NEXT_PUBLIC_ADMIN_WALLETS` in Vercel:
   ```
   NEXT_PUBLIC_ADMIN_WALLETS=YOUR_WALLET_ADDRESS_1,YOUR_WALLET_ADDRESS_2
   ```
3. Redeploy or restart your development server

## Features Overview

### Dashboard
- Real-time SOL balance and portfolio value
- Token holdings with price information
- Transaction history
- Quick actions (Send, Swap, Stake, NFTs)

### Admin Panel
- **User Management**: View and manage all users
- **Role Management**: Create and configure roles with custom permissions
- **Activity Log**: Monitor all system activities and user actions

### Role-Based Access Control (RBAC)

Three default roles:
- **Admin**: Full system access
- **Moderator**: Limited management capabilities
- **User**: Basic dashboard access

Permissions can be customized per role:
- Manage Users
- Manage Roles
- View Analytics
- Manage Settings
- View Dashboard

## Development

### Project Structure

```
web-dashboard/
├── app/
│   ├── dashboard/      # Dashboard page
│   ├── admin/          # Admin panel
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── WalletProvider.tsx
│   ├── DashboardStats.tsx
│   ├── UserManagement.tsx
│   ├── RoleManager.tsx
│   └── ...
├── lib/                # Utility functions
└── public/             # Static assets
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Wallet Integration**: Solana Wallet Adapter
- **Blockchain**: Solana Web3.js

## Security Considerations

1. **Admin Access**: Always use environment variables for admin wallet addresses
2. **RPC Endpoints**: Use authenticated RPCs in production
3. **Wallet Connection**: Users must approve all transactions
4. **Session Management**: Implement proper session handling in production

## Troubleshooting

### Wallet Connection Issues

If you encounter wallet connection problems:
1. Ensure you have a compatible wallet installed (Phantom, Solflare, etc.)
2. Check that you're on the correct network
3. Try refreshing the page and reconnecting

### Build Errors

If you encounter build errors:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Support

For issues and questions:
- GitHub Issues: [https://github.com/SMSDAO/solana-agent-kit/issues](https://github.com/SMSDAO/solana-agent-kit/issues)
- Documentation: [https://docs.sendai.fun](https://docs.sendai.fun)

## License

Apache-2.0 License - see [LICENSE](../LICENSE) file for details
