import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export interface BreakdownProps {
  yearOfAssesement?: string
  type?: string
  assessableIncome?: string
  employment?: string
  trade?: string
  rent?: string
  interest?: string
}

export const Breakdown = ({
  yearOfAssesement = 'None',
  type = 'None',
  assessableIncome = 'None',
  employment = 'None',
  trade = 'None',
  rent = 'None',
  interest = 'None'
}: BreakdownProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label='Year of Assessment'
            value={yearOfAssesement}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField disabled fullWidth label='Type' value={type} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label='Assessable Income'
            value={assessableIncome}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>Income Breakdown</Typography>
      </Grid>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Employment' value={employment} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Trade' value={trade} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Rent' value={rent} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField disabled fullWidth label='Interest' value={interest} />
        </Grid>
      </Grid>
    </Grid>
  )
}
