import React, { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { RowBetween, RowCenter } from 'components/Row'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { TYPE } from 'theme'
import { TIER_TYPES } from 'state/stake/reducer'
import { StakingTierCard } from './StakingTierCard'
import { useFetchHistoricalPoolSize } from 'state/stake/hooks'
import { StakeModal } from './StakeModal'

export const StakingTiers = () => {
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <RowBetween>
        <StakingTierCard tier={TIER_TYPES.oneWeek} />
        <StakingTierCard tier={TIER_TYPES.oneMonth} />
        <StakingTierCard tier={TIER_TYPES.twoMonths} />
        <StakingTierCard tier={TIER_TYPES.threeMonths} />
      </RowBetween>
      <RowCenter marginTop={21}>
        <TYPE.title7 color="#edceff9e">
          <Trans>You’ll have 1 IXSGov for each 1 staked IXS.</Trans>
        </TYPE.title7>
      </RowCenter>
      <StakeModal onDismiss={toggleStakeModal} />
    </div>
  )
}
