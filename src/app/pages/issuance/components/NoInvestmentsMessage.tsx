import React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

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
