import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'

export const CustodyDatesFilter = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      xs={12}
      md={4}
      justify={'flex-start'}
      alignItems={'center'}
      wrap={'wrap'}
    >
      <Grid item xs={12} sm={'auto'}>
        <Typography style={{ fontWeight: 600 }}>Date:</Typography>
        {isMobile && <VSpacer size={'small'} />}
      </Grid>
      <Box pr={1} />
      <Grid item xs={12} sm={true}>
        <DateFilter name='fromDate' label='From' width={'100%'} />
        {isMobile && <VSpacer size={'small'} />}
      </Grid>
      <Box pr={3} />
      <Grid item xs={12} sm={true}>
        <DateFilter name='toDate' label='To' width={'100%'} />
      </Grid>
    </Grid>
  )
}
