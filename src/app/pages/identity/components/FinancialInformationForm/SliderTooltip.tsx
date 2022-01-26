import React from 'react'
import { Tooltip } from '@mui/material'

interface SliderTooltipProps {
  children: React.ReactElement
  open: boolean
  value: number
}

export const SliderTooltip = (props: SliderTooltipProps) => {
  const { children, open, value } = props

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement='top'
      title={`${value}%`}
    >
      {children}
    </Tooltip>
  )
}
