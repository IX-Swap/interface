import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { capitalCallArgs } from '__fixtures__/capitalCall'
import { useCloseDeal } from 'app/pages/issuance/hooks/useCloseDeal'

describe('useCloseDeal', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const patch = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useCloseDeal(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const {
            mutation: [capitalCall]
          } = result.current
          void capitalCall(capitalCallArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'Deal closed successfully',
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
      const { result } = renderHookWithServiceProvider(() => useCloseDeal(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

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
      const { result } = renderHookWithServiceProvider(() => useCloseDeal(), {
        apiService: apiObj,
        snackbarService: snackbarObj
      })

      await waitFor(
        () => {
          const {
            mutation: [capitalCall]
          } = result.current
          void capitalCall(capitalCallArgs)

          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            'There was an error closing the deal. Please try again in few minutes',
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
