import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import './App.css'

// Import components
import Dashboard from './pages/Dashboard'
import Video from './pages/Video'
import Attendees from './pages/Attendees'
import Analytics from './pages/Analytics'
import Cohort from './pages/Cohort'
import Layout from './components/Layout'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    typography: {
      fontFamily: '"Rubik", "Open Sans", "Lato", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#55415D', // Deep Purple
        light: '#C3A5C7', // Soft Lilac
        dark: '#3A2C40',
      },
      secondary: {
        main: '#F9D58B', // Sunshine Yellow
        light: '#FCE5B3',
        dark: '#E6B85A',
      },
      background: {
        default: darkMode ? '#262130' : '#F8F3EA', // Warm Cream for light mode
        paper: darkMode ? '#312A3A' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#F8F3EA' : '#3A2C40',
        secondary: darkMode ? '#C3A5C7' : '#55415D',
      },
      divider: darkMode ? '#C3A5C7' : '#55415D',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            border: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: '0 6px 12px rgba(85, 65, 93, 0.2)',
            },
          },
          containedSecondary: {
            color: '#55415D',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(249, 213, 139, 0.2)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
        },
      },
    },
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Box sx={{ display: 'flex' }}>
                    <Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                  </Box>
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="video" element={<Video />} />
              <Route path="attendees" element={<Attendees />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="cohort" element={<Cohort />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App