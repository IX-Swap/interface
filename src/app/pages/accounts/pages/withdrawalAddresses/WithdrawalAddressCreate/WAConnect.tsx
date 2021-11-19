import React from 'react'
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
import { WAOfferToCreateWallet } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAOfferToCreateWallet/WAOfferToCreateWallet'

export interface WAConnectProps {
  onLinkClick: () => void
}

export const WAConnect = ({ onLinkClick }: WAConnectProps) => {
  const { status, getAccount, signWallet } = useConnectMetamaskWallet()

  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const network = watch('network')
  const address = watch('address')

  const isInitialising = status === WalletConnectionStatus.INITIALISING
  const isVerified = status === WalletConnectionStatus.SUCCESS
  const isVerifying = status === WalletConnectionStatus.VERIFYING
  const hasAddress = address !== undefined
  const hasNetwork = network !== undefined

  return (
    <>
      <WAConnectFields />
      {isVerified && <WAInfoFields />}
      <WAOfferToCreateWallet onClick={() => onLinkClick()} />
      <DialogActions>
        <Grid item container justify='flex-end'>
          <WAConnectActions
            isVerifying={isVerifying}
            isVerified={isVerified}
            isLoading={isInitialising}
            hasNetwork={hasNetwork}
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
