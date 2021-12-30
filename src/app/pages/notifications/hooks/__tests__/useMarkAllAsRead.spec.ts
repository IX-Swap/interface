import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useMarkAllAsRead } from 'app/pages/notifications/hooks/useMarkAllAsRead'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as utilsHook from 'app/pages/notifications/hooks/utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('useMarkAllAsRead', () => {
  const markAllNotificationsAsRead = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest
      .spyOn(utilsHook, 'markAllNotificationsAsRead')
      .mockImplementation(markAllNotificationsAsRead)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls markAllNotificationsAsRead with correct data', async () => {
    await act(async () => {
      const patchFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch: patchFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMarkAllAsRead(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(patchFn).toHaveBeenNthCalledWith(
            1,
            `/core/notifications/mark-read/all/${user._id}`,
            {}
          )
          expect(markAllNotificationsAsRead).toHaveBeenNthCalledWith(
            1,
            undefined
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const patchFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch: patchFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMarkAllAsRead(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
