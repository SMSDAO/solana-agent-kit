'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UserManagement } from '@/components/UserManagement'
import { RoleManager } from '@/components/RoleManager'
import { ActivityLog } from '@/components/ActivityLog'

export default function AdminPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'activity'>('users')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Solana Agent Kit</h1>
              <nav className="hidden md:flex space-x-4">
                <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </a>
                <a href="/admin" className="text-white hover:text-blue-300 transition-colors">
                  Admin
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-yellow-400 text-sm font-semibold">Admin</p>
                <p className="text-gray-400 text-xs">{session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
          <p className="text-gray-300">
            Manage users, roles, and system settings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 bg-white/5 backdrop-blur-lg rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'roles'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Role Management
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'activity'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Activity Log
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'roles' && <RoleManager />}
          {activeTab === 'activity' && <ActivityLog />}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-400 text-sm border-t border-white/10 pt-8">
          <p>© 2024 Solana Agent Kit Dashboard • Admin Panel • Secured with Email Authentication</p>
        </div>
      </footer>
    </div>
  )
}
