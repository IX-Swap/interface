import { Pool } from 'services/pool/types'
import { BalancerSDK, SimulationType } from '@ixswap1/dex-v2-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { JoinParams, JoinPoolHandler, QueryOutput } from './join-pool.handler'
import { formatFixed, parseFixed } from '@ethersproject/bignumber'
import { bnum, isSameAddress, selectByAddress } from 'lib/utils'
import { TransactionBuilder } from 'services/web3/transactions/transaction.builder'
import { configService } from 'services/config/config.service'
import { AddressZero } from '@ethersproject/constants'

type JoinResponse = Awaited<ReturnType<BalancerSDK['pools']['generalisedJoin']>>

/**
 * Handles generalized joins for deep pools using SDK functions.
 */
export class GeneralisedJoinHandler implements JoinPoolHandler {
  private lastJoinRes?: JoinResponse

  constructor(public readonly pool: Pool, public readonly sdk: BalancerSDK) {}

  async join(params: JoinParams): Promise<TransactionResponse> {
    await this.queryJoin(params)

    if (!this.lastJoinRes) {
      throw new Error('Could not query generalised join')
    }

    const txBuilder = new TransactionBuilder(params.signer)
    const { to, encodedCall, value } = this.lastJoinRes

    return txBuilder.raw.sendTransaction({ to, data: encodedCall, value })
  }

  async queryJoin({
    amountsIn,
    tokensIn,
    signer,
    slippageBsp,
    relayerSignature,
    approvalActions,
  }: JoinParams): Promise<QueryOutput> {
    const evmAmountsIn: string[] = amountsIn.map(({ address, value }) => {
      const token = selectByAddress(tokensIn, address)

      if (!token || !token.decimals) throw new Error(`Token metadata missing for: ${address}`)

      return parseFixed(value || '0', token.decimals).toString()
    })

    const tokenAddresses: string[] = amountsIn.map(({ address }) => this.formatTokenAddress(address))
    const signerAddress = await signer.getAddress()
    const slippage = slippageBsp.toString()
    const poolId = this.pool.id
    const hasInvalidAmounts = amountsIn.some((item) => !item.valid)

    const isNativeAssetJoin = amountsIn.some((item) =>
      isSameAddress(item.address, configService.network.nativeAsset.address)
    )

    // Static call simulation is more accurate than VaultModel, but requires relayer approval,
    // token approvals, and account to have enought token balance.
    const simulationType = this.getSimulationType({
      isNativeAssetJoin,
      hasInvalidAmounts,
      approvalActionsLength: approvalActions.length,
    })

    console.log({ simulationType })

    this.lastJoinRes = await this.sdk.pools.generalisedJoin(
      poolId,
      tokenAddresses,
      evmAmountsIn,
      signerAddress,
      slippage,
      signer,
      simulationType,
      relayerSignature
    )

    if (!this.lastJoinRes) {
      throw new Error('Failed to fetch expected output.')
    }

    const bptOut = formatFixed(this.lastJoinRes.expectedOut, this.pool.onchain?.decimals || 18)
    const priceImpact: number = bnum(formatFixed(this.lastJoinRes.priceImpact, 18)).toNumber()

    if (bnum(bptOut).eq(0)) throw new Error('Not enough liquidity.')
    return {
      bptOut,
      priceImpact,
    }
  }

  private getSimulationType({
    isNativeAssetJoin,
    hasInvalidAmounts,
    approvalActionsLength,
  }: {
    isNativeAssetJoin: boolean
    hasInvalidAmounts: boolean
    approvalActionsLength: number
  }): SimulationType {
    if (isNativeAssetJoin) {
      return SimulationType.VaultModel
    }
    if (!hasInvalidAmounts && !approvalActionsLength) {
      return SimulationType.Static
    }
    return SimulationType.VaultModel
  }

  /**
   * If native asset addres, replaces with zero address because the vault only checks
   * for the zero address when joining with native asset.
   */
  private formatTokenAddress(address: string): string {
    const { nativeAsset } = configService.network.tokens.Addresses

    if (isSameAddress(address, nativeAsset)) {
      return AddressZero
    }

    return address
  }
}
