import { Web3Provider } from '@ethersproject/providers'

interface Props {
  hash?: string
  account?: string | null
  library?: Web3Provider
}
export const sign = async ({ hash, account, library }: Props) => {
  if (library && library.provider.isMetaMask && library.provider.request && hash && account) {
    try {
      const message = getLoginMessage({ hash, account })
      const result = await library.provider.request({
        method: 'personal_sign',
        params: [message, account],
      })
      return result
    } catch (e) {
      console.error({ ERROR: e })
    }
  }
  return null
}

const getLoginMessage = ({ hash, account }: { hash: string; account: string }) => {
  return `
Welcome to IXSwap!\n
You need to sign in in order to access features related to security tokens.\n You only need to click "Sign".\n No username or password is needed. This request will not cost any gas fees.\n By signing in you agree to IXSwap’s Terms and Conditions (https://ixswap.io/terms-and-conditions/),
and acknowledge that you have read and understood the IXSwap Privacy Policy (https://ixswap.io/privacy-policy/).\n
Wallet Address:
\t${account} \n
Hash:
\t${hash} \n
To the moon!
`
}
