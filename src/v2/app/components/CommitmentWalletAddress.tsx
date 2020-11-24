import React from 'react'
import { Typography } from '@material-ui/core'
import { WalletAddress } from 'v2/app/components/WalletAddress'

export interface CommitmentWalletAddressProps {
  address?: string
}

export const CommitmentWalletAddress = (
  props: CommitmentWalletAddressProps
): JSX.Element => {
  const { address } = props

  return typeof address === 'string' ? (
    <WalletAddress address={address} link />
  ) : (
    <Typography
      variant='body1'
      color='error'
      style={{ textDecoration: 'underline' }}
    >
      Not provided by a Investor
    </Typography>
  )
}
