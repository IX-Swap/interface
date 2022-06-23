import React from 'react'
import { Grid, useTheme } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { getFundSource } from 'app/pages/identity/utils/individual/view'

export interface FinancialViewProps {
  data: IndividualIdentity
}

export const FinancialView = (props: FinancialViewProps) => {
  const { data } = props
  const fundSource = getFundSource(data)
  const theme = useTheme()

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={6}>
        <Grid item xs={12} sm={6} md={6}>
          <LabelledValue
            labelWeight='thin'
            labelFontSize={14}
            valueColor={theme.palette.text.secondary}
            value={data.occupation}
            label='Occupation'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LabelledValue
            labelWeight='thin'
            labelFontSize={14}
            valueColor={theme.palette.text.secondary}
            value={data.employmentStatus}
            label='Employment Status'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LabelledValue
            labelWeight='thin'
            labelFontSize={14}
            valueColor={theme.palette.text.secondary}
            value={data.employer}
            label='Employer'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LabelledValue
            labelWeight='thin'
            labelFontSize={14}
            valueColor={theme.palette.text.secondary}
            value={data.annualIncome}
            label='Income in SGD in preceding 12 months'
          />
        </Grid>
      </Grid>
      {typeof fundSource === 'string' && (
        <Grid item container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <LabelledValue
              labelWeight='thin'
              labelFontSize={14}
              valueColor={theme.palette.text.secondary}
              value={data.sourceOfFund}
              label='Source of fund'
            />
          </Grid>
        </Grid>
      )}

      {Array.isArray(fundSource) && (
        <Grid item container alignItems={'flex-end'} spacing={6}>
          {fundSource.map((it, i) => {
            if (it.checked) {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  key={it.name}
                  style={{ paddingTop: i !== 0 ? 0 : 24 }}
                >
                  <LabelledValue
                    labelWeight='thin'
                    labelFontSize={14}
                    valueColor={theme.palette.text.secondary}
                    value={`${it.name} (${it.value}%)`}
                    label={i === 0 ? 'Source(s) of Fund' : ''}
                  />
                </Grid>
              )
            }

            return null
          })}
        </Grid>
      )}
    </Grid>
  )
}
