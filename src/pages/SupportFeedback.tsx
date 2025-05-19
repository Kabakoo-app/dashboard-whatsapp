import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const helpRequestsData = [
  { id: 1, type: 'Technical', status: 'Open', priority: 'High', timestamp: '2023-09-25 09:14', description: 'Cannot access module 3 content' },
  { id: 2, type: 'Content', status: 'Resolved', priority: 'Medium', timestamp: '2023-09-24 15:22', description: 'Incorrect information in lesson 2.3' },
  { id: 3, type: 'Account', status: 'Open', priority: 'Low', timestamp: '2023-09-24 11:05', description: 'Need to update profile information' },
  { id: 4, type: 'Technical', status: 'In Progress', priority: 'High', timestamp: '2023-09-23 16:48', description: 'Voice notes not playing in WhatsApp' },
  { id: 5, type: 'Content', status: 'Resolved', priority: 'Medium', timestamp: '2023-09-22 10:30', description: 'Request for additional resources' }
]

const feedbackData = [
  { category: 'Course Content', positive: 85, negative: 15 },
  { category: 'Platform Usability', positive: 72, negative: 28 },
  { category: 'Support Response', positive: 65, negative: 35 },
  { category: 'Peer Collaboration', positive: 78, negative: 22 },
  { category: 'Overall Experience', positive: 80, negative: 20 }
]

const technicalIssuesData = [
  { name: 'Message Delays', value: 12, color: '#ff6b6b' },
  { name: 'Reminder Failures', value: 8, color: '#ffa06b' },
  { name: 'Content Loading', value: 15, color: '#ffc658' },
  { name: 'Media Download', value: 10, color: '#ffd76b' }
]

const systemStatusData = [
  { name: 'Message Sending System', status: 'Operational', uptime: 99.8 },
  { name: 'Reminder System', status: 'Partial Outage', uptime: 97.2 },
  { name: 'Media Content Delivery', status: 'Operational', uptime: 99.5 },
  { name: 'Feedback Collection', status: 'Operational', uptime: 99.9 },
  { name: 'Exercise Submission', status: 'Operational', uptime: 99.7 }
]

const SupportFeedback = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Support & Feedback
      </Typography>
      
      {/* Help Request Tracking */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Help Request Tracking" />
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="help requests table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {helpRequestsData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.status} 
                            color={
                              row.status === 'Open' ? 'error' : 
                              row.status === 'In Progress' ? 'warning' : 'success'
                            } 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={row.priority} 
                            color={
                              row.priority === 'High' ? 'error' : 
                              row.priority === 'Medium' ? 'warning' : 'info'
                            } 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>{row.timestamp}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* User Feedback */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="User Feedback Polls" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={feedbackData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="category" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#82ca9d" name="Positive %" />
                  <Bar dataKey="negative" stackId="a" fill="#ff8042" name="Negative %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Technical Issues Monitoring */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Technical Issues - Last 24 Hours" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={technicalIssuesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {technicalIssuesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} incidents`, null]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* System Status */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="System Status" />
            <CardContent>
              <List>
                {systemStatusData.map((system, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={system.name} 
                        secondary={`Uptime: ${system.uptime}%`} 
                      />
                      <Chip 
                        label={system.status} 
                        color={
                          system.status === 'Operational' ? 'success' : 
                          system.status === 'Partial Outage' ? 'warning' : 'error'
                        } 
                        size="small" 
                      />
                    </ListItem>
                    <LinearProgress 
                      variant="determinate" 
                      value={system.uptime} 
                      color={
                        system.uptime > 99 ? 'success' : 
                        system.uptime > 95 ? 'warning' : 'error'
                      }
                      sx={{ mb: 2 }}
                    />
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SupportFeedback