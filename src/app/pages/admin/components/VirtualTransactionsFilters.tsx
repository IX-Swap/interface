import { Box, Grid } from '@mui/material'
import React from 'react'
import { SearchFilter } from 'app/components/SearchFilter'
import { VSpacer } from 'components/VSpacer'
import { VTDateFilter } from 'app/pages/admin/components/VTDateFilter'
import { VTCurrencyFilter } from 'app/pages/admin/components/VTCurrencyFilter'
import { VTTransferTypesFilter } from 'app/pages/admin/components/VTTransferTypesFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VTDirectionFilter } from 'app/pages/admin/components/VTDirectionFilter'

export const VirtualTransactionsFilters = () => {
  const { isMiniLaptop } = useAppBreakpoints()

  return (
    <Grid item container wrap={'wrap'} direction={'column'}>
      <Grid item xs={12}>
        <SearchFilter
          fullWidth
          placeholder='Search virtual account/ SWIFT'
          inputAdornmentPosition='start'
        />
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
      </Grid>
      <Grid
        item
        container
        xs={12}
        mb={2}
        wrap={'wrap'}
        justifyContent={'space-between'}
        alignItems='center'
      >
        <VTDateFilter />
        {!isMiniLaptop && <Box pr={3} />}
        <VTCurrencyFilter />
        {!isMiniLaptop && <Box pr={3} />}
        <VTTransferTypesFilter />
        <VTDirectionFilter />
      </Grid>
    </Grid>
  )
}
