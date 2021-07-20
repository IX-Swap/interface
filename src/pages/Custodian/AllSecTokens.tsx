import { t, Trans } from '@lingui/macro'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import Column from 'components/Column'
import { RowCenter, RowStart } from 'components/Row'
import { PaddedColumn, SearchInput } from 'components/SearchModal/styleds'
import { useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import useTheme from 'hooks/useTheme'
import React, { RefObject } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import SecTokensList from './SecTokensList'

export const AllSecTokens = () => {
  const { searchQuery, inputRef, handleInput, filteredSortedTokens, filteredInactiveTokens, fixedList } =
    useCurrencySearch(true)
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
        <RowStart style={{ paddingLeft: '1.5rem', paddingRight: '1rem' }}>
          <TYPE.subHeader1 color={theme.text2}>
            <Trans>{filteredSortedTokens?.length} Security tokens</Trans>
          </TYPE.subHeader1>
        </RowStart>
        {filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <div style={{ flex: '1 1 auto', height: '400px' }}>
            <AutoSizer disableWidth>
              {({ height }) => (
                <SecTokensList
                  height={height}
                  currencies={filteredSortedTokens}
                  otherListTokens={filteredInactiveTokens}
                  fixedListRef={fixedList}
                />
              )}
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
