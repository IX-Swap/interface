import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

export const VTCurrencyFilter = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      xs={12}
      md={4}
      lg={2}
      alignItems={'center'}
      justify={'flex-start'}
    >
      <Grid item xs={4} sm={'auto'}>
        <Typography style={{ fontWeight: 600 }}>Currency:</Typography>
      </Grid>
      {!isMobile && <Box pr={1} />}
      <Grid item xs={4} sm={'auto'}>
        <CurrencyFilter currency='SGD' defaultValue={null} />
      </Grid>
      {!isMobile && <Box pr={2} />}
      <Grid item xs={4} sm={'auto'}>
        <CurrencyFilter currency='USD' defaultValue={null} />
      </Grid>
    </Grid>
  )
}
