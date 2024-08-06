import { useWeb3React } from 'connection/web3reactShim'
import React from 'react'

import { ConnectPrompt } from './ConnectPrompt'
import { WalletInformation } from './WalletInformation'

export const Wallet = () => {
  const { account } = useWeb3React()

  const onConnect = React.useCallback(() => {
    console.log('Connected')
  }, [])

  if (account) {
    return <WalletInformation />
  }

  return <ConnectPrompt onConnect={onConnect} />
}
