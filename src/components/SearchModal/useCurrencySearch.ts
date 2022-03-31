import { Currency, Ether, Token } from '@ixswap1/sdk-core'
import useDebounce from 'hooks/useDebounce'
import { useNativeCurrency } from 'hooks/useNativeCurrency'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useToggle from 'hooks/useToggle'
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactGA from 'react-ga'
import { FixedSizeList, VariableSizeList } from 'react-window'
import {
  useAllTokens,
  useIsUserAddedToken,
  useOnlySecurityTokens,
  useOnlyUnOwnedSecurityTokens,
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
  OTHER,
}
export const useCurrencySearch = ({
  listRef,
  list = ListType.ALL,
}: {
  listRef?: MutableRefObject<FixedSizeList | VariableSizeList | undefined>
  list?: ListType
}) => {
  const { chainId } = useActiveWeb3React()
  // refs for fixed size lists
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)
  const simpleTokensAndSecTokens = useAllTokens()
  const secTokens = useOnlySecurityTokens()
  const userSecTokens = useOnlyUserSecurityTokens()
  const nonOwnedSecTokens = useOnlyUnOwnedSecurityTokens()
  const tokenType = {
    [ListType.SEC_TOKENS]: secTokens,
    [ListType.USER_TOKENS]: userSecTokens,
    [ListType.ALL]: simpleTokensAndSecTokens,
    [ListType.OTHER]: nonOwnedSecTokens,
  }
  const allTokens = tokenType[list] ?? simpleTokensAndSecTokens
  // if they input an address, use it
  const isAddressSearch = isAddress(debouncedQuery)

  const searchToken = useToken(debouncedQuery)

  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const native = useNativeCurrency()

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

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    if (!native) return filteredSortedTokens

    const s = debouncedQuery.toLowerCase().trim()
    if (native.symbol?.toLowerCase()?.indexOf(s) !== -1) {
      return native ? [native, ...filteredSortedTokens] : filteredSortedTokens
    }
    return filteredSortedTokens
  }, [debouncedQuery, native, filteredSortedTokens])

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const checksummedInput = isAddress(input)
      setSearchQuery(checksummedInput || input)
      listRef?.current?.scrollTo(0)
    },
    [listRef]
  )

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
    native,
    chainId,
    searchTokenIsAdded,
    searchToken,
    filteredSortedTokens,
    filteredInactiveTokens,
    filteredSortedTokensWithETH,
    listRef,
  }
}
