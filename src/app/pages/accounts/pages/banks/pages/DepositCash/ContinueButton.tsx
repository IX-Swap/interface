import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DepositCashFormValues } from 'app/pages/accounts/types'
import { Button } from '@mui/material'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'
import { MIN_INVESTMENT_AMOUNT } from 'config/defaults'
import { isDevEnv } from 'config'

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
      disabled={isDevEnv ? !canSubmit : true}
      onClick={handleClick}
      color='primary'
      variant='contained'
    >
      Continue
    </Button>
  )
}
