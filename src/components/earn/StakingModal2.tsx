import React, { useState, useCallback } from 'react'
import { useV2LiquidityTokenPermit } from '../../hooks/useERC20Permit'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { formatCurrencyAmount } from '../../utils/formatCurrencyAmount'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components/macro'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon, ModalBlurWrapper } from '../../theme'
import { ButtonConfirmed, ButtonError } from '../Button'
import ProgressCircles from '../ProgressSteps'
import CurrencyInputPanel from '../CurrencyInputPanel'
import { Pair } from '@ixswap1/v2-sdk'
import { Token, CurrencyAmount } from '@ixswap1/sdk-core'
import { useActiveWeb3React } from '../../hooks/web3'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { usePairContract, useStakingContract, useV2RouterContract } from '../../hooks/useContract'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { StakingInfo, useDerivedStakeInfo } from '../../state/stake/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../ModalViews'
import { t, Trans } from '@lingui/macro'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'

const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;

  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
`

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  onDismiss: () => void
  stakingInfo?: StakingInfo
  userLiquidityUnstaked?: CurrencyAmount<Token>
}

export default function StakingModal2({ onDismiss, stakingInfo, userLiquidityUnstaked }: StakingModalProps) {
  const { library, chainId } = useActiveWeb3React()
  const isOpen = useModalOpen(ApplicationModal.STAKE)
  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 42])
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
  const router = useV2RouterContract()

  async function onStake() {
    console.log('STAKE')
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])
  async function onAttemptToApprove() {
    console.log('APPROVE')
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      <ModalBlurWrapper>
        {!attempting && !hash && (
          <ContentWrapper gap="lg">
            <RowBetween>
              <TYPE.mediumHeader>
                <Trans>Stake</Trans>
              </TYPE.mediumHeader>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <CurrencyInputPanel
              value={typedValue}
              onUserInput={onUserInput}
              onMax={handleMax}
              showMaxButton={false}
              currency={currency}
              label={''}
              renderBalance={(amount) => <Trans>Available balance: {formatCurrencyAmount(amount, 4)}</Trans>}
              id="stake-liquidity-token"
            />

            <HypotheticalRewardRate dim={true}>
              <div>
                <TYPE.black fontWeight={600}>
                  <Trans>Weekly Rewards</Trans>
                </TYPE.black>
              </div>

              <TYPE.black>
                {/* <Trans>
                {hypotheticalRewardRate
                  .multiply((60 * 60 * 24 * 7).toString())
                  .toSignificant(4, { groupSeparator: ',' })}{' '}
                IXS / week
              </Trans> */}
              </TYPE.black>
            </HypotheticalRewardRate>
          </ContentWrapper>
        )}
        {attempting && !hash && (
          <LoadingView onDismiss={wrappedOnDismiss}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>
                <Trans>Depositing Liquidity</Trans>
              </TYPE.largeHeader>
              <TYPE.body fontSize={20}>{/* <Trans>{parsedAmount?.toSignificant(4)} IXS</Trans> */}</TYPE.body>
            </AutoColumn>
          </LoadingView>
        )}
        {attempting && hash && (
          <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>
                <Trans>Transaction Submitted</Trans>
              </TYPE.largeHeader>
              <TYPE.body fontSize={20}>{/* <Trans>Deposited {parsedAmount?.toSignificant(4)} IXS</Trans> */}</TYPE.body>
            </AutoColumn>
          </SubmittedView>
        )}
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
