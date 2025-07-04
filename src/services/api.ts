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

interface KpiHistoryItem {
  metric_date: string
  total_registered_users: number
  active_users_30d: number
  dau: number
  new_users: number
  total_wh_messages: number
  total_wls_messages: number | null
  total_wls_mentor_messages: number | null
  ai_response_rate: number | null
}

interface VisitMetrics {
  metric_date: string
  total_visits: number
  avg_duration_minutes: number | null
}

interface VisitHistoryItem {
  metric_date: string
  total_visits: number
  avg_duration_minutes: number | null
}

interface WorkshopMetrics {
  metric_date: string
  unique_workshop_attendees: number
  total_workshop_attendees: number
  nb_workshop: number
}

interface WorkshopHistoryItem {
  metric_date: string
  unique_workshop_attendees: number
  total_workshop_attendees: number
  nb_workshop: number
}

interface VideoMetrics {
  metric_date: string
  total_videos_sent: number
  total_video_responses_received: number
  total_validations_sent: number
  total_invalidations_sent: number | null
}

interface VideoHistoryItem {
  metric_date: string
  total_videos_sent: number
  total_video_responses_received: number
  total_validations_sent: number
  total_invalidations_sent: number | null
}

interface ClickMetrics {
  metric_date: string
  clicks: Record<string, number>
}

interface ClickHistoryItem {
  metric_date: string
  clicks: Record<string, number>
}

interface KpiApiResponse {
  success: boolean
  metrics: KpiMetrics
  history: KpiHistoryItem[]
}

interface VisitApiResponse {
  success: boolean
  metrics: VisitMetrics
  history: VisitHistoryItem[]
}

interface WorkshopApiResponse {
  success: boolean
  metrics: WorkshopMetrics
  history: WorkshopHistoryItem[]
}

interface VideoApiResponse {
  success: boolean
  metrics: VideoMetrics
  history: VideoHistoryItem[]
}

interface ClickApiResponse {
  success: boolean
  metrics: ClickMetrics
  history: ClickHistoryItem[]
}

interface DashboardData {
  kpi: KpiMetrics
  visit: VisitMetrics
  workshop?: WorkshopMetrics
  video?: VideoMetrics
  click?: ClickMetrics
  kpiHistory?: KpiHistoryItem[]
  visitHistory?: VisitHistoryItem[]
  workshopHistory?: WorkshopHistoryItem[]
  videoHistory?: VideoHistoryItem[]
  clickHistory?: ClickHistoryItem[]
}

export type { 
  DashboardData, 
  KpiMetrics, 
  VisitMetrics, 
  WorkshopMetrics, 
  VideoMetrics, 
  ClickMetrics,
  KpiApiResponse, 
  VisitApiResponse, 
  WorkshopApiResponse, 
  VideoApiResponse, 
  ClickApiResponse,
  KpiHistoryItem,
  VisitHistoryItem,
  WorkshopHistoryItem,
  VideoHistoryItem,
  ClickHistoryItem
}

const API_BASE_URL = 'https://dashboardapi.kabakoo.africa'

export const fetchKpiMetrics = async (date?: string): Promise<KpiApiResponse> => {
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
    
    return data
  } catch (error) {
    console.error('Error fetching KPI metrics:', error)
    throw error
  }
}

export const fetchVisitMetrics = async (date?: string): Promise<VisitApiResponse> => {
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
    
    return data
  } catch (error) {
    console.error('Error fetching visit metrics:', error)
    throw error
  }
}

export const fetchWorkshopMetrics = async (startDate?: string, endDate?: string): Promise<WorkshopApiResponse> => {
  try {
    let url = `${API_BASE_URL}/api/workshop`
    
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`
    } else if (startDate) {
      // Fallback for backward compatibility with single date
      url += `?date=${startDate}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: WorkshopApiResponse = await response.json()
    
    if (!data.success) {
      throw new Error('Workshop API response indicates failure')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching workshop metrics:', error)
    throw error
  }
}

export const fetchVideoMetrics = async (startDate?: string, endDate?: string): Promise<VideoApiResponse> => {
  try {
    let url = `${API_BASE_URL}/api/video`
    
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: VideoApiResponse = await response.json()
    
    if (!data.success) {
      throw new Error('Video API response indicates failure')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching video metrics:', error)
    throw error
  }
}

export const fetchClickMetrics = async (): Promise<ClickApiResponse> => {
  try {
    const url = `${API_BASE_URL}/api/click`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: ClickApiResponse = await response.json()
    
    if (!data.success) {
      throw new Error('Click API response indicates failure')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching click metrics:', error)
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
      kpi: kpiData.metrics,
      visit: visitData.metrics,
      kpiHistory: kpiData.history,
      visitHistory: visitData.history
    }
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    throw error
  }
}

export const fetchExtendedDashboardAnalytics = async (
  date?: string, 
  videoStartDate?: string, 
  videoEndDate?: string,
  workshopStartDate?: string,
  workshopEndDate?: string
): Promise<DashboardData> => {
  try {
    const [kpiData, visitData, clickData] = await Promise.all([
      fetchKpiMetrics(date),
      fetchVisitMetrics(date),
      fetchClickMetrics()
    ])
    
    let workshopData: WorkshopApiResponse | undefined
    let videoData: VideoApiResponse | undefined
    
    // Fetch workshop data with date range
    if (workshopStartDate && workshopEndDate) {
      workshopData = await fetchWorkshopMetrics(workshopStartDate, workshopEndDate)
    } else if (date) {
      // Fallback to general date filter
      workshopData = await fetchWorkshopMetrics(date)
    } else {
      workshopData = await fetchWorkshopMetrics()
    }
    
    // Fetch video data with date range
    if (videoStartDate && videoEndDate) {
      videoData = await fetchVideoMetrics(videoStartDate, videoEndDate)
    } else {
      videoData = await fetchVideoMetrics()
    }
    
    return {
      kpi: kpiData.metrics,
      visit: visitData.metrics,
      click: clickData.metrics,
      workshop: workshopData?.metrics,
      video: videoData?.metrics,
      kpiHistory: kpiData.history,
      visitHistory: visitData.history,
      clickHistory: clickData.history,
      workshopHistory: workshopData?.history,
      videoHistory: videoData?.history
    }
  } catch (error) {
    console.error('Error fetching extended dashboard analytics:', error)
    throw error
  }
}