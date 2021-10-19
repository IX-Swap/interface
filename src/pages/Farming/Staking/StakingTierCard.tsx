import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/info-filled.svg'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonIXSWide } from 'components/Button'
import { RowCenter } from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { TYPE } from 'theme'
import { Tier, TIER_LIMIT, PERIOD } from 'state/stake/reducer'
import { DEFAULT_POOL_SIZE_LIMIT, POOL_SIZE_LOADING } from 'state/stake/poolSizeReducer'
import { selectTier } from 'state/stake/actions'
import { StakingTierCardWrapper } from './style'
import { AppDispatch } from 'state'
import { useDispatch } from 'react-redux'
import { useFetchHistoricalPoolSize, usePoolSizeState } from 'state/stake/hooks'
import { useStakingState } from 'state/stake/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { formatNumber } from 'utils/formatNumber'
import { useCurrency } from 'hooks/Tokens'
import { IXS_ADDRESS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'

export const StakingTierCard = ({ tier }: { tier: Tier }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const toggleStake = useToggleModal(ApplicationModal.STAKE_IXS)
  const isTierUnlimited = tier?.limit === TIER_LIMIT.UNLIMITED
  const fetchHistoricalPoolSize = useFetchHistoricalPoolSize()
  const poolSizeState = usePoolSizeState()
  const { hasStakedSuccessfully, isPaused } = useStakingState()
  const ixsCurrency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const [leftToFill, setLeftToFill] = useState(0)
  const [isPoolLimitationLoading, setIsPoolLimitationLoading] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(false)

  useEffect(() => {
    fetchHistoricalPoolSize(tier.period)
  }, [fetchHistoricalPoolSize, tier.period, hasStakedSuccessfully])

  useEffect(() => {
    if (poolSizeState[tier.period] === POOL_SIZE_LOADING) {
      setIsPoolLimitationLoading(true)
      return
    }
    setIsPoolLimitationLoading(false)
    const filled = poolSizeState[tier.period]
    setLeftToFill(parseFloat(DEFAULT_POOL_SIZE_LIMIT) - parseFloat(filled))
  }, [poolSizeState, tier.period])

  useEffect(() => {
    if (leftToFill <= 1) {
      setIsLimitReached(true)
    } else {
      setIsLimitReached(false)
    }
  }, [leftToFill])

  const selectPeriod = () => {
    const periodLegend = {
      [PERIOD.ONE_WEEK]: '1w',
      [PERIOD.ONE_MONTH]: '1m',
      [PERIOD.TWO_MONTHS]: '2m',
      [PERIOD.THREE_MONTHS]: '3m',
    }

    const metrikaTier = periodLegend[tier.period] || '1w'

    dispatch(selectTier({ tier }))
    const { ym } = window
    ym(84960586, 'reachGoal', `staking${metrikaTier}StakeButtonClicked`)

    toggleStake()

    ym(84960586, 'reachGoal', 'stakingStakeModalFormOpened')
  }

  function getStakeButtonText() {
    if (isPaused) {
      return 'Paused'
    } else if (isLimitReached) {
      return 'Limit reached'
    } else {
      return 'Stake'
    }
  }

  function renderPoolSize() {
    if (isTierUnlimited) {
      return
    }
    if (isPoolLimitationLoading) {
      return (
        <RowCenter style={{ margin: 'auto' }}>
          <LoaderThin />
          <TYPE.description3 fontWeight={400} opacity="0.5" marginLeft={2}>
            <Trans> tokens available for staking</Trans>
          </TYPE.description3>
        </RowCenter>
      )
    } else {
      return (
        <RowCenter style={{ margin: 'auto' }}>
          <TYPE.description3 fontWeight={400} opacity="0.5">
            <Trans>
              <span style={{ fontWeight: 700 }}>{formatNumber(Math.floor(leftToFill))}</span> tokens available for
              staking
            </Trans>
          </TYPE.description3>
        </RowCenter>
      )
    }
  }

  return (
    <StakingTierCardWrapper className={`${isLimitReached ? 'muted' : ''}`}>
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
                  ${isTierUnlimited ? 'Unlimited\n' : `2 000 000 ${ixsCurrency?.symbol}\n`}

                  Staked ${ixsCurrency?.symbol} in Pool: 
                  ${poolSizeState[tier.period]} ${ixsCurrency?.symbol}

                  ${
                    isTierUnlimited
                      ? ''
                      : '\nAvailable for staking: \n' + leftToFill + '/' + DEFAULT_POOL_SIZE_LIMIT + '.'
                  }`}
        >
          <IconWrapper size={20} style={{ marginLeft: '12px' }}>
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
          text={t`Lock period means the time you won’t be able to unstake your ${
            ixsCurrency?.symbol
          } fully or partially. Please carefully consider the risks involved.
                ${'' ?? ''}
                You will be able to redeem your staked ${ixsCurrency?.symbol} fully or partially after lock period. `}
        >
          <IconWrapper size={20} style={{ marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </RowCenter>
      <ButtonIXSWide onClick={selectPeriod} disabled={isPaused || isLimitReached}>
        <Trans>{getStakeButtonText()}</Trans>
      </ButtonIXSWide>
      {renderPoolSize()}
    </StakingTierCardWrapper>
  )
}
