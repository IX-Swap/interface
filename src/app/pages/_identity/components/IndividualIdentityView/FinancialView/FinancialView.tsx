import React from 'react'
import { Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'types/identity'
import { getFundSource } from 'app/pages/identity/utils'
export interface FinancialViewProps {
  data: IndividualIdentity
}

export const FinancialView = (props: FinancialViewProps) => {
  const { data } = props
  const fundSource = getFundSource(data)

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue value={data.occupation} label='Occupation' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue value={data.employer} label='Employer' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LabelledValue
            value={data.employmentStatus}
            label='Employment Status'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <LabelledValue
            value={data.annualIncome}
            label='Annual Net Income (SGD)'
          />
        </Grid>
      </Grid>

      <Grid item container alignItems={'flex-end'} spacing={6}>
        {fundSource.map((it, i) => {
          if (it.checked) {
            return (
              <Grid item xs={12} sm={6} md={4} key={it.name}>
                <LabelledValue
                  value={`${it.name} (${it.value}%)`}
                  label={i === 0 ? 'Source(s) of Fund' : ''}
                />
              </Grid>
            )
          }

          return null
        })}
      </Grid>

      <Grid item container spacing={6}>
        <Grid item xs={12} sm={6} md={8}>
          <LabelledValue
            value={(data.fundMajority as boolean) ? 'Yes' : 'No'}
            label='Will this source(s) be used to fund majority of your account?'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
