import React from 'react'
import { Grid } from '@material-ui/core'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { AmountRaisedCard } from 'app/pages/issuance/components/AmountRaisedCard'
import { TotalInvestorsCard } from 'app/pages/issuance/components/TotalInvestorsCard'
import { DSOCard } from 'app/pages/issuance/components/DSOCard'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import { ReactComponent as TokenIcon } from 'assets/icons/token.svg'
import { ReactComponent as DollarIcon } from 'assets/icons/green_dollar.svg'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const DSOCards = () => {
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')
  const isStatusClosed = status === 'Closed'

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <InsightCard>
          <DSOCard
            value={5}
            icon={<LabelIcon bgColor='#F2F2FE' icon={<TokenIcon />} />}
          />
        </InsightCard>
      </Grid>

      <Grid item xs={12} md={3}>
        <InsightCard>
          {isStatusClosed ? (
            <TotalInvestorsCard isNewThemeOn showIcon total={300} />
          ) : (
            <DSOCard
              value={123}
              icon={<LabelIcon bgColor='#EEF7F1' icon={<DollarIcon />} />}
            />
          )}
        </InsightCard>
      </Grid>

      <Grid item xs={12} md={3}>
        <InsightCard>
          {isStatusClosed ? (
            <AmountRaisedCard
              showIcon
              isNewThemeOn
              showFundraiseTooltip
              percentRaised={50}
              value={'SGD 120K'}
              total={'Total'}
            />
          ) : (
            <TotalInvestorsCard isNewThemeOn showIcon total={300} />
          )}
        </InsightCard>
      </Grid>
    </Grid>
  )
}
