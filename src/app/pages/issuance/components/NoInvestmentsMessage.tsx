import React from 'react'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

interface NoInvestmentsMessageProps {
  message: string
}

export const NoInvestmentsMessage = ({
  message
}: NoInvestmentsMessageProps) => {
  return (
    <Box
      height={200}
      width='100%'
      display='flex'
      px={3}
      alignItems='center'
      justifyContent='center'
      textAlign='center'
    >
      <Typography color='textSecondary'>{message}</Typography>
    </Box>
  )
}
