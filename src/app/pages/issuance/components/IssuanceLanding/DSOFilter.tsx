import React from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { Box, Grid, Typography } from '@mui/material'
import { NoDeals } from 'app/pages/issuance/components/IssuanceLanding/NoDeals'
import { VSpacer } from 'components/VSpacer'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'

export const DSOFilter = () => {
  const { data, isLoading, selected, handleChange } = useDSOFilter()

  if (isLoading) {
    return null
  }

  if (data.list.length === 0) {
    return <NoDeals />
  }

  return (
    <Box py={3} maxWidth={300}>
      <Typography variant='h5'>My DSO(s)</Typography>
      <VSpacer size='small' />
      <Grid container xs={12}>
        <DSOSelect
          value={selected}
          options={data.list}
          onChange={handleChange}
        />
      </Grid>
    </Box>
  )
}
