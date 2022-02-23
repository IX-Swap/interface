import React, { useEffect } from 'react'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { FundSourceSelect } from 'components/form/FundSourceSelect'

export const FundSourceFields = () => {
  const { control, watch, clearErrors } = useFormContext()
  const sourceOfFund = watch('sourceOfFund')

  useEffect(() => {
    if (sourceOfFund !== 'OTHERS') {
      control.setValue('otherSourceOfFund', '')
      clearErrors('otherSourceOfFund')
    }
  }, [sourceOfFund]) // eslint-disable-line

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
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          fullWidth
          component={TextField}
          control={control}
          variant='outlined'
          name='otherSourceOfFund'
          label='Others (Please specify)'
          disabled={sourceOfFund !== 'OTHERS'}
        />
      </Grid>
    </Grid>
  )
}
