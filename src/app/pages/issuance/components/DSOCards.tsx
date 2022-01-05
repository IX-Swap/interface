import React from 'react'
import { Grid } from '@material-ui/core'
import { AmountRaisedCard } from 'app/pages/issuance/components/AmountRaisedCard'
import { TotalInvestorsCard } from 'app/pages/issuance/components/TotalInvestorsCard'
import { DSOCard } from 'app/pages/issuance/components/DSOCard'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import { ReactComponent as TokenIcon } from 'assets/icons/token.svg'
import { ReactComponent as DollarIcon } from 'assets/icons/green_dollar.svg'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useVCCFundStats } from 'app/pages/issuance/hooks/useVCCFundStats'
import { abbreviateNumber } from 'helpers/numbers'
import { DSOCardWrapper } from 'app/pages/issuance/components/DSOCardWrapper/DSOCardWrapper'

export const DSOCards = () => {
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')
  const isStatusClosed = status === 'Closed'
  const {
    subFundStats: { data, isLoading }
  } = useVCCFundStats()

  return (
    <Grid container spacing={3}>
      <DSOCardWrapper isLoading={isLoading}>
        <DSOCard
          title={'Total DSOs'}
          value={data?.totalDSOs}
          icon={<LabelIcon bgColor='#F2F2FE' icon={<TokenIcon />} />}
        />
      </DSOCardWrapper>

      <DSOCardWrapper isLoading={isLoading}>
        {isStatusClosed ? (
          <TotalInvestorsCard
            isNewThemeOn
            showIcon
            total={data?.totalInvestors}
            small={false}
          />
        ) : (
          <DSOCard
            title={'Pending Authorizations'}
            value={data?.pendingAuthorizations}
            icon={<LabelIcon bgColor='#EEF7F1' icon={<DollarIcon />} />}
          />
        )}
      </DSOCardWrapper>

      <DSOCardWrapper isLoading={isLoading}>
        {isStatusClosed ? (
          <AmountRaisedCard
            showIcon
            small={false}
            isNewThemeOn
            showFundraiseTooltip
            percentRaised={data?.totalAmountRaisedPercent ?? 0}
            value={abbreviateNumber(
              data?.totalAmountRaised ?? null,
              data?.currency?.toUpperCase(),
              false,
              undefined,
              false
            )}
            total={'Total'}
          />
        ) : (
          <TotalInvestorsCard
            isNewThemeOn
            showIcon
            total={data?.totalInvestors}
            small={false}
          />
        )}
      </DSOCardWrapper>
    </Grid>
  )
}
