import { Box, Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import React from 'react'

export const Filters = () => {
  return (
    <Grid container justify='space-between'>
      <Grid item xs={12} md={6}>
        <Box width={300}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdormentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justify='flex-end' spacing={2}>
          <Grid item>
            <CurrencyFilter currency='SGD' />
          </Grid>
          <Grid item>
            <CurrencyFilter currency='USD' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
