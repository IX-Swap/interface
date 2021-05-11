import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode
  index: number
  value: number
  pt?: any
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, pt = 6, ...rest } = props

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && (
        <Box {...rest} pt={pt}>
          {children}
        </Box>
      )}
    </div>
  )
}
