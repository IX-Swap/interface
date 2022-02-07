import React, { ReactElement } from 'react'
import { Box } from '@mui/material'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'

export interface ChartWrapperProps {
  title?: ReactElement | string
  small?: boolean
  py?: number
  px?: number
}

export const ChartWrapper: React.FC<ChartWrapperProps> = props => {
  const { title, children, small, py = 3, px = 2.5 } = props

  return (
    <Box py={py} px={px}>
      {title !== undefined && <ChartTitle title={title} small={small} />}
      {children}
    </Box>
  )
}
