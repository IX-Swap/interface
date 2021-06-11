import { GOVERNANCE_ADDRESS, TIMELOCK_ADDRESS, IXS_ADDRESS } from './addresses'

export const COMMON_CONTRACT_NAMES: { [chainId: number]: { [address: string]: string } } = {
  [1]: {
    [IXS_ADDRESS[1]]: 'IXS',
    [GOVERNANCE_ADDRESS[1]]: 'Governance',
    [TIMELOCK_ADDRESS[1]]: 'Timelock',
  },
  [4]: {
    [IXS_ADDRESS[4]]: 'Rinkeby IXS',
    [GOVERNANCE_ADDRESS[4]]: 'Rinkeby Governance',
    [TIMELOCK_ADDRESS[4]]: 'Rinkeby Timelock',
  },
  [3]: {
    [IXS_ADDRESS[3]]: 'Ropsten IXS',
    [GOVERNANCE_ADDRESS[3]]: 'Ropsten Governance',
    [TIMELOCK_ADDRESS[3]]: 'Ropsten Timelock',
  },
  [42]: {
    [IXS_ADDRESS[42]]: 'Kovan IXS',
    [GOVERNANCE_ADDRESS[42]]: 'Kovan Governance',
    [TIMELOCK_ADDRESS[42]]: 'Kovan Timelock',
  },
  [5]: {
    [IXS_ADDRESS[5]]: 'Goerli IXS',
    [GOVERNANCE_ADDRESS[5]]: 'Goerli Governance',
    [TIMELOCK_ADDRESS[5]]: 'Goerli Timelock',
  },
}

export const DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS = 13

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS: { [chainId: number]: number } = {
  [1]: DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS,
}
