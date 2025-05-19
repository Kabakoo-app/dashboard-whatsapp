import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack
} from '@mui/material'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for onboarding progress
const onboardingData = [
  { name: 'Welcome', completed: 95 },
  { name: 'Profile Setup', completed: 88 },
  { name: 'Introduction', completed: 76 },
  { name: 'First Exercise', completed: 65 },
  { name: 'Group Assignment', completed: 52 }
]

// Mock data for module completion
const moduleCompletionData = [
  { name: 'Module 1', complete: 420, incomplete: 80 },
  { name: 'Module 2', complete: 380, incomplete: 120 },
  { name: 'Module 3', complete: 310, incomplete: 190 },
  { name: 'Module 4', complete: 280, incomplete: 220 },
  { name: 'Module 5', complete: 190, incomplete: 310 }
]

// Mock data for submission rates
const submissionRateData = [
  { name: 'On Time', value: 68 },
  { name: 'Late', value: 17 },
  { name: 'Not Submitted', value: 15 }
]

// Mock data for peer interactions
const peerInteractionData = [
  { name: 'High Interaction', value: 35 },
  { name: 'Medium Interaction', value: 45 },
  { name: 'Low Interaction', value: 20 }
]

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a309c9'];
const SUBMISSION_COLORS = ['#00C49F', '#FFBB28', '#FF8042'];
const INTERACTION_COLORS = ['#0088FE', '#00C49F', '#FF8042'];

// Recent user activity
const recentActivities = [
  { user: 'Maria Garcia', action: 'Completed Module 3', time: '10 minutes ago' },
  { user: 'John Smith', action: 'Submitted Exercise 2.4', time: '25 minutes ago' },
  { user: 'Sarah Johnson', action: 'Joined Group Discussion', time: '1 hour ago' },
  { user: 'Ahmed Hassan', action: 'Started Module 4', time: '2 hours ago' },
  { user: 'Li Wei', action: 'Completed Quiz 3', time: '3 hours ago' }
];

const UserJourney = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        User Journey Monitoring
      </Typography>
      
      {/* Onboarding Progress */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Onboarding Progress Tracking" />
            <CardContent>
              {onboardingData.map((step) => (
                <Box key={step.name} sx={{ my: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">{step.name}</Typography>
                    <Typography variant="body2">{step.completed}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={step.completed} 
                    sx={{ height: 10, borderRadius: 5, my: 1 }} 
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent User Activity" />
            <CardContent>
              <List sx={{ width: '100%' }}>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={activity.user}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {activity.action}
                            </Typography>
                            {` — ${activity.time}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Module Completion */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Module Completion Status" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={moduleCompletionData}
                  margin={{
                    top: 20,
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
                  <Bar dataKey="complete" stackId="a" fill="#25D366" name="Completed" />
                  <Bar dataKey="incomplete" stackId="a" fill="#ff6b6b" name="Incomplete" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Exercise Submission and Peer Interaction */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Exercise Submission Rates" />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={submissionRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {submissionRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SUBMISSION_COLORS[index % SUBMISSION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {submissionRateData.map((entry, index) => (
                    <Chip 
                      key={entry.name}
                      label={entry.name} 
                      sx={{ backgroundColor: SUBMISSION_COLORS[index % SUBMISSION_COLORS.length], color: 'white' }}
                    />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Peer Interaction Levels" />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={peerInteractionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {peerInteractionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={INTERACTION_COLORS[index % INTERACTION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {peerInteractionData.map((entry, index) => (
                    <Chip 
                      key={entry.name}
                      label={entry.name} 
                      sx={{ backgroundColor: INTERACTION_COLORS[index % INTERACTION_COLORS.length], color: 'white' }}
                    />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserJourney