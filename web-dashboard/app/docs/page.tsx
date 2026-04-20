export default function DocsPage() {
  const guides = [
    {
      title: 'Architecture',
      description: 'SDK architecture, agent design, and protocol integrations',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/architecture.md',
      icon: '🏗️',
    },
    {
      title: 'Deployment',
      description: 'Deploy to Vercel or self-hosted environments',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/deployment.md',
      icon: '🚀',
    },
    {
      title: 'Environment Variables',
      description: 'All required environment variables and how to set them',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/env-vars.md',
      icon: '🔧',
    },
    {
      title: 'User Guide',
      description: 'How to use the SDK and dashboard as an end user',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/user-guide.md',
      icon: '👤',
    },
    {
      title: 'Admin Guide',
      description: 'Admin dashboard usage, RBAC, and system management',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/admin-guide.md',
      icon: '🛡️',
    },
    {
      title: 'Developer Guide',
      description: 'Contributing, testing, adding new protocol integrations',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/docs/guides/developer-guide.md',
      icon: '⚙️',
    },
    {
      title: 'CHANGELOG',
      description: 'Full changelog with all releases and changes',
      href: 'https://github.com/SMSDAO/solana-agent-kit/blob/main/CHANGELOG.md',
      icon: '📋',
    },
    {
      title: 'SDK API Reference',
      description: 'TypeDoc-generated SDK API documentation',
      href: 'https://docs.sendai.fun/v0/introduction',
      icon: '📖',
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-gray-400">Guides, API references, and resources for Solana Agent Kit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map(guide => (
          <a
            key={guide.title}
            href={guide.href}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-card p-6 flex flex-col group no-underline"
          >
            <div className="text-3xl mb-3">{guide.icon}</div>
            <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
              {guide.title}
            </h3>
            <p className="text-gray-400 text-sm flex-1">{guide.description}</p>
            <div className="mt-4 text-purple-400 text-sm flex items-center gap-1 group-hover:text-purple-300">
              View guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 neo-card p-6">
        <h2 className="text-xl font-semibold text-white mb-3">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          <a href="https://github.com/SMSDAO/solana-agent-kit" target="_blank" rel="noopener noreferrer"
             className="badge-purple hover:opacity-80 transition-opacity no-underline">
            GitHub Repository
          </a>
          <a href="https://www.npmjs.com/package/solana-agent-kit" target="_blank" rel="noopener noreferrer"
             className="badge-green hover:opacity-80 transition-opacity no-underline">
            npm Package
          </a>
          <a href="https://vercel.com/new/clone?repository-url=https://github.com/SMSDAO/solana-agent-kit" target="_blank" rel="noopener noreferrer"
             className="badge-blue hover:opacity-80 transition-opacity no-underline">
            Deploy to Vercel
          </a>
        </div>
      </div>
    </main>
  )
}
