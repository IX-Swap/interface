import { Button } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/MaxButton/MaxButton.styles'
import React from 'react'

export interface MaxButtonProps {
  onClick: () => void
}

export const MaxButton = ({ onClick }: MaxButtonProps) => {
  const { button } = useStyles()
  return (
    <Button className={button} onClick={onClick}>
      MAX
    </Button>
  )
}
