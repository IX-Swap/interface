import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'

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
