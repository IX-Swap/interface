/**  * @jest-environment jsdom-sixteen  */
import { renderHook, act } from '@testing-library/react-hooks'
import { cleanup } from 'test-utils'
import useAppRouter from 'v2/hooks/useAppRouter'

describe('useAppRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns nothings', async () => {
    await act(() => {
      renderHook(() => useAppRouter())
    })
  })
})
