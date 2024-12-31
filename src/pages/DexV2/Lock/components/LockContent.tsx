import React, { useMemo, useState } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { utils } from 'ethers'
import { Flex } from 'rebass'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { Line } from '../../Pool/Create'
import { useWeb3React } from 'hooks/useWeb3React'
import CurrencyInput from './CurrencyInput'
import { useLock } from '../LockProvider'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useCurrencyBalance } from 'state/wallet/hooks'
import DurationSlider from './DurationSlider'
import LockExplanation from './LockExplanation'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { IXS_ADDRESS, VOTING_ESCROW_ADDRESS } from 'constants/addresses'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { PinnedContentButton } from 'components/Button'
import { useVotingEscrowContract } from 'hooks/useContract'
import { safeParseUnits } from 'utils/formatCurrencyAmount'
import { useTransactionAdder } from 'state/transactions/hooks'
import { WEEK } from '../constants'

const LockContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    userInput,
    setUserInput,
    duration,
  } = useLock()
  const currency = useIXSCurrency()
  const { account, chainId } = useWeb3React()
  const { openConnectModal } = useConnectModal()
  const votingEscrowContract = useVotingEscrowContract()
  const addTransaction = useTransactionAdder()
  
  const [approvalState, approve] = useAllowance(
    IXS_ADDRESS[chainId],
    utils.parseUnits(userInput || '0', currency?.decimals),
    VOTING_ESCROW_ADDRESS[chainId]
  )

  const primaryButtonLabel = useMemo(() => {
    if (!account) {
      return 'Connect Wallet'
    } else if (isLoading) {
      return 'Processing...'
    } else if (approvalState !== ApprovalState.APPROVED) {
      return 'Allow IXS'
    }
    return 'Lock'
  }, [account, approvalState])

  async function handleLock() {
    const tx = await votingEscrowContract?.createLock(
      safeParseUnits(+userInput, currency?.decimals),
      duration,
    )
    await tx.wait()
    if (!tx.hash) return
    addTransaction(tx, {
      summary: `Lock ${userInput} IXS in ${ Math.round(duration / WEEK) } weeks`,
    })
  }

  async function handleProceed() {
    try {
      setIsLoading(true)
      if (!account) {
        openConnectModal && openConnectModal()
      } else if (approvalState === ApprovalState.NOT_APPROVED) {
          await approve()
          await handleLock()
      } else { // token approved
          await handleLock()
      }
    } catch (error) {
      console.error('Error processing', error)
    } finally {
      setIsLoading(false)
    }
  }

  const currencyBalance = useCurrencyBalance(account, currency || undefined)
  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalance)

  return (
    <Flex flexDirection='column' mt={3} style={{ gap: 32 }}>
      <CurrencyInput
        value={userInput}
        currency={currency}
        onUserInput={setUserInput}
        onMax={() => setUserInput(maxInputAmount?.toExact() ?? '')}
        fiatValue={undefined}
      />

      <DurationSlider />

      <Line style={{ margin: 0 }} />

      <LockExplanation />

      <PinnedContentButton
        onClick={() => handleProceed()}
        type="button"
        disabled={approvalState === ApprovalState.PENDING || isLoading || !userInput}
      >
        {primaryButtonLabel}
      </PinnedContentButton>
    </Flex>
  )
}

export default LockContent
