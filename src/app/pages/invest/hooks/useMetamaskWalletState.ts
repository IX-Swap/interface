import { isEmptyString } from 'helpers/strings'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useEffect, useState } from 'react'

export enum AccountState {
  NOT_CONNECTED,
  DIFFERENT_CHAIN,
  SAME_CHAIN
}

interface MetamaskWalletStateArgs {
  dsoChainId?: number
}
export const useMetamaskWalletState = ({
  dsoChainId
}: MetamaskWalletStateArgs) => {
  const [accountState, setAccountState] = useState(AccountState.NOT_CONNECTED)
  const { chainId, account } = useActiveWeb3React()

  useEffect(() => {
    if (isEmptyString(account)) {
      if (accountState !== AccountState.NOT_CONNECTED) {
        setAccountState(AccountState.NOT_CONNECTED)
      }
    } else if (!(dsoChainId === chainId)) {
      if (accountState !== AccountState.DIFFERENT_CHAIN) {
        setAccountState(AccountState.DIFFERENT_CHAIN)
      }
    } else {
      if (accountState !== AccountState.SAME_CHAIN) {
        setAccountState(AccountState.SAME_CHAIN)
      }
    }
  }, [account, chainId, dsoChainId, accountState])
  return { accountState }
}
