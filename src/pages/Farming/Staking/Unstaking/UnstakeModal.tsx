import { t } from '@lingui/macro'
import { EarnModalContentWrapper } from 'components/earn/styled'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { IStaking, PeriodsEnum } from 'constants/stakingPeriods'
import useIXSCurrency from 'hooks/useIXSCurrency'
import React, { useCallback, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import {
  useCheckIXSGovAllowance,
  useIncreaseIXSGovAllowance,
  useUnstakeFrom,
  useUnstakingState,
} from 'state/stake/unstake/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { ModalBlurWrapper } from 'theme'
import { EarlyUnstake } from './EarlyUnstakeModalContent'
import { FullUnstake } from './FullUnstakeModalContent'

interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
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
  const isOpen = useModalOpen(ApplicationModal.UNSTAKE_IXS)
  const { isApprovingIXSGov, isUnstaking } = useUnstakingState()
  const checkIXSGovAllowance = useCheckIXSGovAllowance()
  const unstake = useUnstakeFrom(stake?.period)
  const increaseAllowance = useIncreaseIXSGovAllowance()
  const addTransaction = useTransactionAdder()
  const currency = useIXSCurrency()

  useEffect(() => {
    if (isOpen) {
      checkIXSGovAllowance()
    }
  }, [isOpen])

  const wrappedOnDismiss = useCallback(() => {
    if (!isUnstaking && !isApprovingIXSGov) {
      onDismiss()
    }
  }, [onDismiss, isUnstaking, isApprovingIXSGov])

  async function onEarlyUnstake(amount: string) {
    const unstakeTx = await unstake(stake, parseFloat(amount))
    if (unstakeTx) {
      addTransaction(unstakeTx, {
        summary: t`Unstake ${amount} ${currency?.symbol}`,
      })
    }
  }

  async function onFullUnstake() {
    let unstakeTx
    if (stake.period === PeriodsEnum.WEEK || stake.period === PeriodsEnum.MONTH) {
      unstakeTx = await unstake(stake)
    } else {
      unstakeTx = await unstake(stake, 0)
    }

    if (unstakeTx) {
      addTransaction(unstakeTx, {
        summary: t`Unstake ${stake?.stakeAmount} ${currency?.symbol}`,
      })
    }
  }

  async function onApprove(amount?: string) {
    if (!amount) {
      increaseAllowance(stake?.stakeAmount.toString())
    } else {
      increaseAllowance(amount)
    }
  }

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={wrappedOnDismiss}
      scrollable
      tip={t`Tip: To unstake ${currency?.symbol} tokens you need to have enough IXSgov tokens. 
You can unstake ${currency?.symbol} tokens equal to the number of IXSgov tokens in your account.`}
    >
      <ModalBlurWrapper>
        <EarnModalContentWrapper>
          {bIsEarlyUnstake ? (
            <EarlyUnstake onDismiss={onDismiss} stake={stake} onUnstake={onEarlyUnstake} onApprove={onApprove} />
          ) : (
            <FullUnstake onDismiss={onDismiss} stake={stake} onUnstake={onFullUnstake} onApprove={onApprove} />
          )}
        </EarnModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
