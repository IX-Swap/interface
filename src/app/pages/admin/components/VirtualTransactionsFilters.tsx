import { Grid, useTheme } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { VTCurrencyFilter } from 'app/pages/admin/components/VTCurrencyFilter'
import { VTDateFilter } from 'app/pages/admin/components/VTDateFilter'
import { VTDirectionFilter } from 'app/pages/admin/components/VTDirectionFilter'
import { VTTransferTypesFilter } from 'app/pages/admin/components/VTTransferTypesFilter'
import React from 'react'

export const VirtualTransactionsFilters = () => {
  const theme = useTheme()

  return (
    <Grid
      item
      container
      direction={'column'}
      p={3}
      bgcolor={theme.palette.backgrounds.light}
      borderRadius={2.5}
      gap={1}
    >
      <Grid item xs>
        <TextInputSearchFilter
          fullWidth
          placeholder='Search virtual account/SWIFT'
          inputAdornmentPosition='start'
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent={'space-between'}
        alignItems='start'
      >
        <Grid item p={1} xs={12} md={6} lg={4}>
          <VTDirectionFilter />
        </Grid>
        <Grid item p={1} xs={12} md={6} lg={2.5}>
          <VTTransferTypesFilter />
        </Grid>
        <Grid item p={1} xs={12} md={6} lg={3.7}>
          <VTDateFilter />
        </Grid>
        <Grid item p={1} xs={12} md={6} lg={1.8}>
          <VTCurrencyFilter />
        </Grid>
      </Grid>
    </Grid>
  )
}
