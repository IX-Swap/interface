import { act } from '@testing-library/react-hooks'
import { useIdleTimers } from 'app/hooks/useIdleTimers'
import * as useLogout from 'auth/hooks/useLogout'
import { idleLogoutTime } from 'config/defaults'
import * as useIdleTimer from 'react-idle-timer'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'

describe('useIdleTimers', () => {
  const mockLogout = jest.fn(() => null)
  const mockReset = jest.fn(() => null)
  beforeEach(() => {
    jest
      .spyOn(useLogout, 'useLogout')
      .mockImplementation(() => mockLogout as any)

    const objResponse = {
      reset: mockReset
    }

    jest
      .spyOn(useIdleTimer, 'useIdleTimer')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns initial values correctly', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIdleTimers(),
        {}
      )

      await waitFor(
        () => {
          expect(result.current.open).toBeFalsy()
          expect(result.current.logoutTimer).toBe(idleLogoutTime / 1000)
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls open and close dialog correctly', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIdleTimers(),
        {}
      )

      await waitFor(
        () => {
          result.current.openDialog()
          expect(result.current.open).toBeTruthy()
          result.current.closeDialog()
          expect(result.current.open).toBeFalsy()
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls logout when timer runs out', async () => {
    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useIdleTimers(),
        {}
      )

      await waitFor(
        () => {
          result.current.reset()
          expect(mockReset).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
