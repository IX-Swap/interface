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
import { CardsRow } from './style'

export const StakingTiers = () => {
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)
  const { isPaused } = useStakingState()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isPaused && (
        <RowStart style={{ margin: '44px 0' }}>
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
          <TYPE.title5 color={'text2'}>
            <Trans>
              Staking will be opened soon. Wait for the official announcement on{' '}
              <a style={{ color: '#EDCEFF' }} href="https://ixswap.io/community/" target="blank">
                our channels
              </a>
              .
            </Trans>
          </TYPE.title5>
        </RowStart>
      )}
      <CardsRow>
        <StakingTierCard tier={TIER_TYPES.oneWeek} />
        <StakingTierCard tier={TIER_TYPES.oneMonth} />
        <StakingTierCard tier={TIER_TYPES.twoMonths} />
        <StakingTierCard tier={TIER_TYPES.threeMonths} />
      </CardsRow>
      <RowCenter marginTop={21}>
        <TYPE.title7 color="#edceff9e">
          <Trans>You will receive 1 IXSGov for each 1 staked IXS.</Trans>
        </TYPE.title7>
      </RowCenter>
      <StakeModal onDismiss={toggleStakeModal} />
    </div>
  )
}
