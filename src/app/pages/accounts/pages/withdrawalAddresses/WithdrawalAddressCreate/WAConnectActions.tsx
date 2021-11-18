import React from 'react'
import { Button } from '@material-ui/core'
import { Submit } from 'components/form/Submit'

interface WAConnectActionsProps {
  isLoading: boolean
  isVerifying: boolean
  isVerified: boolean
  hasNetwork: boolean
  hasAddress: boolean
  getAccount: Function
  signWallet: Function
}

export const WAConnectActions = ({
  isLoading,
  isVerified,
  isVerifying,
  hasAddress,
  hasNetwork,
  getAccount,
  signWallet
}: WAConnectActionsProps) => {
  if (isVerified) {
    return (
      <Submit color='primary' variant='contained'>
        Submit
      </Submit>
    )
  }

  if (hasAddress) {
    return (
      <Button
        color='primary'
        variant='outlined'
        disabled={isVerifying}
        onClick={() => signWallet()}
      >
        Sign Challenge
      </Button>
    )
  }

  if (hasNetwork) {
    return (
      <Button
        color='primary'
        variant='outlined'
        onClick={() => getAccount()}
        disabled={isLoading}
      >
        Connect Wallet
      </Button>
    )
  }

  return null
}
