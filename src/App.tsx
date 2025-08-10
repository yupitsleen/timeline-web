import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppProvider } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
