import { WalletModalContext } from 'components/WalletModal/WalletModalContextWrapper'
import { CHAIN_INFO } from 'config/blockchain/constants'
import useSwitchChain from 'hooks/blockchain/useSwitchChain'
import { useContext } from 'react'
import { usePairTokenAddressNetwork } from './usePairTokenAddressNetwork'
import { useMetamaskWalletState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import { useWithdrawalAddressAdded } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { useActiveWeb3React } from 'hooks/blockchain/web3'

export const useMetamaskConnectionManager = () => {
  const { chainId: tokenChainId } = usePairTokenAddressNetwork()
  const { account } = useActiveWeb3React()
  const isWhitelisted = useWithdrawalAddressAdded(account)
  const { accountState } = useMetamaskWalletState({ tokenChainId })
  const context = useContext(WalletModalContext)
  const chainInfo =
    tokenChainId !== null && tokenChainId !== undefined
      ? CHAIN_INFO[tokenChainId]
      : null
  const { switchChain } = useSwitchChain()
  return {
    connectCallback: context?.toggleModal,
    switchChain,
    accountState,
    targetChainName: chainInfo?.chainName,
    isWhitelisted
  }
}
