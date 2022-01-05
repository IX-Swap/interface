import { Button } from '@material-ui/core'
import { AddVirtualAccountsForm } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsForm'
import { FormDialog } from 'components/FormDialog/FormDialog'
import { FormDialogContent } from 'components/FormDialog/FormDialogContent'
import { FormDialogTitle } from 'components/FormDialog/FormDialogTitle'
import React, { useState } from 'react'

export const AddVirtualAccountsButton = () => {
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        color='primary'
        variant='contained'
        onClick={openDialog}
        disableElevation
      >
        ADD ACCOUNTS
      </Button>
      <FormDialog open={open} onClose={closeDialog}>
        <FormDialogTitle
          label='Add New Virtual Accounts'
          onClose={closeDialog}
        />
        <FormDialogContent>
          <AddVirtualAccountsForm closeDialog={closeDialog} />
        </FormDialogContent>
      </FormDialog>
    </>
  )
}
