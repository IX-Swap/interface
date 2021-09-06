import React from 'react'
import { Grid } from '@material-ui/core'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter'

export const CustodyManagementFilters = () => {
  return (
    <Grid
      item
      container
      wrap={'wrap'}
      alignItems={'center'}
      justify={'space-between'}
    >
      <CustodySearchFilter />
      <CustodiansFilter />
      <CustodyDatesFilter />
    </Grid>
  )
}
