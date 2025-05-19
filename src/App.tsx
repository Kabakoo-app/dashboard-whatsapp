import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import './App.css'

// Import components
import Dashboard from './pages/Dashboard'
import UserJourney from './pages/UserJourney'
import Analytics from './pages/Analytics'
import ABTestingConfig from './pages/ABTestingConfig'
import ContentManagement from './pages/ContentManagement'
import SupportFeedback from './pages/SupportFeedback'
import Layout from './components/Layout'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#25D366', // WhatsApp green
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
        <Box sx={{ display: 'flex' }}>
          <Routes>
            <Route path="/" element={<Layout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
              <Route index element={<Dashboard />} />
              <Route path="user-journey" element={<UserJourney />} />
              <Route path="support" element={<SupportFeedback />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="ab-testing" element={<ABTestingConfig />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App