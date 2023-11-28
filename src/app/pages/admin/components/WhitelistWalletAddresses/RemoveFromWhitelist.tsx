import React, { useState } from 'react'
import { UserActionsDialog } from 'app/pages/admin/components/UserActionsDialog'
import { useRemoveFromWhitelist } from '../../hooks/useRemoveFromWhitelist'
import { IconButton } from '@mui/material'
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'

export interface RemoveFromWhitelistProps {
  address: string
  assetId: string
}

export const RemoveFromWhitelist = ({
  address,
  assetId
}: RemoveFromWhitelistProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const closeDialog = () => setIsDialogOpen(false)
  const [deleteTenant, { isLoading }] = useRemoveFromWhitelist(
    address,
    assetId,
    closeDialog
  )
  const classes = useStyles()

  return (
    <>
      <IconButton
        size='medium'
        className={classes.button}
        onClick={() => setIsDialogOpen(true)}
        title='Remove from whitelist'
      >
        <DeleteIcon color='disabled' />
      </IconButton>

      <UserActionsDialog
        open={isDialogOpen}
        disableEscapeKeyDown
        closeDialog={closeDialog}
        action={deleteTenant}
        actionLabel='Remove'
        title='Are you sure you want to remove this address from the whitelist?'
        isLoading={isLoading}
      />
    </>
  )
}
