import React from 'react'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogContent'
import { CreateWalletDialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog'
import { CreateWalletDialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogTitle'
import { CreateWalletDialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogContent'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog.styles'
import { WAOfferToCreateWallet } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAOfferToCreateWallet/WAOfferToCreateWallet'
import { useToggleValue } from 'hooks/useToggleValue'
import { WithdrawalAddressForm } from './WAForm'

export const WithdrawalAddressCreate = () => {
  const [isCreateWalletDialogVisible, toggleIsCreateWalletDialogVisible] =
    useToggleValue()
  const classes = useStyles({ isCreateWalletDialogVisible })
  const hint = (
    <WAOfferToCreateWallet onClick={toggleIsCreateWalletDialogVisible} />
  )

  return (
    <>
      <WADialog
        open
        classes={{
          paper: classes.dialog,
          root: classes.dialog
        }}
      >
        <WADialogTitle label='Add Blockchain Address' />
        <WADialogContent>
          <WithdrawalAddressForm hint={hint} />
        </WADialogContent>
      </WADialog>
      <CreateWalletDialog
        classes={{
          paper: classes.createDialog,
          root: classes.createDialog
        }}
        open
        onClose={toggleIsCreateWalletDialogVisible}
      >
        <CreateWalletDialogTitle
          label='Create Wallet'
          onButtonCloseClick={toggleIsCreateWalletDialogVisible}
        />
        <CreateWalletDialogContent />
      </CreateWalletDialog>
    </>
  )
}
