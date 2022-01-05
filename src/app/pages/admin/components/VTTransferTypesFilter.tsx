import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'

export const VTTransferTypesFilter = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      xs={12}
      md={5}
      lg={4}
      alignItems={'center'}
      justifyContent={'flex-start'}
    >
      <Grid item xs={3} sm={'auto'}>
        <Typography style={{ fontWeight: 600 }}>Types of Transfer:</Typography>
      </Grid>
      {!isMobile && <Box pr={1} />}
      <Grid item xs={3} sm={'auto'}>
        <TransferTypesFilter type='PP' defaultValue={null} />
      </Grid>
      {!isMobile && <Box pr={2} />}
      <Grid item xs={3} sm={'auto'}>
        <TransferTypesFilter type='Fast' defaultValue={null} />
      </Grid>
      {!isMobile && <Box pr={2} />}
      <Grid item xs={3} sm={'auto'}>
        <TransferTypesFilter type='ACH' defaultValue={null} />
      </Grid>
    </Grid>
  )
}
