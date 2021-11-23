import { useStyles } from './InfoItem.styles'
import { Box, Typography } from '@material-ui/core'
import React from 'react'

export interface InfoItemProps {
  label: string
  value: string
}

export const InfoItem = ({ label, value }: InfoItemProps) => {
  const classes = useStyles()

  return (
    <Box display={'flex'}>
      <Typography className={classes.label}>{label}:</Typography>
      <Box px={0.5} />
      <Typography className={classes.value}>{value}</Typography>
    </Box>
  )
}
