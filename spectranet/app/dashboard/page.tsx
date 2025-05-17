'use client'
import StatPanel from '../../components/StatPanel'
import { useDashboardStats, type Stats } from '../../lib/dummyData'

export default function DashboardPage() {
  const stats: Stats = useDashboardStats()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <StatPanel stats={stats} />
    </div>
  )
}
