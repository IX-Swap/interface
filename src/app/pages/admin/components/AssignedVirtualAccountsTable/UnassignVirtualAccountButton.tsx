import { IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { VirtualAccount } from 'types/virtualAccount'
import { LinkOff } from '@material-ui/icons'
import { ConfirmUnassignDialog } from 'app/pages/admin/components/AssignedVirtualAccountsTable/ConfirmUnassignDialog'

export interface UnassignVirtualAccountProps {
  item: VirtualAccount
}

export const UnassignVirtualAccount = ({
  item
}: UnassignVirtualAccountProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <IconButton size='small' onClick={handleOpen}>
        <LinkOff color='disabled' />
      </IconButton>
      <ConfirmUnassignDialog
        closeDialog={handleClose}
        open={open}
        account={item}
      />
    </>
  )
}
