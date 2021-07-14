import { Web3Provider } from '@ethersproject/providers'

interface Props {
  hash?: string
  account?: string | null
  library?: Web3Provider
}
export const sign = async ({ hash, account, library }: Props) => {
  if (library && library.provider.isMetaMask && library.provider.request && hash) {
    try {
      const result = await library.provider.request({
        method: 'personal_sign',
        params: [hash, account],
      })
      console.log({ result })
      return result
    } catch (e) {
      console.error({ ERROR: e })
    }
  }
  return null
}
