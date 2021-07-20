import React from 'react'
import { Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'

export const CommitmentTableFilter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container spacing={isMobile ? 2 : 0} justify={'space-between'}>
        <Grid item xs={12} md={4}>
          <SearchFilter fullWidth placeholder='Search Name' />
        </Grid>

        <Grid item xs={12} md={2}>
          <FundStatusFilter />
        </Grid>
      </Grid>
    </Grid>
  )
}
