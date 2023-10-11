import { ContentCopy } from '@mui/icons-material'
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
// import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
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
// import { WAPair } from './WAPair'
import { useWeb3React } from '@web3-react/core'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogContent'
import { WalletInfo } from './ConnectWallet'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'

export interface WAConnectProps {
  hint: ReactElement
  status: WalletConnectionStatus
  getAccount: (walletAddress: string) => Promise<void>
}

export const WAConnect = ({ hint, status, getAccount }: WAConnectProps) => {
  const theme = useTheme()
  const { account, chainId } = useWeb3React()
  const address = account ?? ''

  const { watch, control } = useFormContext<WithdrawalAddressFormValues>()
  //   const address = watch('address')
  const wallet = watch('wallet')
  const network = watch('network')

  const [checkAddress, { isLoading, data, isSuccess }] = useCheckAddress({
    onSuccess: values => {
      control.setValue('address', address)
      //   control.setValue('wallet', values.data?.walletApplication)
      control.setValue('network', values.data?.networkId)
    },
    onError: err => {
      console.log('error', err)
    }
  })

  const { callback: debouncedCheckAddress } = useDebouncedCallback(
    checkAddress,
    300
  )

  //   useEffect(deactivate, [deactivate])

  useEffect(() => {
    if (address?.trim().length > 0) {
      void debouncedCheckAddress({
        walletAddress: address,
        chainId: chainId ?? 0
      })
    }
  }, [address, chainId, debouncedCheckAddress])

  const isInitialising = status === WalletConnectionStatus.INITIALISING
  const hasWallet =
    (status === WalletConnectionStatus.INITIALISED ||
      status === WalletConnectionStatus.VERIFYING ||
      status === WalletConnectionStatus.ERROR) &&
    address !== '' &&
    network !== undefined &&
    wallet !== undefined &&
    wallet in SUPPORTED_WALLETS
  const isVerifying = status === WalletConnectionStatus.VERIFYING
  const isVerified = status === WalletConnectionStatus.SUCCESS
  const allowConnect = data?.data.allowConnect ?? false

  //   console.log('isActive', active)

  return (
    <>
      <WADialogTitle
        label={!hasWallet ? 'Connect Wallet' : 'Add Wallet Address'}
      />
      <WADialogContent>
        <Grid container direction='column' gap={3}>
          {hasWallet && (
            <Grid item>
              <WalletInfo wallet={wallet} />

              <Typography
                color={theme.palette.dialog.color}
                style={{ marginBottom: 10 }}
                fontSize={14}
                fontWeight={500}
                lineHeight='17px'
              >
                Wallet Address
              </Typography>
              <TypedField
                className={privateClassNames()}
                component={TextInput}
                control={control}
                name='address'
                variant='outlined'
                // disabled={allowConnect}
                disabled
                defaultValue={address}
                InputProps={{
                  endAdornment: isLoading ? (
                    <CircularProgress size={18} thickness={6} />
                  ) : (
                    // allowConnect && (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => copyToClipboard(address)}>
                        <ContentCopy color='action' sx={{ height: '18.5px' }} />
                      </IconButton>
                    </InputAdornment>
                    // )
                  )
                }}
              />
            </Grid>
          )}

          {/* Displays Wallet Type and Network */}
          {/* 
            <Grid item xs={12}>
                <WAPair wallet={wallet} networkCode={data?.data.code} />
            </Grid> 
          */}

          {isSuccess && !allowConnect && (
            <Grid item xs={12}>
              <Alert severity='error'>
                We cannot connect your wallet at the moment. Connection of other
                wallets to the platform is coming soon.
              </Alert>
            </Grid>
          )}

          {hasWallet && <WAInfoFields />}

          <DialogActions>
            <Grid item xs container justifyContent='center' mt={2}>
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

          {/* Create Wallet Hint */}
          {/* {!hasWallet && hint} */}

          {/* {isInitialising && (
            <LoadingIndicator
              opacity={1}
              title='Initializing. Please Wait...'
              message="By connecting a wallet, you agree to InvestaX' Terms and Conditions and acknowledge that you have read and understand the InvestaX Privacy Policy."
            />
          )} */}

          <input {...control.register('address')} hidden />
          <input {...control.register('wallet')} hidden />
          <input {...control.register('network')} hidden />
        </Grid>
      </WADialogContent>
    </>
  )
}
