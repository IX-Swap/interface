import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { SearchFilter } from 'app/components/SearchFilter'
import { VSpacer } from 'components/VSpacer'
import { VirtualTransactionDateFilter } from 'app/pages/admin/components/VirtualTransactionsDateFilter'
import { VirtualTransactionCurrencyFilter } from 'app/pages/admin/components/VirtualTransactionsCurrencyFilter'
import { VirtualTransactionsTransferTypesFilter } from 'app/pages/admin/components/VirtualTransactionsTransferTypesFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const VirtualTransactionsFilters = () => {
  const { isMiniLaptop } = useAppBreakpoints()

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
      <Grid item container xs={12} wrap={'wrap'}>
        <VirtualTransactionDateFilter />
        <VirtualTransactionCurrencyFilter />
        {!isMiniLaptop && <Box pr={3} />}
        <VirtualTransactionsTransferTypesFilter />
      </Grid>
    </Grid>
  )
}
