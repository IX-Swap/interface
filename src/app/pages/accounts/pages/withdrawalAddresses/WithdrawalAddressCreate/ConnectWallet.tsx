import React, { ReactElement } from 'react'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MetamaskIcon from 'assets/images/wallets/metamask.png'
import CoinbaseIcon from 'assets/images/wallets/coinbase.png'

interface ConnectWalletButtonProps {
  children: ReactElement
  isLoading?: Boolean
}

const ConnectWalletButton = ({
  children,
  isLoading = false
}: ConnectWalletButtonProps) => {
  const theme = useTheme()

  return (
    <Button
      fullWidth
      variant='contained'
      textColor={'primary'}
      disableElevation
      disabled={isLoading}
      sx={{
        backgroundColor: theme.palette.paginationItem.borderHover,
        color: theme.palette.primary.main,
        paddingY: '18px'
      }}
    >
      <Box display={'flex'} alignItems={'center'} gap={1.5}>
        {children}
        {isLoading === true && (
          <CircularProgress color='inherit' size={'1rem'} />
        )}
      </Box>
    </Button>
  )
}

export const ConnectWallet = () => {
  //   const { signWallet, status, getAccount } = useConnectMetamaskWallet()
  //   const handleSubmit = async ({
  //     agree,
  //     ...values
  //   }: WithdrawalAddressFormValues) => {
  //     await signWallet(values)
  //   }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
    >
      <ConnectWalletButton isLoading={true}>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <span>Metamask Wallet</span>
          <img src={MetamaskIcon} alt={'Metamask'} height={'20'} />
        </Box>
      </ConnectWalletButton>

      <Typography variant='subtitle2'>or</Typography>

      <ConnectWalletButton>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <span>Coinbase Wallet</span>
          <img src={CoinbaseIcon} alt={'Coinbase'} height={'20'} />
        </Box>
      </ConnectWalletButton>
    </Box>
  )
}
