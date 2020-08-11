//
import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import TableWithPagination from 'components/TableWithPagination'
import storageHelper from 'services/storageHelper'
import { columns } from './data'

export default function Overview () {
  return (
    <Box m={4}>
      <Grid item xs={3}>
        <Typography variant='h3'>Asset Balance</Typography>
      </Grid>
      <Box mt={2} />
      <TableWithPagination
        id='authorizerBanksList'
        endpoint={`/accounts/balance/${storageHelper.getUserId()}`}
        columns={columns}
      />
    </Box>
  )
}
