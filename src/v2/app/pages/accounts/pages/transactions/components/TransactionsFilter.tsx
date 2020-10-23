import React from 'react'
import { Grid } from '@material-ui/core'
import { useTypedForm } from 'v2/components/form/useTypedForm'

export const TransactionsFilter = () => {
  const { AssetSelect, DatePicker } = useTypedForm()

  return (
    <Grid container justify='space-between'>
      <Grid item container direction='row' xs={9} spacing={2}>
        <Grid item>
          <DatePicker name='from' label='From' />
        </Grid>
        <Grid item>
          <DatePicker name='to' label='To' />
        </Grid>
      </Grid>
      <Grid item xs={3} justify='flex-end' container>
        <AssetSelect name='asset' label='Asset' assetType='Currency' />
      </Grid>
    </Grid>
  )
}
