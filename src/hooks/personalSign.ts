import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import store from 'state'
import { setPendingSign } from 'state/application/actions'
import { useSignMessage as useSignMessageWagmi, useSwitchChain } from 'wagmi'
import { Web3Provider } from '@ethersproject/providers'
import { getSDKInstance } from 'components/Web3Provider/linenext-wallet'

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

interface Props {
  hash?: string
  account?: string | null
}
// specific function developed for Kaia - Linenext integration
export const kaiaLineSign = async ({ hash, account }: Props): Promise<string | null> => {
  if (hash && account) {
    try {
      const sdk = await getSDKInstance()

      const provider = sdk.getWalletProvider()
      store.dispatch(setPendingSign(true))

      const result = await provider.request({ method: 'kaia_signLegacy', params: [hash, account] })
      console.info('result', result)

      store.dispatch(setPendingSign(false))

      return ''
    } catch (e) {
      store.dispatch(setPendingSign(false))

      console.error({ ERROR: e })
    }
  }
  return null
}
