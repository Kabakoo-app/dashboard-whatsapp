interface DashboardData {
  active_users: number
  total_registered_users: number
  message_response_rate: number
  group_collaboration_success: number
}

interface ApiResponse {
  ok: boolean
  dashboard: DashboardData
}

export type { DashboardData }

const API_BASE_URL = 'https://wette.kabakoo.africa'

export const fetchDashboardAnalytics = async (): Promise<DashboardData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/whatsapp/learning/api/analytic/dashboard/`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: ApiResponse = await response.json()
    
    if (!data.ok) {
      throw new Error('API response indicates failure')
    }
    
    return data.dashboard
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    throw error
  }
}