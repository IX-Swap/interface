const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
  80001: 'mumbai.',
  137: '',
}
const CHAIN_EXPLORERS: { [chainId: number]: string } = {
  1: 'etherscan.io',
  3: 'etherscan.io',
  4: 'etherscan.io',
  5: 'etherscan.io',
  42: 'etherscan.io',
  80001: 'polygonscan.com',
  137: 'polygonscan.com',
}

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}${CHAIN_EXPLORERS[chainId] ?? ''}`

  switch (type) {
    case ExplorerDataType.TRANSACTION: {
      return `${prefix}/tx/${data}`
    }
    case ExplorerDataType.TOKEN: {
      return `${prefix}/token/${data}`
    }
    case ExplorerDataType.BLOCK: {
      return `${prefix}/block/${data}`
    }
    case ExplorerDataType.ADDRESS:
    default: {
      return `${prefix}/address/${data}`
    }
  }
}
