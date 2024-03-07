import { Web3Provider } from '@ethersproject/providers'
import store from 'state'
import { setPendingSign } from 'state/application/actions'

interface Props {
  hash?: string
  account?: string | null
  provider?: Web3Provider
}
export const sign = async ({ hash, account, provider }: Props) => {
  if (provider && hash && account) {
    try {
      store.dispatch(setPendingSign(true))

      const result = await provider.send('personal_sign', [hash, account])

      store.dispatch(setPendingSign(false))

      return result
    } catch (e) {
      store.dispatch(setPendingSign(false))

      console.error({ ERROR: e })
    }
  }
  return null
}

// const getLoginMessage = ({ hash, account }: { hash: string; account: string }) => {
//   return `
// Welcome to IX Swap!\n
// You need to sign in in order to access features related to security tokens.\n You only need to click "Sign".\n No username or password is needed. This request will not cost any gas fees.\n By signing in you agree to IXSwap’s Terms and Conditions (https://ixswap.io/terms-and-conditions/),
// and acknowledge that you have read and understood the IX Swap Privacy Policy (https://ixswap.io/privacy-policy/).\n
// Wallet Address:
// \t${account} \n
// Hash:
// \t${hash} \n
// To the moon!
// `
// }
