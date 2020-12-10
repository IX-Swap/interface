import React from 'react'
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
export interface NoChartDataProps {
  text: string
}

export const NoChartData: React.FC<NoChartDataProps> = ({
  text
}: NoChartDataProps) => {
  const theme = useTheme()
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='200px'
      width='100%'
      data-testid='no-chart-data'
    >
      <Box
        textAlign='center'
        fontSize={`${theme.typography.fontSize + 2}px`}
        width='80%'
        color={theme.palette.text.hint}
      >
        {text}
      </Box>
    </Box>
  )
}
