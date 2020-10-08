import React from 'react'
import { observer } from 'mobx-react'
import { Button } from '@material-ui/core'
import { useDepositStore } from '../context'
import { DepositStoreStep } from '../context/store'

export const BackButton: React.FC = observer(() => {
  const { setCurrentStep } = useDepositStore()
  const handleClick = () => {
    setCurrentStep(DepositStoreStep.SETUP)
  }

  return (
    <Button color='default' onClick={handleClick}>
      Back
    </Button>
  )
})
