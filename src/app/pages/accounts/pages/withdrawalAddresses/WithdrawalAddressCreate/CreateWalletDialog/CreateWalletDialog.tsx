import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'

export const CreateWalletDialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const theme = useTheme()
  const { replace } = useHistory()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={'xs'}
      fullScreen={fullScreen}
      onClose={() => replace(WithdrawalAddressesRoute.list)}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
