import { Currency, Token } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'
import React, { KeyboardEvent, ReactNode, RefObject, useCallback, useEffect, useRef } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import { Box } from 'rebass'
import styled from 'styled-components/macro'
import { ReactComponent as Edit } from '../../assets/images/edit-circle.svg'
import { ButtonText, CloseIcon, TYPE } from '../../theme'
import Column from '../Column'
import Row, { RowBetween, RowFixed } from '../Row'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import ImportRow from './ImportRow'
import { PaddedColumn40, SearchInput } from './styleds'
import { ModalContentWrapper } from 'theme/components'
import { useCurrencySearch } from './useCurrencySearch'

const Footer = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: ${({ theme }) => theme.bgG7};
  border-top: 1px solid ${({ theme }) => theme.bg2};
`
const Title = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text1};
`

interface CurrencySearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showManageView: () => void
  showImportView: () => void
  setImportToken: (token: Token) => void
  title?: ReactNode
}

export function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  onDismiss,
  isOpen,
  showManageView,
  showImportView,
  setImportToken,
  title,
}: CurrencySearchProps) {
  const theme = useTheme()
  const listRef = useRef<VariableSizeList>()

  const {
    searchQuery,
    setSearchQuery,
    inputRef,
    debouncedQuery,
    handleInput,
    chainId,
    ether,
    searchTokenIsAdded,
    searchToken,
    filteredSortedTokens,
    filteredInactiveTokens,
    filteredSortedTokensWithETH,
  } = useCurrencySearch({ listRef })

  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen, setSearchQuery])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'eth' && ether) {
          handleCurrencySelect(ether)
        } else if (filteredSortedTokensWithETH.length > 0) {
          if (
            filteredSortedTokensWithETH[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokensWithETH.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokensWithETH[0])
          }
        }
      }
    },
    [debouncedQuery, ether, filteredSortedTokensWithETH, handleCurrencySelect]
  )

  return (
    <ModalContentWrapper style={{ borderRadius: '20px' }}>
      <PaddedColumn40 gap="16px">
        <RowBetween>
          <Title>{title ?? <Trans>Select a token to swap</Trans>}</Title>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        <Row>
          <SearchInput
            type="text"
            id="token-search-input"
            placeholder={t`Search or paste address`}
            autoComplete="off"
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
        </Row>
        {showCommonBases && (
          <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
        )}
      </PaddedColumn40>
      {searchToken && !searchTokenIsAdded ? (
        <Column style={{ padding: '20px 0', height: '100%' }}>
          <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
        </Column>
      ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
        <div style={{ flex: '1', paddingRight: '15px' }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <CurrencyList
                height={height}
                currencies={filteredSortedTokensWithETH}
                otherListTokens={filteredInactiveTokens}
                onCurrencySelect={handleCurrencySelect}
                otherCurrency={otherSelectedCurrency}
                selectedCurrency={selectedCurrency}
                listRef={listRef}
                showImportView={showImportView}
                setImportToken={setImportToken}
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
      <Footer style={{ marginTop: '5px' }}>
        <Row justify="center">
          <ButtonText
            onClick={showManageView}
            color={theme.text1}
            className="list-token-manage-button"
            data-testid="list-token-manage-button"
          >
            <RowFixed>
              <Box marginRight={'6px'} display="flex" justifyContent="center">
                <Edit />
              </Box>
              <Title>
                <Trans>Manage Token List</Trans>
              </Title>
            </RowFixed>
          </ButtonText>
        </Row>
      </Footer>
    </ModalContentWrapper>
  )
}
