import { Card } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'

export interface InsightCardProps {
  children: JSX.Element
}

export const InsightCard = ({ children }: InsightCardProps) => {
  const { theme } = useAppBreakpoints()

  return (
    <Card
      variant='outlined'
      style={{ backgroundColor: theme.palette.backgrounds.default }}
    >
      {children}
    </Card>
  )
}
