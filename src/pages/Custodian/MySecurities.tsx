import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { useUserSecTokenLoading } from 'state/user/hooks'
import { EmptyState } from './EmptyState'
import SecTokensList from './SecTokensList'

export const MySecurities = () => {
  const { account } = useActiveWeb3React()
  const loading = useUserSecTokenLoading()

  const listRef = useRef<FixedSizeList>()
  const { filteredSortedTokens } = useCurrencySearch({
    listRef,
    list: ListType.USER_TOKENS,
  })
  const showEmptyLiquidity = useMemo(() => {
    return filteredSortedTokens.length === 0
  }, [filteredSortedTokens])
  return (
    <>
      {(!account || loading || showEmptyLiquidity) && (
        <EmptyState hasAccount={!!account} loading={loading} showEmptyLiquidity={showEmptyLiquidity} />
      )}
      {!loading && !showEmptyLiquidity && (
        <TopStraightBackgroundWrapper>
          <div style={{ flex: '1 1 auto', height: '400px' }}>
            <AutoSizer disableWidth>
              {({ height }) => <SecTokensList height={height} currencies={filteredSortedTokens} listRef={listRef} />}
            </AutoSizer>
          </div>
        </TopStraightBackgroundWrapper>
      )}
    </>
  )
}
