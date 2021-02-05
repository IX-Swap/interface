import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && (
        <Box {...rest} pt={6}>
          {children}
        </Box>
      )}
    </div>
  )
}
