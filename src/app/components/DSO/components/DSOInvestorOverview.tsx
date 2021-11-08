import React from 'react'
import { Grid, Hidden, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOInvestButton } from 'app/components/DSO/components/DSOInvestButton'

export interface DSOInvestorOverviewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorOverview = (props: DSOInvestorOverviewProps) => {
  const { dso } = props

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3}>
        <LabelledValue label='Network' value={dso.network?.name} isNewThemeOn />
      </Grid>
      <Grid item xs={6} md={3}>
        <LabelledValue label='Decimal' value={dso.decimalPlaces} isNewThemeOn />
      </Grid>
      <Grid item xs={6} md={3}>
        <LabelledValue
          label='Capital Structure'
          value={dso.capitalStructure}
          isNewThemeOn
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <LabelledValue
          label='Token Address'
          value={
            <Typography
              component='span'
              noWrap
              style={{ display: 'block', width: '100%' }}
            >
              {dso.deploymentInfo?.token ?? ''}
            </Typography>
          }
          isNewThemeOn
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <LabelledValue
          label='Launch Date'
          value={dso.launchDate}
          isNewThemeOn
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <LabelledValue
          label='Completion Date'
          value={dso.completionDate}
          isNewThemeOn
        />
      </Grid>
      <Hidden mdUp>
        <Grid item xs={12} container justify='flex-end'>
          <Grid item>
            <Grid item>
              <DSOInvestButton dso={dso} />
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  )
}
