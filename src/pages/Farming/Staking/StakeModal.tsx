import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { ReactComponent as DropDown } from 'assets/images/dropdown.svg'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useStakeFor, useIncreaseAllowance, useCheckAllowance } from 'state/stake/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import Row, { RowBetween, RowFixed, RowCenter } from 'components/Row'
import { ModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { MouseoverTooltip } from 'components/Tooltip'
import styled from 'styled-components'
import { ReactComponent as ArrowDown } from '../../../assets/images/arrow.svg'
import { Text } from 'rebass'
import { useStakingState } from 'state/stake/hooks'
import { PERIOD, convertPeriod, dateFormatter, TIER_LIMIT } from 'state/stake/reducer'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { periodsInSeconds, periodsInDays } from 'constants/stakingPeriods'
import { StakeInfoContainer, EllipsedText, ModalBottom } from './style'
import { usePoolSizeState } from 'state/stake/hooks'
import { DEFAULT_POOL_SIZE_LIMIT, POOL_SIZE_LOADING } from 'state/stake/poolSizeReducer'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { formatNumber } from 'utils/formatNumber'

interface StakingModalProps {
  onDismiss: () => void
}

export function StakeModal({ onDismiss }: StakingModalProps) {
  const isOpen = useModalOpen(ApplicationModal.STAKE_IXS)
  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('Please enter amount to stake')
  const increaseAllowance = useIncreaseAllowance()
  const amountOfIXStoStakeInput = useRef<HTMLInputElement>(null)
  const { selectedTier, isApprovingIXS, isStaking, allowanceAmount, IXSBalance } = useStakingState()
  const stake = useStakeFor(selectedTier?.period)
  const checkAllowance = useCheckAllowance()
  const poolSizeState = usePoolSizeState()
  const period = selectedTier?.period || PERIOD.ONE_WEEK
  const [poolLimitation, setPoolLimitation] = useState(calcPoolLimitation())
  const [isPoolLimitationLoading, setIsPoolLimitationLoading] = useState(poolSizeState[period] === POOL_SIZE_LOADING)

  function calcPoolLimitation(): string {
    const filled = poolSizeState[period]
    return formatNumber(DEFAULT_POOL_SIZE_LIMIT - filled)
  }

  useEffect(() => {
    setPoolLimitation(calcPoolLimitation())
    setIsPoolLimitationLoading(poolSizeState[period] === POOL_SIZE_LOADING)
  }, [poolSizeState[period]])

  useEffect(() => {
    if (!isApprovingIXS) {
      checkAllowance()
    }
  }, [isApprovingIXS])

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

  async function onApprove() {
    await increaseAllowance(typedValue)

    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingApproveIXSButtonClicked')
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = () => {
    if (amountOfIXStoStakeInput?.current?.value) {
      const value = amountOfIXStoStakeInput.current.value
      const cleanedValue = value.match(/\d{0,}\.?\d{0,4}/)?.[0] || ''
      setTypedValue(cleanedValue)
      if (IXSBalance) {
        const fTypedIXSAmount = parseFloat(cleanedValue)
        const fIXSbalance = parseFloat(IXSBalance)
        if (fTypedIXSAmount > fIXSbalance) {
          setError('Not enough IXS')
        } else if (fTypedIXSAmount <= 0 || !fTypedIXSAmount) {
          setError('Wrong IXS amount')
        } else {
          setError('')
        }
      }
    } else if (!isStaking && !isApprovingIXS) {
      setError('Wrong IXS amount')
      setTypedValue('')
    }
  }

  const onMaxClick = () => {
    if (amountOfIXStoStakeInput?.current && IXSBalance) {
      amountOfIXStoStakeInput.current.value = IXSBalance
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
    const floorTo4Decimals = (num: number) => Math.floor((num + Number.EPSILON) * 10000) / 10000
    if (selectedTier) {
      const rewards =
        (parseInt(typedValue) * (selectedTier?.APY / 100) * periodsInDays[convertPeriod(selectedTier?.period)]) / 365
      return rewards ? floorTo4Decimals(rewards) : 0
    }
    return 0
  }

  const onClickStakingContitions = () => {
    const { ym } = window
    ym(84960586, 'reachGoal', 'stakingConditionsTermsClicked')
  }

  const isDisabledStake = useCallback((): boolean => {
    if (!termsAccepted || Boolean(error)) return true
    if (isApprovingIXS || isStaking) return true
    if (allowanceAmount < parseFloat(typedValue)) return true
    return false
  }, [termsAccepted, allowanceAmount, isApprovingIXS, isStaking, typedValue, error])

  const isDisabledApprove = useCallback((): boolean => {
    if (!termsAccepted || Boolean(error)) return true
    if (isApprovingIXS || isStaking) return true
    if (allowanceAmount >= parseFloat(typedValue)) return true
    return false
  }, [termsAccepted, allowanceAmount, isApprovingIXS, isStaking, typedValue, error])

  const isAmountApproved = (): boolean => {
    if (allowanceAmount >= parseFloat(typedValue)) return true
    return false
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <ModalContentWrapper>
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
                <Trans>Amount of IXS to stake</Trans>
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
                    <span style={{ fontWeight: 600 }}>{IXSBalance}</span>
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
                      text={t`IXSgov is a tokenized asset representing your staked IXS on a 1:1 basis. IXSwap distributes the IXSgov to your wallet.
                              ${'' ?? ''}
                              You should swap your IXSgov back to IXS during the unstaking process. 
                              ${'' ?? ''}
                              *Do note that IXS received will be equal to your IXSgov holdings at the time of swap.`}
                    >
                      <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
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
                tooltipText={t`IXSgov is a tokenized asset representing your staked IXS on a 1:1 basis. IXSwap distributes the IXSgov to your wallet.
                              ${'' ?? ''}
                              You should swap your IXSgov back to IXS during the unstaking process. 
                              ${'' ?? ''}
                              *Do note that IXS received will be equal to your IXSgov holdings at the time of swap.`}
              />
              <TextRow textLeft={t`APY`} textRight={`${selectedTier?.APY}%`} />
              <TextRow
                textLeft={t`Staking amount`}
                textRight={
                  <EllipsedText>
                    <div>{typedValue ? typedValue : 0}&nbsp;IXS</div>
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
                tooltipText={t`Your staked IXS will be locked for ${
                  selectedTier?.lockupPeriod
                } till ${estimateLockPeriod()}. Until that time you won’t be able to unstake your IXS fully or partially. Please carefully consider the risks involved.
                              ${'' ?? ''}
                              You will be able to redeem your staked IXS fully or partially after ${estimateLockPeriod()}.`}
              />
              <TextRow
                textLeft={t`Estimated rewards`}
                textRight={
                  <EllipsedText>
                    <div>{estimateRewards()}&nbsp;IXS</div>
                  </EllipsedText>
                }
                tooltipText={t`This amount of rewards is based on assumption that your staked amount will be kept for the whole period of ${
                  selectedTier?.period
                }. In this case your APY will be ${
                  selectedTier?.APY
                }%. If you partially or fully unstake your IXS before the end date 5% APY will be applied to unstaked amount. 
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
            <ActionButtons style={{ marginTop: '25px' }}>
              <ButtonIXSWide data-testid="approve-staking" disabled={isDisabledApprove()} onClick={onApprove}>
                {isApprovingIXS ? (
                  <Dots>
                    <Trans>Approving IXS</Trans>
                  </Dots>
                ) : (
                  <>{isAmountApproved() ? t`Approved IXS` : t`Approve IXS`}</>
                )}
              </ButtonIXSWide>
              <ButtonIXSWide data-testid="stake-button" disabled={isDisabledStake()} onClick={onStake}>
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
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ActionButtons = styled.div`
  display: grid;
  grid-gap: 13px;
  grid-template-columns: 50% 50%;
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
