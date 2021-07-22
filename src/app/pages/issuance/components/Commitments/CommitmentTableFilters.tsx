import React from 'react'
import { Button, Grid } from '@material-ui/core'
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

        <Grid item container xs={12} md={3} lg={3} justify={'space-between'}>
          <Grid item xs={12} md={5} lg={6}>
            <FundStatusFilter />
          </Grid>
          <Grid item xs={12} md={7} lg={6} container justify={'flex-end'}>
            <Button
              variant={'contained'}
              color={'primary'}
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginTop: isMobile ? theme.spacing(2) : 0
              }}
            >
              Capital Call
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
