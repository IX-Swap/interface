import { Box, Grid, Typography } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React from 'react'

export const Filters = () => {
  return (
    <Grid
      container
      justify='space-between'
      style={{ paddingLeft: 24, paddingRight: 24 }}
    >
      <Grid item xs={12} md={6}>
        <Box width={300}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdornmentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction='row'
          justify='flex-end'
          spacing={2}
          alignItems='center'
        >
          <Grid item>
            <Typography>Date:</Typography>
          </Grid>
          <Grid item>
            <DateFilter name='fromDate' label='From' />
          </Grid>
          <Grid item>
            <DateFilter name='toDate' label='To' />
          </Grid>
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
