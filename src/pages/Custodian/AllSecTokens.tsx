import { t, Trans } from '@lingui/macro'
import Column, { AutoColumn } from 'components/Column'
import { RowCenter } from 'components/Row'
import { SearchInput } from 'components/SearchModal/styleds'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import useTheme from 'hooks/useTheme'
import React, { RefObject, useRef } from 'react'
import { FixedSizeList } from 'react-window'
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
      <AutoColumn style={{ padding: '0 20px 30px 0' }}>
        <RowCenter>
          <SearchInput
            type="text"
            id="token-search-input"
            placeholder={`Search or paste address`}
            autoComplete="off"
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
          />
        </RowCenter>
      </AutoColumn>

      <div>
        {filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <SecTokensList currencies={filteredSortedTokens} listRef={listRef} />
        ) : (
          <Column style={{ padding: '20px', height: '100%' }}>
            <TYPE.main color={theme.text2} textAlign="center" mb="20px">
              <Trans>No results found.</Trans>
            </TYPE.main>
          </Column>
        )}
      </div>
    </>
  )
}
