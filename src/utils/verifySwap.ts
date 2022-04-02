/* eslint-disable @typescript-eslint/no-var-requires */
import { FACTORY_ROUTER_ADDRESS } from 'constants/addresses'
import { BigNumber, utils } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { Contract } from 'web3-eth-contract'

// import Web3 from 'web3'
// const contract = require('truffle-contract')
const Web3Global = require('web3')

class Web3 {
  getUrl(chainId: number): any {
    const networkNames = {
      '1': 'homestead',
      '42': 'kovan',
      '137': 'matic',
      '80001': 'maticmum',
    } as Record<string, string>

    let host = ''
    switch (networkNames[chainId.toString()]) {
      case 'homestead':
        host = 'mainnet.infura.io'
        break
      case 'kovan':
        host = 'kovan.infura.io'
        break
      case 'matic':
        host = 'polygon-mainnet.infura.io'
        break
      case 'maticmum':
        host = 'polygon-mumbai.infura.io'
        break
      default:
        break
    }

    return new Web3Global(`https://${host}/v3/${process.env.REACT_APP_INFURA_KEY}`)
  }
}

// export const account = web3.eth.accounts.porivateKeyToAccunt('your private key here')
// export const PRIVATE_ADDRESS = web3.eth.accounts.privateKeyToAccount('your private key here')

// abis
let PERIPHERY_LP_ABI = require('abis/IxsV2LiquidityRouter.json')
PERIPHERY_LP_ABI = PERIPHERY_LP_ABI.abi

let SWAP_ROUTER_ABI = require('abis/IxsV2SwapRouter.json')
SWAP_ROUTER_ABI = SWAP_ROUTER_ABI.abi

let FACTORY_ABI = require('abis/IxsV2Factory.json')
FACTORY_ABI = FACTORY_ABI.abi

let PAIR_ABI = require('abis/IxsV2Pair.json')
PAIR_ABI = PAIR_ABI.abi

let ERC20_FAUCET_ABI = require('abis/Erc20Custom.json')
ERC20_FAUCET_ABI = ERC20_FAUCET_ABI.abi

class Swap {
  /*
  For verification required token0 and token1 addresses, amount in for both tokens, amount out for both tokens, to address, slope
  */
  id: string
  amount0In: BigNumber
  amount1In: BigNumber
  amount0Out: BigNumber
  amount1Out: BigNumber
  oracleAmount0Out?: BigNumber
  oracleAmount1Out?: BigNumber
  sender: string
  to: string
  slope: number
  chainId: number

  constructor(
    id: string,
    amount0In: BigNumber,
    amount1In: BigNumber,
    amount0Out: BigNumber,
    amount1Out: BigNumber,
    sender: string,
    to: string,
    slope: number,
    chainId: number
  ) {
    this.id = id
    this.amount0In = amount0In
    this.amount1In = amount1In
    this.amount0Out = amount0Out
    this.amount1Out = amount1Out
    this.sender = sender
    this.to = to
    this.slope = slope
    this.chainId = chainId
  }
}

class Pool {
  //  tokens addresses and pair address
  token0: string
  token1: string
  pair: string

  //  reserves
  reserve0?: BigNumber
  reserve1?: BigNumber

  //  fee rate and isSecurity flag
  systemFeeRate: BigNumber

  //  flags to check if pool is security and if token0 or token1 are the security ones
  isSecurityPool?: boolean
  isToken0Sec?: boolean
  isToken1Sec?: boolean
  chainId: number

  //  flag if pool can be consulted with Oracle
  isConsultable?: boolean

  //  formula coefficient
  kLast: BigNumber

  //  flag defining if mitigation is enabled
  isMitigationEnabled: boolean

  //  constants for performing square root calculation
  ONE: BigNumber = BigNumber.from(1)
  TWO: BigNumber = BigNumber.from(2)

  //  threshold of acceptable difference between transaction out value and Oracle out value
  priceToleranceThreshold: BigNumber
  poolContract: Contract

