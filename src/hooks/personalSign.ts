import store from 'state'
import { setPendingSign } from 'state/application/actions'
import { useSignMessage as useSignMessageWagmi } from 'wagmi'

interface SignMessageProps {
  hash: string
  account: string
}

// Custom hook for signing messages
export const useSignMessage = () => {
  const { signMessageAsync } = useSignMessageWagmi()

  const signMessage = async ({ hash, account }: SignMessageProps): Promise<string | null> => {
    if (hash && account) {
      try {
        store.dispatch(setPendingSign(true))
        const result = await signMessageAsync({ message: { raw: hash as any } })
        store.dispatch(setPendingSign(false))
        return result
      } catch (e) {
        store.dispatch(setPendingSign(false))
        console.error({ ERROR: e })
        return null
      }
    }
    return null
  }

  return { signMessage }
}
