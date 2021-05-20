import { waitFor } from '@testing-library/react'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { BaseProviders } from 'test-utils'
import { usePastOrderFilter } from 'app/pages/exchange/market/hooks/usePastOrderFilter'

describe('usePastOrderFilter', () => {
  const initialFilterValues = {
    to: undefined,
    from: undefined,
    pair: '1'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct filter object', async () => {
    await act(async () => {
      const { result } = renderHook(
        () => usePastOrderFilter(initialFilterValues.pair),
        {
          wrapper: BaseProviders
        }
      )

      await waitFor(() => {
        expect(result.current.filter).toStrictEqual(initialFilterValues)
      })
    })
  })
})