  /**
   * Make a pool entity that will perform all verifications and contain important data
   * @param token0 address of the first token
   * @param token1 address of the second token
   * @param pair pair address
   * @param kLast last known K-coefficient value
   * @param isMitigationEnabled true if mitigation is enabled, false if not
   * @param priceToleranceThreshold threshold of acceptable difference between transaction out value and Oracle value
   * @param poolContract contract attached to this pool (to request reserves and some inner info)
   * @param systemFeeRate fee rate of the system attached to the pool
   */
  constructor(
    token0: string,
    token1: string,
    pair: string,
    kLast: BigNumber,
    isMitigationEnabled: boolean,
    priceToleranceThreshold: BigNumber,
    poolContract: Contract,
    systemFeeRate: BigNumber,
    isSecurityPool: boolean,
    chainId: number
  ) {
    //  attach all addresses
    this.token0 = token0
    this.token1 = token1
    this.pair = pair

    //  attach contract, request if pool is security one, get latest known reserves
    this.poolContract = poolContract
    this.isSecurityPool = isSecurityPool
    if (!isSecurityPool) {
      this.checkIfSecurity()
    }

    this.updateReserves()

    //  get latest k-coefficient value, mitigation status, tolerance threshold
    this.kLast = kLast
    this.isMitigationEnabled = isMitigationEnabled
    this.priceToleranceThreshold = priceToleranceThreshold
    this.systemFeeRate = systemFeeRate
    this.chainId = chainId

    // ! IMPORTANT: make sure that there will be boolean value at moment, not 'promise' one
    if (this.isSecurityPool) {
      this.checkIfToken0Sec()
      this.checkIfToken1Sec()
    }
  }

  /**
   * verify out values, slippage, liquidity and mitigation check of the swap transaction
   * @param transaction swap transaction verification of which is required
   * @param contract
   * @param isSecurity check if a
   */

  async verifySwap(transaction: Swap, isSecurity: boolean) {
    if (!this.chainId) return
    //  request last known reserves, check if Oracle can be consulted

    const web3 = new Web3().getUrl(this.chainId)

    const FACTORY = web3.utils.toChecksumAddress(FACTORY_ROUTER_ADDRESS[this.chainId])
    const FACTORY_CONTRACT = new web3.eth.Contract(FACTORY_ABI, FACTORY) //  contract to consult oracle

    const isMitigationEnabledLocally = await this.poolContract.methods.mitigationEnabled().call()
    if (!isMitigationEnabledLocally) return

    transaction.oracleAmount1Out = BigNumber.from(0)
    transaction.oracleAmount0Out = BigNumber.from(0)

    await this.updateReserves()

    const canConsult = await this.canConsultOracle(FACTORY_CONTRACT) //(FACTORY_CONTRACT)
    if (canConsult) {
      await this.consultOracle(FACTORY_CONTRACT, transaction) //(FACTORY_CONTRACT)
    }

    //  perform initial tranasaction values verification and slippage check
    this.verifyOutValues(transaction)
    // this.verifySlippage(transaction) //need disc

    // //  add incoming values to reserves and extract all outcoming values
    // const balance0 = this.reserve0?.add(transaction.amount0In)?.sub(transaction.amount0Out)
    // const balance1 = this.reserve1?.add(transaction.amount1In)?.sub(transaction.amount1Out)

    //  multiply balances by given factor, if security then sub 1%, otherwise sub 0.3%
    // const balance0Adjusted = balance0?.sub(transaction.amount0In.mul(isSecurity ? 10 : 3))
    // const balance1Adjusted = balance1?.sub(transaction.amount1In.mul(isSecurity ? 10 : 3))
    //const balance1Adjusted = balance1?.mul(1000).sub(transaction.amount0In.mul(isSecurity ? 10 : 3))
    //  check values not to break k-coefficient rule
    // if (!(balance0Adjusted && balance1Adjusted && this.kLast.lt(balance0Adjusted.mul(balance1Adjusted)))) {
    //   throw new Error(`Invalid pool price`)
    // }

    // //  find current out values with system fees
    // var amount0OutWithSystemFee: BigNumber = transaction.amount0Out.add(transaction.amount0Out.mul(this.systemFeeRate).
    //                                                                 div(1000))
    // var amount1OutWithSystemFee: BigNumber = transaction.amount1Out.add(transaction.amount1Out.mul(this.systemFeeRate).
    //                                                                 div(1000))

    //  find current out values with system fees
    const amount0OutWithSystemFee: BigNumber = this.isToken0Sec
      ? transaction.amount0Out
      : transaction.amount0Out.add(transaction.amount0Out.mul(this.systemFeeRate).div(1000))
    const amount1OutWithSystemFee: BigNumber = this.isToken1Sec
      ? transaction.amount1Out
      : transaction.amount1Out.add(transaction.amount1Out.mul(this.systemFeeRate).div(1000))

    //  ensure that reserves are bigger than out values
    if (!this.reserve0?.gt(amount0OutWithSystemFee)) {
      throw new Error('Reserve has insufficient liquidity')
    }

    if (!this.reserve1?.gt(amount1OutWithSystemFee)) {
      throw new Error('Reserve has insufficient liquidity')
    }

    //  set final reserves value by extracting out value with fees
    // const reserve0Final = this.reserve0?.sub(amount0OutWithSystemFee)
    // const reserve1Final = this.reserve1?.sub(amount1OutWithSystemFee)

    /*  perform mitigation check if such property is attached to the current pool and 
    it is possible to consult Oracle at the moment */
    // if (this.isMitigationEnabled && this.isConsultable && reserve0Final && reserve1Final) {
    //   this.verifyMitigation(transaction, reserve0Final, reserve1Final)
    // }
  }

