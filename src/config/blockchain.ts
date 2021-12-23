import AlgorandIcon from 'assets/images/algorand.png'
import EthereumIcon from 'assets/images/ethereum.png'
import HederaIcon from 'assets/images/hedera.png'
import TezosIcon from 'assets/images/tezos.png'
import MetamaskIcon from 'assets/images/metamask.png'
import TempleIcon from 'assets/images/temple.png'
import MyAlgoIcon from 'assets/images/myalgo.png'
import HBarIcon from 'assets/images/hbar.png'

export enum BlockchainWallet {
  Metamask = 'METAMASK',
  Algorand = 'MYALGO',
  Temple = 'TEMPLE',
  Hedera = 'HBAR'
}

export const blockchainWalletIcons = {
  [BlockchainWallet.Metamask]: MetamaskIcon,
  [BlockchainWallet.Algorand]: MyAlgoIcon,
  [BlockchainWallet.Temple]: TempleIcon,
  [BlockchainWallet.Hedera]: HBarIcon
}

export const networkIconMap = {
  ETH: EthereumIcon,
  XTZ: TezosIcon,
  HBAR: HederaIcon,
  ALGO: AlgorandIcon
}
