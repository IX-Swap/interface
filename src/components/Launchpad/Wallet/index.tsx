import { useWeb3React } from '@web3-react/core'
import React from 'react'

import { ConnectPrompt } from './ConnectPrompt'
import { WalletInformation } from './WalletInformation'

export const Wallet = () => {
  const { account } = useWeb3React()

  const onConnect = React.useCallback(() => { console.log('Shit')}, [])

  if (account) {
    return <WalletInformation />
  }
  
  return <ConnectPrompt onConnect={onConnect}/>
}
