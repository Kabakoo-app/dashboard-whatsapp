interface KpiMetrics {
  total_registered_users: number
  total_wh_messages: number
  total_wls_messages: number
  total_wls_mentor_messages: number
  avg_ai_response_rate: number
  metric_date: string
  active_users_30d: number
  dau: number
  new_users: number
  daily_wls_mentor_messages: number | null
  daily_total_wls_messages: number | null
  ai_response_rate: number | null
}

interface VisitMetrics {
  metric_date: string
  total_visits: number
  avg_duration_minutes: number | null
}

interface KpiApiResponse {
  success: boolean
  metrics: KpiMetrics
}

interface VisitApiResponse {
  success: boolean
  metrics: VisitMetrics
}

interface DashboardData {
  kpi: KpiMetrics
  visit: VisitMetrics
}

export type { DashboardData, KpiMetrics, VisitMetrics, KpiApiResponse, VisitApiResponse }

const API_BASE_URL = 'http://3.147.170.183'

export const fetchKpiMetrics = async (date?: string): Promise<KpiMetrics> => {
  try {
    const url = date 
      ? `${API_BASE_URL}/api/kpi/?date=${date}`
      : `${API_BASE_URL}/api/kpi/`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: KpiApiResponse = await response.json()
    
    if (!data.success) {
      throw new Error('KPI API response indicates failure')
    }
    
    return data.metrics
  } catch (error) {
    console.error('Error fetching KPI metrics:', error)
    throw error
  }
}

export const fetchVisitMetrics = async (date?: string): Promise<VisitMetrics> => {
  try {
    const url = date 
      ? `${API_BASE_URL}/api/visit/?date=${date}`
      : `${API_BASE_URL}/api/visit/`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: VisitApiResponse = await response.json()
    
    if (!data.success) {
      throw new Error('Visit API response indicates failure')
    }
    
    return data.metrics
  } catch (error) {
    console.error('Error fetching visit metrics:', error)
    throw error
  }
}

export const fetchDashboardAnalytics = async (date?: string): Promise<DashboardData> => {
  try {
    const [kpiData, visitData] = await Promise.all([
      fetchKpiMetrics(date),
      fetchVisitMetrics(date)
    ])
    
    return {
      kpi: kpiData,
      visit: visitData
    }
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    throw error
  }
}