import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

export const TabDemo = () => {
  const [active, setActive] = useState(0)
  const handleChange = (_: any, value: any) => {
    setActive(value)
  }
  return (
    <Box sx={{ padding: 3, display: 'inline-block' }}>
      <Tabs value={active} onChange={handleChange}>
        <Tab label='Item One' />
        <Tab label='Item Two' />
        <Tab label='Item Three' />
      </Tabs>
    </Box>
  )
}
