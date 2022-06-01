import { Grid, Typography } from '@mui/material'
import { Breakdown } from 'app/pages/identity/components/FinancialInformationForm/NoticeOfAssesment/Breakdown'
import React from 'react'
import { Divider } from 'ui/Divider'

const sampleData = [
  {
    yearOfAssesement: '2018',
    type: 'Original (Clearance)',
    assessableIncome: '$100,000',
    employment: '$50,000',
    trade: '$25,000',
    rent: 'None',
    interest: 'None'
  },
  {
    yearOfAssesement: '2017',
    type: 'Original (Clearance)',
    assessableIncome: '$200,000',
    employment: '$80,000',
    trade: '$25,000',
    rent: 'None',
    interest: 'None'
  }
]

export const NoticeOfAssesment = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>
          Notice of Assessment{' '}
          <Typography
            component='span'
            variant='subtitle1'
            color='textSecondary'
          >
            (Basic, Last 2 Years)
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={6}>
        {sampleData.map((breakdown, i) => (
          <React.Fragment key={breakdown.yearOfAssesement}>
            <Grid item xs={12}>
              <Breakdown {...breakdown} />
            </Grid>
            <Grid item xs={12}>
              {i + 1 < sampleData.length && <Divider />}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  )
}
