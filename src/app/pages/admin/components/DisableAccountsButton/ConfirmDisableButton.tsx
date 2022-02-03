import { Button } from '@material-ui/core'
import { useDisableVirtualAccounts } from 'app/pages/admin/hooks/useDisableVirtualAccounts'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export interface ConfirmDisableButtonProps {
  successCallback?: () => void
}

export const ConfirmDisableButton = ({
  successCallback
}: ConfirmDisableButtonProps) => {
  const { hasSelected, selected, resetSelection } =
    useSelectionHelperContext<VirtualAccount>()
  const [disableAccounts, { isLoading }] = useDisableVirtualAccounts()

  const handleConfirmDisable = async () => {
    const selectedAccountNumbers = selected.map(account => account._id)
    await disableAccounts(selectedAccountNumbers)
    successCallback?.()
    resetSelection()
  }

  return (
    <Button
      variant='contained'
      color='primary'
      disableElevation
      disabled={!hasSelected || isLoading}
      onClick={handleConfirmDisable}
    >
      Yes
    </Button>
  )
}
