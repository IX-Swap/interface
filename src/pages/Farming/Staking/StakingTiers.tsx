import { Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { RowCenter, RowStart } from 'components/Row'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { useStakingState } from 'state/stake/hooks'
import { PERIOD, TIER_TYPES } from 'state/stake/reducer'
import { TYPE } from 'theme'
import { StakeModal } from './StakeModal'
import { StakingOtherNetworkCard } from './StakingOtherNetworkCard'
import { StakingTierCard } from './StakingTierCard'
import { CardsRow, CardsWrapper } from './style'

export const StakingTiers = () => {
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)
  const { isPaused } = useStakingState()
  const { chainId } = useActiveWeb3React()
  const currency = useIXSCurrency()
  return (
    <div>
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
      <CardsWrapper>
        <CardsRow>
          {chainId && chainId !== SUPPORTED_TGE_CHAINS.MAIN && <StakingTierCard tier={TIER_TYPES[PERIOD.ONE_MONTH]} />}
          <StakingTierCard tier={TIER_TYPES[PERIOD.TWO_MONTHS]} />
          <StakingTierCard tier={TIER_TYPES[PERIOD.THREE_MONTHS]} />
          <StakingOtherNetworkCard />
        </CardsRow>
      </CardsWrapper>
      <RowCenter marginTop={21}>
        <TYPE.title7 color="#edceff9e">
          <Trans>You will receive 1 IXSGov for each 1 staked {currency?.symbol}.</Trans>
        </TYPE.title7>
      </RowCenter>
      <StakeModal onDismiss={toggleStakeModal} />
    </div>
  )
}
