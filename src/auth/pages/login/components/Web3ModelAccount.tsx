import React, { useEffect } from 'react'

import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import {
  WalletConnectionStatus,
  useConnectMetamaskWalletWeb3Modal
} from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useConnectMetamaskWalletWeb3Modal'
import { useCookies } from 'react-cookie'

export function Web3ModelAccount() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { signWallet, status } = useConnectMetamaskWalletWeb3Modal()
  const [cookies, setCookie] = useCookies(['isSigned'])

  useEffect(() => {
    const signWalletAsync = async () => {
      if (isConnected) {
        const addressValue = address ?? ''
        try {
          await signWallet({
            label: addressValue,
            address: addressValue,
            network: ''
          })
        } catch (error) {
          console.log('error', error)
        }
      }
    }
    signWalletAsync().catch(error => {
      console.log('error', error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  // update isSigned and redirect to home page
  useEffect(() => {
    if (status === WalletConnectionStatus.SUCCESS) {
      console.log('cookies', cookies)
      setCookie('isSigned', true)
      // write code to redirect to home page
      window.location.href = '/'
    }
  }, [status, setCookie, cookies])

  return (
    <>
      <div>
        <h1>Connected</h1>
        <p>Address: {address}</p>
        <p>ChainId: {chainId}</p>
        <p>Status: {status}</p>
      </div>
    </>
  )
  // ...
}
