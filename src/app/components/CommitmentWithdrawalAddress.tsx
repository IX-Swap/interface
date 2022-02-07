import React from 'react'
import { Typography } from '@mui/material'
import { WalletAddress } from 'app/components/WalletAddress'

export interface CommitmentWithdrawalAddressProps {
  address?: string
}

export const CommitmentWithdrawalAddress = (
  props: CommitmentWithdrawalAddressProps
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
      Not provided by the Investor
    </Typography>
  )
}
