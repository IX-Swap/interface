import { AprBreakdown, PoolType } from '@ixswap1/dex-v2-sdk'
import { getAddress } from '@ethersproject/address'
import { cloneDeep, uniq, uniqWith } from 'lodash'

import { PoolToken, allLinearTypes, AnyPool, Pool, SubPool } from 'services/pool/types'
import useNumbers from './useNumbers'
import { useMemo } from 'react'
import { configService } from 'services/config/config.service'
import { isMainnet } from './useNetwork'
import { bnum, includesAddress, isSameAddress, removeAddress, selectByAddress } from 'lib/utils'

const POOLS = configService.network.pools

interface TokenTreeOpts {
  includeLinearUnwrapped?: boolean
  includePreMintedBpt?: boolean
}

export function isPreMintedBptType(poolType: PoolType): boolean {
  // Currently equivalent to isComposableStableLike but will be extended later
  // with managed and composable weighted pools.
  return isStablePhantom(poolType) || isComposableStable(poolType)
}

export function isLinear(poolType: PoolType): boolean {
  return allLinearTypes.includes(poolType)
}

export function wNativeAssetAddress() {
  return configService.network.tokens.Addresses.wNativeAsset
}

export function isWrappedNativeAsset(pool: AnyPool): boolean {
  return includesAddress(pool.tokensList || [], wNativeAssetAddress())
}

/**
 * Parse token tree and extract all token addresses.
 *
 * @param {PoolToken[]} tokenTree - A pool's token tree.
 * @param {TokenTreeOpts} options
 * @returns {string[]} Array of token addresses in tree.
 */
export function tokenTreeNodes(
  tokenTree: PoolToken[],
  options: TokenTreeOpts = { includeLinearUnwrapped: false }
): string[] {
  const addresses: string[] = []

  for (const token of tokenTree) {
    addresses.push(token.address)
    if (token.token?.pool?.tokens) {
      if (!options.includeLinearUnwrapped && isLinear(token.token.pool.poolType)) {
        addresses.push(token.token.pool.tokens[token.token.pool.mainIndex].address)
      } else {
        const nestedTokens = tokenTreeNodes(token.token.pool?.tokens, options)
        addresses.push(...nestedTokens)
      }
    }
  }

  return uniq(addresses)
}

/**
 * Parse token tree and extract all leaf token addresses.
 *
 * @param {PoolToken[]} tokenTree - A pool's token tree.
 * @param {TokenTreeOpts} options
 * @returns {string[]} Array of token addresses in tree.
 */
export function tokenTreeLeafs(
  tokenTree: PoolToken[],
  options: TokenTreeOpts = { includeLinearUnwrapped: false }
): string[] {
  const addresses: string[] = []

  for (const token of tokenTree) {
    if (token.token?.pool?.tokens) {
      if (!options.includeLinearUnwrapped && isLinear(token.token.pool.poolType)) {
        addresses.push(token.token.pool.tokens[token.token.pool.mainIndex].address)
      } else {
        const nestedTokens = tokenTreeLeafs(token.token.pool.tokens, options)
        addresses.push(...removeAddress(token.address, nestedTokens))
      }
    } else if (!token.token?.pool?.poolType) {
      addresses.push(token.address)
    }
  }

  return uniq(addresses)
}

export function isStable(poolType: PoolType): boolean {
  return poolType === PoolType.Stable
}

export function isMetaStable(poolType: PoolType): boolean {
  return poolType === PoolType.MetaStable
}

export function isStablePhantom(poolType: PoolType): boolean {
  return poolType === PoolType.StablePhantom
}

export function isComposableStable(poolType: PoolType): boolean {
  return poolType === PoolType.ComposableStable
}

export function isFx(poolType: PoolType | string): boolean {
  return poolType === 'FX'
}

export function isWeighted(poolType: PoolType): boolean {
  return poolType === PoolType.Weighted
}

export function isManaged(poolType: PoolType): boolean {
  // Correct terminology is managed pools but subgraph still returns poolType = "Investment"
  return poolType === PoolType.Investment
}

export function isLiquidityBootstrapping(poolType: PoolType): boolean {
  return poolType === PoolType.LiquidityBootstrapping
}

export function isWeightedLike(poolType: PoolType): boolean {
  return isWeighted(poolType) || isManaged(poolType) || isLiquidityBootstrapping(poolType)
}

