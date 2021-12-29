import { t, Trans } from '@lingui/macro'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { ReactComponent as DropDown } from 'assets/images/dropdown.svg'
import { ReactComponent as InfoIcon } from 'assets/images/info-filled.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonIXSWide } from 'components/Button'
import { EarnModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { LoaderThin } from 'components/Loader/LoaderThin'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween, RowCenter, RowFixed } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { MouseoverTooltip } from 'components/Tooltip'
import { SupportedChainId } from 'constants/chains'
import { BIG_INT_ZERO } from 'constants/misc'
import { periodsInDays, periodsInSeconds } from 'constants/stakingPeriods'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { useActiveWeb3React } from 'hooks/web3'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Text } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { POOL_SIZE_LIMITS } from 'state/stake/contstants'
import {
  useCheckAllowance,
  useIncreaseAllowance,
  usePoolSizeState,
  useSetTypedValue,
  useStakeFor,
  useStakingState,
} from 'state/stake/hooks'
import { POOL_SIZE_LOADING } from 'state/stake/poolSizeReducer'
import { convertPeriod, PERIOD, TIER_LIMIT } from 'state/stake/reducer'
import { tryParseAmount } from 'state/swap/helpers'
import { useIXSBalance } from 'state/user/hooks'
import styled from 'styled-components'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { floorToDecimals, formatAmount } from 'utils/formatCurrencyAmount'
import { dateFormatter } from 'utils/time'
import { ReactComponent as ArrowDown } from '../../../assets/images/arrow.svg'
import { EllipsedText, ModalBottom, StakeInfoContainer } from './style'
import JSBI from 'jsbi'
interface StakingModalProps {
  onDismiss: () => void
}

