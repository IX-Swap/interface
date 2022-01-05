import { act } from '@testing-library/react-hooks'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { commitment } from '__fixtures__/authorizer'
import { useCommitmentIssuance } from '../useCommitmentIssuance'

describe('useMarkAsRead', () => {
  const path = `/app/authorizer/commitments/:userId/:commitmentId/view`
  beforeEach(() => {
    history.push(
      generatePath(path, {
        userId: commitment.user._id,
        commitmentId: commitment._id
      })
    )
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
        () => useCommitmentIssuance(),
        { apiService: apiObj, snackbarService: snackbarObj },
        path
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
