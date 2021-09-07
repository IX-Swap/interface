import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Loader from 'components/Loader'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useLiquidityRouterContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useActiveWeb3React } from '../../hooks/web3'
import { useDerivedIXSStakeInfo } from '../../state/stake/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import Column from '../Column'
import Row, { RowBetween } from '../Row'
import { StakingInputPercentage } from './StakingInputPercentage'
import { ModalBottomWrapper, ModalContentWrapper, StakeModalTop } from './styled'

interface StakingModalProps {
  onDismiss: () => void
}

export default function AddStakingModal({ onDismiss }: StakingModalProps) {
  const { library, chainId, account } = useActiveWeb3React()
  const isOpen = useModalOpen(ApplicationModal.ADD_STAKE)
  // track and parse user input
  const router = useLiquidityRouterContract()
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
                <Trans>Add stake</Trans>
              </TYPE.title5>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <StakingInputPercentage
              {...{
                fieldTitle: t`Amount of IXS to add`,
                maxAvailable: maxAmountInput,
                typedValue,
                onUserInput,
                error,
                currency,
                parsedAmount,
              }}
            />
          </StakeModalTop>
          <ModalBottomWrapper>
            <Column style={{ gap: '5px' }}>
              <TextRow
                textLeft={t`Total adding stake amount`}
                textRight={balance ? <>{`${balance?.toSignificant(6)} ${currency?.symbol}`}</> : <Loader />}
              />
              <TextRow textLeft={t`Growing of Governance tokens`} textRight={parsedAmount?.toSignificant(5) ?? '0'} />
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
                  <>{error || <Trans>Add</Trans>}</>
                </ButtonIXSWide>
              )}
            </Row>
          </ModalBottomWrapper>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
