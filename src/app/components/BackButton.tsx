import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { useHistory } from 'react-router-dom'

export interface BackButtonProps extends ButtonProps {
  children?: ReactNode
}

export const BackButton = (props: BackButtonProps) => {
  const { children = 'Back', ...rest } = props
  const { goBack } = useHistory()

  return (
    <Button {...rest} variant='contained' onClick={goBack} disableElevation>
      {children}
    </Button>
  )
}
