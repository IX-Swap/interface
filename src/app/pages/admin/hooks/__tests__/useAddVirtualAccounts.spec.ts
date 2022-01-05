import { act } from '@testing-library/react-hooks'
import { useAddVirtualAccount } from 'app/pages/admin/hooks/useAddVirtualAccounts'
import { QueryStatus } from 'react-query'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('useAddVirtualAccounts', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes api mutate correctly', async () => {
    await act(async () => {
      const callbackFn = jest.fn()
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateMutationResult({ data: {}, queryStatus: QueryStatus.Success })
        )
      const showSnackbarFn = jest.fn()
      const apiObj = { post: apiFn }
      const snackbarObj = { showSnackbar: showSnackbarFn }

      const { result } = renderHookWithServiceProvider(
        () => useAddVirtualAccount(callbackFn),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutateFn] = result.current
          void mutateFn()
          expect(apiFn).toHaveBeenCalled()
          expect(callbackFn).toHaveBeenCalled()
          expect(showSnackbarFn).toHaveBeenCalledWith(
            'Virtual Accounts added successfully!',
            'success'
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
