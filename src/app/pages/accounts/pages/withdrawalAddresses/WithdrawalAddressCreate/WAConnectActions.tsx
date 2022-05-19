import React from 'react'
import { Button } from '@mui/material'
import { Submit } from 'components/form/Submit'

interface WAConnectActionsProps {
  isLoading: boolean
  isVerifying: boolean
  isVerified: boolean
  hasWallet: boolean
  allowConnect: boolean
  getAccount: Function
}

export const WAConnectActions = ({
  isLoading,
  isVerified,
  isVerifying,
  allowConnect,
  hasWallet,
  getAccount
}: WAConnectActionsProps) => {
  if (hasWallet) {
    return (
      <Submit
        color='primary'
        variant='contained'
        disableElevation
        disabled={isVerifying || isLoading}
      >
        Sign and Save
      </Submit>
    )
  }

  return (
    <Button
      fullWidth
      color='primary'
      variant='contained'
      disableElevation
      onClick={() => getAccount()}
      disabled={!allowConnect || isLoading}
    >
      Connect
    </Button>
  )
}
