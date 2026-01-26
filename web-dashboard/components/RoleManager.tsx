'use client'

import { useState } from 'react'

interface Role {
  id: string
  name: string
  permissions: string[]
  userCount: number
}

export function RoleManager() {
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      permissions: ['manage_users', 'manage_roles', 'view_analytics', 'manage_settings'],
      userCount: 2,
    },
    {
      id: '2',
      name: 'Moderator',
      permissions: ['view_users', 'view_analytics'],
      userCount: 5,
    },
    {
      id: '3',
      name: 'User',
      permissions: ['view_dashboard'],
      userCount: 150,
    },
  ])

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">Role Management</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Create Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-primary-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-white">{role.name}</h4>
              <span className="text-gray-400 text-sm">{role.userCount} users</span>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-white/10">
              <button className="flex-1 text-primary-400 hover:text-primary-300 text-sm font-semibold">
                Edit
              </button>
              {role.name !== 'Admin' && (
                <button className="flex-1 text-red-400 hover:text-red-300 text-sm font-semibold">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">Permission Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/20">
                <th className="pb-3 text-gray-300">Permission</th>
                <th className="pb-3 text-gray-300 text-center">Admin</th>
                <th className="pb-3 text-gray-300 text-center">Moderator</th>
                <th className="pb-3 text-gray-300 text-center">User</th>
              </tr>
            </thead>
            <tbody>
              {['Manage Users', 'Manage Roles', 'View Analytics', 'Manage Settings', 'View Dashboard'].map((permission) => (
                <tr key={permission} className="border-b border-white/10">
                  <td className="py-3 text-white">{permission}</td>
                  <td className="py-3 text-center">
                    <span className="text-green-400">✓</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={permission.includes('Manage') ? 'text-red-400' : 'text-green-400'}>
                      {permission.includes('Manage') ? '✗' : '✓'}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={permission === 'View Dashboard' ? 'text-green-400' : 'text-red-400'}>
                      {permission === 'View Dashboard' ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
