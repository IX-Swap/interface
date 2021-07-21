import React, { useMemo } from 'react'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import SecurityCard from 'components/SecurityCard'
import { EmptyState } from './EmptyState'
import { useUserSecTokenLoading, useUserSecTokens } from 'state/user/hooks'
import { useActiveWeb3React } from 'hooks/web3'

export const MySecurities = () => {
  const { secTokens } = useUserSecTokens()
  const { account } = useActiveWeb3React()
  const loading = useUserSecTokenLoading()
  const showEmptyLiquidity = useMemo(() => {
    return Object.keys(secTokens).length === 0
  }, [secTokens])
  return (
    <>
      {(!account || loading || showEmptyLiquidity) && (
        <EmptyState hasAccount={!!account} loading={loading} showEmptyLiquidity={showEmptyLiquidity} />
      )}
      {!loading && !showEmptyLiquidity && (
        <TopStraightBackgroundWrapper>
          {Object.keys(secTokens).map((tokenAddress) => (
            <SecurityCard key={tokenAddress} currency={secTokens[tokenAddress]} />
          ))}
        </TopStraightBackgroundWrapper>
      )}
    </>
  )
}
