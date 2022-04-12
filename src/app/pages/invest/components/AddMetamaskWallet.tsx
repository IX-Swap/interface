import { Link, Typography } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import React from 'react'

export const AddMetamaskWallet = () => {
  return (
    <>
      <Link
        style={{ backgroundColor: 'transparent', textTransform: 'none' }}
        variant='body1'
        type='button'
        target='_blank'
        href={AccountsRoute.withdrawalAddressesCreate}
      >
        <Typography color='primary'>Add Your Metamask Wallet</Typography>
      </Link>
    </>
  )
}
