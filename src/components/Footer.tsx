import { Box, Typography, Container } from '@mui/material'
import { env } from '../utils/env'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto',
        py: 2,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {currentYear} {env.APP_NAME}. Built with React, TypeScript, and Material-UI.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer