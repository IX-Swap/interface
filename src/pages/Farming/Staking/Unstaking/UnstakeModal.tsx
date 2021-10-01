import { t } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import React, { useCallback, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { ModalBlurWrapper } from 'theme'
import { EarnModalContentWrapper } from 'components/earn/styled'
import {
  useCheckIXSGovAllowance,
  useUnstakingState,
  useUnstakeFrom,
  useIncreaseIXSGovAllowance,
} from 'state/stake/unstake/hooks'
import { IStaking, PeriodsEnum } from 'constants/stakingPeriods'
import { EarlyUnstake } from './EarlyUnstakeModalContent'
import { FullUnstake } from './FullUnstakeModalContent'
import { useTransactionAdder } from 'state/transactions/hooks'

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
        summary: t`Unstake ${amount} IXS`,
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
        summary: t`Unstake ${stake?.stakeAmount} IXS`,
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
      tip={t`Tip: To unstake IXS tokens you need to have enough IXSgov tokens. 
You can unstake IXS tokens equal to the number of IXSgov tokens in your account.`}
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
