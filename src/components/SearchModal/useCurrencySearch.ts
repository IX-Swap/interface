import { Currency, Ether, Token } from '@ixswap1/sdk-core'
import useDebounce from 'hooks/useDebounce'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactGA from 'react-ga'
import { VariableSizeList } from 'react-window'
import {
  useAllTokens,
  useIsUserAddedToken,
  useOnlySecurityTokens,
  useOnlyUserSecurityTokens,
  useSearchInactiveTokenLists,
  useToken,
} from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { isAddress } from '../../utils'
import { filterTokens, useSortedTokensByQuery } from './filtering'
import { useTokenComparator } from './sorting'

export enum ListType {
  ALL,
  SEC_TOKENS,
  USER_TOKENS,
}
export const useCurrencySearch = (list = ListType.ALL) => {
  const { chainId } = useActiveWeb3React()
  // refs for fixed size lists
  const listRef = useRef<VariableSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)
  const simpleTokensAndSecTokens = useAllTokens()
  const secTokens = useOnlySecurityTokens()
  const userSecTokens = useOnlyUserSecurityTokens()
  const tokenType = {
    [ListType.SEC_TOKENS]: secTokens,
    [ListType.USER_TOKENS]: userSecTokens,
    [ListType.ALL]: simpleTokensAndSecTokens,
  }
  const allTokens = tokenType[list] ?? simpleTokensAndSecTokens
  // if they input an address, use it
  const isAddressSearch = isAddress(debouncedQuery)

  const searchToken = useToken(debouncedQuery)

  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch,
      })
    }
  }, [isAddressSearch])

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const ether = useMemo(() => chainId && Ether.onChain(chainId), [chainId])

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens
    }
    return filteredSortedTokens
  }, [debouncedQuery, ether, filteredSortedTokens])

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    listRef.current?.scrollTo(0)
  }, [])

  // menu ui
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined
  )
  return {
    searchQuery,
    setSearchQuery,
    inputRef,
    handleInput,
    debouncedQuery,
    ether,
    chainId,
    searchTokenIsAdded,
    searchToken,
    filteredSortedTokens,
    filteredInactiveTokens,
    filteredSortedTokensWithETH,
    listRef,
  }
}
