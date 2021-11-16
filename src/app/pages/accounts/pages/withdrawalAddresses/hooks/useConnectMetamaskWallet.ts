import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ethereumService } from 'services/ethereum'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { useGenerateWalletHash } from './useGenerateWalletHash'
import { useVerifyWalletOwnership } from './useVerifyWalletOwnership'

export enum WalletConnectionStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export function useConnectMetamaskWallet() {
  const [status, setStatus] = useState(WalletConnectionStatus.IDLE)
  const { setValue, watch } = useFormContext<WithdrawalAddressFormValues>()
  const [generateWalletHash] = useGenerateWalletHash()
  const [verifyWalletOwnership] = useVerifyWalletOwnership()

  const address = watch('address')

  const signWallet = async () => {
    try {
      const generateWalletHashResponse = await generateWalletHash({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        walletAddress: address
      })
      const walletHash = generateWalletHashResponse?.data

      if (walletHash !== undefined) {
        const signedHash = await ethereumService.signWallet(walletHash, address)
        const verifyOwnershipResponse = await verifyWalletOwnership({
          walletAddress: address,
          signedHash
        })

        if (verifyOwnershipResponse?.data?.isVerified ?? false) {
          setStatus(WalletConnectionStatus.SUCCESS)
        } else {
          setStatus(WalletConnectionStatus.ERROR)
        }
      }
    } catch (error) {
      setStatus(WalletConnectionStatus.ERROR)
    }
  }

  const getAccount = async () => {
    setStatus(WalletConnectionStatus.LOADING)

    let account: string

    try {
      account = await ethereumService.getAccount()
      setValue('address', account)
      setStatus(WalletConnectionStatus.IDLE)
    } catch (e) {
      alert((e as Error)?.message)
      setStatus(WalletConnectionStatus.ERROR)
    }
  }

  return {
    status,
    getAccount,
    generateWalletHash,
    signWallet
  }
}
