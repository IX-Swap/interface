import AlgorandIcon from 'assets/images/algorand.png'
import EthereumIcon from 'assets/images/ethereum.png'
import HederaIcon from 'assets/images/hedera.png'
import TezosIcon from 'assets/images/tezos.png'
import MetamaskIcon from 'assets/images/metamask.png'

export enum BlockchainWallet {
  Metamask = 'METAMASK'
}

export const blockchainWalletIcons = {
  [BlockchainWallet.Metamask]: MetamaskIcon
}

export const networkIconMap = {
  ETH: EthereumIcon,
  XTZ: TezosIcon,
  HBAR: HederaIcon,
  ALGO: AlgorandIcon
}
