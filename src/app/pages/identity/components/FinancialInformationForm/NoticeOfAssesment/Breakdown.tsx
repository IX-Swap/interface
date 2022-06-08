import { Grid, TextField, Typography } from '@mui/material'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { formatMoney } from 'helpers/numbers'
import React from 'react'
import { Divider } from 'ui/Divider'

export interface NOA {
  amount: { value: number }
  category: { value: string }
  employment: { value: number }
  interest: { value: number }
  rent: { value: 0 }
  taxclearance: { value: 'N' | 'Y' }
  trade: { value: number }
  yearofassessment: { value: string }
}

export const Breakdown = () => {
  const { singPassData } = useIsSingPass()
  const noas = singPassData?.noahistory.noas ?? []

  if (noas.length < 1) {
    return null
  }

  return (
    <Grid container spacing={3}>
      {noas.map((noa: NOA, i: number) => (
        <React.Fragment key={noa.yearofassessment.value}>
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label='Year of Assessment'
                value={noa.yearofassessment.value}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label='Type'
                value={`${noa.category.value}${
                  noa.taxclearance.value === 'Y' ? '(Clearance)' : ''
                }`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                fullWidth
                label='Assessable Income'
                value={formatMoney(noa.amount.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>Income Breakdown</Typography>
          </Grid>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                disabled
                fullWidth
                label='Employment'
                value={formatMoney(noa.employment.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                disabled
                fullWidth
                label='Trade'
                value={formatMoney(noa.trade.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                disabled
                fullWidth
                label='Rent'
                value={formatMoney(noa.rent.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                disabled
                fullWidth
                label='Interest'
                value={formatMoney(noa.interest.value)}
              />
            </Grid>
          </Grid>
          {i < noas.length - 1 && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  )
}
