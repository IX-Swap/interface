import React from 'react'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonIXSWide } from 'components/Button'
import { RowCenter } from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { TYPE } from 'theme'
import { Tier, TIER_LIMIT } from 'state/stake/reducer'
import { selectTier } from 'state/stake/actions'
import { StakingTierCardWrapper } from './style'
import { AppDispatch } from 'state'
import { useDispatch } from 'react-redux'

export const StakingTierCard = ({ tier }: { tier: Tier }) => {
  const dispatch = useDispatch<AppDispatch>()
  const toggleStake = useToggleModal(ApplicationModal.STAKE_IXS)
  const isTierUnlimited = tier?.limit === TIER_LIMIT.UNLIMITED

  return (
    <StakingTierCardWrapper>
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={IXSToken} />
      </RowCenter>
      <RowCenter marginTop={18}>
        <TYPE.title5 style={{ textTransform: 'uppercase' }}>
          <Trans>{tier.period}</Trans>
        </TYPE.title5>
      </RowCenter>
      <RowCenter>
        <TYPE.description7 style={{ textTransform: 'uppercase' }}>
          <Trans>APY</Trans>
        </TYPE.description7>
      </RowCenter>
      <RowCenter>
        <TYPE.main0>{tier.APY}%</TYPE.main0>
      </RowCenter>
      <RowCenter marginTop={15}>
        <TYPE.body1 fontWeight={400}>
          <Trans>{tier.limit}</Trans>
        </TYPE.body1>
        <MouseoverTooltip
          style={{ whiteSpace: 'pre-line' }}
          text={t`Overall limit for all stakers for this tier is ${
            isTierUnlimited ? 'unlimited.\n' : '2 000 000 IXS.\n'
          }
                  
                  Overall staked for now: 234 747 IXS

                  ${isTierUnlimited ? '' : 'Available for staking: 1 776 399/2 000 000.\n'}

                  Lock period means the time you won’t be able to unstake your IXS fully or partially. Please carefully consider the risks involved.
                  ${'' ?? ''}
                  You will be able to redeem your staked IXS fully or partially after lock period. `}
        >
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </RowCenter>
      <RowCenter marginTop={10} marginBottom={22}>
        <TYPE.body1 fontWeight={400} style={{ textTransform: 'lowercase' }}>
          <Trans>{tier.lockupPeriod} lock up period</Trans>
        </TYPE.body1>
        <MouseoverTooltip
          style={{ whiteSpace: 'pre-line' }}
          text={t`This amount of rewards is based on assumption that your staked amount will be kept for the whole period of ${
            tier.period
          }. In this case your APY will be ${
            tier.APY
          }%. If you partially or fully unstake your IXS before the end date 5% APY will be applied to unstaked amount. 
                  ${'' ?? ''}
                  Please note: your rewards will be available with vesting process in 10 weeks after unstakting`}
        >
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </RowCenter>
      <ButtonIXSWide
        onClick={() => {
          dispatch(selectTier({ tier }))
          toggleStake()
        }}
        style={{ marginBottom: '26px', marginTop: 'auto' }}
      >
        Stake
      </ButtonIXSWide>
      <RowCenter>
        <TYPE.description3 fontWeight={400} opacity="0.5">
          <Trans>
            Left to fill <span style={{ fontWeight: 700 }}>33389</span> coins
          </Trans>
        </TYPE.description3>
      </RowCenter>
    </StakingTierCardWrapper>
  )
}
