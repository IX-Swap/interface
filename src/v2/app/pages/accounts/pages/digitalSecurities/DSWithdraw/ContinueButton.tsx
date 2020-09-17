import React from 'react'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { Button } from '@material-ui/core'

export const ContinueButton: React.FC = () => {
  const { setCurrentStep } = useDepositStore()
  const { watch } = useFormContext<WithdrawDSFormValues>()
  const recipientWallet = watch('recipientWallet')
  const amount = watch('amount')
  const canSubmit = recipientWallet !== undefined && amount !== undefined
  const handleClick = (): void => {
    setCurrentStep(DepositStoreStep.PREVIEW)
  }

  return (
    <Button disabled={!canSubmit} onClick={handleClick}>
      Continue
    </Button>
  )
}
