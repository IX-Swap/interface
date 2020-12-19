import React from 'react'
import { Box } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'

export interface ChartWrapperProps {
  title?: string
  small?: boolean
}

export const ChartWrapper: React.FC<ChartWrapperProps> = props => {
  const { title, children, small } = props

  return (
    <Box py={3} px={2.5}>
      {title !== undefined && <ChartTitle title={title} small={small} />}
      {children}
    </Box>
  )
}
