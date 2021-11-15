import { waitFor } from '@testing-library/react'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { history } from 'config/history'
import { generatePath } from 'react-router'
import { BaseProviders } from 'test-utils'
import { useQueryFilter } from '../useQueryFilter'

describe.skip('useQueryFilter', () => {
  beforeEach(() => {
    history.replace(generatePath('/', { search: '' }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct filter object', async () => {
    await act(async () => {
      const { result } = renderHook(() => useQueryFilter(), {
        wrapper: BaseProviders
      })

      await waitFor(() => {
        expect(result.current.filter).toBeInstanceOf(URLSearchParams)
        expect(result.current.updateFilter).toBeDefined()
        expect(result.current.getFilterValue).toBeDefined()
        expect(result.current.removeFilter).toBeDefined()
        expect(result.current.getHasValue).toBeDefined()
      })
    })
  })

  describe('updateFilter', () => {
    it('updates search params with correct key/value', async () => {
      await act(async () => {
        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          result.current.updateFilter('search', 'foo')

          expect(history.location.search).toBe('?search=foo')
        })
      })
    })
  })

  describe('getFilterValue', () => {
    it('returns first filter value based on the provided key', async () => {
      await act(async () => {
        history.push('/?search=bar')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          const value = result.current.getFilterValue('search')

          expect(value).toBe('bar')
        })
      })
    })

    it('returns undefined if there is no item with provided key in search params', async () => {
      await act(async () => {
        history.push('/?foo=bar')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          const value = result.current.getFilterValue('search')

          expect(value).toBeUndefined()
        })
      })
    })
  })

  describe('removeFilter', () => {
    it('removes key/value pair from search params', async () => {
      await act(async () => {
        history.push('/?search=bar&hello=world')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          result.current.removeFilter('search')

          expect(result.current.filter.toString()).toBe('hello=world')
        })
      })
    })
  })

  describe('getHasValue', () => {
    it('return true if search query has key/value pair', async () => {
      await act(async () => {
        history.push('/?search=bar&hello=world')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          expect(result.current.getHasValue('search')).toBe(true)
        })
      })
    })

    it('return false if search query does not have key/value pair', async () => {
      await act(async () => {
        history.push('/?hello=world')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          expect(result.current.getHasValue('search')).toBe(false)
        })
      })
    })

    it('return false if search query has key without any value', async () => {
      await act(async () => {
        history.push('/?search=')

        const { result } = renderHook(() => useQueryFilter(), {
          wrapper: BaseProviders
        })

        await waitFor(() => {
          expect(result.current.getHasValue('search')).toBe(false)
        })
      })
    })
  })
})
