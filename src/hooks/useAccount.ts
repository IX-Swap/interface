import { SupportedInterfaceChainId } from 'constants/chains'
import { useMemo } from 'react'
import { supportedChainId } from 'utils/supportedChainId'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { UseAccountReturnType as UseAccountReturnTypeWagmi, useAccount as useAccountWagmi, useChainId } from 'wagmi'

type ReplaceChainId<T> = T extends { chainId: number }
  ? Omit<T, 'chainId'> & { chainId: SupportedInterfaceChainId | undefined }
  : T extends { chainId: number | undefined }
  ? Omit<T, 'chainId'> & { chainId: SupportedInterfaceChainId | undefined }
  : T

type UseAccountReturnType = ReplaceChainId<UseAccountReturnTypeWagmi>

export function useAccount(): UseAccountReturnType {
  const { chainId, ...rest } = useAccountWagmi()
  const fallbackChainId = useChainId()

  return useMemo(
    () => ({
      ...rest,
      chainId: supportedChainId(chainId ?? fallbackChainId),
    }),
    [rest, supportedChainId]
  )
}
