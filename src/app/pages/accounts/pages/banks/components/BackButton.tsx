import React from 'react'
import { observer } from 'mobx-react'
import { Button, ButtonProps } from '@mui/material'
import { useDepositStore } from '../context'
import { DepositStoreStep } from '../context/store'

export const BackButton = observer((props: ButtonProps) => {
  const { setCurrentStep } = useDepositStore()
  const handleClick = () => {
    setCurrentStep(DepositStoreStep.SETUP)
  }

  return (
    <Button {...props} onClick={handleClick}>
      Back
    </Button>
  );
})
