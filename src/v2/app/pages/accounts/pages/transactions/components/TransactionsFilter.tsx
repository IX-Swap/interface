import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'v2/components/form/TypedField'
import { AssetSelect } from 'v2/components/form/AssetSelect'

export const TransactionsFilter = () => {
  const { control } = useFormContext()

  return (
    <Grid container justify='flex-end' style={{ marginBottom: 20 }}>
      <Grid item xs={3} justify='flex-end' container>
        <TypedField
          control={control}
          component={AssetSelect}
          name='asset'
          label='Asset'
        />
      </Grid>
    </Grid>
  )
}
