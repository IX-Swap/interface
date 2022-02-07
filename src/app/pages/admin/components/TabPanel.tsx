import { Box } from '@mui/material'
import React from 'react'

export interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

export const TabPanel = ({ value, index, children }: TabPanelProps) => {
  return <Box hidden={value !== index}>{children}</Box>
}
