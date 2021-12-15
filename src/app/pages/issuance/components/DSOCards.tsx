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
import { DSOCardWrapper } from 'app/pages/issuance/components/DSOCardWrapper'

export const DSOCards = () => {
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')
  const isStatusClosed = status === 'Closed'
  const { data, isLoading } = useVCCFundStats()

  const hasFirstCardInfo = data?.totalDSOs !== undefined
  const hasSecondCardInfo = isStatusClosed
    ? data?.totalInvestors !== undefined
    : data?.pendingAuthorizations !== undefined
  const hasThirdCardInfo = isStatusClosed
    ? data?.totalAmountRaisedPercent !== undefined &&
      data?.totalAmountRaised !== undefined
    : data?.totalInvestors !== undefined

  if (isLoading) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <DSOCardWrapper hasValue={hasFirstCardInfo}>
        <DSOCard
          title={'Total DSOs'}
          value={data?.totalDSOs}
          icon={<LabelIcon bgColor='#F2F2FE' icon={<TokenIcon />} />}
        />
      </DSOCardWrapper>

      <DSOCardWrapper hasValue={hasSecondCardInfo}>
        {isStatusClosed ? (
          <TotalInvestorsCard
            isNewThemeOn
            showIcon
            total={data?.totalInvestors}
          />
        ) : (
          <DSOCard
            title={'Pending Authorizations'}
            value={data?.pendingAuthorizations}
            icon={<LabelIcon bgColor='#EEF7F1' icon={<DollarIcon />} />}
          />
        )}
      </DSOCardWrapper>

      <DSOCardWrapper hasValue={hasThirdCardInfo}>
        {isStatusClosed ? (
          <AmountRaisedCard
            showIcon
            isNewThemeOn
            showFundraiseTooltip
            percentRaised={data?.totalAmountRaisedPercent ?? 0}
            value={abbreviateNumber(
              data?.totalAmountRaised ?? null,
              // TODO Add symbol value after update backend api endpoints
              'SGD',
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
          />
        )}
      </DSOCardWrapper>
    </Grid>
  )
}
