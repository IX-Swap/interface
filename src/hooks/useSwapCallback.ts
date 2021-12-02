import { BigNumber } from '@ethersproject/bignumber'
import { Currency, Percent, TradeType } from '@ixswap1/sdk-core'
import { Pair, Router, Trade as V2Trade, TradeAuthorization } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import { useCallback, useMemo } from 'react'
import { useSecTokens } from 'state/secTokens/hooks'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useAuthorizationsState, useSwapSecPairs } from 'state/swapHelper/hooks'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useTransactionAdder } from '../state/transactions/hooks'
import { isAddress, shortenAddress } from '../utils'
import approveAmountCalldata from '../utils/approveAmountCalldata'
import isZero from '../utils/isZero'
import { useArgentWalletContract } from './useArgentWalletContract'
import { useSwapRouterContract } from './useContract'
import useENS from './useENS'
import useTransactionDeadline from './useTransactionDeadline'
import { useActiveWeb3React } from './web3'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

const EMPTY_AUTHORIZATION: TradeAuthorization = {
  operator: '0x0000000000000000000000000000000000000000',
  deadline: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  v: '0x0000000000000000000000000000000000000000000000000000000000000000',
  r: '0x0000000000000000000000000000000000000000000000000000000000000000',
  s: '0x0000000000000000000000000000000000000000000000000000000000000000',
}

interface SwapCall {
  address: string
  calldata: string
  value: string
}

interface SwapCallEstimate {
  call: SwapCall
}

interface SuccessfulCall extends SwapCallEstimate {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall extends SwapCallEstimate {
  call: SwapCall
  error: Error
}
export function getTokenToPairMap(pairs: Array<Pair | null>) {
  const tokenToPairMap = pairs.reduce((previous, current) => {
    const newMap: { [key: string]: string } = {}
    const token0 = current?.token0
    const token1 = current?.token1
    const pairAddress = current?.liquidityToken.address
    if (token0 && pairAddress) {
      const address = (token0 as any)?.tokenInfo?.address as string
      newMap[address] = pairAddress
    }
    if (token1 && pairAddress) {
      const address = (token1 as any)?.tokenInfo?.address as string
      newMap[address] = pairAddress
    }
    return { ...previous, ...newMap }
  }, {} as { [key: string]: string })
  return tokenToPairMap
}

export function useMissingAuthorizations(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const addresses = useSwapSecTokenAddresses(trade)
  const authorizations = useAuthorizationsState()
  const { secPairs: pairs } = useSwapSecPairs(trade)
  return useMemo(() => {
    const tokenToPairMap = getTokenToPairMap(pairs)
    const missingAddress = addresses.filter((address) => address !== null && !authorizations?.[tokenToPairMap[address]])
    return missingAddress
  }, [addresses, authorizations, pairs])
}

export function useAuthorizationDigest(
  trade: V2Trade<Currency, Currency, TradeType> | undefined
): Array<TradeAuthorization> | undefined {
  const authorizations = useAuthorizationsState()
  const addresses = useSwapSecTokenAddresses(trade)
  const { secPairs: pairs } = useSwapSecPairs(trade)
  const authorizationDigest: Array<TradeAuthorization> | undefined = useMemo(() => {
    if (!addresses || addresses.length === 0) {
      return undefined
    }
    const tokenToPairMap = getTokenToPairMap(pairs)
    return addresses.map((address) => {
      const addressAuthorization = address && authorizations ? authorizations[tokenToPairMap[address]] : null
      if (!addressAuthorization) {
        return EMPTY_AUTHORIZATION
      }
      return {
        v: addressAuthorization?.v,
        r: addressAuthorization.r,
        operator: addressAuthorization.operator,
        s: addressAuthorization.s,
        deadline: addressAuthorization.deadline,
      }
    })
  }, [addresses, authorizations, pairs])

  return authorizationDigest
}

// returns an array in the form of [address, null, etc] only sec tokens have an address
export function useSwapSecTokenAddresses(trade: V2Trade<Currency, Currency, TradeType> | undefined | null) {
  const { secTokens } = useSecTokens()
  return useMemo(() => {
    const tokens = []
    const tokenPath = trade?.route?.path
    if (tokenPath) {
      for (const index of tokenPath.keys()) {
        const token = tokenPath[index]
        const isFirstOrLast = index === 0 || index === tokenPath.length - 1
        const isSecToken = Boolean(secTokens[token.address])
        if (isSecToken && isFirstOrLast) {
          tokens.push(token.address)
        } else {
          tokens.push(null)
        }
      }
    }
    return tokens
  }, [trade?.route?.path, secTokens])
}
/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
function useSwapCallArguments(
  trade: V2Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): () => Promise<SwapCall[]> {
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()
  const routerContract = useSwapRouterContract()
  const argentWalletContract = useArgentWalletContract()
  // rewrite deadline here use the same value
  const authorizationDigest = useAuthorizationDigest(trade)
  const { shouldGetAuthorization } = useDerivedSwapInfo()
  return useCallback(async () => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return []
    if (!routerContract) return []
    if (shouldGetAuthorization) {
      return []
    }
    const swapMethods = []
    const options = {
      feeOnTransfer: false,
      allowedSlippage,
      recipient,
      deadline: deadline.toNumber(),
      authorizationDigest: (authorizationDigest as any) ?? undefined,
    }
    swapMethods.push(Router.swapCallParameters(trade, options))

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage,
          recipient,
          deadline: deadline.toNumber(),
          // typing to any because AuthorizationDigest does not accept null but it should
          authorizationDigest: (authorizationDigest as any) || undefined,
        })
      )
    }
    return swapMethods.map(({ methodName, args, value }) => {
      console.log({ methodName, args, value })
      if (argentWalletContract && trade.inputAmount.currency.isToken) {
        return {
          address: argentWalletContract.address,
          calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
            [
              approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address),
              {
                to: routerContract.address,
                value: value,
                data: routerContract.interface.encodeFunctionData(methodName, args),
              },
            ],
          ]),
          value: '0x0',
        }
      } else {
        return {
          address: routerContract.address,
          calldata: routerContract.interface.encodeFunctionData(methodName, args),
          value,
        }
      }
    })
  }, [
    account,
    allowedSlippage,
    argentWalletContract,
    chainId,
    deadline,
    library,
    recipient,
    routerContract,
    trade,
    authorizationDigest,
    shouldGetAuthorization,
  ])
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
export function swapErrorToUserReadableMessage(error: any): string {
  let reason: string | undefined
  while (Boolean(error)) {
    reason = error.reason ?? error.message ?? reason
    error = error.error ?? error.data?.originalError
  }

  if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substr('execution reverted: '.length)
  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return t`The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.`
    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return t`This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.`
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return t`The input token cannot be transferred. There may be an issue with the input token.`
    case 'UniswapV2: TRANSFER_FAILED':
      return t`The output token cannot be transferred. There may be an issue with the output token.`
    case 'UniswapV2: K':
      return t`The IXswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.`
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return t`This transaction will not succeed due to price movement. Try increasing your slippage tolerance.`
    case 'TF':
      return t`The output token cannot be transferred. There may be an issue with the output token.`
    default:
      if (reason?.indexOf('undefined is not an object') !== -1) {
        console.error(error, reason)
        return t`An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading.`
      }
      return t`Unknown error${reason ? `: "${reason}"` : ''}. Try increasing your slippage tolerance.`
  }
}

