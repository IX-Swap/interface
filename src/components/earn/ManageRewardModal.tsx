import { t, Trans } from '@lingui/macro'
import { ButtonGradientBorder, ButtonIXSGradient, ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useV2RouterContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useActiveWeb3React } from '../../hooks/web3'
import { useDerivedIXSStakeInfo } from '../../state/stake/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import Row, { RowBetween } from '../Row'
import { StakingInputPercentage } from './StakingInputPercentage'
import { BottomClaimButtons, ModalContentWrapper, StakeModalTop } from './styled'

interface StakingModalProps {
  onDismiss: () => void
}

export default function ManageRewardModal({ onDismiss }: StakingModalProps) {
  const { library, chainId, account } = useActiveWeb3React()
  const isOpen = useModalOpen(ApplicationModal.MANAGE_REWARD)
  // track and parse user input
  const router = useV2RouterContract()
  const [typedValue, setTypedValue] = useState('')
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const { error, parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
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
                <Trans>Manage Reward</Trans>
              </TYPE.title5>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <StakingInputPercentage
              {...{
                fieldTitle: t`Amount of IXS`,
                maxAvailable: maxAmountInput,
                typedValue,
                onUserInput,
                error,
                currency,
                parsedAmount,
                infoText: t`The total of IXS tokens and rewards`,
              }}
            />
            <Row style={{ marginTop: '71px' }}>
              {!(approval === ApprovalState.APPROVED || signatureData !== null) && (
                <ButtonIXSWide data-testid="approve-staking" disabled={Boolean(error)} onClick={onAttemptToApprove}>
                  {approval === ApprovalState.PENDING ? (
                    <Dots>
                      <Trans>Approving IXS</Trans>
                    </Dots>
                  ) : (
                    <>{error || <Trans>Approve IXS</Trans>}</>
                  )}
                </ButtonIXSWide>
              )}
              {(approval === ApprovalState.APPROVED || signatureData !== null) && (
                <>
                  {error && (
                    <ButtonIXSWide data-testid="error-button" disabled>
                      <>{error}</>
                    </ButtonIXSWide>
                  )}
                  {!error && (
                    <BottomClaimButtons>
                      <ButtonGradientBorder style={{ width: '210px' }}>Reinvest</ButtonGradientBorder>
                      <TYPE.title5>
                        <Trans>or</Trans>
                      </TYPE.title5>
                      <ButtonIXSGradient style={{ width: '210px' }}>Claim</ButtonIXSGradient>
                    </BottomClaimButtons>
                  )}
                </>
              )}
            </Row>
          </StakeModalTop>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
