import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import FolderIcon from '@mui/icons-material/Folder'
import AudioFileIcon from '@mui/icons-material/AudioFile'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import ImageIcon from '@mui/icons-material/Image'
import DescriptionIcon from '@mui/icons-material/Description'

// Mock data
const modulesList = [
  { id: 1, name: 'Introduction to Course', status: 'active', items: 12 },
  { id: 2, name: 'Fundamentals', status: 'active', items: 18 },
  { id: 3, name: 'Intermediate Concepts', status: 'active', items: 15 },
  { id: 4, name: 'Advanced Topics', status: 'draft', items: 8 },
  { id: 5, name: 'Final Assessment', status: 'draft', items: 3 }
]

const contentTypeData = [
  { name: 'Text Messages', value: 154, color: '#8884d8' },
  { name: 'Voice Notes', value: 83, color: '#82ca9d' },
  { name: 'Videos', value: 42, color: '#ffc658' },
  { name: 'Infographics', value: 37, color: '#ff8042' }
]

const messageTemplates = [
  { id: 1, name: 'Welcome Message', type: 'onboarding', lastUpdated: '2023-09-15' },
  { id: 2, name: 'Module Introduction', type: 'content', lastUpdated: '2023-09-20' },
  { id: 3, name: 'Exercise Instructions', type: 'content', lastUpdated: '2023-09-22' },
  { id: 4, name: 'Reminder - Assignment Due', type: 'reminder', lastUpdated: '2023-09-18' },
  { id: 5, name: 'Feedback Request', type: 'engagement', lastUpdated: '2023-09-25' },
  { id: 6, name: 'Group Formation', type: 'collaboration', lastUpdated: '2023-09-12' },
  { id: 7, name: 'Technical Support', type: 'support', lastUpdated: '2023-09-10' },
  { id: 8, name: 'Course Completion', type: 'milestone', lastUpdated: '2023-09-05' }
]

const ContentManagement = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Content Management
      </Typography>
      
      <Grid container spacing={3}>
        {/* Module Organization */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Module Organization" />
            <CardContent>
              <List>
                {modulesList.map((module) => (
                  <div key={module.id}>
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={module.name} 
                        secondary={`${module.items} content items`}
                      />
                      <Chip 
                        label={module.status} 
                        color={module.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Content Type Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Content Type Distribution" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Message Template Library */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Message Template Library" />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Total Templates: {messageTemplates.length}
              </Typography>
              <List>
                {messageTemplates.map((template) => (
                  <div key={template.id}>
                    <ListItem>
                      <ListItemIcon>
                        {template.type === 'content' ? <DescriptionIcon /> :
                         template.type === 'onboarding' ? <ImageIcon /> :
                         template.type === 'collaboration' ? <VideoFileIcon /> :
                         <AudioFileIcon />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={template.name} 
                        secondary={`Type: ${template.type} • Last Updated: ${template.lastUpdated}`}
                      />
                      <Chip label={template.type} size="small" />
                    </ListItem>
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

export default ContentManagement