import React from 'react'
import useStyles from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog.styles'
import DialogContent from '@mui/material/DialogContent'
import { Grid, Link, Typography } from '@mui/material'
import { CreateWalletLink } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletLink'
import AlgorandIcon from 'assets/images/algorand.png'
import MetamaskIcon from 'assets/images/metamask.png'
import HederaIcon from 'assets/images/hedera.png'
import TezosIcon from 'assets/images/tezos.png'

export const links = [
  {
    label: 'Install Metamask',
    icon: MetamaskIcon,
    href: 'https://metamask.io',
    disabled: false
  },
  {
    label: 'Install Hedera Wallet',
    icon: HederaIcon,
    href: 'https://myhbarwallet.com',
    disabled: true
  },
  {
    label: 'Install Temple (Tezos) Wallet',
    icon: TezosIcon,
    href: 'https://templewallet.com',
    disabled: true
  },
  {
    label: 'Access MyAlgo Wallet',
    icon: AlgorandIcon,
    href: 'https://wallet.myalgo.com/',
    disabled: true
  }
]

export const CreateWalletDialogContent: React.FC = () => {
  const classes = useStyles()

  return (
    <DialogContent className={classes.contentWrapper}>
      <Typography variant={'body2'} className={classes.content}>
        Please select any wallet from the below and install on your device. Once
        you install the wallet, copy the address (address eg: 0x23....4567) and
        add it on our withdrawal address selecting correct network. Read our{' '}
        <Link
          color='primary'
          target='_blank'
          href='/documents/Combined Instructions for Wallets.pdf'
        >
          guide
        </Link>{' '}
        to learn more on installation and adding process.
      </Typography>
      <Grid container spacing={3} direction={'column'}>
        {links.map(item => (
          <Grid item>
            <CreateWalletLink {...item} />
          </Grid>
        ))}
      </Grid>
    </DialogContent>
  )
}
