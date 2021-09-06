import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import Loader from 'components/Loader'
import { ReactComponent as DropDown } from 'assets/images/dropdown.svg'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState, useRef } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useStakeFor, useIncreaseAllowance } from 'state/stake/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useLiquidityRouterContract } from 'hooks/useContract'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useActiveWeb3React } from 'hooks/web3'
import { useDerivedIXSStakeInfo } from 'state/stake/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Column from 'components/Column'
import Row, { RowBetween, RowFixed, RowCenter } from 'components/Row'
import { StakingInputPercentage } from 'components/earn/StakingInputPercentage'
import { ModalBottomWrapper, ModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { MouseoverTooltip } from 'components/Tooltip'
import styled from 'styled-components'
import { ReactComponent as ArrowDown } from '../../../assets/images/arrow.svg'
import { Text } from 'rebass'
import { theme } from 'theme'
import { useStakingState } from 'state/stake/hooks'
import { PERIOD, convertPeriod, dateFormatter } from 'state/stake/reducer'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as Checkmark } from 'assets/images/checked-solid-bg.svg'
import { periodsInSeconds, periodsInDays } from 'constants/stakingPeriods'

interface StakingModalProps {
  onDismiss: () => void
}

export function StakeModal({ onDismiss }: StakingModalProps) {
  const { library, chainId, account } = useActiveWeb3React()
  const isOpen = useModalOpen(ApplicationModal.STAKE_IXS)
  // track and parse user input
  const router = useLiquidityRouterContract()
  const [typedValue, setTypedValue] = useState('0')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { error, parsedAmount } = useDerivedIXSStakeInfo({ typedValue: '10', currencyId: IXS_ADDRESS[chainId ?? 1] })
  const maxAmountInput = maxAmountSpend(balance)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, IXS_ADDRESS[chainId ?? 1])
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const availableIXS = maxAmountInput ? maxAmountInput?.toSignificant(5) : ''
  const increaseAllowance = useIncreaseAllowance()
  const amountOfIXStoStakeInput = useRef<HTMLInputElement>(null)
  const { selectedTier, approvingIXS, isIXSApproved, isStaking, hasStakedSuccessfully } = useStakingState()
  const stake = useStakeFor(selectedTier?.period)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    setTypedValue('0')
    onDismiss()
  }, [onDismiss])

  async function onStake() {
    stake(typedValue)
  }

  async function onApprove() {
    increaseAllowance(typedValue)
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = () => {
    if (amountOfIXStoStakeInput?.current?.value) {
      setTypedValue(amountOfIXStoStakeInput.current.value)
    } else {
      setTypedValue('0')
    }
  }

  const onMaxClick = () => {
    if (amountOfIXStoStakeInput?.current) {
      amountOfIXStoStakeInput.current.value = availableIXS
      setTypedValue(availableIXS)
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
      return floorTo4Decimals(rewards)
    }
    return 0
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <StakeModalTop>
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
                <InputHintRight>
                  <RowFixed>
                    <Trans>Pool limitation: 2 000 000</Trans>
                    <StyledDropDown />
                  </RowFixed>
                </InputHintRight>
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
                  type="number"
                  color={error ? 'red' : 'text1'}
                  ref={amountOfIXStoStakeInput}
                  onInput={onUserInput}
                />
                <InputHintRight>
                  <RowFixed>
                    <Trans>Available:</Trans>&nbsp;
                    <span style={{ fontWeight: 600 }}>{availableIXS}</span>
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
                              You should swap your IXSgov back to IXS during the unstaking process. Please note, that you will receive IXS equal to your IXSgov holdings at the time of the swap.`}
                    >
                      <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
                        <InfoIcon />
                      </IconWrapper>
                    </MouseoverTooltip>
                  </RowFixed>
                </InputHintRight>
              </DisabledInput>
            </Row>
          </StakeModalTop>
          <ModalBottomWrapper>
            <StakeInfoContainer>
              <TextRow textLeft={t`Period of staking`} textRight={selectedTier?.period} />
              <TextRow
                textLeft={t`Distribute`}
                textRight={`${typedValue} IXSgov`}
                tooltipText={t`IXSgov is a tokenized asset representing your staked IXS on a 1:1 basis. IXSwap distributes the IXSgov to your wallet.
                              ${'' ?? ''}
                              You should swap your IXSgov back to IXS during the unstaking process. Please note, that you will receive IXS equal to your IXSgov holdings at the time of the swap.`}
              />
              <TextRow textLeft={t`APY`} textRight={`${selectedTier?.APY}%`} />
              <TextRow textLeft={t`Staking amount`} textRight={`${typedValue} IXS`} />
              <TextRow
                textLeft={t`Estimated maturity time`}
                textRight={estimateMaturityTime()}
                tooltipText={t`Maturity time is the final date of your staking period time escalibur. `}
              />
              <TextRow
                textLeft={t`Estimated lock period`}
                textRight={estimateLockPeriod()}
                tooltipText={t`Your staked IXS will be locked for ${
                  selectedTier?.lockupPeriod
                } till Jun 05, 2021 12:40:33. Until that time you won’t be able to unstake your IXS fully or partially. Please carefully consider the risks involved.
                              ${'' ?? ''}
                              You will be able to redeem your staked IXS fully or partially after Jun 05, 2021 12:40:33.`}
              />
              <TextRow
                textLeft={t`Estimated rewards`}
                textRight={`${estimateRewards()} IXS`}
                tooltipText={t`This amount of rewards is based on assumption that your staked amount will be kept for the whole period of ${
                  selectedTier?.period
                }. In this case your APY will be ${
                  selectedTier?.APY
                }%. If you partially or fully unstake your IXS before the end date 5% APY will be applied to unstaked amount. 
                  ${'' ?? ''}
                  Please note: your rewards will be available with vesting process in 10 weeks after unstakting`}
              />
            </StakeInfoContainer>
            <RowCenter marginTop={25} onClick={() => setTermsAccepted(!termsAccepted)}>
              <IconWrapper size={16}>
                <TermsCheckmark className={`checkmark ${termsAccepted ? 'checked' : ''}`} />
              </IconWrapper>
              <TYPE.body1>
                <Trans>I have read the terms of use</Trans>
              </TYPE.body1>
            </RowCenter>
            <Row style={{ marginTop: '25px' }}>
              {!isIXSApproved && (
                <ButtonIXSWide
                  data-testid="approve-staking"
                  disabled={approvingIXS || !termsAccepted}
                  onClick={onApprove}
                >
                  {approvingIXS ? (
                    <Dots>
                      <Trans>Approving IXS</Trans>
                    </Dots>
                  ) : (
                    <>{error || <Trans>Approve IXS</Trans>}</>
                  )}
                </ButtonIXSWide>
              )}
              {isIXSApproved && (
                <ButtonIXSWide data-testid="stake-button" disabled={isStaking || !termsAccepted} onClick={onStake}>
                  {isStaking ? (
                    <Dots>
                      <Trans>Staking</Trans>
                    </Dots>
                  ) : (
                    <>{error || <Trans>Stake</Trans>}</>
                  )}
                </ButtonIXSWide>
              )}
            </Row>
          </ModalBottomWrapper>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

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
  /* transform: rotate(90deg); */
  background-color: ${({ theme }) => theme.bg9};
  z-index: 2;
`
const StakeInfoContainer = styled(Column)`
  gap: 5px;
  background-color: ${({ theme }) => theme.bg8};
  padding: 25px 23px;
  border-radius: 20px;
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
