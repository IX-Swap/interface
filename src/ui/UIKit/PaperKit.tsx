import { Box, Paper } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const PaperKit = () => {
  return (
    <UIKitThemeWrapper>
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
        <Paper />
        <Paper variant={'outlined'} />
      </Box>
    </UIKitThemeWrapper>
  )
}
