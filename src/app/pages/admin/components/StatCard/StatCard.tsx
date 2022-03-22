import { Card, Grid, Typography, CardContent } from '@mui/material'
import { useStyles } from 'app/pages/admin/components/StatCard/StatCard.styles'
import React from 'react'

export interface StatCardProps {
  title: string
  value: string
  icon: any
  secondaryInfo: React.ReactNode
}

export const StatCard = ({
  title,
  value,
  icon,
  secondaryInfo
}: StatCardProps) => {
  const { root, content, title: titleStyle, titleIcon } = useStyles()
  return (
    <Card variant='outlined' className={root}>
      <CardContent className={content}>
        <Grid
          container
          direction='column'
          spacing={2}
          justifyContent='space-between'
        >
          <Grid item>
            <Grid container spacing={1} alignItems='center'>
              <Grid item className={titleIcon}>
                {React.createElement(icon)}
              </Grid>
              <Grid item>
                <Typography className={titleStyle}>{title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='h3'>{value}</Typography>
          </Grid>
          <Grid item>{secondaryInfo}</Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
