import { useState } from 'react'
import { useGenerateWalletHash } from './useGenerateWalletHash'
import { useVerifyWalletOwnership } from './useVerifyWalletOwnership'
import { useServices } from 'hooks/useServices'
import { useMakeWithdrawalAddress } from './useMakeWithdrawalAddress'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { useWeb3React } from '@web3-react/core'
import { stringToHex } from 'helpers/strings'

export enum WalletConnectionStatus {
  IDLE,
  INITIALISING,
  INITIALISED,
  VERIFYING,
  ERROR,
  SUCCESS
}

export function useConnectMetamaskWallet() {
  const { snackbarService, web3Service } = useServices()
  const [status, setStatus] = useState(WalletConnectionStatus.IDLE)
  const [generateWalletHash] = useGenerateWalletHash()
  const [verifyWalletOwnership] = useVerifyWalletOwnership()
  const [makeWithdrawalAddress] = useMakeWithdrawalAddress()
  const { account, library } = useWeb3React()

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
        const message = stringToHex(walletHash)
        const signedHash = await library.send('personal_sign', [
          message,
          address
        ])
        const verifyOwnershipResponse = await verifyWalletOwnership({
          walletAddress: address,
          signedHash
        })

        if (verifyOwnershipResponse?.data?.isVerified ?? false) {
          const response = await makeWithdrawalAddress(values)

          if (response?.status < 400) {
            setStatus(WalletConnectionStatus.SUCCESS)
          } else {
            setStatus(WalletConnectionStatus.ERROR)
          }
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
