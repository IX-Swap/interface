import { Percent } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { Option, OptionRow } from 'components/OptionButton'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import JSBI from 'jsbi'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useV2RouterContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useActiveWeb3React } from '../../hooks/web3'
import { useDerivedUnstakeInfo } from '../../state/stake/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import Column from '../Column'
import Row, { RowBetween } from '../Row'
import {
  AvailableBalance,
  HighlightedInput,
  ModalBottomWrapper,
  ModalContentWrapper,
  StakeModalTop,
  StakingInput,
} from './styled'

interface StakingModalProps {
  onDismiss: () => void
}

const PERCENTAGES = ['25', '50', '75', '100']

export default function StakingModal2({ onDismiss }: StakingModalProps) {
  const { library, chainId, account } = useActiveWeb3React()
  const isOpen = useModalOpen(ApplicationModal.STAKE)
  // track and parse user input
  const router = useV2RouterContract()
  const [typedValue, setTypedValue] = useState('')
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const { error, parsedAmount } = useDerivedUnstakeInfo(typedValue)
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const maxAmountInput = maxAmountSpend(balance)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, IXS_ADDRESS[chainId ?? 1])
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }, [onDismiss])

  // approval data for stake
  const deadline = useTransactionDeadline()

  async function onStake() {
    console.log('STAKE')
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const onPercentageInput = useCallback(
    (percentage: string) => {
      const fraction = new Percent(JSBI.BigInt(percentage), JSBI.BigInt(100))
      const result = maxAmountInput?.multiply(fraction)
      setTypedValue(result?.toSignificant(currency?.decimals ?? 18) ?? '0')
    },
    [maxAmountInput, currency]
  )

  const isSelectedPercentage = useCallback(
    (percentage: string) => {
      const fraction = JSBI.divide(JSBI.BigInt(percentage), JSBI.BigInt(100))

      return Boolean(parsedAmount && maxAmountInput && parsedAmount.equalTo(maxAmountInput.multiply(fraction)))
    },
    [maxAmountInput, parsedAmount]
  )

  async function onAttemptToApprove() {
    if (!library || !deadline) throw new Error('missing dependencies')
    if (!parsedAmount) throw new Error('missing liquidity amount')

    if (gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
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
                <Trans>Amount of IXS to stake</Trans>
              </TYPE.body1>
            </Row>
            <HighlightedInput style={{ marginTop: '11px' }}>
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <StakingInput
                  placeholder={maxAmountInput?.toSignificant(5)}
                  value={typedValue}
                  error={Boolean(error)}
                  onUserInput={(value) => onUserInput(value)}
                  color={error ? 'red' : 'text1'}
                />
                <AvailableBalance>
                  <Trans>Available balance: {maxAmountInput?.toSignificant(5)}</Trans>
                </AvailableBalance>
              </RowBetween>
            </HighlightedInput>
            <OptionRow style={{ marginTop: '36px', width: '100%', justifyContent: 'space-between' }}>
              {PERCENTAGES.map((percentage) => (
                <Option
                  key={percentage}
                  onClick={() => onPercentageInput(percentage)}
                  active={isSelectedPercentage(percentage)}
                  data-testid={'percentage_' + percentage}
                >
                  {percentage !== '100' ? `${percentage}%` : <Trans>MAX</Trans>}
                </Option>
              ))}
            </OptionRow>
          </StakeModalTop>
          <ModalBottomWrapper>
            <Column style={{ gap: '5px' }}>
              <TextRow textLeft={t`Reward payout interval`} textRight={t`Twice a week`} />
              <TextRow textLeft={t`Yearly rewards`} textRight={`10%`} />
              <TextRow textLeft={t`Type`} textRight={`On-chain`} />
            </Column>
            <Row style={{ marginTop: '43px' }}>
              {!(approval === ApprovalState.APPROVED || signatureData !== null) && (
                <ButtonIXSWide data-testid="approve-staking" disabled={Boolean(error)} onClick={onAttemptToApprove}>
                  {approval === ApprovalState.PENDING ? (
                    <Dots>
                      <Trans>Approving</Trans>
                    </Dots>
                  ) : (
                    <>{error || <Trans>Approve</Trans>}</>
                  )}
                </ButtonIXSWide>
              )}
              {(approval === ApprovalState.APPROVED || signatureData !== null) && (
                <ButtonIXSWide data-testid="stake-button" disabled={Boolean(error)} onClick={onStake}>
                  <>{error || <Trans>Stake</Trans>}</>
                </ButtonIXSWide>
              )}
            </Row>
          </ModalBottomWrapper>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
