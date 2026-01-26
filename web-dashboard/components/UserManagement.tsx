'use client'

import { useState } from 'react'

interface User {
  id: string
  wallet: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive'
  joinedAt: string
}

export function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: '1',
      wallet: '8xz...abc',
      role: 'admin',
      status: 'active',
      joinedAt: '2024-01-15',
    },
    {
      id: '2',
      wallet: '9yz...def',
      role: 'moderator',
      status: 'active',
      joinedAt: '2024-01-20',
    },
    {
      id: '3',
      wallet: '7wx...ghi',
      role: 'user',
      status: 'active',
      joinedAt: '2024-01-25',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter((user) =>
    user.wallet.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">User Management</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by wallet address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-white/20">
              <th className="pb-3 text-gray-300 font-semibold">Wallet</th>
              <th className="pb-3 text-gray-300 font-semibold">Role</th>
              <th className="pb-3 text-gray-300 font-semibold">Status</th>
              <th className="pb-3 text-gray-300 font-semibold">Joined</th>
              <th className="pb-3 text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/10">
                <td className="py-4 text-white">{user.wallet}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin'
                        ? 'bg-red-500/20 text-red-300'
                        : user.role === 'moderator'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{user.joinedAt}</td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="text-primary-400 hover:text-primary-300 text-sm">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300 text-sm">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-400 py-8">No users found</p>
      )}
    </div>
  )
}
