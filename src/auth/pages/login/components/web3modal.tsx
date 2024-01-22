import React from 'react'

import { useWeb3ModalAccount } from '@web3modal/ethers5/react'

export function Web3ModelAccount() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  if (isConnected) {
    return (
      <div>
        <h1>Connected</h1>
        <p>Address: {address}</p>
        <p>ChainId: {chainId}</p>
      </div>
    )
  }

  return <></>
  // ...
}
