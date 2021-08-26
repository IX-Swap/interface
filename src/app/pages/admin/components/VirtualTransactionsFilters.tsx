import { Grid } from '@material-ui/core'
import React from 'react'
import { SearchFilter } from 'app/components/SearchFilter'
import { VSpacer } from 'components/VSpacer'
import { VirtualTransactionDateFilter } from 'app/pages/admin/components/VirtualTransactionsDateFilter'
import { VirtualTransactionCurrencyFilter } from 'app/pages/admin/components/VirtualTransactionsCurrencyFilter'

export const VirtualTransactionsFilters = () => {
  return (
    <Grid item container wrap={'wrap'} direction={'column'}>
      <Grid item xs={12}>
        <SearchFilter
          fullWidth
          placeholder='Search virtual account/ SWIFT'
          inputAdormentPosition='start'
        />
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
      </Grid>
      <Grid item container xs={12}>
        <VirtualTransactionDateFilter />
        <VirtualTransactionCurrencyFilter />
      </Grid>
    </Grid>
  )
}
