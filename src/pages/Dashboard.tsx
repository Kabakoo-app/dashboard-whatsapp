import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Chip,
  Avatar,
  Button,
  IconButton,
  Stack
} from '@mui/material'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RefreshIcon from '@mui/icons-material/Refresh'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDashboardData } from '../hooks/useDashboardData'
import { fetchWorkshopMetrics, fetchVideoMetrics } from '../services/api'
import ChatIcon from '@mui/icons-material/Chat'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import EventIcon from '@mui/icons-material/Event'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'


const dropoutData = [
  { name: 'Module 1', value: 5, fill: '#C3A5C7' },
  { name: 'Module 2', value: 8, fill: '#B096B4' },
  { name: 'Module 3', value: 12, fill: '#A78BAB' },
  { name: 'Module 4', value: 15, fill: '#9D81A1' },
  { name: 'Module 5', value: 22, fill: '#8A6E8D' },
]

// This will be replaced with real data from API in the component

// Top performing users
const topUsers = [
  { id: 1, name: 'Amadou Diallo', progress: 92, avatar: 'AD' },
  { id: 2, name: 'Fanta Keita', progress: 88, avatar: 'FK' },
  { id: 3, name: 'Ibrahim Touré', progress: 85, avatar: 'IT' },
  { id: 4, name: 'Aisha Coulibaly', progress: 83, avatar: 'AC' },
]

// Upcoming events
const events = [
  { id: 1, title: 'Group Project Deadline', date: 'Sep 18', type: 'deadline' },
  { id: 2, title: 'Live Q&A Session', date: 'Sep 20', type: 'event' },
  { id: 3, title: 'Module 4 Release', date: 'Sep 23', type: 'release' },
]

// Custom colors based on the design system
const COLORS = {
  primary: '#55415D',
  secondary: '#F9D58B',
  lilac: '#C3A5C7',
  cream: '#F8F3EA',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  chartColors: ['#55415D', '#C3A5C7', '#F9D58B', '#E6B85A', '#8A6E8D']
}

// Utility function to calculate trend from historical data
const calculateTrend = (currentValue: number, historicalData: any[], fieldName: string): { percentage: number, isPositive: boolean } => {
  if (!historicalData || historicalData.length === 0) return { percentage: 0, isPositive: true }
  
  // Get the most recent historical value (excluding current)
  const previousValue = historicalData[0]?.[fieldName]
  if (previousValue === null || previousValue === undefined || previousValue === 0) {
    return { percentage: 0, isPositive: true }
  }
  
  const difference = currentValue - previousValue
  const percentage = Math.abs((difference / previousValue) * 100)
  
  return {
    percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
    isPositive: difference >= 0
  }
}

// Utility function to get top clicks
const getTopClicks = (clickData: Record<string, number>, limit: number = 5) => {
  return Object.entries(clickData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }))
}

