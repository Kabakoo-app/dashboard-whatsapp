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
import { useDashboardData } from '../hooks/useDashboardData'


const dropoutData = [
  { name: 'Module 1', value: 5, fill: '#C3A5C7' },
  { name: 'Module 2', value: 8, fill: '#B096B4' },
  { name: 'Module 3', value: 12, fill: '#A78BAB' },
  { name: 'Module 4', value: 15, fill: '#9D81A1' },
  { name: 'Module 5', value: 22, fill: '#8A6E8D' },
]

const engagementData = [
  { name: 'Week 1', messages: 8500, replies: 6200 },
  { name: 'Week 2', messages: 9200, replies: 6800 },
  { name: 'Week 3', messages: 9800, replies: 7500 },
  { name: 'Week 4', messages: 10500, replies: 8200 },
  { name: 'Week 5', messages: 11200, replies: 9000 },
  { name: 'Week 6', messages: 12000, replies: 9600 },
]

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

const Dashboard = () => {
  const theme = useTheme()
  const { data: dashboardData, loading, error, refetch } = useDashboardData()
  
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
              maxWidth: 600
            }}
          >
            Monitor and analyze learner engagement, module progress, and collaboration rates for your WhatsApp-based courses.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
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
            onClick={refetch}
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
              onClick={refetch}
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
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              pb: 3.5,
              display: 'flex',
              flexDirection: 'column',
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
                backgroundColor: COLORS.primary,
                opacity: 0.7
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(195, 165, 199, 0.15)', 
                  color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary
                }}
              >
                <GroupIcon />
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: COLORS.success, fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: COLORS.success, fontWeight: 600 }}>
                  12.3%
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} />
              ) : (
                dashboardData?.total_registered_users?.toLocaleString() || '0'
              )}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                opacity: 0.7
              }}
            >
              Total Registered Users
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              pb: 3.5,
              display: 'flex',
              flexDirection: 'column',
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
                backgroundColor: COLORS.lilac,
                opacity: 0.7
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(195, 165, 199, 0.15)', 
                  color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: COLORS.success, fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: COLORS.success, fontWeight: 600 }}>
                  8.7%
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} />
              ) : (
                dashboardData?.active_users?.toLocaleString() || '0'
              )}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                opacity: 0.7
              }}
            >
              Active Users (30 days)
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              pb: 3.5,
              display: 'flex',
              flexDirection: 'column',
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
                backgroundColor: COLORS.secondary,
                opacity: 0.7
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, 0.2)' : 'rgba(249, 213, 139, 0.2)', 
                  color: theme.palette.mode === 'dark' ? COLORS.secondary : COLORS.primary
                }}
              >
                <ThumbUpIcon />
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDownIcon sx={{ color: COLORS.error, fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: COLORS.error, fontWeight: 600 }}>
                  2.4%
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} />
              ) : (
                `${(dashboardData?.message_response_rate || 0).toFixed(1)}%`
              )}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                opacity: 0.7
              }}
            >
              Message Response Rate
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              pb: 3.5,
              display: 'flex',
              flexDirection: 'column',
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
                backgroundColor: COLORS.primary,
                opacity: 0.7
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(195, 165, 199, 0.15)', 
                  color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary
                }}
              >
                <PeopleAltIcon />
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: COLORS.success, fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: COLORS.success, fontWeight: 600 }}>
                  5.2%
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary 
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? COLORS.cream : COLORS.primary }} />
              ) : (
                `${(dashboardData?.group_collaboration_success || 0).toFixed(1)}%`
              )}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? COLORS.lilac : COLORS.primary,
                opacity: 0.7
              }}
            >
              Group Collaboration Success
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3}>
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
                  data={engagementData}
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
                    name="Messages Sent"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="replies" 
                    stackId="2"
                    stroke={COLORS.lilac} 
                    fill="url(#colorReplies)" 
                    name="Replies Received"
                  />
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
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
        
        {/* Recent Activity */}
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