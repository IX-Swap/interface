import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/info-filled.svg'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonIXSWide } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import { SupportedChainId } from 'constants/chains'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { selectTier } from 'state/stake/actions'
import { POOL_SIZE_LIMITS, POOL_SIZE_LIMIT_TEXTS } from 'state/stake/contstants'
import { useFetchHistoricalPoolSize, usePoolSizeState, useStakingState } from 'state/stake/hooks'
import { POOL_SIZE_LOADING } from 'state/stake/poolSizeReducer'
import { PERIOD, Tier, TIER_LIMIT } from 'state/stake/reducer'
import { DesktopAndTablet, MobileOnly, TYPE } from 'theme'
import { formatNumber } from 'utils/formatNumber'
import { APYPercentage, APYWrapper, RowWithMarginTop, RowWithMarginTopAndBottom, StakingTierCardWrapper } from './style'

export const StakingTierCard = ({ tier }: { tier: Tier }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const toggleStake = useToggleModal(ApplicationModal.STAKE_IXS)
  const isTierUnlimited = tier?.limit === TIER_LIMIT.UNLIMITED
  const fetchHistoricalPoolSize = useFetchHistoricalPoolSize()
  const poolSizeState = usePoolSizeState()
  const { hasStakedSuccessfully, isPaused } = useStakingState()
  const ixsCurrency = useIXSCurrency()
  const [leftToFill, setLeftToFill] = useState(0)
  const [isPoolLimitationLoading, setIsPoolLimitationLoading] = useState(false)
  const [isLimitReached, setIsLimitReached] = useState(true)
  const stringLimit = useMemo(
    () => POOL_SIZE_LIMITS[(chainId ?? 1) as SupportedChainId][tier?.period || PERIOD.ONE_WEEK],
    [chainId, tier?.period]
  )
  const shortLimit = useMemo(
    () => POOL_SIZE_LIMIT_TEXTS[(chainId ?? 1) as SupportedChainId][tier?.period || PERIOD.ONE_WEEK],
    [chainId, tier?.period]
  )
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
    setLeftToFill(parseFloat(stringLimit) - parseFloat(filled))
  }, [poolSizeState, tier.period, chainId])

  useEffect(() => {
    if (leftToFill <= 1 && !isPoolLimitationLoading) {
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
    } else if (isPoolLimitationLoading) {
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
        <RowCenter style={{ margin: 'auto', marginTop: '10px' }}>
          <LoaderThin />
          <TYPE.description3 fontWeight={400} opacity="0.5" marginLeft={2}>
            <Trans> tokens available for staking</Trans>
          </TYPE.description3>
        </RowCenter>
      )
    } else {
      return (
        <RowCenter style={{ margin: 'auto', marginTop: '10px' }}>
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
      <APYWrapper>
        <TYPE.description7 style={{ textTransform: 'uppercase' }}>
          <Trans>APY</Trans>
        </TYPE.description7>
        <APYPercentage>{tier.APY}%</APYPercentage>
      </APYWrapper>

      <RowWithMarginTop>
        <TYPE.body1 fontWeight={400}>
          <DesktopAndTablet>
            <Trans>{shortLimit}</Trans>
          </DesktopAndTablet>
          <MobileOnly>
            <Trans>
              {isLimitReached ? <></> : <>{leftToFill.toFixed()}/</>}
              {shortLimit}
            </Trans>
          </MobileOnly>
        </TYPE.body1>
        <MouseoverTooltip
          style={{ whiteSpace: 'pre-line' }}
          text={t`Maximum Capacity:
                  ${
                    isTierUnlimited
                      ? 'Unlimited\n'
                      : `${POOL_SIZE_LIMITS[(chainId ?? 1) as SupportedChainId][tier?.period || PERIOD.ONE_WEEK]} ${
                          ixsCurrency?.symbol
                        }\n`
                  }

                  Staked ${ixsCurrency?.symbol} in Pool: 
                  ${poolSizeState[tier.period]} ${ixsCurrency?.symbol}

                  ${isTierUnlimited ? '' : '\nAvailable for staking: \n' + leftToFill + '/' + stringLimit + '.'}`}
        >
          <IconWrapper size={20} style={{ marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </RowWithMarginTop>
      <RowWithMarginTopAndBottom>
        <div style={{ width: '95%', display: 'flex' }}>
          <DesktopAndTablet>
            <TYPE.body1 fontWeight={400} style={{ textTransform: 'lowercase', display: 'inline', width: '70%' }}>
              <Trans>{tier.lockupPeriod} lock up period</Trans>
            </TYPE.body1>
          </DesktopAndTablet>
          <MobileOnly>
            <TYPE.body1 fontWeight={400} style={{ textTransform: 'lowercase', display: 'inline', width: '70%' }}>
              <Trans>{tier.lockupPeriod} lock up</Trans>
            </TYPE.body1>
          </MobileOnly>
          <MouseoverTooltip
            style={{
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
            text={t`Lock period means the time you won’t be able to unstake your ${
              ixsCurrency?.symbol
            } fully or partially. Please carefully consider the risks involved.
                ${'' ?? ''}
                You will be able to redeem your staked ${ixsCurrency?.symbol} fully or partially after lock period. `}
          >
            <IconWrapper size={20} style={{ marginLeft: '10px', display: 'inline' }}>
              <InfoIcon />
            </IconWrapper>
          </MouseoverTooltip>
        </div>
      </RowWithMarginTopAndBottom>
      <ButtonIXSWide onClick={selectPeriod} disabled={isPaused || isLimitReached || isPoolLimitationLoading}>
        <Trans>{getStakeButtonText()}</Trans>
      </ButtonIXSWide>
      <DesktopAndTablet>{renderPoolSize()}</DesktopAndTablet>
    </StakingTierCardWrapper>
  )
}
