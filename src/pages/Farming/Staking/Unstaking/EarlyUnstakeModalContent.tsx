import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonIXSWide } from 'components/Button'
import { StakingInputPercentage } from 'components/earn/StakingInputPercentage'
import { StakeModalTop } from 'components/earn/styled'
import Row, { RowBetween } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { MouseoverTooltip } from 'components/Tooltip'
import { IXS_ADDRESS, IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { IStaking, SECONDS_IN_DAY } from 'constants/stakingPeriods'
import { useCurrency } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useEffect, useState } from 'react'
import { useDerivedIXSStakeInfo } from 'state/stake/hooks'
import { useUnstakingState } from 'state/stake/unstake/hooks'
import { tryParseAmount } from 'state/swap/helpers'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { CloseIcon, TYPE } from 'theme'
import { floorTo4Decimals } from 'utils/formatCurrencyAmount'
import { EllipsedText, ModalBottom, StakeInfoContainer } from '../style'
interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
  onUnstake: (amount: string) => void
  onApprove: (amount?: string) => void
}

function formatAmount(amount: number): string {
  return amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

export function EarlyUnstake({ onDismiss, stake, onUnstake, onApprove }: UnstakingModalProps) {
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const [typedValue, setTypedValue] = useState('')
  const [isEnoughAllowance, setIsEnoughAllowance] = useState(false)
  const [error, setError] = useState('Enter an amount')
  const { chainId, account } = useActiveWeb3React()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)
  const theme = useTheme()
  const { IXSGovAllowanceAmount, isApprovingIXSGov, isUnstaking } = useUnstakingState()

  useEffect(() => {
    if (!IXSGovAllowanceAmount) return
    if (parseFloat(IXSGovAllowanceAmount) >= parseFloat(typedValue)) {
      setIsEnoughAllowance(true)
    } else {
      setIsEnoughAllowance(false)
    }
  }, [IXSGovAllowanceAmount, typedValue])

  const wrappedOnDismiss = useCallback(() => {
    if (isUnstaking || isApprovingIXSGov) {
      return
    }
    onDismiss()
    setTypedValue('')
  }, [onDismiss, isUnstaking, isApprovingIXSGov])

  function onUserInput(typedValue: string) {
    const cleanedValue = typedValue.match(/\d{0,}\.?\d{0,4}/)?.[0] || ''
    setTypedValue(cleanedValue)
    const IXSAmount = stakeIXSCurrencyAmount?.toSignificant(18)
    if (!IXSAmount) {
      setError('Please wait')
      return
    }
    const fTypedValue = parseFloat(cleanedValue)
    const fIXSAmount = parseFloat(IXSAmount)

    if (!fTypedValue || fTypedValue > fIXSAmount || fTypedValue === 0) {
      setError('Wrong IXS amount')
    } else {
      setError('')
    }
  }

  function calcLeftToStakeEndUnix(): number {
    const unixNow = new Date().getTime() / 1000
    return stake.endDateUnix - unixNow
  }

  function calcPassedStakingPeriodUnix(): number {
    const unixNow = new Date().getTime() / 1000
    return unixNow - stake.startDateUnix
  }

  function convertUnixToDays(unixPeriod: number): number {
    return unixPeriod / SECONDS_IN_DAY
  }

  function calcLeftDaysToStakeEnd(): number {
    return Math.round(convertUnixToDays(calcLeftToStakeEndUnix()))
  }

  function calcPassedStakingDays(): number {
    return Math.round(convertUnixToDays(calcPassedStakingPeriodUnix()))
  }

  return (
    <>
      <StakeModalTop style={{ paddingBottom: '30px' }}>
        <RowBetween>
          <TYPE.title5>
            <Trans>Unstake</Trans>
          </TYPE.title5>
          <CloseIcon onClick={wrappedOnDismiss} />
        </RowBetween>
        <WarningContainer marginTop={20} marginBottom={10}>
          <TYPE.title6 color={'bg14'} style={{ textTransform: 'uppercase' }}>
            <Trans>Warning:</Trans>&nbsp;
          </TYPE.title6>
          <TYPE.body color={'bg14'}>
            <Trans>Your APY will be 5% in case of an early unstake</Trans>
          </TYPE.body>
        </WarningContainer>
        <StakingInputPercentage
          {...{
            fieldTitle: t`Amount of IXS to unstake`,
            maxAvailable: stakeIXSCurrencyAmount,
            typedValue,
            onUserInput,
            error,
            currency,
            parsedAmount,
          }}
          disabled={isUnstaking || isApprovingIXSGov}
        />
        <Row marginTop={37}>
          <TYPE.body3 style={{ opacity: '0.5' }}>
            <Trans>When your assets have been unstaked they will be transferred to your Metamask</Trans>
          </TYPE.body3>
        </Row>
      </StakeModalTop>
      <ModalBottom>
        <StakeInfoContainer>
          <TextRow
            textLeft={t`IXSGov to return`}
            textRight={
              <EllipsedText>
                <div>
                  {typedValue ? typedValue : 0}&nbsp;IXSGov ({IXSGovBalance?.toSignificant(5)} <Trans>available</Trans>)
                </div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`APY`}
            textRight={
              <>
                <span style={{ color: theme.bg14 }}>5%</span>
                <MouseoverTooltip
                  style={{ whiteSpace: 'pre-line' }}
                  text={t`If you partially or fully unstake your IXS before the end date - 5% APY will be applied to unstaked amount.`}
                >
                  <IconWrapper
                    size={20}
                    style={{ transform: 'rotate(180deg)', marginLeft: '4px', verticalAlign: 'sub' }}
                  >
                    <InfoIcon />
                  </IconWrapper>
                </MouseoverTooltip>
              </>
            }
          />
          <TextRow textLeft={t`Total rewards `} textRight={`${stake.reward} IXS`} />
          <TextRow
            textLeft={t`Instant reward payout today`}
            textRight={
              <EllipsedText>
                <div>{floorTo4Decimals(stake.reward * 0.1)}&nbsp;IXS</div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Rewards to be vested (10% weekly)`}
            textRight={
              <EllipsedText>
                <div>{floorTo4Decimals(stake.reward * 0.9)}&nbsp;IXS</div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Passed staking period`}
            textRight={
              <EllipsedText style={{ color: theme.bg14, display: 'block' }}>
                <span>{calcPassedStakingDays()}</span>&nbsp;<Trans>days</Trans>&nbsp;(
                <span>{calcLeftDaysToStakeEnd()}</span>&nbsp;
                <Trans>days to go</Trans>)
              </EllipsedText>
            }
          />
        </StakeInfoContainer>
        <Row style={{ marginTop: '43px' }}>
          <ButtonIXSWide
            data-testid="approve-ixsgov-button"
            disabled={isEnoughAllowance || isApprovingIXSGov || isUnstaking || Boolean(error)}
            onClick={() => onApprove(typedValue)}
            style={{ marginRight: '14px' }}
          >
            {isApprovingIXSGov ? (
              <Dots>
                <Trans>Approving IXSGov</Trans>
              </Dots>
            ) : (
              <Trans>Approve IXSGov</Trans>
            )}
          </ButtonIXSWide>
          <ButtonIXSWide
            data-testid="unstake-button"
            disabled={!isEnoughAllowance || isApprovingIXSGov || isUnstaking || Boolean(error)}
            onClick={() => onUnstake(typedValue)}
          >
            {isUnstaking ? (
              <Dots>
                <Trans>Unstaking</Trans>
              </Dots>
            ) : (
              <>{error || <Trans>Unstake</Trans>}</>
            )}
          </ButtonIXSWide>
        </Row>
      </ModalBottom>
    </>
  )
}

const WarningContainer = styled(Row)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-start;
  `}
`
