import React from 'react'
import { Grid, CardContent, Card, GridProps, Typography } from '@mui/material'
export interface DSOContainerProps extends GridProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export const DSOContainer = (props: DSOContainerProps) => {
  const { title, children, subtitle, ...rest } = props

  return (
    <Grid {...rest}>
      <Grid item>
        <Typography
          //   sx={{ opacity: 0.7 }}
          variant='h6'
          mb={1.5}
          color={'dialog.color'}
          fontSize={14}
        >
          {title}
        </Typography>
        <Typography color={'text.secondary'} fontWeight={400}>
          {subtitle}
        </Typography>
      </Grid>

      <Card
        variant='outlined'
        style={{
          height: '100%',
          borderRadius: 8,
          marginTop: 8,
          boxShadow: 'none'
        }}
      >
        <CardContent>
          <Grid container direction='column' spacing={2}>
            <Grid item>{children}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
