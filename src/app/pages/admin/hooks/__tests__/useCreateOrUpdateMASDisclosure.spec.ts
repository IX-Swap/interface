import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { unsuccessfulResponse, successfulResponse } from '__fixtures__/api'
import { useCreateOrUpdateMASDisclosure } from 'app/pages/admin/hooks/useCreateOrUpdateMASDisclosure'

describe('useCreateOrUpdateMASDisclosure', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('it calls snackbarService.showSnackbar with correct data', async () => {
    await act(async () => {
      const postFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateOrUpdateMASDisclosure(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ content: 'test' })

          expect(postFn).toHaveBeenNthCalledWith(
            1,
            '/resources/siteConfig/masDisclosure',
            {
              content: 'test'
            }
          )
          expect(showSnackbar).toHaveBeenNthCalledWith(
            1,
            successfulResponse.message,
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })

  it('it calls snackbarService.showSnackbar with error message', async () => {
    await act(async () => {
      const postFn = jest.fn().mockRejectedValue(unsuccessfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { post: postFn }
      const snackbarObj = { showSnackbar }
      const { result } = renderHookWithServiceProvider(
        () => useCreateOrUpdateMASDisclosure(),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate({ content: 'test' })

          expect(showSnackbar).toHaveBeenNthCalledWith(1, 'error', 'error')
        },
        { timeout: 1000 }
      )
    })
  })
})
