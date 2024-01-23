import { useState } from 'react'
import { useServices } from 'hooks/useServices'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { useWeb3React } from '@web3-react/core'
import { useGenerateWalletHashWeb3Modal } from './useGenerateWalletHashWeb3Modal'
import { useVerifyWalletOwnershipWeb3Modal } from './useVerifyWalletOwnershipWeb3Modal'

export enum WalletConnectionStatus {
  IDLE,
  INITIALISING,
  INITIALISED,
  VERIFYING,
  ERROR,
  SUCCESS
}

export function useConnectMetamaskWalletWeb3Modal() {
  const { snackbarService, web3Service } = useServices()
  const [status, setStatus] = useState(WalletConnectionStatus.IDLE)
  const [generateWalletHash] = useGenerateWalletHashWeb3Modal()
  const [verifyWalletOwnership] = useVerifyWalletOwnershipWeb3Modal()
  const { account } = useWeb3React()

  const signWallet = async (values: WithdrawalAddressFormValues) => {
    const { address } = values
    setStatus(WalletConnectionStatus.VERIFYING)

    try {
      const generateWalletHashResponse = await generateWalletHash({
        walletAddress: address
      })
      const walletHash = generateWalletHashResponse?.data

      if (walletHash !== undefined) {
        // const signedHash = await web3Service.signWallet(walletHash, address)
        const signedHash = await window.ethereum.request({
          method: 'personal_sign',
          params: [walletHash, address]
        })
        const verifyOwnershipResponse = await verifyWalletOwnership({
          walletAddress: address,
          signedHash
        })

        if (verifyOwnershipResponse?.data?.user != null) {
          setStatus(WalletConnectionStatus.SUCCESS)
        } else {
          setStatus(WalletConnectionStatus.ERROR)
          snackbarService.showSnackbar('Failed to sign the wallet', 'error')
        }
      }
    } catch (error) {
      snackbarService.showSnackbar((error as Error).message, 'error')
      setStatus(WalletConnectionStatus.ERROR)
    }
  }

  const getAccount = async (address: string) => {
    setStatus(WalletConnectionStatus.INITIALISING)

    try {
      if (account !== undefined) {
        //   await web3Service.getAccount(address)
        await web3Service.getAccount(account ?? '')
      }
      setStatus(WalletConnectionStatus.INITIALISED)
    } catch (error) {
      setStatus(WalletConnectionStatus.IDLE)
      snackbarService.showSnackbar((error as Error).message, 'error')
    }
  }

  return {
    status,
    getAccount,
    signWallet
  }
}
