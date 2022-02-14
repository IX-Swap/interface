import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useMarkAsRead } from 'app/pages/notifications/hooks/useMarkAsRead'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as utilsHook from 'app/pages/notifications/hooks/utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { notification } from '__fixtures__/notification'

describe('useMarkAsRead', () => {
  const markNotificationAsRead = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user, isAuthenticated: true }))
    jest
      .spyOn(utilsHook, 'markNotificationAsRead')
      .mockImplementation(markNotificationAsRead)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls markNotificationAsRead with correct data', async () => {
    await act(async () => {
      const patchFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch: patchFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useMarkAsRead(notification),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const mutate = result.current.mutation
          void mutate()

          expect(patchFn).toHaveBeenNthCalledWith(
            1,
            `/core/notifications/mark-read/${user._id}/${notification._id}`,
            {}
          )
          expect(markNotificationAsRead).toHaveBeenCalledWith(
            notification._id,
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
        () => useMarkAsRead(notification),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const mutate = result.current.mutation
          void mutate()

          expect(showSnackbar).toHaveBeenCalledWith('error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
