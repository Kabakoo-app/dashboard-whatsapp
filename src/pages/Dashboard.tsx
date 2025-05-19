import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

// Mock data
const userMetricsData = {
  totalUsers: 5243,
  activeUsers: 4128,
  engagementRate: 78.7,
  collaborationRate: 80
}

const dropoutData = [
  { name: 'Module 1', value: 5 },
  { name: 'Module 2', value: 8 },
  { name: 'Module 3', value: 12 },
  { name: 'Module 4', value: 15 },
  { name: 'Module 5', value: 22 },
]

const engagementData = [
  { name: 'Week 1', messages: 8500, replies: 6200 },
  { name: 'Week 2', messages: 9200, replies: 6800 },
  { name: 'Week 3', messages: 9800, replies: 7500 },
  { name: 'Week 4', messages: 10500, replies: 8200 },
  { name: 'Week 5', messages: 11200, replies: 9000 },
  { name: 'Week 6', messages: 12000, replies: 9600 },
]

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Main Dashboard
      </Typography>
      
      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Users
            </Typography>
            <Typography component="p" variant="h4">
              {userMetricsData.totalUsers}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              Registered users on the platform
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Active Users
            </Typography>
            <Typography component="p" variant="h4">
              {userMetricsData.activeUsers}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              Active in the last 30 days
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Engagement Rate
            </Typography>
            <Typography component="p" variant="h4">
              {userMetricsData.engagementRate}%
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              Average message response rate
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Collaboration Success
            </Typography>
            <Typography component="p" variant="h4">
              {userMetricsData.collaborationRate}%
            </Typography>
            <Typography variant="body2" sx={{ flex: 1 }}>
              Success rate in collaborative groups
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Engagement Metrics" />
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="messages" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="replies" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Dropout Points" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={dropoutData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff6b6b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard