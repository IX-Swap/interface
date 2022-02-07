import React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'

export const WADialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const theme = useTheme()
  const { replace } = useHistory()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={() => replace(WithdrawalAddressesRoute.list)}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
