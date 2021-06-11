import { Button } from '@material-ui/core'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export interface ConfirmDisableButtonProps {
  successCallback?: () => void
}

export const ConfirmDisableButton = ({
  successCallback
}: ConfirmDisableButtonProps) => {
  const { hasSelected, selected } = useSelectionHelperContext<VirtualAccount>()

  const handleConfirmDisable = () => {
    console.log(selected)
    successCallback?.()
  }

  return (
    <Button
      variant='contained'
      color='primary'
      disableElevation
      disabled={!hasSelected}
      onClick={handleConfirmDisable}
    >
      Yes
    </Button>
  )
}
