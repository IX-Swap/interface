import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { useCapitalCall } from 'app/pages/issuance/hooks/useCapitalCall'
import { capitalCallArgs } from '__fixtures__/capitalCall'

describe('useCapitalCall', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with success message', async () => {
    await act(async () => {
      const post = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(() => useCapitalCall(), {
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
            'Email has been sent to investors',
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
      const { result } = renderHookWithServiceProvider(() => useCapitalCall(), {
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
            'There was an error sending an email. Please try again in few minutes.',
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
