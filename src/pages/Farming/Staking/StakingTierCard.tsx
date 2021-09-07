import React, { useEffect, useState } from 'react'
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
import { Tier, TIER_LIMIT, PERIOD } from 'state/stake/reducer'
import { DEFAULT_POOL_SIZE_LIMIT } from 'state/stake/poolSizeReducer'
import { selectTier } from 'state/stake/actions'
import { StakingTierCardWrapper } from './style'
import { AppDispatch } from 'state'
import { useDispatch } from 'react-redux'
import { useFetchHistoricalPoolSize, usePoolSizeState } from 'state/stake/hooks'
import { useStakingState } from 'state/stake/hooks'

export const StakingTierCard = ({ tier }: { tier: Tier }) => {
  const dispatch = useDispatch<AppDispatch>()
  const toggleStake = useToggleModal(ApplicationModal.STAKE_IXS)
  const isTierUnlimited = tier?.limit === TIER_LIMIT.UNLIMITED
  const fetchHistoricalPoolSize = useFetchHistoricalPoolSize()
  const poolSizeState = usePoolSizeState()
  const { hasStakedSuccessfully, isPaused } = useStakingState()
  const tierPeriod = () => {
    switch (tier.period) {
      case PERIOD.ONE_WEEK: {
        return 'oneWeek'
      }
      case PERIOD.ONE_MONTH: {
        return 'oneMonth'
      }
      case PERIOD.TWO_MONTHS: {
        return 'twoMonths'
      }
      case PERIOD.THREE_MONTHS: {
        return 'threeMonths'
      }
      default: {
        return 'oneWeek'
      }
    }
  }

  const tierPeriodKey = tierPeriod() as keyof typeof poolSizeState
  const [leftToFill, setLeftToFill] = useState(0)

  useEffect(() => {
    fetchHistoricalPoolSize(tier.period)
  }, [fetchHistoricalPoolSize, tier.period, hasStakedSuccessfully])

  useEffect(() => {
    const filled = poolSizeState[tierPeriodKey] as number
    console.log(`${tier.period} pool size: ${filled}`)
    setLeftToFill(DEFAULT_POOL_SIZE_LIMIT - filled)
  }, [poolSizeState, tierPeriodKey, tier.period])

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
          text={t`Maximum Capacity:
                  ${isTierUnlimited ? 'Unlimited\n' : '2 000 000 IXS\n'}

                  Staked IXS in Pool: 
                  ${poolSizeState[tierPeriodKey]} IXS

                  ${
                    isTierUnlimited
                      ? ''
                      : '\nAvailable for staking: \n' +
                        leftToFill.toLocaleString('fr') +
                        '/' +
                        DEFAULT_POOL_SIZE_LIMIT.toLocaleString('fr') +
                        '.'
                  }`}
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
          style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
          text={t`Lock period means the time you won’t be able to unstake your IXS fully or partially. Please carefully consider the risks involved.
                ${'' ?? ''}
                You will be able to redeem your staked IXS fully or partially after lock period. `}
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
        style={{ marginBottom: '26px' }}
        disabled={isPaused}
      >
        <Trans>{isPaused ? 'Paused' : 'Stake'}</Trans>
      </ButtonIXSWide>
      {/*{!isTierUnlimited && (
        <RowCenter>
          <TYPE.description3 fontWeight={400} opacity="0.5">
            <Trans>
              Left to fill <span style={{ fontWeight: 700 }}>{leftToFill}</span> coins
            </Trans>
          </TYPE.description3>
        </RowCenter>
      )}*/}
    </StakingTierCardWrapper>
  )
}
