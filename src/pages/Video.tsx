import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import { fetchVideoMetrics } from '../services/api'
import type { VideoMetrics, VideoHistoryItem } from '../services/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Helper function to format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Helper function to calculate response rate
const calculateResponseRate = (sent: number, received: number): number => {
  return sent > 0 ? (received / sent) * 100 : 0
}

// Helper function to calculate validation rate
const calculateValidationRate = (received: number, validations: number): number => {
  return received > 0 ? (validations / received) * 100 : 0
}

const Video = () => {
  const [videoMetrics, setVideoMetrics] = useState<VideoMetrics | null>(null)
  const [videoHistory, setVideoHistory] = useState<VideoHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('2025-06-15')
  const [endDate, setEndDate] = useState('2025-06-25')
  const [metricType, setMetricType] = useState('total_videos_sent')

  const fetchData = useCallback(async (isUpdate = false) => {
    try {
      if (isUpdate) {
        setUpdating(true)
      } else {
        setLoading(true)
      }
      setError(null)
      const data = await fetchVideoMetrics(startDate, endDate)
      setVideoMetrics(data.metrics)
      setVideoHistory(data.history)
    } catch (err) {
      setError('Failed to fetch video metrics')
      console.error('Error fetching video data:', err)
    } finally {
      if (isUpdate) {
        setUpdating(false)
      } else {
        setLoading(false)
      }
    }
  }, [startDate, endDate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDateRangeUpdate = () => {
    fetchData(true)
  }

  const handleMetricTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMetricType: string,
  ) => {
    if (newMetricType !== null) {
      setMetricType(newMetricType)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    )
  }

  if (!videoMetrics || !videoHistory) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No video data available
        </Alert>
      </Box>
    )
  }

  // Calculate summary metrics
  const responseRate = calculateResponseRate(videoMetrics.total_videos_sent || 0, videoMetrics.total_video_responses_received || 0)
  const validationRate = calculateValidationRate(videoMetrics.total_video_responses_received || 0, videoMetrics.total_validations_sent || 0)

  // Prepare chart data
  const chartData = videoHistory.map(item => ({
    date: formatDate(item.metric_date),
    total_videos_sent: item.total_videos_sent || 0,
    total_video_responses_received: item.total_video_responses_received || 0,
    total_validations_sent: item.total_validations_sent || 0,
    response_rate: calculateResponseRate(item.total_videos_sent || 0, item.total_video_responses_received || 0),
    validation_rate: calculateValidationRate(item.total_video_responses_received || 0, item.total_validations_sent || 0)
  }))

  // Prepare summary cards data
  const summaryData = [
    { 
      label: 'Videos Sent', 
      value: videoMetrics.total_videos_sent || 0, 
      color: COLORS[0],
      percentage: responseRate
    },
    { 
      label: 'Responses Received', 
      value: videoMetrics.total_video_responses_received || 0, 
      color: COLORS[1],
      percentage: validationRate
    },
    { 
      label: 'Validations Sent', 
      value: videoMetrics.total_validations_sent || 0, 
      color: COLORS[2],
      percentage: null
    },
    { 
      label: 'Invalidations Sent', 
      value: videoMetrics.total_invalidations_sent || 0, 
      color: COLORS[3],
      percentage: null
    }
  ]
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Video Analytics Dashboard
      </Typography>
      
      {/* Date Range Controls */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Date Range Filter" />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                onClick={handleDateRangeUpdate}
                disabled={loading || updating}
                fullWidth
              >
                {updating ? 'Updating...' : 'Update Data'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card sx={{ position: 'relative',  height: '100%' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  {item.label}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: item.color }}>
                  {item.value}
                </Typography>
                {item.percentage !== null && (
                  <Typography variant="body2" color="textSecondary">
                    {item.percentage.toFixed(1)}% rate
                  </Typography>
                )}
              </CardContent>
              {updating && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Video Progression Metrics */}
      <Card sx={{ mb: 4, position: 'relative' }}>
        <CardHeader 
          title="Video Progression Trends" 
          action={
            <ToggleButtonGroup
              value={metricType}
              exclusive
              onChange={handleMetricTypeChange}
              aria-label="metric type"
              size="small"
            >
              <ToggleButton value="total_videos_sent" aria-label="videos sent">
                Videos Sent
              </ToggleButton>
              <ToggleButton value="total_video_responses_received" aria-label="responses">
                Responses
              </ToggleButton>
              <ToggleButton value="total_validations_sent" aria-label="validations">
                Validations
              </ToggleButton>
              <ToggleButton value="response_rate" aria-label="response rate">
                Response Rate
              </ToggleButton>
            </ToggleButtonGroup>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={metricType} 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                name={
                  metricType === 'total_videos_sent' 
                    ? 'Videos Sent' 
                    : metricType === 'total_video_responses_received' 
                      ? 'Responses Received' 
                      : metricType === 'total_validations_sent'
                        ? 'Validations Sent'
                        : 'Response Rate (%)'
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        {updating && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Card>
      
      {/* Video Metrics Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            <CardHeader title="Video Interaction Overview" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_videos_sent" fill={COLORS[0]} name="Videos Sent" />
                  <Bar dataKey="total_video_responses_received" fill={COLORS[1]} name="Responses Received" />
                  <Bar dataKey="total_validations_sent" fill={COLORS[2]} name="Validations Sent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            {updating && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            <CardHeader title="Current Period Summary" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Videos Sent', value: videoMetrics.total_videos_sent || 0 },
                      { name: 'Responses Received', value: videoMetrics.total_video_responses_received || 0 },
                      { name: 'Validations Sent', value: videoMetrics.total_validations_sent || 0 },
                      { name: 'Invalidations Sent', value: videoMetrics.total_invalidations_sent || 0 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {summaryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {summaryData.map((entry, index) => (
                  <Chip 
                    key={entry.label}
                    label={`${entry.label}: ${entry.value}`} 
                    sx={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}
                    size="small"
                  />
                ))}
              </Stack>
            </CardContent>
            {updating && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Video