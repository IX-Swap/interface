import React, { ReactElement } from 'react'
import {
  useConnectMetamaskWallet,
  WalletConnectionStatus
} from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useConnectMetamaskWallet'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { DialogActions, Grid } from '@material-ui/core'
import { WAConnectActions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnectActions'
import { WAConnectFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnectFields'
import { WAInfoFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAInfoFields'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export interface WAConnectProps {
  hint: ReactElement
}

export const WAConnect = ({ hint }: WAConnectProps) => {
  const { status, getAccount, signWallet } = useConnectMetamaskWallet()

  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const wallet = watch('wallet')
  const address = watch('address')

  const isInitialising = status === WalletConnectionStatus.INITIALISING
  const isVerified = status === WalletConnectionStatus.SUCCESS
  const isVerifying = status === WalletConnectionStatus.VERIFYING
  const hasAddress = address !== undefined
  const hasWallet = wallet !== undefined

  return (
    <>
      <WAConnectFields />
      {isVerified && <WAInfoFields />}
      {hint}
      <DialogActions>
        <Grid item container justify='flex-end'>
          <WAConnectActions
            isVerifying={isVerifying}
            isVerified={isVerified}
            isLoading={isInitialising}
            hasWallet={hasWallet}
            hasAddress={hasAddress}
            getAccount={getAccount}
            signWallet={signWallet}
          />
        </Grid>
      </DialogActions>

      {isInitialising && (
        <LoadingIndicator
          opacity={1}
          title='Initializing. Please Wait...'
          message='By connecting a wallet, you agree to InvestaX’ Terms and Conditions and acknowledge that you have read and understand the InvestaX Privacy Policy.'
        />
      )}
    </>
  )
}
