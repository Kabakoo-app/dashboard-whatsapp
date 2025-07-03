import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
  AppBar, 
  Box, 
  Drawer, 
  IconButton, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
  Paper
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SupportIcon from '@mui/icons-material/Support'
import FolderIcon from '@mui/icons-material/Folder'
import BarChartIcon from '@mui/icons-material/BarChart'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'

const drawerWidth = 280

// Import our custom Kabakoo logo component
import KabakooLogo from './KabakooLogo'
import { useAuth } from '../context/AuthContext'

interface LayoutProps {
  toggleDarkMode: () => void
  darkMode: boolean
}

const Layout = ({ toggleDarkMode, darkMode }: LayoutProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(!isMobile)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'User Journey', icon: <PeopleIcon />, path: '/user-journey' },
    { text: 'Support & Feedback', icon: <SupportIcon />, path: '/support' },
    { text: 'Content Management', icon: <FolderIcon />, path: '/content' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'A/B Testing', icon: <CompareArrowsIcon />, path: '/ab-testing' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      setOpen(false)
    }
  }

  // Indigenous pattern style - abstract background for the drawer
  const patternBg = {
    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(195, 165, 199, 0.2) 0%, rgba(195, 165, 199, 0) 20%), ' + 
                     'radial-gradient(circle at 90% 50%, rgba(249, 213, 139, 0.15) 0%, rgba(249, 213, 139, 0) 25%), ' + 
                     'radial-gradient(circle at 40% 80%, rgba(195, 165, 199, 0.2) 0%, rgba(195, 165, 199, 0) 30%)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, #3A2C40 0%, #55415D 100%)' 
            : 'linear-gradient(90deg, #55415D 0%, #6B5273 100%)',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ 
                height: 40, 
                mr: 1,
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center' 
              }}
            >
              <KabakooLogo height={40} width={160} />
            </Box>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: '#F8F3EA' 
              }}
            >
              Learning Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="small" 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                color: '#55415D'  
              }}
            >
              Support
            </Button>
            <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
              <LogoutIcon />
            </IconButton>
            <Avatar 
              sx={{ 
                width: 38, 
                height: 38, 
                bgcolor: '#F9D58B',
                color: '#55415D',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              AD
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(180deg, #312A3A 0%, #262130 100%)' 
              : 'linear-gradient(180deg, #FFFFFF 0%, #F8F3EA 100%)',
            ...patternBg
          },
        }}
      >
        <Toolbar />
        <Box sx={{ 
          overflow: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          px: 2,
          py: 3
        }}>
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.1)' : 'rgba(195, 165, 199, 0.1)',
              borderRadius: '12px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(195, 165, 199, 0.2)' : 'rgba(195, 165, 199, 0.3)'}`,
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#F8F3EA' : '#55415D',
                fontWeight: 600,
                mb: 1,
                letterSpacing: '0.3px'
              }}
            >
              Active Learners
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: theme.palette.secondary.main,
                fontWeight: 700
              }}
            >
              4,128
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#C3A5C7' : '#55415D',
                opacity: 0.7,
                fontSize: '0.75rem'
              }}
            >
              78.7% of total users
            </Typography>
          </Paper>
          
          <List sx={{ px: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{ 
                    borderRadius: '10px',
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(195, 165, 199, 0.15)' 
                        : 'rgba(85, 65, 93, 0.08)',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(195, 165, 199, 0.25)' 
                          : 'rgba(85, 65, 93, 0.12)',
                      }
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(195, 165, 199, 0.1)' 
                        : 'rgba(85, 65, 93, 0.05)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: location.pathname === item.path 
                      ? theme.palette.secondary.main 
                      : theme.palette.mode === 'dark' ? '#C3A5C7' : '#55415D',
                    minWidth: '42px'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                  />
                  {location.pathname === item.path && (
                    <Box 
                      sx={{ 
                        width: 4, 
                        height: 36, 
                        borderRadius: '0 4px 4px 0', 
                        backgroundColor: theme.palette.secondary.main,
                        position: 'absolute',
                        left: 0
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, 0.1)' : 'rgba(249, 213, 139, 0.15)',
              borderRadius: '12px',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(249, 213, 139, 0.2)' : 'rgba(249, 213, 139, 0.4)'}`,
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#F8F3EA' : '#55415D',
                fontWeight: 600,
                mb: 1
              }}
            >
              Need help?
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#C3A5C7' : '#55415D',
                mb: 2,
                fontSize: '0.85rem',
                opacity: 0.9
              }}
            >
              Check our documentation or contact support
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth
              size="small"
              sx={{ color: '#55415D' }}
            >
              Contact Support
            </Button>
          </Paper>
        </Box>
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 90% 10%, rgba(85, 65, 93, 0.08) 0%, rgba(85, 65, 93, 0) 50%)' 
            : 'radial-gradient(circle at 90% 10%, rgba(195, 165, 199, 0.15) 0%, rgba(195, 165, 199, 0) 50%)',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout