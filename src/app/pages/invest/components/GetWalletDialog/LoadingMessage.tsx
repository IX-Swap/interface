import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import React from 'react'

export interface LoadingMessageProps {
  message?: string
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message = 'Assigning please wait'
}) => {
  const theme = useTheme()
  return (
    <Box
      width={1}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Typography color={theme.palette.text.secondary}>{message}</Typography>
      <Box mt={3}>
        <CircularProgress thickness={5.5} size={20} />
      </Box>
    </Box>
  )
}
