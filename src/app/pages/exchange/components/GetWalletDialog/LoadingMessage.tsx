import { Box, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'

export const LoadingMessage: React.FC = () => {
  return (
    <Box width={1} display='flex' justifyContent='center' alignItems='center'>
      <Typography>Assigning please wait</Typography>
      <Box ml={1}>
        <CircularProgress thickness={5.5} size={20} />
      </Box>
    </Box>
  )
}
