import React, { useState } from 'react'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogContent'
import { WAFormWrapper } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper'
import { CreateWalletDialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog'
import { CreateWalletDialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogTitle'
import { CreateWalletDialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogContent'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog.styles'

export const WithdrawalAddressCreate = () => {
  const [isCreateWalletDialogVisible, setIsCreateWalletDialogVisible] =
    useState<boolean>(false)
  const classes = useStyles({ isCreateWalletDialogVisible })

  const handleOpenCreateWalletDialog = () => {
    setIsCreateWalletDialogVisible(true)
  }

  const handleCloseCreateWalletDialog = () => {
    setIsCreateWalletDialogVisible(false)
  }

  return (
    <>
      <WADialog
        open
        classes={{
          paper: classes.dialog,
          root: classes.dialog
        }}
      >
        <WADialogTitle label='Add Withdrawal Address' />
        <WADialogContent>
          <WAFormWrapper onLinkClick={handleOpenCreateWalletDialog} />
        </WADialogContent>
      </WADialog>
      <CreateWalletDialog
        classes={{
          paper: classes.createDialog,
          root: classes.createDialog
        }}
        open
        onClose={handleCloseCreateWalletDialog}
      >
        <CreateWalletDialogTitle
          label='Create Wallet'
          onButtonCloseClick={handleCloseCreateWalletDialog}
        />
        <CreateWalletDialogContent />
      </CreateWalletDialog>
    </>
  )
}
