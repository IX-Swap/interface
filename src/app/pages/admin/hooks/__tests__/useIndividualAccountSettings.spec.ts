import { act, renderHook } from '@testing-library/react-hooks'
import { useIndividualAccountSettings } from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { waitFor } from 'test-utils'

describe('useIndividualAccountSettings', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', async () => {
    await act(async () => {
      const { result } = renderHook(() => useIndividualAccountSettings(1))

      await waitFor(
        () => {
          expect(result.current.value).toEqual(1)

          result.current.handleChange({} as any, 2)
          expect(result.current.value).toEqual(2)
        },
        { timeout: 1000 }
      )
    })
  })
})