  /**
   * update current pool reserves via requesting current reserves values through contract
   */
  async updateReserves() {
    const record = await this.poolContract.methods.getReserves().call()
    this.reserve0 = BigNumber.from(record['_reserve0'])
    this.reserve1 = BigNumber.from(record['_reserve1'])
  }

  /**
   * ! IMPORTANT: set Oracle responses to the specified variables of amount0Out and amount1Out
   * get Oracle estimated out values (only for those that have not-zero in values)
   * @param contract factory contract to perform request to Oracle
   * @param transaction swap transaction for which it is required to perform check
   */
  async consultOracle(contract: Contract, transaction: Swap) {
    if (transaction.amount0In.gt(0)) {
      const response = await contract.methods.oracleConsult(this.token0, transaction.amount0In, this.token1).call()
      transaction.oracleAmount1Out = BigNumber.from(response)
    } else {
      transaction.oracleAmount1Out = BigNumber.from(0)
    }
    if (transaction.amount1In.gt(0)) {
      const response = await contract.methods.oracleConsult(this.token1, transaction.amount1In, this.token0).call()
      transaction.oracleAmount0Out = BigNumber.from(response)
    } else {
      transaction.oracleAmount0Out = BigNumber.from(0)
    }
  }

  /**
   * request via contract if it is possible to consult Oracle, set response to inner flag
   * @param contract factory contract for performing Oracle request
   */
  async canConsultOracle(contract: Contract) {
    const response = await contract.methods.oracleCanConsult(this.token0, this.token1).call()
    this.isConsultable = response
    return response
  }

  /**
   * Check if current pool is the security one
   * @param contract pool contract to request if it is security
   */
  async checkIfSecurity() {
    const response = await this.poolContract.methods.isSecurityPool().call()
    this.isSecurityPool = response
  }

  /**
   * check if token 0 is a security one
   */
  async checkIfToken0Sec() {
    const response = await this.poolContract.methods.isToken0Sec().call()
    this.isToken0Sec = response
  }

  /**
   * check if token 1 is a security one
   */
  async checkIfToken1Sec() {
    const response = await this.poolContract.methods.isToken1Sec().call()
    this.isToken1Sec = response
  }

  /**
   * check if out values are valid
   * @param transaction swap-operation values of which is required to verify
   */
  verifyOutValues(transaction: Swap) {
    if (!(transaction.amount0Out.gt(0) || transaction.amount1Out.gt(0))) {
      throw new Error(`Transaction has insufficient output amount`)
    }

    if (
      !(
        this.reserve0 &&
        this.reserve1 &&
        transaction.amount0Out.lt(this.reserve0) &&
        transaction.amount1Out.lt(this.reserve1)
      )
    ) {
      throw new Error(`Reserve has insufficient liquidity`)
    }

    if (!(transaction.to != this.token0 && transaction.to != this.token1)) {
      throw new Error(`Invalid sender address`)
    }
  }

