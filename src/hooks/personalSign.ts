import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import store from 'state'
import { setPendingSign } from 'state/application/actions'
import { useSignMessage as useSignMessageWagmi, useSwitchChain } from 'wagmi'

interface SignMessageProps {
  hash: string
  account: string
}

// Custom hook for signing messages
export const useSignMessage = () => {
  const { signMessageAsync } = useSignMessageWagmi()
  const { switchChain } = useSwitchChain()

  const signMessage = async ({ hash, account }: SignMessageProps): Promise<string | null> => {
    if (hash && account) {
      try {
        store.dispatch(setPendingSign(true))
        const result = await signMessageAsync({ message: { raw: hash as any } })
        store.dispatch(setPendingSign(false))
        return result
      } catch (e: any) {
        store.dispatch(setPendingSign(false))
        console.error({ ERROR: e })
        if (e?.name === 'ConnectorChainMismatchError') {
          const defaultChain = ENV_SUPPORTED_TGE_CHAINS[0]
          await switchChain({ chainId: defaultChain })
          window.location.reload()
        }

        return null
      }
    }
    return null
  }

  return { signMessage }
}
