import React from 'react'
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export interface ChartHeaderProps {
  title: string
}

export const ChartHeader: React.FC<ChartHeaderProps> = (
  props: ChartHeaderProps
) => {
  const theme = useTheme()
  const { title } = props
  return (
    <Box
      fontSize={`${theme.typography.fontSize * 1.4}px`}
      fontWeight='fontWeightMedium'
      color={theme.palette.text.primary}
      mb={3}
    >
      {title}
    </Box>
  )
}
