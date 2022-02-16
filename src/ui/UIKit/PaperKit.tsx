import { Box, Paper } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { AppTheme, getAppTheme } from 'themes/new'

export const PaperKit = () => {
  return (
    <ThemeProvider theme={getAppTheme(AppTheme.Light, true)}>
      <Box
        sx={{
          p: 10,
          justifyContent: 'center',
          background: '#F0F2F7',
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128
          }
        }}
      >
        <Paper elevation={0} />
        <Paper variant={'outlined'} />
      </Box>
    </ThemeProvider>
  )
}
