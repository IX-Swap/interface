import React from 'react'
import { DialogProps } from '@mui/material/Dialog'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export const CreateWalletDialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const { replace } = useHistory()

  return (
    <UIDialog
      fullWidth
      open={open}
      maxWidth={'xs'}
      onClose={() => replace(WithdrawalAddressesRoute.list)}
      {...rest}
    >
      {children}
    </UIDialog>
  )
}
