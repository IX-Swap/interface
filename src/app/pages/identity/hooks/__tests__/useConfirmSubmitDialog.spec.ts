import { act, renderHook } from '@testing-library/react-hooks'
import { useConfirmSubmitDialog } from 'app/pages/identity/hooks/useConfirmSubmitDialog'
import { waitFor } from 'test-utils'

describe('useConfirmSubmitDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns default value as false', async () => {
    await act(async () => {
      const { result } = renderHook(() => useConfirmSubmitDialog())

      await waitFor(
        () => {
          expect(result.current.open).toEqual(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns defauls value as true when openDialog is invoked and false when closeDialog is invoked', async () => {
    await act(async () => {
      const { result } = renderHook(() => useConfirmSubmitDialog())

      await waitFor(
        () => {
          result.current.openDialog()
          expect(result.current.open).toEqual(true)

          result.current.closeDialog()
          expect(result.current.open).toEqual(false)
        },
        { timeout: 1000 }
      )
    })
  })
})
