import React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'

export const CreateWalletDialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const { replace } = useHistory()

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={'xs'}
      onClose={() => replace(WithdrawalAddressesRoute.list)}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
