import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import * as useAuthorizerRouterHook from 'app/pages/authorizer/router'
import { commitment } from '__fixtures__/authorizer'
import { useCommitmentIssuance } from '../useCommitmentIssuance'

describe('useMarkAsRead', () => {
  beforeEach(() => {
    jest
      .spyOn(useAuthorizerRouterHook, 'useAuthorizerRouter')
      .mockReturnValue({ params: { commitmentId: commitment._id } } as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('it calls markNotificationAsRead with correct data', async () => {
    await act(async () => {
      const patchFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch: patchFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCommitmentIssuance(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const mutate = result.current[0]
          void mutate({})

          expect(patchFn).toHaveBeenNthCalledWith(
            1,
            `/issuance/commitments/${commitment._id}/override`,
            {}
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
        () => useCommitmentIssuance(),
        { apiService: apiObj, snackbarService: snackbarObj }
      )

      await waitFor(
        () => {
          const mutate = result.current[0]
          void mutate({})

          expect(showSnackbar).toHaveBeenCalledWith('error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
