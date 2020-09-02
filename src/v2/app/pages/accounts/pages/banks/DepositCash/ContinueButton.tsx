import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { Button } from '@material-ui/core'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'

export const ContinueButton: React.FC = () => {
  const { setCurrentStep } = useDepositStore()
  const { watch } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')
  const amount = watch('amount')
  const canSubmit = asset !== undefined && amount !== undefined
  const handleClick = (): void => {
    setCurrentStep(DepositStoreStep.PREVIEW)
  }

  return (
    <Button disabled={!canSubmit} onClick={handleClick}>
      Continue
    </Button>
  )
}
