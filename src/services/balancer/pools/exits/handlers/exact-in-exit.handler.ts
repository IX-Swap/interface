import { getBalancerSDK } from 'dependencies/balancer-sdk'
import { Pool } from 'services/pool/types'
import { BalancerSDK, PoolWithMethods } from '@ixswap1/dex-v2-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { AmountsOut, ExitParams, ExitPoolHandler, QueryOutput } from './exit-pool.handler'
import { formatFixed, parseFixed } from '@ethersproject/bignumber'
import { formatAddressForSor, indexOfAddress, isSameAddress, removeAddress, selectByAddress } from 'lib/utils'
import { TransactionBuilder } from 'services/web3/transactions/transaction.builder'
import { TokenInfo } from 'types/TokenList'
import { flatTokenTree } from 'hooks/dex-v2/usePoolHelpers'
import { getAddress } from '@ethersproject/address'
import { NATIVE_ASSET_ADDRESS } from 'constants/dexV2/tokens'

export type ExitExactInResponse = ReturnType<PoolWithMethods['buildExitExactBPTIn']>

/**
 * Handles cases where BPT in is set for the exit using SDK's
 * buildExitExactBPTIn function.
 */
export class ExactInExitHandler implements ExitPoolHandler {
  private lastExitRes?: ExitExactInResponse

  constructor(public readonly pool: Pool, public readonly sdk: BalancerSDK) {}

  async exit(params: ExitParams): Promise<TransactionResponse> {
    await this.queryExit(params)

    if (!this.lastExitRes) throw new Error('Failed to construct exit.')

    const txBuilder = new TransactionBuilder(params.signer)
    const { to, data } = this.lastExitRes

    return txBuilder.raw.sendTransaction({ to, data })
  }

  async queryExit(params: ExitParams): Promise<QueryOutput> {
    const { signer, tokenInfo, bptIn, slippageBsp, amountsOut } = params
    const exiter = await signer.getAddress()
    const slippage = slippageBsp.toString()
    const sdkPool = await getBalancerSDK().pools.find(this.pool.id)
    const tokenOut: any = selectByAddress(tokenInfo, amountsOut[0].address)

    if (!sdkPool) throw new Error('Failed to find pool: ' + this.pool.id)
    if (!tokenOut)
      throw new Error(
        'Could not find exit token in pool tokens list: ' +
          amountsOut[0].address +
          ' allTokens: ' +
          JSON.stringify(Object.keys(tokenInfo))
      )

    const isSingleTokenExit = amountsOut.length === 1
    const evmBptIn = parseFixed(bptIn, 18).toString()
    const tokenOutAddressForSor = formatAddressForSor(tokenOut.address)
    const singleTokenMaxOutAddress = isSingleTokenExit ? tokenOutAddressForSor : undefined
    const shouldUnwrapNativeAsset = isSameAddress(tokenOut.address, NATIVE_ASSET_ADDRESS)

    this.lastExitRes = await sdkPool.buildExitExactBPTIn(
      exiter,
      evmBptIn,
      slippage,
      shouldUnwrapNativeAsset,
      // TODO: singleTokenMaxOutAddress address format. SDK fix?
      singleTokenMaxOutAddress?.toLowerCase()
    )

    if (!this.lastExitRes) throw new Error('Failed to construct exit.')

    const tokensOut = removeAddress(this.pool.address, this.lastExitRes.attributes.exitPoolRequest.assets)
    const expectedAmountsOut = this.lastExitRes.expectedAmountsOut
    // Because this is an exit we need to pass amountsOut as the amountsIn and
    // bptIn as the minBptOut to this calcPriceImpact function.
    const evmPriceImpact = await sdkPool.calcPriceImpact(expectedAmountsOut, evmBptIn, false)
    const priceImpact = Number(formatFixed(evmPriceImpact, 18))

    if (isSingleTokenExit) {
      const tokenOutIndex = indexOfAddress(
        // Use token list from the pool to ensure we get the correct index
        tokensOut,
        tokenOutAddressForSor
      )
      const amountsOut = this.getSingleAmountOut(expectedAmountsOut, tokenOutIndex, tokenOut)
      return {
        amountsOut,
        priceImpact,
        txReady: true,
      }
    } else {
      const amountsOut = this.getAmountsOut(expectedAmountsOut, tokensOut)
      return {
        amountsOut,
        priceImpact,
        txReady: true,
      }
    }
  }

  private getSingleAmountOut(amountsOut: string[], tokenOutIndex: number, tokenOut: TokenInfo): AmountsOut {
    const amountOut = amountsOut[tokenOutIndex]
    const normalizedAmountOut = formatFixed(amountOut, tokenOut.decimals).toString()
    return {
      [tokenOut.address]: normalizedAmountOut,
    }
  }

  private getAmountsOut(expectedAmountsOut: string[], tokensOut: string[]): AmountsOut {
    const amountsOut: AmountsOut = {}
    const allPoolTokens = flatTokenTree(this.pool)

    expectedAmountsOut.forEach((amount, i) => {
      const token = allPoolTokens.find((poolToken) => isSameAddress(poolToken.address, tokensOut[i]))

      if (token) {
        const realAddress = getAddress(token.address)
        const scaledAmount = formatFixed(amount, token.decimals ?? 18).toString()
        amountsOut[realAddress] = scaledAmount
      }
    })

    return amountsOut
  }
}
