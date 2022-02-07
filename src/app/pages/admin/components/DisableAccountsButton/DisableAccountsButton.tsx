import { Button } from '@mui/material'
import { ConfirmDisableDialogBox } from 'app/pages/admin/components/DisableAccountsButton/ConfirmDisableDialogBox'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import React, { useState } from 'react'

export const DisableAccountsButton = () => {
  const { hasSelected } = useSelectionHelperContext()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const closeDialog = () => {
    setOpenConfirmDialog(false)
  }

  const openDialog = () => {
    setOpenConfirmDialog(true)
  }

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        disabled={!hasSelected}
        onClick={openDialog}
      >
        Disable Accounts
      </Button>
      <ConfirmDisableDialogBox open={openConfirmDialog} close={closeDialog} />
    </>
  )
}
