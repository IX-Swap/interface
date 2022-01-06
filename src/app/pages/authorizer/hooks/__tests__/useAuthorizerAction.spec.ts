import { act } from '@testing-library/react-hooks'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { useAuthorizerAction } from 'app/pages/authorizer/hooks/useAuthorizerAction'
import { successfulResponse, unsuccessfulResponse } from '__fixtures__/api'
import { bank } from '__fixtures__/authorizer'
import * as useAuthorizerCategoryHook from 'hooks/location/useAuthorizerCategory'
import { AuthorizerCategory } from 'types/app'

describe('useAuthorizerAction', () => {
  const id = bank._id

  beforeEach(() => {
    jest
      .spyOn(useAuthorizerCategoryHook, 'useAuthorizerCategory')
      .mockReturnValue(AuthorizerCategory.BankAccounts)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { put: putFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useAuthorizerAction({ id, action: 'approve' }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenCalledWith('success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with success message if comment is undefined', async () => {
    await act(async () => {
      const putFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { put: putFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useAuthorizerAction({ id, action: 'approve' }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenCalledWith('success', 'success')
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const putFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { put: putFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useAuthorizerAction({ id, action: 'approve' }),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(showSnackbar).toHaveBeenCalledWith('error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
