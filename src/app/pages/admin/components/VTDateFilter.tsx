import { Grid } from '@mui/material'
import React from 'react'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

export const VTDateFilter = () => {
  return (
    <Grid item container alignItems={'center'} gap={2}>
      <Grid item xs={12} sm>
        <DateFilter name='fromDate' label='From' width={'100%'} />
      </Grid>
      <Grid item xs={12} sm>
        <DateFilter name='toDate' label='To' width={'100%'} />
      </Grid>
    </Grid>
  )
}
