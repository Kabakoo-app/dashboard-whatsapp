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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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
  AreaChart,
  Area,
  ComposedChart
} from 'recharts'

// Mock data for cohort analysis
const cohortData = [
  { 
    cohort: 'Jan 2023', 
    month0: 1000, 
    month1: 850, 
    month2: 720, 
    month3: 620, 
    month4: 540, 
    month5: 480, 
    month6: 420 
  },
  { 
    cohort: 'Feb 2023', 
    month0: 1200, 
    month1: 1050, 
    month2: 900, 
    month3: 780, 
    month4: 680, 
    month5: 590, 
    month6: 520 
  },
  { 
    cohort: 'Mar 2023', 
    month0: 1100, 
    month1: 950, 
    month2: 830, 
    month3: 720, 
    month4: 630, 
    month5: 550, 
    month6: 490 
  },
  { 
    cohort: 'Apr 2023', 
    month0: 1300, 
    month1: 1140, 
    month2: 1000, 
    month3: 870, 
    month4: 760, 
    month5: 660, 
    month6: 580 
  },
  { 
    cohort: 'May 2023', 
    month0: 1400, 
    month1: 1250, 
    month2: 1100, 
    month3: 960, 
    month4: 840, 
    month5: 730, 
    month6: 640 
  },
  { 
    cohort: 'Jun 2023', 
    month0: 1500, 
    month1: 1350, 
    month2: 1200, 
    month3: 1050, 
    month4: 920, 
    month5: 800, 
    month6: 710 
  },
]

// Mock data for cohort retention rates
const retentionData = [
  { period: 'Month 1', jan: 85, feb: 87.5, mar: 86.4, apr: 87.7, may: 89.3, jun: 90.0 },
  { period: 'Month 2', jan: 72, feb: 75.0, mar: 75.5, apr: 76.9, may: 78.6, jun: 80.0 },
  { period: 'Month 3', jan: 62, feb: 65.0, mar: 65.5, apr: 66.9, may: 68.6, jun: 70.0 },
  { period: 'Month 4', jan: 54, feb: 56.7, mar: 57.3, apr: 58.5, may: 60.0, jun: 61.3 },
  { period: 'Month 5', jan: 48, feb: 49.2, mar: 50.0, apr: 50.8, may: 52.1, jun: 53.3 },
  { period: 'Month 6', jan: 42, feb: 43.3, mar: 44.5, apr: 44.6, may: 45.7, jun: 47.3 },
]

// Mock data for cohort performance metrics
const cohortPerformanceData = [
  { 
    cohort: 'Jan 2023', 
    totalUsers: 1000, 
    activeUsers: 420, 
    completionRate: 42.0, 
    avgSessionTime: 25.4, 
    revenue: 12500 
  },
  { 
    cohort: 'Feb 2023', 
    totalUsers: 1200, 
    activeUsers: 520, 
    completionRate: 43.3, 
    avgSessionTime: 26.1, 
    revenue: 15600 
  },
  { 
    cohort: 'Mar 2023', 
    totalUsers: 1100, 
    activeUsers: 490, 
    completionRate: 44.5, 
    avgSessionTime: 27.2, 
    revenue: 14700 
  },
  { 
    cohort: 'Apr 2023', 
    totalUsers: 1300, 
    activeUsers: 580, 
    completionRate: 44.6, 
    avgSessionTime: 28.3, 
    revenue: 17400 
  },
  { 
    cohort: 'May 2023', 
    totalUsers: 1400, 
    activeUsers: 640, 
    completionRate: 45.7, 
    avgSessionTime: 29.1, 
    revenue: 19200 
  },
  { 
    cohort: 'Jun 2023', 
    totalUsers: 1500, 
    activeUsers: 710, 
    completionRate: 47.3, 
    avgSessionTime: 30.2, 
    revenue: 21300 
  },
]


const Cohort = () => {
  const [metricType, setMetricType] = useState('retention')
  const [selectedCohort, setSelectedCohort] = useState('all')

  const handleMetricTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMetricType: string,
  ) => {
    if (newMetricType !== null) {
      setMetricType(newMetricType)
    }
  }

  const handleCohortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCohort(event.target.value as string)
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Cohort Analysis Dashboard
      </Typography>
      
      {/* Cohort Retention Analysis */}
      <Card sx={{ mb: 4 }}>
        <CardHeader 
          title="Cohort Retention Analysis" 
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="cohort-select-label">Cohort</InputLabel>
                <Select
                  labelId="cohort-select-label"
                  id="cohort-select"
                  value={selectedCohort}
                  label="Cohort"
                  onChange={handleCohortChange}
                >
                  <MenuItem value="all">All Cohorts</MenuItem>
                  <MenuItem value="jan">Jan 2023</MenuItem>
                  <MenuItem value="feb">Feb 2023</MenuItem>
                  <MenuItem value="mar">Mar 2023</MenuItem>
                  <MenuItem value="apr">Apr 2023</MenuItem>
                  <MenuItem value="may">May 2023</MenuItem>
                  <MenuItem value="jun">Jun 2023</MenuItem>
                </Select>
              </FormControl>
              
              <ToggleButtonGroup
                value={metricType}
                exclusive
                onChange={handleMetricTypeChange}
                aria-label="metric type"
                size="small"
              >
                <ToggleButton value="retention" aria-label="retention">
                  Retention
                </ToggleButton>
                <ToggleButton value="performance" aria-label="performance">
                  Performance
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            {metricType === 'retention' ? (
              <LineChart
                data={retentionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jan" stroke="#0088FE" name="Jan 2023" />
                <Line type="monotone" dataKey="feb" stroke="#00C49F" name="Feb 2023" />
                <Line type="monotone" dataKey="mar" stroke="#FFBB28" name="Mar 2023" />
                <Line type="monotone" dataKey="apr" stroke="#FF8042" name="Apr 2023" />
                <Line type="monotone" dataKey="may" stroke="#8884D8" name="May 2023" />
                <Line type="monotone" dataKey="jun" stroke="#82CA9D" name="Jun 2023" />
              </LineChart>
            ) : (
              <ComposedChart
                data={cohortPerformanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cohort" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="activeUsers" fill="#8884d8" name="Active Users" />
                <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="#ff7300" name="Completion Rate %" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Cohort Size Evolution & Performance Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Cohort Size Evolution" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={cohortData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cohort" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="month0" stackId="1" stroke="#8884d8" fill="#8884d8" name="Initial" />
                  <Area type="monotone" dataKey="month6" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Month 6" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Average Session Time by Cohort" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={cohortPerformanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cohort" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgSessionTime" fill="#82ca9d" name="Avg Session Time (min)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Cohort Performance Summary Table */}
      <Card>
        <CardHeader title="Cohort Performance Summary" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="cohort performance table">
              <TableHead>
                <TableRow>
                  <TableCell>Cohort</TableCell>
                  <TableCell align="right">Total Users</TableCell>
                  <TableCell align="right">Active Users</TableCell>
                  <TableCell align="right">Completion Rate</TableCell>
                  <TableCell align="right">Avg Session (min)</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cohortPerformanceData.map((cohort) => (
                  <TableRow
                    key={cohort.cohort}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {cohort.cohort}
                    </TableCell>
                    <TableCell align="right">{cohort.totalUsers.toLocaleString()}</TableCell>
                    <TableCell align="right">{cohort.activeUsers.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${cohort.completionRate}%`}
                        color={cohort.completionRate >= 45 ? 'success' : cohort.completionRate >= 43 ? 'warning' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{cohort.avgSessionTime}</TableCell>
                    <TableCell align="right">${cohort.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Cohort