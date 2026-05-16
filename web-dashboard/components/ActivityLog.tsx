'use client'

import { useState } from 'react'

interface Activity {
  id: string
  user: string
  action: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

export function ActivityLog() {
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      user: '8xz...abc',
      action: 'User logged in',
      timestamp: '2 minutes ago',
      status: 'success',
    },
    {
      id: '2',
      user: '9yz...def',
      action: 'Role changed to Moderator',
      timestamp: '15 minutes ago',
      status: 'warning',
    },
    {
      id: '3',
      user: '7wx...ghi',
      action: 'Failed login attempt',
      timestamp: '1 hour ago',
      status: 'error',
    },
    {
      id: '4',
      user: '8xz...abc',
      action: 'Created new user',
      timestamp: '2 hours ago',
      status: 'success',
    },
    {
      id: '5',
      user: '9yz...def',
      action: 'Updated settings',
      timestamp: '3 hours ago',
      status: 'success',
    },
  ])

  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all')

  const filteredActivities = activities.filter(
    (activity) => filter === 'all' || activity.status === filter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✗'
      default:
        return '•'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">Activity Log</h3>
        <div className="flex space-x-2">
          {(['all', 'success', 'warning', 'error'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No activities found</p>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className={`text-xl ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-semibold">{activity.action}</p>
                    <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                  </div>
                  <p className="text-gray-400 text-sm">User: {activity.user}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Export Button */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Export Activity Log
        </button>
      </div>
    </div>
  )
}
