import { Button, ButtonProps } from '@mui/material'
import React from 'react'
import { useValidateWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'

export const ContinueButton = (props: ButtonProps) => {
  const { canSubmit } = useValidateWithdrawCash()

  return (
    <Button
      {...props}
      disabled={!canSubmit}
      color='primary'
      variant='contained'
      disableElevation
    >
      Confirm Withdrawal
    </Button>
  )
}
