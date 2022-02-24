import React from 'react'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { FundSourceSelect } from 'components/form/FundSourceSelect'

export const FundSourceFields = () => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={FundSourceSelect}
          control={control}
          variant='outlined'
          name='sourceOfFund'
          label='Source of funds'
        />
      </Grid>
    </Grid>
  )
}
