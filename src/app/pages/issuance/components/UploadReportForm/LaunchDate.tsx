import { Grid, Typography } from '@mui/material'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { formatDateToMMDDYY } from 'helpers/dates'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export const LaunchDate = () => {
  const { getFilterValue } = useQueryFilter()
  const { data } = useDSOById(getFilterValue('dso'))

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item>
        <Typography variant='subtitle2'>Launch Date:</Typography>
      </Grid>
      <Grid item>
        <Typography variant='body1'>
          {formatDateToMMDDYY(data?.launchDate)}
        </Typography>
      </Grid>
    </Grid>
  )
}
