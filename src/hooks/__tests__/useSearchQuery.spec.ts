import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { history } from 'config/history'
import { BaseProviders } from 'test-utils'
import { useSearchQuery } from 'hooks/useSearchQuery'

describe('useSearchQuery', () => {
  beforeEach(() => {
    history.push('/?search=foo')
  })

  it('returns correct search query object', async () => {
    await act(async () => {
      const { result } = renderHook(() => useSearchQuery(), {
        wrapper: BaseProviders
      })

      await waitFor(() => {
        expect(result.current).toBeInstanceOf(URLSearchParams)
        expect(result.current.get('search')).toBe('foo')
      })
    })
  })
})
