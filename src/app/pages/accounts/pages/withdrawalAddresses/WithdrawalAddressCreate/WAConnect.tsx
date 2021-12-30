import React, { ReactElement, useEffect } from 'react'
import { FileCopyOutlined } from '@material-ui/icons'
import {
  CircularProgress,
  DialogActions,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@material-ui/core'
import { WalletConnectionStatus } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useConnectMetamaskWallet'
import { WAConnectActions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnectActions'
import { WAInfoFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAInfoFields'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { useCheckAddress } from '../hooks/useCheckAddress'
import { useDebouncedCallback } from 'use-debounce'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { copyToClipboard } from 'helpers/clipboard'
import { WAPair } from './WAPair'
import { Alert } from '@material-ui/lab'

export interface WAConnectProps {
  hint: ReactElement
  status: WalletConnectionStatus
  getAccount: (walletAddress: string) => Promise<void>
}

export const WAConnect = ({ hint, status, getAccount }: WAConnectProps) => {
  const { watch, control } = useFormContext<WithdrawalAddressFormValues>()
  const address = watch('address')
  const wallet = watch('wallet')
  const [checkAddress, { isLoading, data, isSuccess }] = useCheckAddress({
    onSuccess: values => {
      control.setValue('wallet', values.data?.walletApplication)
      control.setValue('network', values.data?.networkId)
    }
  })
  const { callback: debouncedCheckAddress } = useDebouncedCallback(
    checkAddress,
    300
  )

  useEffect(() => {
    if (address?.trim().length > 0) {
      void debouncedCheckAddress(address)
    }
  }, [address, debouncedCheckAddress])

  const isInitialising = status === WalletConnectionStatus.INITIALISING
  const hasWallet =
    status === WalletConnectionStatus.INITIALISED ||
    status === WalletConnectionStatus.VERIFYING ||
    status === WalletConnectionStatus.ERROR
  const isVerifying = status === WalletConnectionStatus.VERIFYING
  const isVerified = status === WalletConnectionStatus.SUCCESS
  const allowConnect = data?.data.allowConnect ?? false

  return (
    <>
      <Grid item>
        <TypedField
          className={privateClassNames()}
          component={TextField}
          control={control}
          name='address'
          label='Blockchain Address'
          variant='outlined'
          disabled={allowConnect}
          InputProps={{
            endAdornment: isLoading ? (
              <CircularProgress size={18} thickness={6} />
            ) : (
              allowConnect && (
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    onClick={() => copyToClipboard(address)}
                  >
                    <FileCopyOutlined color='action' />
                  </IconButton>
                </InputAdornment>
              )
            )
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <WAPair wallet={wallet} networkCode={data?.data.code} />
      </Grid>
      {isSuccess && !allowConnect && (
        <Grid item xs={12}>
          <Alert severity='error'>
            We cannot connect your wallet at the moment. Connection of other
            wallets to the platform is coming soon.
          </Alert>
        </Grid>
      )}
      {hasWallet && <WAInfoFields />}
      {!hasWallet && hint}
      <DialogActions>
        <Grid item container justify='flex-end'>
          <WAConnectActions
            isVerifying={isVerifying}
            isVerified={isVerified}
            isLoading={isInitialising || isVerifying}
            hasWallet={hasWallet}
            allowConnect={allowConnect}
            getAccount={async () => await getAccount(address)}
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

      <input {...control.register('wallet')} hidden />
      <input {...control.register('network')} hidden />
    </>
  )
}
