import { useState } from 'react'
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'

function Login() {
  const { setUser, setLoading, state } = useAppContext()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substring(2),
        name: formData.email.split('@')[0],
        email: formData.email
      }
      
      setUser(user)
      setLoading(false)
      
      alert(`Welcome back, ${user.name}!`)
    }, 1500)
  }

  if (state.loading) {
    return <Loading size="large" text="Signing you in..." />
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign In
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login