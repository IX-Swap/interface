import React from 'react'
import { observer } from 'mobx-react'
import { Button, ButtonProps } from '@material-ui/core'
import { useDepositStore } from '../context'
import { DepositStoreStep } from '../context/store'

export const BackButton = observer((props: ButtonProps) => {
  const { setCurrentStep } = useDepositStore()
  const handleClick = () => {
    setCurrentStep(DepositStoreStep.SETUP)
  }

  return (
    <Button {...props} color='default' onClick={handleClick}>
      Back
    </Button>
  )
})
