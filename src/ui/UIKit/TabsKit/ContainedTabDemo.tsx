import { Paper } from '@mui/material'
import React from 'react'
import { ContainedTabs } from 'ui/ContainedTabs/ContainedTabs'

export const ContainedTabDemo = () => {
  return (
    <Paper
      sx={{ padding: 3, display: 'inline-block', marginTop: 2 }}
      elevation={0}
    >
      <ContainedTabs labels={['Item One', 'Item Two', 'Item Three']} />
    </Paper>
  )
}
