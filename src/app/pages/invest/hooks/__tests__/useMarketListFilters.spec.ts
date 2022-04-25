import { act, renderHook } from '@testing-library/react-hooks'
import { BaseProviders, waitFor } from 'test-utils'
import useMarketListFilters from 'app/pages/invest/hooks/useMarketListFilters'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { PairFilter } from 'hooks/types'
import {
  filterValuesOnAll,
  filterValuesOnSearch,
  initialFilterValues
} from '__fixtures__/exchange'

describe('useMarketListFilters', () => {
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