  /**
   * check transaction slippage
   * @param transaction swap transaction that requires verification
   */
  verifySlippage(transaction: Swap) {
    //  calculate values with fees
    const amount0InWithFee: BigNumber = transaction.amount0In.mul(this.isSecurityPool ? 990 : 997)
    const amount1InWithFee: BigNumber = transaction.amount1In.mul(this.isSecurityPool ? 990 : 997)

    if (!this.reserve0 || !this.reserve1) {
      throw new Error('Reserves not provided')
    }

    const amount0OutMin: BigNumber = amount1InWithFee
      .mul(this.reserve0.mul(BigNumber.from(1000).sub(utils.parseUnits(`${transaction.slope}`))))
      .div(this.reserve1.mul(1000).mul(1000).add(amount0InWithFee))

    const amount1OutMin: BigNumber = amount0InWithFee
      .mul(this.reserve1.mul(BigNumber.from(1000).sub(utils.parseUnits(`${transaction.slope}`))))
      .div(this.reserve0.mul(1000).mul(1000).add(amount1InWithFee))

    if (!(transaction.amount0Out.lt(amount0OutMin) || transaction.amount0Out.eq(amount0OutMin))) {
      throw new Error(`Max slippage exceeded`)
    }

    if (!(transaction.amount1Out.lt(amount1OutMin) || transaction.amount1Out.eq(amount1OutMin))) {
      throw new Error(`Max slippage exceeded`)
    }
  }

  /**
   * perform transaction mitigation verification
   * @param transaction swap operation to check
   * @param reserve0Final token 0 final reserve after extracting out value with fee
   * @param reserve1Final token 1 final reserve after extracting out value with fee
   */
  verifyMitigation(transaction: Swap, reserve0Final: BigNumber, reserve1Final: BigNumber) {
    if (!transaction.oracleAmount0Out || !transaction.oracleAmount1Out) {
      throw new Error()
    }

    //  find slice factors
    const sliceFactor0: BigNumber = this.calculateSliceFactor(reserve0Final, transaction.amount0Out)
    const sliceFactor1: BigNumber = this.calculateSliceFactor(reserve1Final, transaction.amount1Out)

    //  set difference between out values and oracle estimations, check them to be bigger or equal to 0
    const out0AmountDiff: BigNumber = this.estimateAmountDifference(
      transaction.oracleAmount0Out,
      transaction.amount0Out
    )
    const out1AmountDiff: BigNumber = this.estimateAmountDifference(
      transaction.oracleAmount1Out,
      transaction.amount1Out
    )
    if (!(out0AmountDiff.gte(0) || transaction.amount1In.eq(0))) {
      throw new Error(`Out value is smaller or equal to zero`)
    }

    if (!(out1AmountDiff.gte(0) || transaction.amount0In.eq(0))) {
      throw new Error(`Out value is smaller or equal to zero`)
    }

    //  find slice factor curve for each token

    //const testSliceFactor1 = BigNumber.from('101')

    let sliceFactor0Curve: BigNumber = sliceFactor0.mul(this.sqrt(sliceFactor0))
    let sliceFactor1Curve: BigNumber = sliceFactor1.mul(this.sqrt(sliceFactor1))
    sliceFactor0Curve = sliceFactor0Curve.gt(this.priceToleranceThreshold)
      ? this.priceToleranceThreshold
      : sliceFactor0Curve
    sliceFactor1Curve = sliceFactor1Curve.gt(this.priceToleranceThreshold)
      ? this.priceToleranceThreshold
      : sliceFactor1Curve
    /*  transaction is valid if transaction out value has acceptable difference from Oracle estimation
    or other side incoming value is 0 (therefore, out value will be 0)  */
    if (!(out0AmountDiff.lt(BigNumber.from(100).sub(sliceFactor0Curve)) || transaction.amount1In.eq(0))) {
      // throw new Error(`Mitigation0 ${transaction.id}: OUT_VALUE_TOO_FAR_FROM_ORACLE`)
      throw new Error(`Out value too far from Oracle`)
    }

    if (!(out1AmountDiff.lt(BigNumber.from(100).sub(sliceFactor1Curve)) || transaction.amount0In.eq(0))) {
      // throw new Error(`Mitigation1 ${transaction.id}: OUT_VALUE_TOO_FAR_FROM_ORACLE`)
      throw new Error(`Out value too far from Oracle`)
    }
  }

  /**
   * find a slice factor for token considering current reserves and transaction out value
   * @param reserve token reserve
   * @param transactionOutAmount transaction out value for respective token
   * @returns slice factor
   */
  calculateSliceFactor(reserve: BigNumber, transactionOutAmount: BigNumber): BigNumber {
    if (reserve.gt(transactionOutAmount)) {
      return BigNumber.from(100).sub(BigNumber.from(100).mul(reserve.sub(transactionOutAmount)).div(reserve))
    } else {
      return BigNumber.from(100)
    }
  }

