import React from 'react'
// import { Grid, Typography, Box, Divider } from '@mui/material'
// import { Submit } from 'components/form/Submit'
// import { LoginFields } from 'auth/pages/login/components/LoginFields'
// import { AppRouterLink } from 'components/AppRouterLink'
// import { AuthRoute } from 'auth/router/config'
// import { useStyles } from './Login.styles'
// import { VSpacer } from 'components/VSpacer'
// import { MAX_LOGIN_ATTEMPTS } from 'types/auth'
import { useTenant } from 'auth/hooks/useTenant'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { Web3ModelAccount } from './components/web3modal'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '4dcfae48e83be7804beb4adf6acaf2fb'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon Mainnet',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
}

const ethersConfig = defaultConfig({
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 1,
  rpcUrl: 'https://cloudflare-eth.com'
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet, polygon],
  projectId
})

export interface LoginProps {
  hidden: boolean
  isLoading: boolean
  attempts?: number
}

export const Login = ({ hidden, isLoading, attempts = 0 }: LoginProps) => {
  useTenant()
  // const { title, link, text } = useStyles()

  return (
    <>
      <Web3ModelAccount />
      <w3m-button />
      {/* <w3m-network-button />
      <w3m-connect-button />
      <w3m-account-button /> */}
    </>
    //   <Box display={hidden ? 'none' : 'block'}>
    //     <Grid container direction='column' spacing={2}>
    //       <Grid item>
    //         <Typography className={title} variant={'h3'} align='center'>
    //           Sign In
    //         </Typography>
    //         <VSpacer size={'extraMedium'} />
    //       </Grid>
    //       <Grid item>
    //         <LoginFields />
    //       </Grid>
    //       {attempts >= MAX_LOGIN_ATTEMPTS && (
    //         <Grid item>
    //           <Typography variant='body2' color='error'>
    //             You have {attempts <= 5 ? 5 - attempts : 0} attempts left. Your
    //             account will be temporarily locked.
    //           </Typography>
    //         </Grid>
    //       )}

    //       <Grid item container justifyContent='center'>
    //         <Submit
    //           fullWidth
    //           size='large'
    //           variant='contained'
    //           color='primary'
    //           watchIsDirty={false}
    //           disabled={isLoading}
    //         >
    //           Login
    //         </Submit>
    //       </Grid>
    //       <Grid item>
    //         <VSpacer size={'small'} />
    //         <Divider />
    //       </Grid>
    //       <Grid item>
    //         <Typography align='center' className={text}>
    //           Don’t have an account?{' '}
    //           <AppRouterLink to={AuthRoute.signup} className={link}>
    //             Create an Account.
    //           </AppRouterLink>
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Box>
  )
}
