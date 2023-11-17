import React from 'react'
import { Grid, Typography } from '@mui/material'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'

export const VTTransferTypesFilter = () => {
  return (
    <Grid item container direction={'column'} gap={1}>
      <Grid item xs={12} sm={'auto'}>
        <Typography>Types of Transfer</Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent={'start'}
        display={'flex'}
        gap={1}
        pt={1}
      >
        <Grid item px={1}>
          <TransferTypesFilter type='PP' defaultValue={null} />
        </Grid>
        <Grid item px={1}>
          <TransferTypesFilter type='Fast' defaultValue={null} />
        </Grid>
        <Grid item px={1}>
          <TransferTypesFilter type='ACH' defaultValue={null} />
        </Grid>
      </Grid>
    </Grid>
  )
}
