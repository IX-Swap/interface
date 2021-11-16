import React from 'react'
import {
  useConnectMetamaskWallet,
  WalletConnectionStatus
} from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useConnectMetamaskWallet'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { WADialogActions } from '../WADialog/WADialogActions'
import { Grid } from '@material-ui/core'
import { WAConnectActions } from './WAConnectActions'
import { WAConnectFields } from './WAConnectFields'
import { WAInfoFields } from './WAInfoFields'

export const WAConnect = () => {
  const { status, getAccount, signWallet } = useConnectMetamaskWallet()

  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const network = watch('network')
  const address = watch('address')

  const isLoading = status === WalletConnectionStatus.LOADING
  const hasAddress = address !== undefined
  const hasNetwork = network !== undefined
  const isVerified = status === WalletConnectionStatus.SUCCESS

  return (
    <>
      <WAConnectFields />
      {isVerified && <WAInfoFields />}
      <WADialogActions>
        <Grid item container justify='flex-end'>
          <WAConnectActions
            isVerified={isVerified}
            isLoading={isLoading}
            hasNetwork={hasNetwork}
            hasAddress={hasAddress}
            getAccount={getAccount}
            signWallet={signWallet}
          />
        </Grid>
      </WADialogActions>
    </>
  )
}
