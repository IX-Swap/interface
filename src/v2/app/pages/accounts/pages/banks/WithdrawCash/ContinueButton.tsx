import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '@material-ui/core'
import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { MIN_INVESTMENT_AMOUNT } from 'v2/config/defaults'

export const ContinueButton = (props: ButtonProps) => {
  const { setCurrentStep } = useDepositStore()
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const bank = watch('bank')
  const amount = watch('amount')
  const canSubmit =
    bank !== undefined &&
    amount !== undefined &&
    amount >= MIN_INVESTMENT_AMOUNT
  const handleClick = (): void => {
    setCurrentStep(DepositStoreStep.PREVIEW)
  }

  return (
    <Button
      {...props}
      disabled={!canSubmit}
      onClick={handleClick}
      color='primary'
      variant='contained'
    >
      Continue
    </Button>
  )
}
