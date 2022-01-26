import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'

export interface ResetButtonProps extends ButtonProps {}

export const ResetButton = (props: ResetButtonProps) => {
  const { reset } = useFormContext()
  const { clear } = useDepositStore()
  const handleClick = () => {
    reset()
    clear()
  }

  return (
    <Button {...props} variant='outlined' color='primary' onClick={handleClick}>
      {props.children}
    </Button>
  )
}
