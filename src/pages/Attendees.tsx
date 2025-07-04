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
  Stack,
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
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for workshops and visits
const attendanceData = [
  { date: '2023-01', workshops: 450, visits: 1200, totalAttendees: 1650 },
  { date: '2023-02', workshops: 520, visits: 1350, totalAttendees: 1870 },
  { date: '2023-03', workshops: 580, visits: 1480, totalAttendees: 2060 },
  { date: '2023-04', workshops: 640, visits: 1620, totalAttendees: 2260 },
  { date: '2023-05', workshops: 720, visits: 1780, totalAttendees: 2500 },
  { date: '2023-06', workshops: 800, visits: 1920, totalAttendees: 2720 },
]

// Mock data for workshop types
const workshopTypeData = [
  { type: 'Technical Skills', attendees: 1240, completion: 85.6 },
  { type: 'Business Skills', attendees: 980, completion: 78.4 },
  { type: 'Leadership', attendees: 720, completion: 82.1 },
  { type: 'Creative Arts', attendees: 560, completion: 91.2 },
  { type: 'Health & Wellness', attendees: 340, completion: 88.7 },
]

// Mock data for attendance patterns
const attendancePatternData = [
  { time: 'Morning', workshops: 280, visits: 520, preference: 29.4 },
  { time: 'Afternoon', workshops: 420, visits: 720, preference: 41.9 },
  { time: 'Evening', workshops: 320, visits: 480, preference: 29.4 },
  { time: 'Weekend', workshops: 180, visits: 200, preference: 14.0 },
]

// Mock data for recent attendees
const recentAttendeesData = [
  { id: 1, name: 'John Doe', workshop: 'Technical Skills', date: '2023-06-15', status: 'Completed' },
  { id: 2, name: 'Jane Smith', workshop: 'Business Skills', date: '2023-06-14', status: 'In Progress' },
  { id: 3, name: 'Mike Johnson', workshop: 'Leadership', date: '2023-06-13', status: 'Completed' },
  { id: 4, name: 'Sarah Wilson', workshop: 'Creative Arts', date: '2023-06-12', status: 'Completed' },
  { id: 5, name: 'David Brown', workshop: 'Health & Wellness', date: '2023-06-11', status: 'No Show' },
]

// Colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Attendees = () => {
  const [timeRange, setTimeRange] = useState('6m')
  const [metricType, setMetricType] = useState('workshops')

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        Attendees Dashboard
      </Typography>
      
      {/* Attendance Trends */}
      <Card sx={{ mb: 4 }}>
        <CardHeader 
          title="Attendance Trends" 
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
                <ToggleButton value="workshops" aria-label="workshops">
                  Workshops
                </ToggleButton>
                <ToggleButton value="visits" aria-label="visits">
                  Visits
                </ToggleButton>
                <ToggleButton value="totalAttendees" aria-label="total">
                  Total
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={attendanceData}
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
                  metricType === 'workshops' 
                    ? 'Workshop Attendees' 
                    : metricType === 'visits' 
                      ? 'Site Visits' 
                      : 'Total Attendees'
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Workshop Types & Attendance Patterns */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Workshop Types Performance" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={workshopTypeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendees" fill="#8884d8" name="Attendees" />
                  <Bar dataKey="completion" fill="#82ca9d" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Attendance Patterns" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendancePatternData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ time, preference }) => time && preference ? `${time}: ${preference.toFixed(1)}%` : ''}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="preference"
                    nameKey="time"
                  >
                    {attendancePatternData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.time]} />
                </PieChart>
              </ResponsiveContainer>
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {attendancePatternData.map((entry, index) => (
                  <Chip 
                    key={entry.time}
                    label={`${entry.time}: ${entry.preference}%`} 
                    sx={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}
                    size="small"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Attendees Table */}
      <Card>
        <CardHeader title="Recent Attendees" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="recent attendees table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Workshop</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentAttendeesData.map((attendee) => (
                  <TableRow
                    key={attendee.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {attendee.name}
                    </TableCell>
                    <TableCell>{attendee.workshop}</TableCell>
                    <TableCell>{attendee.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={attendee.status}
                        color={
                          attendee.status === 'Completed' ? 'success' :
                          attendee.status === 'In Progress' ? 'warning' :
                          'error'
                        }
                        size="small"
                      />
                    </TableCell>
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

export default Attendees