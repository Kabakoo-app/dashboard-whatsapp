import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Stack
} from '@mui/material'
import { useState } from 'react'
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
import ABTestingCard from '../components/ABTestingCard'

// Mock data for engagement metrics
const engagementData = [
  { date: '2023-01', messageReads: 8700, replies: 6500, completionTime: 48 },
  { date: '2023-02', messageReads: 9200, replies: 7100, completionTime: 45 },
  { date: '2023-03', messageReads: 9600, replies: 7400, completionTime: 42 },
  { date: '2023-04', messageReads: 10200, replies: 7900, completionTime: 40 },
  { date: '2023-05', messageReads: 10800, replies: 8400, completionTime: 38 },
  { date: '2023-06', messageReads: 11500, replies: 9100, completionTime: 36 },
]

// Mock data for dropout analysis
const dropoutData = [
  { module: 'Module 1', count: 120, percentage: 8 },
  { module: 'Module 2', count: 190, percentage: 13 },
  { module: 'Module 3', count: 245, percentage: 17 },
  { module: 'Module 4', count: 310, percentage: 22 },
  { module: 'Module 5', count: 380, percentage: 27 },
  { module: 'Final Project', count: 185, percentage: 13 },
]

// Mock data for group activity
const groupActivityData = [
  { time: 'Morning', active: 1200, messages: 3400 },
  { time: 'Afternoon', active: 1800, messages: 5200 },
  { time: 'Evening', active: 2200, messages: 6100 },
  { time: 'Night', active: 800, messages: 1900 },
]

// Mock data for A/B testing
const abTestData = {
  messageFormat: {
    variantA: {
      name: 'Text Only',
      opens: 1240,
      responses: 620,
      completions: 450,
      conversionRate: 36.3
    },
    variantB: {
      name: 'Text + Images',
      opens: 1280,
      responses: 780,
      completions: 595,
      conversionRate: 46.5
    },
    improvement: 28.1
  },
  reminderTiming: {
    variantA: {
      name: 'Morning',
      opens: 980,
      responses: 520,
      completions: 380,
      conversionRate: 38.8
    },
    variantB: {
      name: 'Evening',
      opens: 980,
      responses: 690,
      completions: 505,
      conversionRate: 51.5
    },
    improvement: 32.7
  },
  contentLength: {
    variantA: {
      name: 'Short',
      opens: 1560,
      responses: 920,
      completions: 540,
      conversionRate: 34.6
    },
    variantB: {
      name: 'Detailed',
      opens: 1560,
      responses: 840,
      completions: 590,
      conversionRate: 37.8
    },
    improvement: 9.2
  }
}

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m')
  const [metricType, setMetricType] = useState('messageReads')

  // Using any type to avoid SelectChangeEvent issues
  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value as string)
  }

  const handleMetricTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMetricType: string,
  ) => {
    if (newMetricType !== null) {
      setMetricType(newMetricType)
    }
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      
      {/* Engagement Metrics */}
      <Card sx={{ mb: 4 }}>
        <CardHeader 
          title="Engagement Metrics" 
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="time-range-select-label">Time Range</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  id="time-range-select"
                  value={timeRange}
                  label="Time Range"
                  onChange={handleTimeRangeChange}
                >
                  <MenuItem value="1m">Last Month</MenuItem>
                  <MenuItem value="3m">Last 3 Months</MenuItem>
                  <MenuItem value="6m">Last 6 Months</MenuItem>
                  <MenuItem value="1y">Last Year</MenuItem>
                </Select>
              </FormControl>
              
              <ToggleButtonGroup
                value={metricType}
                exclusive
                onChange={handleMetricTypeChange}
                aria-label="metric type"
                size="small"
              >
                <ToggleButton value="messageReads" aria-label="message reads">
                  Reads
                </ToggleButton>
                <ToggleButton value="replies" aria-label="replies">
                  Replies
                </ToggleButton>
                <ToggleButton value="completionTime" aria-label="completion time">
                  Time
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={engagementData}
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
                  metricType === 'messageReads' 
                    ? 'Message Reads' 
                    : metricType === 'replies' 
                      ? 'Replies' 
                      : 'Avg. Completion Time (hrs)'
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* A/B Testing Results */}
      <Box sx={{ mb: 4 }}>
        <ABTestingCard testTypes={abTestData} />
      </Box>
      
      {/* Group Activity & Dropout Analysis */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Group Activity Patterns" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={groupActivityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#8884d8" name="Active Users" />
                  <Bar dataKey="messages" fill="#82ca9d" name="Messages Sent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Dropout Analysis" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dropoutData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => name && percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="module"
                  >
                    {dropoutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.module]} />
                </PieChart>
              </ResponsiveContainer>
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {dropoutData.map((entry, index) => (
                  <Chip 
                    key={entry.module}
                    label={`${entry.module}: ${entry.percentage}%`} 
                    sx={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}
                    size="small"
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

export default Analytics