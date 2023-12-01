import React from 'react'
import { Grid, Typography } from '@mui/material'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

export const VTCurrencyFilter = () => {
  return (
    <Grid item container direction={'column'} gap={1}>
      <Grid item xs={12} sm={'auto'}>
        <Typography>Currency</Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent={'start'}
        display={'flex'}
        gap={1}
        pt={1}
      >
        <Grid item px={1}>
          <CurrencyFilter currency='SGD' defaultValue={null} />
        </Grid>
        <Grid item px={1}>
          <CurrencyFilter currency='USD' defaultValue={null} />
        </Grid>
      </Grid>
    </Grid>
  )
}
