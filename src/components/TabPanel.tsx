import { Box, BoxProps } from '@mui/material'
import React from 'react'

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode
  index: number
  value: number
  pt?: any
  withoutSpacing?: boolean
}

export const TabPanel = (props: TabPanelProps) => {
  const {
    children,
    value,
    index,
    pt = 6,
    withoutSpacing = false,
    ...rest
  } = props

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index &&
        (withoutSpacing ? (
          <Box {...rest} pt={pt} style={{ paddingTop: 'initial' }}>
            {children}
          </Box>
        ) : (
          <Box {...rest} pt={pt}>
            {children}
          </Box>
        ))}
    </div>
  )
}