export function StakeModal({ onDismiss }: StakingModalProps) {
  const isOpen = useModalOpen(ApplicationModal.STAKE_IXS)
  // track and parse user input
  const setTypedValue = useSetTypedValue()
  const { typedValue } = useStakingState()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('Please enter amount to stake')
  const increaseAllowance = useIncreaseAllowance()
  const amountOfIXStoStakeInput = useRef<HTMLInputElement>(null)
  const { selectedTier, isApprovingIXS, isStaking, allowanceAmount } = useStakingState()
  const stake = useStakeFor(selectedTier?.period)
  const checkAllowance = useCheckAllowance()
  const poolSizeState = usePoolSizeState()
  const period = selectedTier?.period || PERIOD.ONE_WEEK
  const { chainId, account } = useActiveWeb3React()
  const currency = useIXSCurrency()
  const [poolLimitation, setPoolLimitation] = useState(calcPoolLimitation())
  const [isPoolLimitationLoading, setIsPoolLimitationLoading] = useState(poolSizeState[period] === POOL_SIZE_LOADING)
  const IXSBalance = useIXSBalance()
  const balanceNum = Number(IXSBalance?.amount?.toSignificant(12))
  const balanceString = formatAmount(balanceNum)
  const hasBalance = JSBI.greaterThan(IXSBalance?.amount?.quotient ?? BIG_INT_ZERO, BIG_INT_ZERO)

  function calcPoolLimitation(): string {
    const filled = tryParseAmount(poolSizeState[period], currency ?? undefined)
    const stringLimit = POOL_SIZE_LIMITS[(chainId ?? 1) as SupportedChainId][selectedTier?.period || PERIOD.ONE_WEEK]
    const maxPoolSize = tryParseAmount(stringLimit, currency ?? undefined)
    if (filled && maxPoolSize) {
      return maxPoolSize.subtract(filled).toExact()
    }
    if (maxPoolSize && !filled) {
      return maxPoolSize.toExact()
    }
    return ''
  }

  useEffect(() => {
    setIsPoolLimitationLoading(poolSizeState[period] === POOL_SIZE_LOADING)
    setPoolLimitation(calcPoolLimitation())
  }, [poolSizeState[period]])

  useEffect(() => {
    if (isOpen) {
      setTypedValue('')
      setTermsAccepted(false)
      checkAllowance()
    } else {
      setTypedValue('')
      onUserInput()
    }
  }, [isOpen])

  useEffect(() => {
    checkAllowance()
  }, [account, checkAllowance])

  const wrappedOnDismiss = useCallback(() => {
    if (!isStaking && !isApprovingIXS) {
      setTypedValue('')
      onDismiss()
    }
  }, [onDismiss, isStaking, isApprovingIXS])

  async function onStake() {
    await stake(typedValue)
    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingSubmitStakeButtonClicked')
  }

  const onApprove = useCallback(async () => {
    await increaseAllowance(typedValue)

    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingApproveIXSButtonClicked')
  }, [increaseAllowance, typedValue])

  // wrapped onUserInput to clear signatures
  const onUserInput = () => {
    if (amountOfIXStoStakeInput?.current?.value) {
      const value = amountOfIXStoStakeInput.current.value
      const cleanedValue = value.match(/\d{0,}\.?\d{0,4}/)?.[0] || ''
      setTypedValue(cleanedValue)
      if (hasBalance) {
        const fTypedIXSAmount = parseFloat(cleanedValue)
        const fIXSbalance = balanceNum
        if (fTypedIXSAmount > fIXSbalance) {
          setError(t`Not enough ${currency?.symbol}`)
        } else if (fTypedIXSAmount <= 0 || !fTypedIXSAmount) {
          setError(t`Wrong ${currency?.symbol} amount`)
        } else if (poolLimitation && fTypedIXSAmount > parseFloat(poolLimitation)) {
          setError(t`Pool limits exceeded`)
        } else {
          setError('')
        }
      }
    } else if (!isStaking && !isApprovingIXS) {
      setError(t`Wrong ${currency?.symbol} amount`)
      setTypedValue('')
    }
  }

  const onMaxClick = () => {
    if (amountOfIXStoStakeInput?.current && hasBalance && poolLimitation) {
      if (parseFloat(poolLimitation) > balanceNum) {
        amountOfIXStoStakeInput.current.value = balanceString
      } else {
        amountOfIXStoStakeInput.current.value = poolLimitation
      }

      onUserInput()
    }
  }

  function estimatePeriod(period?: PERIOD) {
    const unixStart = Date.now() / 1000
    const endDateUnix = unixStart + periodsInSeconds[convertPeriod(period)]
    const endDate = new Date(endDateUnix * 1000)
    return dateFormatter.format(endDate)
  }

  function estimateMaturityTime() {
    return estimatePeriod(selectedTier?.period)
  }

  function estimateLockPeriod() {
    return estimatePeriod(selectedTier?.lockupPeriod)
  }

  function estimateRewards() {
    if (selectedTier) {
      const rewards =
        (parseFloat(typedValue) * (selectedTier?.APY / 100) * periodsInDays[convertPeriod(selectedTier?.period)]) / 365
      return rewards ? floorToDecimals(rewards, 6) : 0
    }
    return 0
  }

  const onClickStakingContitions = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingConditionsTermsClicked')
  }

  const isDisabledStake = useMemo((): boolean => {
    if (isNaN(parseFloat(typedValue))) return true
    if (!termsAccepted || Boolean(error)) return true
    if (isApprovingIXS || isStaking) return true
    if (allowanceAmount < parseFloat(typedValue)) return true
    return false
  }, [termsAccepted, allowanceAmount, isApprovingIXS, isStaking, typedValue, error])

  const isDisabledApprove = useMemo((): boolean => {
    if (isNaN(parseFloat(typedValue))) return true
    if (!termsAccepted || Boolean(error)) return true
    if (isApprovingIXS || isStaking) return true
    if (allowanceAmount >= parseFloat(typedValue)) return true
    return false
  }, [termsAccepted, allowanceAmount, isApprovingIXS, isStaking, typedValue, error])

  const isAmountApproved = useMemo(() => allowanceAmount >= parseFloat(typedValue), [allowanceAmount, typedValue])

  const approveButton = useMemo(
    () => (
      <ButtonIXSWide data-testid="approve-staking" disabled={isDisabledApprove || isAmountApproved} onClick={onApprove}>
        {isApprovingIXS ? (
          <Dots>
            <Trans>Approving {currency?.symbol}</Trans>
          </Dots>
        ) : (
          <>{isAmountApproved ? t`Approved ${currency?.symbol}` : t`Approve ${currency?.symbol}`}</>
        )}
      </ButtonIXSWide>
    ),
    [currency?.symbol, isAmountApproved, isApprovingIXS, isDisabledApprove, onApprove]
  )

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <EarnModalContentWrapper>
          <ModalTop>
            <RowBetween>
              <TYPE.title5>
                <Trans>Stake</Trans>
              </TYPE.title5>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <Row style={{ marginTop: '19px' }}>
              <TYPE.body1>
                <Trans>Period of staking</Trans>
              </TYPE.body1>
            </Row>
            <HighlightedInput style={{ marginTop: '11px' }}>
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <StakingInput value={selectedTier?.period} disabled />
                {selectedTier?.limit !== TIER_LIMIT.UNLIMITED && (
                  <InputHintRight>
                    <RowFixed>
                      <Trans>Pool limitation:</Trans>&nbsp;
                      {isPoolLimitationLoading ? (
                        <LoaderThin />
                      ) : (
                        <span style={{ fontWeight: 600 }}>{poolLimitation}</span>
                      )}
                      <StyledDropDown style={{ display: 'none' }} />
                    </RowFixed>
                  </InputHintRight>
                )}
              </RowBetween>
            </HighlightedInput>
            <Row style={{ marginTop: '36px' }}>
              <TYPE.body1>
                <Trans>Amount of {currency?.symbol} to stake</Trans>
              </TYPE.body1>
            </Row>
            <HighlightedInput style={{ marginTop: '11px' }}>
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <StakingInput
                  placeholder="0.0"
                  type="tel"
                  pattern="[0-9]*"
                  color={error ? 'red' : 'text1'}
                  ref={amountOfIXStoStakeInput}
                  onInput={onUserInput}
                  value={typedValue}
                  disabled={isApprovingIXS || isStaking}
                />
                <InputHintRight>
                  <RowFixed>
                    <Trans>Available:</Trans>&nbsp;
                    <span style={{ fontWeight: 600 }}>{balanceString}</span>
                    <MaxButton onClick={onMaxClick}>
                      <Trans>Max</Trans>
                    </MaxButton>
                  </RowFixed>
                </InputHintRight>
              </RowBetween>
            </HighlightedInput>
            <ArrowWrapper style={{ display: 'none' }}>
              <ArrowDown width="16px" height="16px" color="#372E5D" />
            </ArrowWrapper>
            <Row style={{ marginTop: '-18px', display: 'none' }}>
              <TYPE.body1>
                <Trans>Distribute</Trans>
              </TYPE.body1>
            </Row>
            <Row style={{ marginTop: '11px', display: 'none' }}>
              <DisabledInput>
                <div>
                  <span style={{ fontWeight: 600 }}>{typedValue}</span> IXSgov
                </div>
                <InputHintRight>
                  <RowFixed>
                    <MouseoverTooltip
                      style={{ whiteSpace: 'pre-line' }}
                      text={t`IXSgov is a tokenized asset representing your staked ${
                        currency?.symbol
                      } on a 1:1 basis. IXSwap distributes the IXSgov to your wallet.
                              ${'' ?? ''}
                              You should swap your IXSgov back to ${currency?.symbol} during the unstaking process. 
                              ${'' ?? ''}
                              *Do note that ${
                                currency?.symbol
                              } received will be equal to your IXSgov holdings at the time of swap.`}
                    >
                      <IconWrapper size={20} style={{ marginLeft: '12px' }}>
                        <InfoIcon />
                      </IconWrapper>
                    </MouseoverTooltip>
                  </RowFixed>
                </InputHintRight>
              </DisabledInput>
            </Row>
          </ModalTop>
          <ModalBottom>
            <StakeInfoContainer>
              <TextRow textLeft={t`Period of staking`} textRight={selectedTier?.period} />
              <TextRow
                textLeft={t`Distribute`}
                textRight={
                  <EllipsedText>
                    <div>{typedValue ? typedValue : 0}&nbsp;IXSgov</div>
                  </EllipsedText>
                }
                tooltipText={t`IXSgov is a tokenized asset representing your staked ${
                  currency?.symbol
                } on a 1:1 basis. IXSwap distributes the IXSgov to your wallet.
                              ${'' ?? ''}
                              You should swap your IXSgov back to ${currency?.symbol} during the unstaking process. 
                              ${'' ?? ''}
                              *Do note that ${
                                currency?.symbol
                              } received will be equal to your IXSgov holdings at the time of swap.`}
              />
              <TextRow textLeft={t`APY`} textRight={`${selectedTier?.APY}%`} />
              <TextRow
                textLeft={t`Staking amount`}
                textRight={
                  <EllipsedText>
                    <div>
                      {typedValue ? typedValue : 0}&nbsp;{currency?.symbol}
                    </div>
                  </EllipsedText>
                }
              />
              <TextRow
                textLeft={t`Estimated maturity time`}
                textRight={estimateMaturityTime()}
                tooltipText={t`Maturity time is the final date of your staking period.`}
              />
              <TextRow
                textLeft={t`Estimated lock period`}
                textRight={estimateLockPeriod()}
                tooltipText={t`Your staked ${currency?.symbol} will be locked for ${
                  selectedTier?.lockupPeriod
                } till ${estimateLockPeriod()}. Until that time you won’t be able to unstake your ${
                  currency?.symbol
                } fully or partially. Please carefully consider the risks involved.
                              ${'' ?? ''}
                              You will be able to redeem your staked ${
                                currency?.symbol
                              } fully or partially after ${estimateLockPeriod()}.`}
              />
              <TextRow
                textLeft={t`Estimated rewards`}
                textRight={
                  <EllipsedText>
                    <div>
                      {estimateRewards()}&nbsp;{currency?.symbol}
                    </div>
                  </EllipsedText>
                }
                tooltipText={t`This amount of rewards is based on assumption that your staked amount will be kept for the whole period of ${
                  selectedTier?.period
                }. In this case your APY will be ${selectedTier?.APY}%. If you partially or fully unstake your ${
                  currency?.symbol
                } before the end date 5% APY will be applied to unstaked amount. 
                  ${'' ?? ''}
                  Please note your rewards will vest over 10 weeks after unstaking.`}
              />
            </StakeInfoContainer>
            <RowCenter marginTop={25}>
              <IconWrapper size={16} onClick={() => setTermsAccepted(!termsAccepted)}>
                <TermsCheckmark className={`checkmark ${termsAccepted ? 'checked' : ''}`} />
              </IconWrapper>
              <TYPE.body1>
                <Trans>
                  I have read{' '}
                  <a
                    onClick={onClickStakingContitions}
                    style={{ color: '#EDCEFF' }}
                    href="https://ixswap.io/ixs-staking-vaults/"
                    target="blank"
                  >
                    Staking Conditions
                  </a>
                </Trans>
              </TYPE.body1>
            </RowCenter>
            <ActionButtons>
              {approveButton}
              <ButtonIXSWide data-testid="stake-button" disabled={isDisabledStake} onClick={onStake}>
                {isStaking ? (
                  <Dots>
                    <Trans>Staking</Trans>
                  </Dots>
                ) : (
                  <>{error || <Trans>Stake</Trans>}</>
                )}
              </ButtonIXSWide>
            </ActionButtons>
          </ModalBottom>
        </EarnModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ActionButtons = styled.div`
  display: grid;
  grid-gap: 13px;
  grid-template-columns: 50% 50%;
  justify-content: center;
  margin-top: 25px;
  @media (max-width: 540px) {
    grid-template-columns: 100%;
  }
`

