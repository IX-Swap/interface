import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { capitalCallArgs } from '__fixtures__/capitalCall'
import { useUnAssignCustody } from 'app/pages/admin/hooks/useUnAssignCustody'

describe('useUnAssignCustody', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUnAssignCustody(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const {
            mutation: [capitalCall]
          } = result.current
          void capitalCall(capitalCallArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Custody unlinked successfully.',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const post = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUnAssignCustody(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const {
            mutation: [capitalCall]
          } = result.current
          void capitalCall(capitalCallArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            unsuccessfulResponse.message,
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with default error message when error message is undefined', async () => {
    const unsuccessfulResponseWithoutMeassage = {
      ...unsuccessfulResponse,
      message: undefined
    }

    await act(async () => {
      const post = jest
        .fn()
        .mockRejectedValueOnce(unsuccessfulResponseWithoutMeassage)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useUnAssignCustody(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const {
            mutation: [capitalCall]
          } = result.current
          void capitalCall(capitalCallArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'There was an error unlinking the custody. Please try again in few minutes.',
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
