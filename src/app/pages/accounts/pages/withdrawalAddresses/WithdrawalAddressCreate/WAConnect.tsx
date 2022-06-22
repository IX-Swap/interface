import { FileCopyOutlined } from '@mui/icons-material'
import {
  Alert,
  CircularProgress,
  DialogActions,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { WalletConnectionStatus } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useConnectMetamaskWallet'
import { WAConnectActions } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnectActions'
import { WAInfoFields } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAInfoFields'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { copyToClipboard } from 'helpers/clipboard'
import React, { ReactElement, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { TextInput } from 'ui/TextInput/TextInput'
import { useDebouncedCallback } from 'use-debounce'
import { useCheckAddress } from '../hooks/useCheckAddress'
import { WAPair } from './WAPair'

export interface WAConnectProps {
  hint: ReactElement
  status: WalletConnectionStatus
  getAccount: (walletAddress: string) => Promise<void>
}

export const WAConnect = ({ hint, status, getAccount }: WAConnectProps) => {
  const { watch, control } = useFormContext<WithdrawalAddressFormValues>()
  const theme = useTheme()
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
      <Grid item mt={3}>
        <Typography
          color={theme.palette.dialog.color}
          style={{ marginBottom: 10 }}
          fontSize={14}
          fontWeight={500}
          lineHeight='17px'
        >
          Blockchain address
        </Typography>
        <TypedField
          className={privateClassNames()}
          component={TextInput}
          control={control}
          name='address'
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
        <Grid mt={2} item container justifyContent='center'>
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
