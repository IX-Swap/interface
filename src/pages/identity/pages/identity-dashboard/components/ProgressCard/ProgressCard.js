import React, { createElement } from 'react'
import { Card, Box, Typography } from '@material-ui/core'

export default function ProgressCard ({
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

        {createElement(component, props)}
      </Box>
    </Card>
  )
}
