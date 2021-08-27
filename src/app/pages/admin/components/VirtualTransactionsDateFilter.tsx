import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

export const VirtualTransactionDateFilter = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item container xs={12} md={4} alignItems={'center'}>
      <Grid item xs={12} sm={'auto'}>
        <Typography>Date:</Typography>
        {isMobile && <VSpacer size={'small'} />}
      </Grid>
      <Box pr={1} />
      <Grid item xs={12} sm={true} md={4}>
        <DateFilter name='fromDate' label='From' width={'100%'} />
        {isMobile && <VSpacer size={'small'} />}
      </Grid>
      <Box pr={3} />
      <Grid item xs={12} sm={true} md={4}>
        <DateFilter name='toDate' label='To' width={'100%'} />
      </Grid>
    </Grid>
  )
}
