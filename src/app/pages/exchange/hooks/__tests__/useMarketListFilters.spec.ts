import { act, renderHook } from '@testing-library/react-hooks'
import { BaseProviders, waitFor } from 'test-utils'
import useMarketListFilters from '../useMarketListFilters'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { PairFilter } from 'hooks/types'

describe('useMarketListFilters', () => {
  const initialFilterValues = {
    listingKeyword: undefined,
    isFavorite: undefined,
    currency: undefined,
    sortBy: undefined,
    orderBy: undefined
  }
  const filterValuesOnAll = {
    listingKeyword: '',
    isFavorite: false,
    currency: PairFilter.ALL,
    sortBy: '',
    orderBy: ''
  }
  const filterValuesOnSearch = {
    listingKeyword: 'US',
    isFavorite: false,
    currency: '',
    sortBy: '',
    orderBy: ''
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct filter object when filters are not enabled', async () => {
    await act(async () => {
      const { result } = renderHook(() => useMarketListFilters(), {
        wrapper: BaseProviders
      })
      await waitFor(() => {
        expect(result.current).toEqual(initialFilterValues)
      })
    })
  })

  it('returns correct filter object when ALL filter is enabled', async () => {
    const getFilterValueFn = jest.fn((param: string) => {
      switch (param) {
        case 'pairFilter':
          return PairFilter.ALL
        case 'search':
          return 'US'
        default:
          return ''
      }
    })
    const updateFilterValueFn = jest.fn()

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn
        } as any)
    )

    await act(async () => {
      const { result } = renderHook(() => useMarketListFilters(true), {
        wrapper: BaseProviders
      })
      await waitFor(() => {
        expect(result.current).toEqual(filterValuesOnAll)
      })
    })
  })
  it('returns correct filter object when no filter is enabled, and there is search input', async () => {
    const getFilterValueFn = jest.fn((param: string) => {
      switch (param) {
        case 'search':
          return 'US'
        default:
          return ''
      }
    })
    const updateFilterValueFn = jest.fn()

    jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
      () =>
        ({
          getFilterValue: getFilterValueFn,
          updateFilter: updateFilterValueFn
        } as any)
    )

    await act(async () => {
      const { result } = renderHook(() => useMarketListFilters(true), {
        wrapper: BaseProviders
      })
      await waitFor(() => {
        expect(result.current).toEqual(filterValuesOnSearch)
      })
    })
  })
})
