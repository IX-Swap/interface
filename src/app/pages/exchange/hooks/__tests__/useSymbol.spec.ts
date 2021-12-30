import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { BaseProviders } from 'test-utils'
import { useSymbol } from 'app/pages/exchange/hooks/useSymbol'
import { pair } from '__fixtures__/tradingPair'

describe('useSymbol', () => {
  const pairId = '123456'
  const data = {
    list: [pair]
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct symbol', async () => {
    await act(async () => {
      const { result } = renderHook(() => useSymbol(pairId, data), {
        wrapper: BaseProviders
      })

      await waitFor(() => {
        expect(result.current.symbol).toStrictEqual(pair.name)
      })
    })
  })
  it('returns empty symbol when pair is empty', async () => {
    const emptyPair = ''
    await act(async () => {
      const { result } = renderHook(() => useSymbol(emptyPair, data), {
        wrapper: BaseProviders
      })

      await waitFor(() => {
        expect(result.current.symbol).toStrictEqual('')
      })
    })
  })
})
