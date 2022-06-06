import { isEmptyString } from 'helpers/strings'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useEffect, useState } from 'react'

export enum AccountState {
  NOT_CONNECTED,
  DIFFERENT_CHAIN,
  SAME_CHAIN
}

interface MetamaskWalletStateArgs {
  tokenChainId?: number
}
export const useMetamaskWalletState = ({
  tokenChainId
}: MetamaskWalletStateArgs) => {
  const [accountState, setAccountState] = useState(AccountState.NOT_CONNECTED)
  const { chainId, account } = useActiveWeb3React()

  useEffect(() => {
    if (isEmptyString(account)) {
      if (accountState !== AccountState.NOT_CONNECTED) {
        setAccountState(AccountState.NOT_CONNECTED)
      }
    } else if (
      chainId !== undefined &&
      tokenChainId !== undefined &&
      !(tokenChainId === chainId)
    ) {
      if (accountState !== AccountState.DIFFERENT_CHAIN) {
        setAccountState(AccountState.DIFFERENT_CHAIN)
      }
    } else {
      if (accountState !== AccountState.SAME_CHAIN) {
        setAccountState(AccountState.SAME_CHAIN)
      }
    }
  }, [account, chainId, tokenChainId, accountState])
  return { accountState }
}
