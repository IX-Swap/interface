import React from 'react'
import { Grid } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'

export interface FinancialViewProps {
  data: IndividualIdentity
}

export const FinancialView = (props: FinancialViewProps) => {
  const { data } = props
  const { isSingPass } = useIsSingPass()

  return (
    <Grid
      sx={{
        display: 'grid',
        gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' }
      }}
      container
    >
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue
            isRedesigned
            value={data.occupation}
            label='Occupation'
          />
        </Grid>

        <Grid item>
          <LabelledValue isRedesigned value={data.employer} label='Employer' />
        </Grid>

        {!isSingPass && (
          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.sourceOfFund}
              label='Source of fund'
            />
          </Grid>
        )}
      </Grid>
      <Grid item container direction={'column'} spacing={5}>
        <Grid item>
          <LabelledValue
            isRedesigned
            value={data.employmentStatus}
            label='Employment Status'
          />
        </Grid>

        {!isSingPass ? (
          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.annualIncome}
              label='Income in SGD in preceding 12 months'
            />
          </Grid>
        ) : (
          <Grid item>
            <LabelledValue
              isRedesigned
              value={data.sourceOfFund}
              label='Source of fund'
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