export function isStableLike(poolType: PoolType): boolean {
  return (
    isStable(poolType) ||
    isMetaStable(poolType) ||
    isStablePhantom(poolType) ||
    isComposableStable(poolType) ||
    isFx(poolType)
  )
}

export function isComposableStableLike(poolType: PoolType): boolean {
  return isStablePhantom(poolType) || isComposableStable(poolType)
}

export function isSwappingHaltable(poolType: PoolType): boolean {
  return isManaged(poolType) || isLiquidityBootstrapping(poolType)
}

/**
 * Checks if the pool is to be considered 'deep'. Deep pools are pools that the
 * UI treats differently because it understands that it contains nested pools.
 * This is used to enable the generalised deep pool join/exit flow for example.
 */
export function isDeep(pool: Pool): boolean {
  return configService.network.pools.Deep.includes(pool.id)
}

/**
 * Gets all pool token addresses that can possibly be used to join a pool.
 *
 * @param {Pool} pool - The pool to check
 * @returns {string[]} The addresses of the tokens that can be used to join the pool
 */
export function joinTokens(pool: Pool): string[] {
  let addresses: string[] = []

  addresses = isDeep(pool) ? tokenTreeNodes(pool.tokens) : pool.tokensList

  return removeAddress(pool.address, addresses)
}

export function orderByWeight<T extends { weight?: string | null }>(tokens: T[]): T[] {
  return tokens.slice().sort((a, b) => parseFloat(b.weight || '0') - parseFloat(a.weight || '0'))
}

/**
 * Get all unique token tree tokens as flat array.
 *
 * @param {PoolToken[]} tokenTree - A pool's token tree.
 * @param {TokenTreeOpts} options
 * @returns {PoolToken[]} Flat array of tokens in tree.
 */
export function flatTokenTree(
  pool: Pool | SubPool,
  options: TokenTreeOpts = {
    includeLinearUnwrapped: false,
    includePreMintedBpt: false,
  }
): PoolToken[] {
  const tokens: PoolToken[] = []

  const nestedTokens = pool?.tokens || []

  nestedTokens.forEach((token) => {
    if (!isSameAddress(pool.address, token.address)) {
      tokens.push(token)
    }

    if (token.token?.pool?.tokens) {
      if (!options.includeLinearUnwrapped && isLinear(token.token.pool.poolType)) {
        tokens.push(token.token.pool.tokens[token.token.pool.mainIndex])
      } else {
        const nestedTokens = flatTokenTree(token.token.pool, options)
        tokens.push(...nestedTokens)
      }
    }
  })

  // Avoid duplicated tokens with the same address
  return uniqWith(tokens, (token1, token2) => isSameAddress(token1.address, token2.address))
}

/**
 * @summary Orders pool tokens by weight if weighted pool
 */
export function orderedPoolTokens(pool: Pool, tokens: PoolToken[]): PoolToken[] {
  if (isDeep(pool)) {
    const leafs = tokenTreeLeafs(tokens)
    const flatTokens = flatTokenTree(pool)
    return flatTokens.filter((token) => includesAddress(leafs, token.address))
  } else if (isComposableStable(pool.poolType) || isLinear(pool.poolType)) {
    return tokens.filter((token) => !isSameAddress(token.address, pool.address))
  } else if (isStableLike(pool.poolType)) return tokens

  return orderByWeight(tokens)
}

/**
 * @summary Orders pool token addresses by weight if weighted pool
 * @returns Array of checksum addresses
 */
export function orderedTokenAddresses(pool: AnyPool): string[] {
  const sortedTokens = orderedPoolTokens(pool, pool.tokens);
  return sortedTokens.map(token => getAddress(token?.address || ''));
}

export function isMigratablePool(pool: AnyPool) {
  return !!POOLS.Migrations?.[pool.id];
}

export function noInitLiquidity(pool: AnyPool): boolean {
  // Uncomment to DEBUG
  // if (
  //   pool.id ===
  //   '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014'
  // )
  //   return true;
  return bnum(pool?.totalShares || '0').eq(0);
}

