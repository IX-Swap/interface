import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { useTransactionFilters } from '../useTransactionFilters'

describe('useTransactionFilters', () => {
  const getFilterValueFn = jest.fn((param: string) => 'test')
  const updateFilterValueFn = jest.fn()
  const removeFilterValueFn = jest.fn()
  const expected = {
    filter: {
      sortBy: 'test',
      sortIndex: -1
    },
    sortBy: 'test',
    orderBy: 'test'
  }
  jest.spyOn(useQueryFilter, 'useQueryFilter').mockImplementation(
    () =>
      ({
        getFilterValue: getFilterValueFn,
        updateFilter: updateFilterValueFn,
        removeFilter: removeFilterValueFn
      } as any)
  )
  it('Returns corect filters and values', async () => {
    const { result } = renderHookWithServiceProvider(useTransactionFilters)

    await waitFor(() => result.current)

    expect(result.current).toEqual(expected)
  })
})
