import React, { createElement } from 'react'
import { Card, Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function ProgressCard ({
  to,
  title,
  percentage,
  component,
  ...props
}) {
  return (
    <Card component='section'>
      <Box p={3}>
        <Box display='flex'>
          <Box flex='1 1 auto'>
            <Typography component='h2' variant='h5'>{title}</Typography>
          </Box>
          <Typography component='h2' variant='h5'>{percentage + '%'}</Typography>
        </Box>

        <Box mx={-3}>
          {createElement(component, props)}
        </Box>

        <Box display='flex' justifyContent='center'>
        {percentage !== 100 &&
          <Link to={to} style={{ textDecoration: 'none' }}>
            <Button color='primary' component='div'>
              Continue
            </Button>
          </Link>}
        </Box>
      </Box>
    </Card>
  )
}