export function usePoolHelpers(pool: AnyPool | undefined) {
  const { fNum } = useNumbers()

  /**
   * Returns pool weights label
   */
  function poolWeightsLabel(pool: Pool): string {
    if (!pool?.onchain?.tokens) return ''

    if (isStableLike(pool.poolType)) {
      return Object.values(pool.onchain.tokens)
        .map((token) => token.symbol)
        .join(', ')
    }

    return Object.values(pool.onchain.tokens)
      .map(
        (token) =>
          `${fNum(token.weight, {
            style: 'percent',
            maximumFractionDigits: 0,
          })} ${token.symbol}`
      )
      .join(', ')
  }

  /**
   * COMPUTED
   */
  const isStablePool = useMemo((): boolean => !!pool && isStable(pool.poolType), [JSON.stringify(pool)])
  const isMetaStablePool = useMemo((): boolean => !!pool && isMetaStable(pool.poolType), [JSON.stringify(pool)])
  const isStablePhantomPool = useMemo((): boolean => !!pool && isStablePhantom(pool.poolType), [JSON.stringify(pool)])
  const isComposableStablePool = useMemo(
    (): boolean => !!pool && isComposableStable(pool.poolType),
    [JSON.stringify(pool)]
  )
  const isDeepPool = useMemo((): boolean => !!pool && isDeep(pool), [JSON.stringify(pool)])
  const isShallowComposableStablePool = useMemo(
    (): boolean => isComposableStablePool && !isDeepPool,
    [isComposableStablePool, isDeepPool]
  )
  const isStableLikePool = useMemo((): boolean => !!pool && isStableLike(pool.poolType), [JSON.stringify(pool)])
  const isComposableStableLikePool = useMemo(
    (): boolean => !!pool && isComposableStableLike(pool.poolType),
    [JSON.stringify(pool)]
  )
  const isPreMintedBptPool = useMemo((): boolean => !!pool && isPreMintedBptType(pool.poolType), [JSON.stringify(pool)])
  const isWeightedPool = useMemo((): boolean => !!pool && isWeighted(pool.poolType), [JSON.stringify(pool)])
  const isWeightedLikePool = useMemo((): boolean => !!pool && isWeightedLike(pool.poolType), [JSON.stringify(pool)])
  const isManagedPool = useMemo((): boolean => !!pool && isManaged(pool.poolType), [JSON.stringify(pool)])
  const isLiquidityBootstrappingPool = useMemo(
    (): boolean => !!pool && isLiquidityBootstrapping(pool.poolType),
    [JSON.stringify(pool)]
  )
  const managedPoolWithSwappingHalted = useMemo(
    (): boolean => !!pool && isManagedPool && !pool.onchain?.swapEnabled,
    [JSON.stringify(pool)]
  )
  const isWrappedNativeAssetPool = useMemo((): boolean => !!pool && isWrappedNativeAsset(pool), [JSON.stringify(pool)])
  const poolJoinTokens = useMemo((): string[] => (pool ? joinTokens(pool) : []), [JSON.stringify(pool)])

  // pool is "Weighted" and some of the rate providers are not on our approved list
  const hasNonApprovedRateProviders = useMemo(
    () =>
      pool &&
      isWeighted(pool.poolType) &&
      !pool?.priceRateProviders?.every(
        (provider) =>
          configService.network.rateProviders['*'][provider.address] ||
          configService.network.rateProviders[provider.token?.address]?.[provider.address]
      ),
    [JSON.stringify(pool)]
  )

  const isDeprecatedPool = useMemo(() => {
    return !!pool && !!POOLS.Deprecated?.[pool.id]
  }, [JSON.stringify(pool)])

  const isNewPoolAvailable = useMemo(() => {
    return !!pool && !!POOLS.NewVersionAvailable?.[pool.id]
  }, [JSON.stringify(pool)])

  return {
    // computed
    isStablePool,
    isMetaStablePool,
    isStablePhantomPool,
    isComposableStablePool,
    isStableLikePool,
    isComposableStableLikePool,
    isPreMintedBptPool,
    isDeepPool,
    isShallowComposableStablePool,
    isWeightedPool,
    isWeightedLikePool,
    isManagedPool,
    isLiquidityBootstrappingPool,
    managedPoolWithSwappingHalted,
    isWrappedNativeAssetPool,
    hasNonApprovedRateProviders,
    isDeprecatedPool,
    isNewPoolAvailable,
    poolJoinTokens,
    // methods
    isStable,
    isMetaStable,
    isStablePhantom,
    isStableLike,
    isWeighted,
    isLiquidityBootstrapping,
    isWeightedLike,
    isSwappingHaltable,
    isPreMintedBptType,
    isWrappedNativeAsset,
    noInitLiquidity,
    isMigratablePool,
    poolWeightsLabel,
    orderedTokenAddresses,
    orderedPoolTokens,
    joinTokens,
  }
}
