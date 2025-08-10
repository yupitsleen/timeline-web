import { Box, Typography, Container } from '@mui/material'

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
          © {currentYear} My App. Built with React, TypeScript, and Material-UI.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer