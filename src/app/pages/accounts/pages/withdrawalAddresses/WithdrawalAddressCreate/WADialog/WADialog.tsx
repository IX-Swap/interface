import React from 'react'
import { DialogProps } from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useHistory } from 'react-router-dom'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useWeb3React } from '@web3-react/core'

export const WADialog: React.FC<DialogProps> = ({
  children,
  open,
  ...rest
}) => {
  const theme = useTheme()
  const { replace } = useHistory()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { deactivate } = useWeb3React()

  //   const refreshState = () => {
  //     setAccount()
  //     setChainId()
  //   }

  const disconnect = () => {
    // window.localStorage.setItem('provider', undefined)
    window.localStorage.removeItem(
      '-walletlink:https://www.walletlink.org:DefaultChainId'
    )
    window.localStorage.removeItem(
      '-walletlink:https://www.walletlink.org:Addresses'
    )
    deactivate()
    // refreshState()
  }

  return (
    <UIDialog
      fullWidth
      open={open}
      fullScreen={fullScreen}
      onClose={() => {
        replace(WithdrawalAddressesRoute.list)
        disconnect()
      }}
      {...rest}
    >
      {children}
    </UIDialog>
  )
}
