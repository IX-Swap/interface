import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const VirtualAccountTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box {...rest}>{children}</Box>}
    </div>
  )
}
