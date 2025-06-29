import { useState, useEffect } from 'react'
import { fetchDashboardAnalytics, type DashboardData } from '../services/api'

export interface UseDashboardDataReturn {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await fetchDashboardAnalytics()
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}