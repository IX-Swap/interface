import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

export const VirtualTransactionCurrencyFilter = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      xs={12}
      md={3}
      alignItems={'center'}
      justify={'flex-start'}
    >
      <Grid item xs={4} sm={'auto'}>
        <Typography>Currency:</Typography>
        {/* {isMobile && <VSpacer size={'small'} />} */}
      </Grid>
      {!isMobile && <Box pr={1} />}
      <Grid item xs={4} sm={'auto'}>
        <CurrencyFilter currency='SGD' />
        {/* {isMobile && <VSpacer size={'small'} />} */}
      </Grid>
      {!isMobile && <Box pr={2} />}
      <Grid item xs={4} sm={'auto'}>
        <CurrencyFilter currency='USD' />
      </Grid>
    </Grid>
  )
}
