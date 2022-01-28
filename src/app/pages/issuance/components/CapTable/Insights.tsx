import { Grid } from '@material-ui/core'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { PricePerToken } from 'app/pages/issuance/components/CapTable/PricePerToken'
import { TotalTokens } from 'app/pages/issuance/components/CapTable/TotalTokens'
import { AmountRaised } from 'app/pages/issuance/components/CapTable/AmountRaised'
import { TotalInvestors } from 'app/pages/issuance/components/CapTable/TotalInvestors'
import React from 'react'

export const Insights = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <TotalInvestors isNewThemeOn showIcon />
        </InsightCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <PricePerToken />
        </InsightCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <TotalTokens />
        </InsightCard>
      </Grid>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <AmountRaised showIcon isNewThemeOn showFundraiseTooltip />
        </InsightCard>
      </Grid>
    </Grid>
  )
}
