import { t } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import React, { useCallback, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { ModalBlurWrapper } from 'theme'
import { ModalContentWrapper } from 'components/earn/styled'
import { useCheckIXSGovAllowance, useUnstakingState } from 'state/stake/unstake/hooks'
import { IStaking, PeriodsEnum } from 'constants/stakingPeriods'
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

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={wrappedOnDismiss}
      scrollable
      tip={t`Tip: To unstake IXS tokens you need to have enough IXSgov tokens. 
You can unstake IXS tokens equal to the number of IXSgov tokens in your account.`}
    >
      <ModalBlurWrapper>
        <ModalContentWrapper>
          {bIsEarlyUnstake ? (
            <EarlyUnstake onDismiss={onDismiss} stake={stake} />
          ) : (
            <FullUnstake onDismiss={onDismiss} stake={stake} />
          )}
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