export function useSwapCallbackError(
  trade: V2Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): { state: SwapCallbackState; error: string | null } {
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return { state: SwapCallbackState.INVALID, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, error: 'Invalid recipient' }
      } else {
        return { state: SwapCallbackState.LOADING, error: null }
      }
    }

    return {
      state: SwapCallbackState.VALID,
      error: null,
    }
  }, [trade, library, account, chainId, recipient, recipientAddressOrName])
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: V2Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): () => Promise<{ callback: null | (() => Promise<string>) }> {
  const { account, chainId, library } = useActiveWeb3React()
  const getSwapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  return useCallback(async () => {
    if (!trade || !library || !account || !chainId) {
      return { callback: null }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { callback: null }
      } else {
        return { callback: null }
      }
    }
    const swapCalls = await getSwapCalls()
    return {
      callback: async function onSwap(): Promise<string> {
        const estimatedCalls: SwapCallEstimate[] = await Promise.all(
          swapCalls.map((call) => {
            const { address, calldata, value } = call
            const tx =
              !value || isZero(value)
                ? { from: account, to: address, data: calldata }
                : {
                    from: account,
                    to: address,
                    data: calldata,
                    value,
                  }
            return library
              .estimateGas(tx)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                }
              })
              .catch((gasError) => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                return library
                  .call(tx)
                  .then((result) => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                  })
                  .catch((callError) => {
                    console.debug('Call threw error', call, callError)
                    return { call, error: new Error(swapErrorToUserReadableMessage(callError)) }
                  })
              })
          })
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | SwapCallEstimate | undefined = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
        )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          const firstNoErrorCall = estimatedCalls.find<SwapCallEstimate>(
            (call): call is SwapCallEstimate => !('error' in call)
          )
          if (!firstNoErrorCall) throw new Error('Unexpected error. Could not estimate gas for the swap.')
          bestCallOption = firstNoErrorCall
        }

        const {
          call: { address, calldata, value },
        } = bestCallOption

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...('gasEstimate' in bestCallOption ? { gasLimit: 9000000 } : {}),
            ...(value && !isZero(value) ? { value } : {}),
          })
          .then((response) => {
            const inputSymbol = trade.inputAmount.currency.symbol
            const outputSymbol = trade.outputAmount.currency.symbol
            const inputAmount = trade.inputAmount.toSignificant(4)
            const outputAmount = trade.outputAmount.toSignificant(4)

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`

            const withVersion = `${withRecipient}`

            addTransaction(response, {
              summary: withVersion,
            })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, address, calldata, value)
              throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`)
            }
          })
      },
    }
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, getSwapCalls, addTransaction])
}
