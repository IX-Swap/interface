import { Grid, TextField, Typography } from '@mui/material'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export const Breakdown = () => {
  const { individualIdentity } = useIsSingPass()
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label='Year of Assessment'
            value={individualIdentity?.noa_basic.year_of_assessment}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label='Type'
            value={individualIdentity?.noa_basic.noa_type}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label='Assessable Income'
            value={formatMoney(
              parseFloat(individualIdentity?.noa_basic.assessable_income ?? '')
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>Income Breakdown</Typography>
      </Grid>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Employment' value='' />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Trade' value='' />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Rent' value='' />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Interest' value='' />
        </Grid>
      </Grid>
    </Grid>
  )
}
