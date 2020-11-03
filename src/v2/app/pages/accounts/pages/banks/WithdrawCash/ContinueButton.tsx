import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'v2/app/pages/accounts/pages/banks/context/store'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '@material-ui/core'
import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { useValidateWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'

export const ContinueButton = (props: ButtonProps) => {
  const { setCurrentStep } = useDepositStore()
  const { watch, setError, clearErrors, errors } = useFormContext<
    WithdrawCashFormValues
  >()
  const bank = watch('bank')
  const amount = watch('amount')
  const { data, isLoading, error } = useValidateWithdrawCash(bank, amount)
  let canSubmit = false

  if (!isLoading && data !== undefined) {
    canSubmit = error === undefined
    if (error === undefined && errors.amount !== undefined) {
      clearErrors('amount')
    } else if (error !== undefined && errors.amount === undefined) {
      setError('amount', { message: error })
    }
  }

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
