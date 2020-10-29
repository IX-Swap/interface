import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { Button } from '@material-ui/core'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { MIN_INVESTMENT_AMOUNT } from 'v2/config/defaults'

export const ContinueButton: React.FC = () => {
  const { setCurrentStep } = useDepositStore()
  const { watch } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')
  const amount = watch('amount')
  const canSubmit =
    asset !== undefined &&
    amount !== undefined &&
    amount >= MIN_INVESTMENT_AMOUNT
  const handleClick = (): void => {
    setCurrentStep(DepositStoreStep.PREVIEW)
  }

  return (
    <Button
      fullWidth
      disabled={!canSubmit}
      onClick={handleClick}
      color='primary'
      variant='contained'
    >
      Continue
    </Button>
  )
}
