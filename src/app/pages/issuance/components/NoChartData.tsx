import React from 'react'
import { Grid, Typography } from '@mui/material'
export interface NoChartDataProps {
  text: string
}

export const NoChartData: React.FC<NoChartDataProps> = ({
  text
}: NoChartDataProps) => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      style={{
        minHeight: '200px',
        width: '90%',
        margin: '0 auto',
        paddingRight: '20px'
      }}
      data-testid='no-chart-data'
    >
      <Typography align='center' color='textSecondary'>
        {text}
      </Typography>
    </Grid>
  )
}
