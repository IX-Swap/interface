import { Box } from '@mui/material'
import React from 'react'
import { ContainedTabs } from 'ui/ContainedTabs/ContainedTabs'

export const ContainedTabDemo = () => {
  return (
    <Box sx={{ padding: 3, display: 'inline-block', marginTop: 2 }}>
      <ContainedTabs labels={['Item One', 'Item Two', 'Item Three']} />
    </Box>
  )
}
