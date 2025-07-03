import { useState, useEffect } from 'react'
import { fetchDashboardAnalytics, fetchExtendedDashboardAnalytics, type DashboardData } from '../services/api'

export interface UseDashboardDataReturn {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refetch: (date?: string) => void
  refetchExtended: (date?: string, startDate?: string, endDate?: string) => void
}

export const useDashboardData = (initialDate?: string): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (date?: string) => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await fetchDashboardAnalytics(date)
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExtendedData(initialDate)
  }, [initialDate])

  const fetchExtendedData = async (date?: string, startDate?: string, endDate?: string) => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await fetchExtendedDashboardAnalytics(date, startDate, endDate)
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const refetch = (date?: string) => {
    fetchData(date)
  }

  const refetchExtended = (date?: string, startDate?: string, endDate?: string) => {
    fetchExtendedData(date, startDate, endDate)
  }

  return { data, loading, error, refetch, refetchExtended }
}