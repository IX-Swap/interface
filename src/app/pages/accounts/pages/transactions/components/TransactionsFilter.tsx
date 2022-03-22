import React from 'react'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'

export const TransactionsFilter = () => {
  const { control } = useFormContext()

  return (
    <Grid container justifyContent='flex-end' style={{ marginBottom: 20 }}>
      <Grid item xs={3} justifyContent='flex-end' container>
        <TypedField
          control={control}
          component={AssetSelect}
          limit={250}
          name='asset'
          label='Asset'
        />
      </Grid>
    </Grid>
  )
}
