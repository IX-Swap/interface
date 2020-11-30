import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useWithdrawalAddressesRouter } from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'

export const WADialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const theme = useTheme()
  const { replace } = useWithdrawalAddressesRouter()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={() => replace('list')}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
