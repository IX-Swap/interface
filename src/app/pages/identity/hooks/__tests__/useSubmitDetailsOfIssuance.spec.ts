import { act } from '@testing-library/react-hooks'
import { useSubmitDetailsOfIssuance } from 'app/pages/identity/hooks/useSubmitDetailsOfIssuance'
import { identityURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useSubmitDetailsOfIssuance', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const showSnackbar = jest.fn()

      const apiObj = { patch: apiFn }
      const snackbarObj = { showSnackbar }

      const { result } = renderHookWithServiceProvider(
        () => useSubmitDetailsOfIssuance('123'),
        {
          apiService: apiObj,
          snackbarService: snackbarObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(apiFn).toHaveBeenCalledWith(
            identityURL.detailsOfIssuance.submit('123'),
            {}
          )

          expect(showSnackbar).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
