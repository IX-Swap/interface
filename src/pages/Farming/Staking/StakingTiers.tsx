import React, { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { RowBetween, RowCenter, RowStart } from 'components/Row'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { TYPE } from 'theme'
import { TIER_TYPES } from 'state/stake/reducer'
import { StakingTierCard } from './StakingTierCard'
import { useStakingState } from 'state/stake/hooks'
import { StakeModal } from './StakeModal'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'

export const StakingTiers = () => {
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)
  const { hasStakedSuccessfully, isPaused } = useStakingState()
  useEffect(() => {
    if (hasStakedSuccessfully) {
      toggleStakeModal()
    }
  }, [hasStakedSuccessfully, toggleStakeModal])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isPaused && (
        <RowStart style={{ margin: '44px 0' }}>
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
          <TYPE.title5 color={'text2'}>
            <Trans>Staking will start 09.09.2021</Trans>
          </TYPE.title5>
        </RowStart>
      )}
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
