import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { BaseProviders } from 'test-utils'
import { useSearchFilter } from '../useSearchFilter'

describe('useSearchFilter', () => {
  const initialFilterValues = {
    search: undefined
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct filter object', async () => {
    await act(async () => {
      const { result } = renderHook(() => useSearchFilter(), {
        wrapper: BaseProviders
      })

      await waitFor(() => {
        expect(result.current.filter).toStrictEqual(initialFilterValues)
      })
    })
  })
})
