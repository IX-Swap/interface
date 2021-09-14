import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS, IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Column from 'components/Column'
import Row, { RowBetween } from 'components/Row'
import { StakingInputPercentage } from 'components/earn/StakingInputPercentage'
import { ModalBottomWrapper, ModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { useDerivedIXSStakeInfo } from 'state/stake/hooks'
import { useLiquidityRouterContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useStakingState } from 'state/stake/hooks'
import { Currency, CurrencyAmount, Percent } from '@ixswap1/sdk-core'
import { tryParseAmount } from 'state/swap/helpers'
import { StakeInfoContainer, EllipsedText, ModalBottom } from '../style'
import { IStaking, PeriodsEnum, periodsInDays, SECONDS_IN_DAY } from 'constants/stakingPeriods'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'

interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
}

function formatAmount(amount: number): string {
  return amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

function isEarlyUnstake(stake: IStaking): boolean {
  const unixNow = new Date().getTime() / 1000
  if (!stake) return false
  if (stake.period === PeriodsEnum.WEEK || stake.period === PeriodsEnum.MONTH) {
    return false
  } else if (unixNow < stake.endDateUnix) {
    return true
  }
  return false
}

export function UnstakeModal({ onDismiss, stake }: UnstakingModalProps) {
  const bIsEarlyUnstake = isEarlyUnstake(stake)
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const isOpen = useModalOpen(ApplicationModal.UNSTAKE_IXS)
  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const maxAmountInput = undefined
  const error = ''
  const { library, chainId, account } = useActiveWeb3React()
  // track and parse user input
  const router = useLiquidityRouterContract()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, IXS_ADDRESS[chainId ?? 1])
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const { IXSBalance } = useStakingState()
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)

  const wrappedOnDismiss = useCallback(() => {
    onDismiss()
    setTypedValue('')
  }, [onDismiss])

  async function onStake() {
    console.log('STAKE')
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <ModalContentWrapper>
          {bIsEarlyUnstake ? (
            <EarlyUnstake onDismiss={onDismiss} stake={stake} />
          ) : (
            <FullUnstake onDismiss={onDismiss} stake={stake} />
          )}
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const EarlyUnstake = ({ onDismiss, stake }: UnstakingModalProps) => {
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const [typedValue, setTypedValue] = useState('')
  const error = ''
  const { chainId, account } = useActiveWeb3React()
  // track and parse user input
  const router = useLiquidityRouterContract()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const { IXSBalance } = useStakingState()
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)
  const theme = useTheme()

  const wrappedOnDismiss = useCallback(() => {
    onDismiss()
    setTypedValue('')
  }, [onDismiss])

  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  async function onStake() {
    console.log('STAKE')
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
        <Row marginTop={20} marginBottom={10}>
          <TYPE.title6 color={'bg14'} style={{ textTransform: 'uppercase' }}>
            <Trans>Warning:</Trans>&nbsp;
          </TYPE.title6>
          <TYPE.body color={'bg14'}>
            <Trans>Your APY will be 5% in case of an early unstake</Trans>
          </TYPE.body>
        </Row>
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
                <div>{typedValue ? typedValue : 0}</div>&nbsp;IXSGov ({IXSGovBalance?.toSignificant(5)}{' '}
                <Trans>available</Trans>)
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`APY`}
            textRight={
              <>
                <span style={{ color: theme.bg14 }}>5%</span>
                <MouseoverTooltip
                  style={{ whiteSpace: 'pre-line', verticalAlign: 'sub' }}
                  text={t`If you partially or fully unstake your IXS before the end date - 5% APY will be applied to unstaked amount.`}
                >
                  <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '4px' }}>
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
                <div>{stake.reward * 0.1}</div>&nbsp;IXS
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Rewards to be vested (10% weekly)`}
            textRight={
              <EllipsedText>
                <div>{stake.reward * 0.9}</div>&nbsp;IXS
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
            disabled={Boolean(error)}
            onClick={onStake}
            style={{ marginRight: '14px' }}
          >
            <Trans>Approve IXSGov</Trans>
          </ButtonIXSWide>
          <ButtonIXSWide data-testid="unstake-button" disabled={Boolean(error)} onClick={onStake}>
            <Trans>Unstake</Trans>
          </ButtonIXSWide>
        </Row>
      </ModalBottom>
    </>
  )
}

const FullUnstake = ({ onDismiss, stake }: UnstakingModalProps) => {
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const [typedValue, setTypedValue] = useState('')
  const error = ''
  const { chainId, account } = useActiveWeb3React()
  // track and parse user input
  const router = useLiquidityRouterContract()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const { IXSBalance } = useStakingState()
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)

  const wrappedOnDismiss = useCallback(() => {
    onDismiss()
    setTypedValue('')
  }, [onDismiss])

  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  async function onStake() {
    console.log('STAKE')
  }

  function isEnoughIXSGov(): boolean {
    if (!IXSGovBalance) return false
    return parseFloat(IXSGovBalance.toSignificant(5)) >= stake?.stakeAmount
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
        <Row marginTop={20} marginBottom={10}>
          <IXSAmountToUnstake>{stakeAmount} IXS</IXSAmountToUnstake>
        </Row>
        {!isEnoughIXSGov() && (
          <TYPE.description2 color={'bg14'}>
            <Trans>
              You don’t have enough IXSGov for unstake all available IXS ({stakeAmount} is available) 1 IXS = 1 IXGov
            </Trans>
          </TYPE.description2>
        )}
      </StakeModalTop>
      <ModalBottom>
        <StakeInfoContainer>
          <TextRow
            textLeft={t`IXSGov to return`}
            textRight={
              <EllipsedText>
                <div>{stakeAmount}</div>&nbsp;IXSGov ({IXSGovBalance?.toSignificant(5)} <Trans>available</Trans>)
              </EllipsedText>
            }
          />
          <TextRow textLeft={t`APY`} textRight={`${stake.apy}%`} />
          <TextRow textLeft={t`Total rewards `} textRight={`${stake.reward} IXS`} />
          <TextRow
            textLeft={t`Instant reward payout today`}
            textRight={
              <EllipsedText>
                <div>{stake.reward * 0.1}</div>&nbsp;IXS
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Rewards to be vested (10% weekly)`}
            textRight={
              <EllipsedText>
                <div>{stake.reward * 0.9}</div>&nbsp;IXS
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Passed staking period`}
            textRight={
              <EllipsedText>
                <div>{periodsInDays[stake.period]}</div>&nbsp;<Trans>days (ended)</Trans>
              </EllipsedText>
            }
          />
        </StakeInfoContainer>
        <Row style={{ marginTop: '43px' }}>
          {true && (
            <ButtonIXSWide data-testid="approve-staking" disabled={Boolean(error)}>
              {false ? (
                <Dots>
                  <Trans>Approving IXS</Trans>
                </Dots>
              ) : (
                <>{<Trans>Approve IXS</Trans>}</>
              )}
            </ButtonIXSWide>
          )}
          {false && (
            <ButtonIXSWide data-testid="stake-button" disabled={Boolean(error)} onClick={onStake}>
              <>{<Trans>Stake</Trans>}</>
            </ButtonIXSWide>
          )}
        </Row>
      </ModalBottom>
    </>
  )
}

const IXSAmountToUnstake = styled(Row)`
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
`
