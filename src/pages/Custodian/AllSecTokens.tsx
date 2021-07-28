import { t, Trans } from '@lingui/macro'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import Column from 'components/Column'
import { RowCenter } from 'components/Row'
import { PaddedColumn, SearchInput } from 'components/SearchModal/styleds'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import useTheme from 'hooks/useTheme'
import React, { RefObject, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import SecTokensList from './SecTokensList'

export const AllSecTokens = () => {
  const listRef = useRef<FixedSizeList>()
  const { searchQuery, inputRef, handleInput, filteredSortedTokens, filteredInactiveTokens } = useCurrencySearch({
    listRef,
    list: ListType.OTHER,
  })
  const theme = useTheme()
  return (
    <>
      <PaddedColumn gap="16px">
        <RowCenter>
          <Box maxWidth="475px">
            <SearchInput
              type="text"
              id="token-search-input"
              placeholder={t`Search or paste address`}
              autoComplete="off"
              value={searchQuery}
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
            />
          </Box>
        </RowCenter>
      </PaddedColumn>

      <TopStraightBackgroundWrapper>
        {filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <div style={{ flex: '1 1 auto', height: '400px' }}>
            <AutoSizer disableWidth>
              {({ height }) => <SecTokensList height={height} currencies={filteredSortedTokens} listRef={listRef} />}
            </AutoSizer>
          </div>
        ) : (
          <Column style={{ padding: '20px', height: '100%' }}>
            <TYPE.main color={theme.text2} textAlign="center" mb="20px">
              <Trans>No results found.</Trans>
            </TYPE.main>
          </Column>
        )}
      </TopStraightBackgroundWrapper>
    </>
  )
}