const Dashboard = () => {
  const theme = useTheme()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [showAllCards, setShowAllCards] = useState(false)
  const [workshopDate, setWorkshopDate] = useState<string>('')
  const [videoStartDate, setVideoStartDate] = useState<string>('')
  const [videoEndDate, setVideoEndDate] = useState<string>('')
  const [workshopData, setWorkshopData] = useState<any>(null)
  const [videoData, setVideoData] = useState<any>(null)
  const [workshopLoading, setWorkshopLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const { data: dashboardData, loading, error, refetchExtended } = useDashboardData(selectedDate)
  
  // Fetch workshop data when workshop date changes
  useEffect(() => {
    const fetchWorkshopData = async () => {
      try {
        setWorkshopLoading(true)
        const data = await fetchWorkshopMetrics(workshopDate)
        setWorkshopData(data)
      } catch (error) {
        console.error('Error fetching workshop data:', error)
      } finally {
        setWorkshopLoading(false)
      }
    }
    
    fetchWorkshopData()
  }, [workshopDate])
  
  // Fetch video data when video dates change
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setVideoLoading(true)
        const data = await fetchVideoMetrics(videoStartDate, videoEndDate)
        setVideoData(data)
      } catch (error) {
        console.error('Error fetching video data:', error)
      } finally {
        setVideoLoading(false)
      }
    }
    
    fetchVideoData()
  }, [videoStartDate, videoEndDate])
  
  // Indigenous pattern style for section backgrounds
  const patternBg = {
    backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(195, 165, 199, 0.15) 0%, rgba(195, 165, 199, 0) 40%), ' + 
                     'radial-gradient(circle at 10% 90%, rgba(249, 213, 139, 0.1) 0%, rgba(249, 213, 139, 0) 30%)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ 
        mb: 3, 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary,
              mb: 1
            }}
          >
            Learning Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
              opacity: 0.7,
              maxWidth: 600,
              mb: 1
            }}
          >
            Monitor and analyze learner engagement, module progress, and collaboration rates for your WhatsApp-based courses.
          </Typography>
          {dashboardData?.kpi?.metric_date && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? COLORS.secondary : COLORS.warning,
                fontWeight: 600,
                maxWidth: 600
              }}
            >
              📊 Showing data for: {new Date(dashboardData.kpi.metric_date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 }, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            type="date"
            size="small"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ 
              minWidth: 140,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
            label="General Date Filter"
          />
          <Button 
            variant="outlined" 
            color="primary"
            sx={{ 
              borderRadius: '8px', 
              borderWidth: '1.5px',
              textTransform: 'none',
              fontWeight: 600 
            }}
          >
            Export Data
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => refetchExtended(selectedDate)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              fontWeight: 600,
              color: COLORS.primary
            }}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </Box>
      </Box>
      
      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => refetchExtended()}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          }
        >
          Failed to load dashboard data: {error}
        </Alert>
      )}
      
      {/* Metrics Cards */}
      {(() => {
        // Calculate trends using historical data
        const kpiHistory = dashboardData?.kpiHistory || []
        const visitHistory = dashboardData?.visitHistory || []
        
        const cardsData = [
          // Main KPI Cards
          {
            icon: <GroupIcon />,
            trend: dashboardData?.kpi ? calculateTrend(dashboardData.kpi.total_registered_users, kpiHistory, 'total_registered_users') : null,
            value: loading ? <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.kpi?.total_registered_users?.toLocaleString() || '0',
            label: 'Total Registered Users',
            color: COLORS.primary
          },
          {
            icon: <PersonIcon />,
            trend: dashboardData?.kpi ? calculateTrend(dashboardData.kpi.active_users_30d, kpiHistory, 'active_users_30d') : null,
            value: loading ? <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.kpi?.active_users_30d?.toLocaleString() || '0',
            label: 'Active Users (30 days)',
            color: COLORS.lilac
          },
          {
            icon: <ThumbUpIcon />,
            trend: dashboardData?.kpi ? calculateTrend((dashboardData.kpi.ai_response_rate || dashboardData.kpi.avg_ai_response_rate || 0) * 100, kpiHistory, 'ai_response_rate') : null,
            value: loading ? <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : `${((dashboardData?.kpi?.ai_response_rate || dashboardData?.kpi?.avg_ai_response_rate || 0) * 100).toFixed(1)}%`,
            label: 'AI Response Rate',
            color: COLORS.secondary
          },
          {
            icon: <PeopleAltIcon />,
            trend: dashboardData?.kpi ? calculateTrend(dashboardData.kpi.dau, kpiHistory, 'dau') : null,
            value: loading ? <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.kpi?.dau?.toLocaleString() || '0',
            label: 'Daily Active Users',
            color: COLORS.primary
          },
          
          // Additional Cards Row 1
          {
            icon: <PersonAddIcon />,
            trend: dashboardData?.kpi ? calculateTrend(dashboardData.kpi.new_users, kpiHistory, 'new_users') : null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.kpi?.new_users?.toLocaleString() || '0',
            label: 'New Users Today',
            color: COLORS.info
          },
          {
            icon: <ChatIcon />,
            trend: dashboardData?.kpi ? calculateTrend(dashboardData.kpi.total_wh_messages, kpiHistory, 'total_wh_messages') : null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.kpi?.total_wh_messages?.toLocaleString() || '0',
            label: 'Total WhatsApp Messages',
            color: COLORS.warning
          },
          {
            icon: <VisibilityIcon />,
            trend: dashboardData?.visit ? calculateTrend(dashboardData.visit.total_visits, visitHistory, 'total_visits') : null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.visit?.total_visits?.toLocaleString() || '0',
            label: 'Total Visits',
            color: COLORS.success
          },
          {
            icon: <AccessTimeIcon />,
            trend: dashboardData?.visit && dashboardData.visit.avg_duration_minutes ? calculateTrend(dashboardData.visit.avg_duration_minutes, visitHistory, 'avg_duration_minutes') : null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.visit?.avg_duration_minutes ? `${dashboardData.visit.avg_duration_minutes.toFixed(0)}m` : 'N/A',
            label: 'Avg. Session Duration',
            color: COLORS.lilac
          },
          
          // Keep only essential summary cards
          {
            icon: <VideoLibraryIcon />,
            trend: null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.video?.total_videos_sent?.toLocaleString() || '0',
            label: 'Videos Sent',
            color: COLORS.success
          },
          {
            icon: <EventIcon />,
            trend: null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.workshop?.total_workshop_attendees?.toLocaleString() || '0',
            label: 'Workshop Attendees',
            color: COLORS.lilac
          },
          {
            icon: <TouchAppIcon />,
            trend: null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.click?.clicks ? Object.values(dashboardData.click.clicks).reduce((a, b) => a + b, 0).toLocaleString() : '0',
            label: 'Total Clicks',
            color: COLORS.info
          },
          {
            icon: <CheckCircleIcon />,
            trend: null,
            value: loading ? <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} /> : dashboardData?.video?.total_validations_sent?.toLocaleString() || '0',
            label: 'Video Validations',
            color: COLORS.secondary
          }
        ]
        
        const mainCards = cardsData.slice(0, 4)
        const additionalRow1 = cardsData.slice(4, 8)
        const additionalRow2 = cardsData.slice(8, 12)
        
        const renderCards = (cards, rowKey) => (
          <Grid container spacing={3} sx={{ mb: 4 }} key={rowKey}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    pb: 3.5,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: 180,
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      backgroundColor: card.color,
                      opacity: 0.7
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${card.color}33`,
                        color: card.color
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    {card.trend && card.trend.percentage > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {card.trend.isPositive ? (
                          <TrendingUpIcon sx={{ color: COLORS.success, fontSize: '1rem', mr: 0.5 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: COLORS.error, fontSize: '1rem', mr: 0.5 }} />
                        )}
                        <Typography variant="body2" sx={{ 
                          color: card.trend.isPositive ? COLORS.success : COLORS.error, 
                          fontWeight: 600 
                        }}>
                          {card.trend.percentage.toFixed(1)}%
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant={rowKey === 'main' ? 'h3' : 'h4'} sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary
                  }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                    opacity: 0.7
                  }}>
                    {card.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )
        
        return (
          <>
            {renderCards(mainCards, 'main')}
            {showAllCards && renderCards(additionalRow1, 'additional1')}
            {showAllCards && renderCards(additionalRow2, 'additional2')}
          </>
        )
      })()}
      
      {/* Show More/Less Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowAllCards(!showAllCards)}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3
          }}
        >
{showAllCards ? 'Show Less' : 'Show All Metrics'}
        </Button>
      </Box>
      
      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Workshop Progression Chart */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 1,
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                    }}
                  >
                    Workshop Progression
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      type="date"
                      size="small"
                      value={workshopDate}
                      onChange={(e) => setWorkshopDate(e.target.value)}
                      sx={{ 
                        width: 140,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          height: '32px'
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Workshop Date"
                    />
                    <IconButton size="small">
                      <EventIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              {workshopLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <CircularProgress size={40} sx={{ color: COLORS.primary }} />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={(() => {
                      const dataSource = workshopData || dashboardData
                      if (!dataSource?.workshopHistory && !dataSource?.history) {
                        return [{ name: 'No Data', attendees: 0, workshops: 0, unique: 0 }]
                      }
                      
                      const historyData = dataSource.history || dataSource.workshopHistory || []
                      return historyData
                        .slice(0, 10)
                        .reverse()
                        .map((item) => ({
                          name: new Date(item.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                          attendees: item.total_workshop_attendees || 0,
                          workshops: item.nb_workshop || 0,
                          unique: item.unique_workshop_attendees || 0
                        }))
                    })()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(85, 65, 93, 0.1)'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                      tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                    />
                    <YAxis 
                      stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                      tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme.palette.mode === 'dark' ? '#312A3A' : '#FFFFFF',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(85, 65, 93, 0.2)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary, fontWeight: 600 }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="attendees" 
                      fill={COLORS.lilac} 
                      name="Total Attendees"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="unique" 
                      fill={COLORS.secondary} 
                      name="Unique Attendees"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Video Progression Chart */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 1,
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                    }}
                  >
                    Video Progression
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      type="date"
                      size="small"
                      value={videoStartDate}
                      onChange={(e) => setVideoStartDate(e.target.value)}
                      sx={{ 
                        width: 120,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          height: '32px'
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Start"
                    />
                    <TextField
                      type="date"
                      size="small"
                      value={videoEndDate}
                      onChange={(e) => setVideoEndDate(e.target.value)}
                      sx={{ 
                        width: 120,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          height: '32px'
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="End"
                    />
                    <IconButton size="small">
                      <VideoLibraryIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              {videoLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <CircularProgress size={40} sx={{ color: COLORS.primary }} />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={(() => {
                      const dataSource = videoData || dashboardData
                      if (!dataSource?.videoHistory && !dataSource?.history) {
                        return [{ name: 'No Data', sent: 0, responses: 0, validations: 0 }]
                      }
                      
                      const historyData = dataSource.history || dataSource.videoHistory || []
                      return historyData
                        .slice(0, 10)
                        .reverse()
                        .map((item) => ({
                          name: new Date(item.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                          sent: item.total_videos_sent || 0,
                          responses: item.total_video_responses_received || 0,
                          validations: item.total_validations_sent || 0,
                          completionRate: item.total_videos_sent > 0 ? ((item.total_video_responses_received || 0) / item.total_videos_sent * 100).toFixed(1) : 0
                        }))
                    })()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(85, 65, 93, 0.1)'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                      tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                    />
                    <YAxis 
                      stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                      tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme.palette.mode === 'dark' ? '#312A3A' : '#FFFFFF',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(85, 65, 93, 0.2)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary, fontWeight: 600 }}
                      formatter={(value, name) => {
                        if (name === 'completionRate') return [`${value}%`, 'Completion Rate']
                        return [value, name]
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="sent" 
                      stackId="1"
                      stroke={COLORS.primary} 
                      fill="url(#colorVideoSent)" 
                      name="Videos Sent"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="responses" 
                      stackId="2"
                      stroke={COLORS.success} 
                      fill="url(#colorVideoResponses)" 
                      name="Video Responses"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="validations" 
                      stackId="3"
                      stroke={COLORS.secondary} 
                      fill="url(#colorVideoValidations)" 
                      name="Validations"
                    />
                    <defs>
                      <linearGradient id="colorVideoSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="colorVideoResponses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="colorVideoValidations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Video Completion Rate Gauge */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 1,
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              height: '100%',
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Video Completion Rate
                </Typography>
              }
              action={
                <IconButton>
                  <PlayCircleIcon />
                </IconButton>
              }
              sx={{ pb: 0 }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              {(() => {
                const dataSource = videoData || dashboardData
                const videoSent = dataSource?.video?.total_videos_sent || dataSource?.metrics?.total_videos_sent || 0
                const videoResponses = dataSource?.video?.total_video_responses_received || dataSource?.metrics?.total_video_responses_received || 0
                const videoValidations = dataSource?.video?.total_validations_sent || dataSource?.metrics?.total_validations_sent || 0
                const completionRate = videoSent > 0 ? (videoResponses / videoSent * 100) : 0
                
                return (
                  <>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          background: `conic-gradient(${COLORS.success} ${completionRate * 3.6}deg, ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'} 0deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        <Box
                          sx={{
                            width: 90,
                            height: 90,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant="h4" sx={{ fontWeight: 700, color: COLORS.success }}>
                            {completionRate.toFixed(1)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary, opacity: 0.7 }}>
                          Videos Sent:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }}>
                          {videoSent.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary, opacity: 0.7 }}>
                          Responses:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }}>
                          {videoResponses.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary, opacity: 0.7 }}>
                          Validations:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }}>
                          {videoValidations.toLocaleString()}
                        </Typography>
                      </Box>
                    </Stack>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </Grid>

        {/* Engagement Metrics Chart */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 1,
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Engagement Metrics
                </Typography>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                  data={(() => {
                    // Transform historical KPI data for engagement chart
                    if (!dashboardData?.kpiHistory || dashboardData.kpiHistory.length === 0) {
                      // Fallback data if no historical data
                      return [
                        { name: 'No Data', messages: 0, dau: 0 }
                      ]
                    }
                    
                    return dashboardData.kpiHistory
                      .slice(0, 7) // Last 7 data points
                      .reverse() // Show chronologically
                      .map((item, index) => ({
                        name: new Date(item.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        messages: item.total_wh_messages || 0,
                        dau: item.dau || 0,
                        activeUsers: item.active_users_30d || 0
                      }))
                  })()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(85, 65, 93, 0.1)'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                    tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                  />
                  <YAxis 
                    stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                    tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.mode === 'dark' ? '#312A3A' : '#FFFFFF',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(85, 65, 93, 0.2)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary, fontWeight: 600 }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stackId="1"
                    stroke={COLORS.primary} 
                    fill="url(#colorMessages)" 
                    activeDot={{ r: 8 }} 
                    name="WhatsApp Messages"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="dau" 
                    stackId="2"
                    stroke={COLORS.lilac} 
                    fill="url(#colorDAU)" 
                    name="Daily Active Users"
                  />
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorDAU" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.lilac} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.lilac} stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Dropout Points Chart */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 1,
              height: '100%',
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                    }}
                  >
                    Dropout Points
                  </Typography>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={dropoutData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(85, 65, 93, 0.1)'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                    tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                  />
                  <YAxis 
                    stroke={theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary}
                    tick={{ fill: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.mode === 'dark' ? '#312A3A' : '#FFFFFF',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(85, 65, 93, 0.2)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary, fontWeight: 600 }}
                    formatter={(value) => [`${value}%`, 'Dropout Rate']}
                  />
                  <Bar 
                    dataKey="value" 
                    background={{ fill: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.05)' : 'rgba(195, 165, 199, 0.1)' }}
                    radius={[4, 4, 0, 0]}
                  >
                    {dropoutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Top Performing Users */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              height: '100%',
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Top Performing Learners
                </Typography>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              {topUsers.map((user, index) => (
                <Box key={user.id} sx={{ mb: index < topUsers.length - 1 ? 3 : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: index === 0 ? COLORS.secondary : theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(195, 165, 199, 0.2)',
                        color: index === 0 ? COLORS.primary : theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                        mr: 2,
                        boxShadow: index === 0 ? '0 2px 8px rgba(249, 213, 139, 0.3)' : 'none'
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary
                        }}
                      >
                        {user.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                            opacity: 0.7,
                            mr: 1
                          }}
                        >
                          Progress:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: index === 0 ? COLORS.secondary : theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary
                          }}
                        >
                          {user.progress}%
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={`#${index + 1}`} 
                      size="small"
                      sx={{ 
                        bgcolor: index === 0 ? 'rgba(249, 213, 139, 0.2)' : theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)',
                        color: index === 0 ? COLORS.secondary : theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Box 
                    sx={{ 
                      height: 6, 
                      width: '100%', 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)',
                      borderRadius: 3,
                      overflow: 'hidden'
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: '100%', 
                        width: `${user.progress}%`, 
                        bgcolor: index === 0 ? COLORS.secondary : COLORS.lilac,
                        borderRadius: 3
                      }}
                    />
                  </Box>
                </Box>
              ))}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="text" 
                  color="primary"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  View All Learners
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              height: '100%',
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Upcoming Events
                </Typography>
              }
              action={
                <Button 
                  variant="text" 
                  color="primary"
                  size="small"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  View Calendar
                </Button>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              {events.map((event, index) => (
                <Paper
                  key={event.id}
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    mb: index < events.length - 1 ? 2 : 0,
                    borderRadius: '12px',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.05)' : 'rgba(195, 165, 199, 0.05)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600, 
                        color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary,
                        mb: 0.5
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                        opacity: 0.7
                      }}
                    >
                      {event.date}
                    </Typography>
                  </Box>
                  <Chip 
                    label={event.type} 
                    size="small"
                    sx={{ 
                      bgcolor: event.type === 'deadline' 
                        ? 'rgba(244, 67, 54, 0.1)' 
                        : event.type === 'event' 
                          ? 'rgba(249, 213, 139, 0.2)' 
                          : 'rgba(76, 175, 80, 0.1)',
                      color: event.type === 'deadline' 
                        ? COLORS.error 
                        : event.type === 'event' 
                          ? COLORS.secondary 
                          : COLORS.success,
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  />
                </Paper>
              ))}
              <Box 
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  borderRadius: '12px', 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, 0.1)' : 'rgba(249, 213, 139, 0.15)', 
                  border: `1px dashed ${theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, 0.3)' : 'rgba(249, 213, 139, 0.4)'}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="small"
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 600,
                    color: COLORS.primary
                  }}
                >
                  Add New Event
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Click Metrics */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              height: '100%',
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Top Clicked Features
                </Typography>
              }
              action={
                <IconButton>
                  <TouchAppIcon />
                </IconButton>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              {dashboardData?.click?.clicks ? (
                <>
                  {getTopClicks(dashboardData.click.clicks, 8).map((click, index) => (
                    <Box key={click.name} sx={{ mb: index < 7 ? 3 : 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary,
                            fontSize: '0.85rem'
                          }}
                        >
                          {click.name}
                        </Typography>
                        <Chip 
                          label={click.value} 
                          size="small"
                          sx={{ 
                            bgcolor: index === 0 ? 'rgba(249, 213, 139, 0.2)' : theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)',
                            color: index === 0 ? COLORS.secondary : theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                            fontWeight: 600,
                            minWidth: '40px'
                          }}
                        />
                      </Box>
                      <Box 
                        sx={{ 
                          height: 4, 
                          width: '100%', 
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)',
                          borderRadius: 2,
                          overflow: 'hidden'
                        }}
                      >
                        <Box 
                          sx={{ 
                            height: '100%', 
                            width: `${Math.min((click.value / Math.max(...getTopClicks(dashboardData.click.clicks, 8).map(c => c.value))) * 100, 100)}%`, 
                            bgcolor: index === 0 ? COLORS.secondary : COLORS.chartColors[index % COLORS.chartColors.length],
                            borderRadius: 2
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </>
              ) : (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                    opacity: 0.7,
                    textAlign: 'center',
                    py: 4
                  }}
                >
                  No click data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Indigenous Learning Patterns */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: '16px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.2)'}`,
              height: '100%',
              ...patternBg
            }}
          >
            <CardHeader 
              title={
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
                  }}
                >
                  Indigenous Learning Patterns
                </Typography>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                  opacity: 0.7,
                  mb: 3
                }}
              >
                Traditional knowledge integration metrics show strong correlation between indigenous learning approaches and student engagement.
              </Typography>
              
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Oral Traditions', value: 35, color: COLORS.chartColors[0] },
                      { name: 'Collaborative Learning', value: 25, color: COLORS.chartColors[1] },
                      { name: 'Contextual Application', value: 20, color: COLORS.chartColors[2] },
                      { name: 'Elder Knowledge', value: 15, color: COLORS.chartColors[3] },
                      { name: 'Other Approaches', value: 5, color: COLORS.chartColors[4] }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {[...Array(5)].map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.chartColors[index]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.mode === 'dark' ? '#312A3A' : '#FFFFFF',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(85, 65, 93, 0.2)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}%`, null]}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                {[
                  { name: 'Oral Traditions', color: COLORS.chartColors[0] },
                  { name: 'Collaborative', color: COLORS.chartColors[1] },
                  { name: 'Contextual', color: COLORS.chartColors[2] },
                  { name: 'Elder Knowledge', color: COLORS.chartColors[3] }
                ].map((item) => (
                  <Chip 
                    key={item.name}
                    label={item.name} 
                    size="small"
                    sx={{ 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(85, 65, 93, 0.2)' : 'rgba(195, 165, 199, 0.1)',
                      color: item.color,
                      fontWeight: 500,
                      border: `1px solid ${item.color}`,
                      borderOpacity: 0.3
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Box>
  )
}

export default Dashboard