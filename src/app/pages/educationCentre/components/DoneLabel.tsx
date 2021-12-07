import { Box, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { green } from '@material-ui/core/colors'

import React from 'react'

export const DoneLabel = () => {
  return (
    <Box display='flex' justifyContent='center' position='absolute' bottom={8}>
      <CheckCircleIcon style={{ color: green[500] }} />
      <Box ml={0.5} />
      <Typography variant='body1' color='textSecondary'>
        Done!
      </Typography>
    </Box>
  )
}
