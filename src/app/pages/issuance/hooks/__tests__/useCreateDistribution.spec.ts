import { act } from '@testing-library/react-hooks'
import { useCreateDistribution } from 'app/pages/issuance/hooks/useCreateDistribution'
import * as useQueryCache from 'react-query'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse, unsuccessfulResponse } from '__fixtures__/api'

describe('useCreateDistribution', () => {
  const createDistArgs = {
    pricePerToken: 0.5,
    distributionDate: '12/21/21',
    otp: '123456',
    dsoId: 'dsoId'
  }

  const invalidateQueryCacheMock = jest.fn()

  beforeEach(() => {
    const objResponse = {
      invalidateQueries: invalidateQueryCacheMock
    }

    jest
      .spyOn(useQueryCache, 'useQueryCache')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('to call hook without errors', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useCreateDistribution(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createDistArgs)

          expect(showSnackbar).toHaveBeenCalledWith(
            'Distribution added sucessfully.',
            'success'
          )

          expect(invalidateQueryCacheMock).toHaveBeenCalled()
          expect(postFn).toHaveBeenCalledWith(
            '/issuance/distribution/create',
            createDistArgs
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValueOnce(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateDistribution(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(createDistArgs)

          expect(showSnackbar).toHaveBeenCalled()
          expect(showSnackbar).toHaveBeenCalledWith(
            unsuccessfulResponse.message,
            'error'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
