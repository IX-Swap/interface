import { useQuery } from '@tanstack/react-query'
import { GraphQLArgs } from '@ixswap1/dex-v2-sdk'
import { useMemo } from 'react'

import { poolsStoreService } from 'services/pool/pools-store.service'
import { Pool } from 'services/pool/types'
import { tokensListExclBpt, tokenTreeLeafs } from 'state/dexV2/pool/usePoolHelpers'
import { PoolDecorator } from 'services/pool/decorators/pool.decorator'
import PoolRepository from 'services/pool/pool.repository'
import { POOLS } from 'constants/dexV2/pools'
import QUERY_KEYS from 'constants/dexV2/queryKeys'
import { configService } from 'services/config/config.service'
import { useTokens } from 'state/dexV2/tokens/hooks/useTokens'

export default function usePoolQuery(id: string, isEnabled: boolean = true, options: any = {}) {
  /**
   * If pool is already downloaded, we can use it instantly
   * it may be if user came to pool page from home page
   */
  const poolInfo = poolsStoreService.findPool(id)

  /**
   * COMPOSABLES
   */
  const { injectTokens, tokens } = useTokens()

  const poolRepository = new PoolRepository(tokens)

  /**
   * COMPUTED
   */
  const enabled = useMemo(() => isEnabled, [isEnabled])

  /**
   * METHODS
   */

  function getQueryArgs(): GraphQLArgs {
    const queryArgs: GraphQLArgs = {
      chainId: configService.network.chainId,
      where: {
        id: { eq: id?.toLowerCase() },
        totalShares: { gt: -1 }, // Avoid the filtering for low liquidity pools
        poolType: { in: POOLS.IncludedPoolTypes },
      },
    }
    return queryArgs
  }

  /**
   * QUERY INPUTS
   */
  const queryKey = QUERY_KEYS.Pools.Current(id)

  const queryFn = async () => {
    let pool: Pool
    if (poolInfo) {
      pool = poolInfo
    } else {
      pool = await poolRepository.fetch(getQueryArgs())
    }

    if (!pool) throw new Error('Pool does not exist')

    // If the pool is cached from homepage it may not have onchain set, so update it
    if (!pool.onchain) {
      const poolDecorator = new PoolDecorator([pool])
      ;[pool] = await poolDecorator.decorate(tokens, false)
    }

    // Inject pool tokens into token registry
    injectTokens([
      ...tokensListExclBpt(pool),
      ...tokenTreeLeafs(pool.tokens),
      pool.address, // We need to inject pool addresses so we can fetch a user's balance for that pool.
    ])

    return pool
  }

  const queryOptions = {
    enabled,
    placeholderData: true,
    refetchOnWindowFocus: false,
    ...options,
  }

  // @ts-ignore
  return useQuery<Pool>({ queryKey, queryFn, ...queryOptions })
}
