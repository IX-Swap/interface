import React from 'react'
import { Grid } from '@mui/material'
import { CustodiansFilter } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter'
import { CustodySearchFilter } from 'app/pages/admin/components/CustodySearchFilter/CustodySearchFilter'
import { CustodyDatesFilter } from 'app/pages/admin/components/CustodyDatesFilter/CustodyDatesFilter'

export const CustodyManagementFilters = () => {
  return (
    <Grid
      item
      container
      wrap={'wrap'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <CustodySearchFilter />
      <CustodiansFilter />
      <CustodyDatesFilter />
    </Grid>
  )
}
