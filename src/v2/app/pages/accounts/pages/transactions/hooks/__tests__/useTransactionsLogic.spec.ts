/**  * @jest-environment jsdom-sixteen  */
import { renderHook } from '@testing-library/react-hooks'
import { act, waitFor, cleanup } from 'test-utils'
import {
  useTransactionsLogic,
  initialTransactionFilter
} from 'v2/app/pages/accounts/pages/transactions/hooks/useTransactionsLogic'

describe('useTransactionsLogic', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', async () => {
    const { result } = renderHook(() => useTransactionsLogic())

    await waitFor(() => {
      expect(result.current.filter).toEqual(initialTransactionFilter)
    })
  })

  it('handles date change correctly', async () => {
    await act(async () => {
      const now = new Date()
      const { result } = renderHook(() => useTransactionsLogic())

      result.current.handleDateChange('to', now)
      await waitFor(() => {
        expect(result.current.filter).toEqual({
          ...initialTransactionFilter,
          to: now.toISOString()
        })
      })
    })
  })
})