  /**
   * find difference between Oracle and transaction out values
   * @param oracleAmountOut Oracle estimated out value
   * @param transactionAmountOut transaction estimated out value
   * @returns amount difference between Oracle and transaction estimations
   */
  estimateAmountDifference(oracleAmountOut: BigNumber, transactionAmountOut: BigNumber): BigNumber {
    if (oracleAmountOut.eq(transactionAmountOut)) {
      return BigNumber.from(0)
    } else {
      const biggerAmount: BigNumber = this.max(transactionAmountOut, oracleAmountOut)
      const smallerAmount: BigNumber = this.min(transactionAmountOut, oracleAmountOut)
      return BigNumber.from(1000).mul(biggerAmount.sub(smallerAmount)).div(biggerAmount.add(smallerAmount).div(2))
    }
  }

  /**
   * get smallest number out of two given
   * @param first first number
   * @param second second number
   * @returns smallest of two numbers
   */
  min(first: BigNumber, second: BigNumber): BigNumber {
    return first.lt(second) ? first : second
  }

  /**
   * get biggest number out of two given
   * @param first first number
   * @param second second number
   * @returns biggest of two numbers
   */
  max(first: BigNumber, second: BigNumber): BigNumber {
    return first.gt(second) ? first : second
  }

  /**
   * calculate square root of given BigNumber
   * @param value value for which square root is required to find
   * @returns square root of given BigNumber
   */
  sqrt(value: BigNumber): BigNumber {
    const x: BigNumber = value
    let z: BigNumber = x.add(this.ONE).div(this.TWO)
    let y: BigNumber = x

    while (z.sub(y).lt(0)) {
      //  check value not to be negative
      y = z
      z = x.div(z).add(z).div(this.TWO)
    }
    return y
  }
}

interface VerifyOptions {
  tokenFrom: string
  tokenTo: string

  pair: string

  kLast: string | BigNumber

  priceToleranceThreshold: BigNumber
  systemFeeRate: BigNumber

  id: string

  amountInFrom: BigNumber
  amountInTo: BigNumber

  amountOutFrom: BigNumber
  amountOutTo: BigNumber

  sender: string
  receiver: string

  slope: number

  isSecurity: boolean
  pairAddress: string
  chainId: number

  //isToken0Sec: boolean
  //isToken1Sec: boolean
}

export async function verifySwap(options: VerifyOptions) {
  const web3 = new Web3().getUrl(options.chainId)

  const poolAddress = web3.utils.toChecksumAddress(options.pairAddress)

  const WETH_IDAI_CONTRACT2 = new web3.eth.Contract(PAIR_ABI, poolAddress)
  //const FACTORY_CONTRACT2 = new web3.eth.Contract(FACTORY_ABI, poolAddress)

  const pool = new Pool(
    options.tokenFrom,
    options.tokenTo,
    options.pair,

    typeof options.kLast === 'string' ? BigNumber.from(options.kLast) : options.kLast,
    true,

    options.priceToleranceThreshold,
    WETH_IDAI_CONTRACT2,
    options.systemFeeRate,
    options.isSecurity,
    options.chainId
  )

  const transaction = new Swap(
    options.id,
    options.amountInFrom,
    options.amountInTo,
    options.amountOutFrom,
    options.amountOutTo,
    options.sender,
    options.receiver,
    0.05,
    options.chainId
  )

  await pool.verifySwap(transaction, options.isSecurity)
}

// const pool: Pool = new Pool(
//   '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
//   '0x992A460e0ef16b94118a98ADEE14C72e6A9aA34F',
//   '0xf60D483d820c063BC9AfcA8558aAfd5b3051A9d9',
//   BigNumber.from('400000000000000000'),
//   true,
//   BigNumber.from(1),
//   WETH_IDAI_CONTRACT,
//   BigNumber.from(10)
// ) // information about WETH-DAI pool

// //  check if Oracle can be consulted
// pool.canConsultOracle(FACTORY_CONTRACT)
// console.log(pool.isConsultable) //  can consult requires time and therefore may give 'undefined'
// pool.checkIfToken0Sec()
// pool.checkIfToken1Sec()
// var transaction: Swap = new Swap('alskjdh', BigNumber.from(1), BigNumber.from(0), BigNumber.from(0), BigNumber.from(1), 'someone', 'another person', 0.05)
// pool.consultOracle(FACTORY_CONTRACT, transaction)
