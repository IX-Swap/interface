import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'
import { Button, ButtonProps } from '@material-ui/core'
import React from 'react'
import { useValidateWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'

export const ContinueButton = (props: ButtonProps) => {
  const { setCurrentStep } = useDepositStore()
  const { canSubmit } = useValidateWithdrawCash()

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