const ModalTop = styled(StakeModalTop)`
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg7};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: left;
  font-size: 17px;
  line-height: 40px;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text2};
    opacity: 0.5;
  }
`

const StakingInput = styled(Input)`
  background: ${({ theme }) => theme.bg12};
  width: 60%;
  margin-right: 10px;
  width: 0;
  font-size: 22px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`
const HighlightedInput = styled.div<{ active?: boolean; warning?: boolean }>`
  min-height: 60px;
  width: 100%;
  position: relative;
  padding: 10px 22px;
  flex: 1;
  background: ${({ theme }) => theme.bg12};
  border-radius: 36px;
  border: ${({ theme, active, warning }) =>
    warning ? `1px solid ${theme.red1}` : active ? `1px solid ${theme.popUpInputBorder}` : 'none'};
  :hover {
    box-shadow: ${({ theme, warning }) =>
      warning ? `0px 0px 2px 1px ${theme.red1}` : `0px 0px 2px 1px ${theme.popUpInputBorder}`};
  }
`
const InputHintRight = styled(Text)`
  color: ${({ theme }) => theme.text8};
  font-size: 14px;
  line-height: 39px;
`

const MaxButton = styled(TYPE.buttonMuted)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.text2};
  padding-left: 18px;

  :hover {
    text-decoration: underline;
  }
`
const ArrowWrapper = styled.div`
  padding: 7px;
  border-radius: 100%;
  height: 32px;
  width: 32px;
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
  left: calc(50% - 16px);
  background-color: ${({ theme }) => theme.bg9};
  z-index: 2;
`

const StyledDropDown = styled(DropDown)`
  margin-left: 8px;
  cursor: pointer;
  path {
    stroke: white;
    stroke-width: 1.5px;
  }
`

const DisabledInput = styled(HighlightedInput)`
  border: none;
  :hover {
    box-shadow: none;
  }
  background-color: rgba(74, 66, 110, 0.4);
  font-weight: 400;
  font-size: 22px;
  line-height: 40px;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
`

const TermsCheckmark = styled(Checkmark)`
  & > path {
    visibility: hidden;
  }

  &.checked > path {
    visibility: visible;
  }
`
