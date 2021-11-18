import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { useGenerateWalletHash } from './useGenerateWalletHash'
import { useVerifyWalletOwnership } from './useVerifyWalletOwnership'
import { useServices } from 'hooks/useServices'

export enum WalletConnectionStatus {
  IDLE,
  INITIALISING,
  VERIFYING,
  SUCCESS
}

export function useConnectMetamaskWallet() {
  const { snackbarService, web3Service } = useServices()
  const [status, setStatus] = useState(WalletConnectionStatus.IDLE)
  const { setValue, watch } = useFormContext<WithdrawalAddressFormValues>()
  const [generateWalletHash] = useGenerateWalletHash()
  const [verifyWalletOwnership] = useVerifyWalletOwnership()

  const address = watch('address')

  const signWallet = async () => {
    setStatus(WalletConnectionStatus.VERIFYING)

    try {
      const generateWalletHashResponse = await generateWalletHash({
        walletAddress: address
      })
      const walletHash = generateWalletHashResponse?.data

      if (walletHash !== undefined) {
        const signedHash = await web3Service.signWallet(walletHash, address)
        const verifyOwnershipResponse = await verifyWalletOwnership({
          walletAddress: address,
          signedHash
        })

        if (verifyOwnershipResponse?.data?.isVerified ?? false) {
          setStatus(WalletConnectionStatus.SUCCESS)
        } else {
          snackbarService.showSnackbar('Failed to sign the wallet', 'error')
        }
      }
    } catch (error) {
      snackbarService.showSnackbar((error as Error).message, 'error')
      setStatus(WalletConnectionStatus.IDLE)
    }
  }

  const getAccount = async () => {
    setStatus(WalletConnectionStatus.INITIALISING)

    try {
      const account = await web3Service.getAccount()
      setValue('address', account)
    } catch (error) {
      snackbarService.showSnackbar((error as Error).message, 'error')
    } finally {
      setStatus(WalletConnectionStatus.IDLE)
    }
  }

  return {
    status,
    getAccount,
    generateWalletHash,
    signWallet
  }
}
