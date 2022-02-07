import { useStyles } from './InfoItem.styles'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export interface InfoItemProps {
  label: string
  value: string
}

export const InfoItem = ({ label, value }: InfoItemProps) => {
  const classes = useStyles()

  return (
    <Grid item>
      <Box display={'flex'}>
        <Typography className={classes.label}>{label}:</Typography>
        <Box px={0.5} />
        <Typography className={classes.value}>{value}</Typography>
      </Box>
    </Grid>
  )
}
