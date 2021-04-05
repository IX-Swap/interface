import { act } from '@testing-library/react-hooks'
import { useSubmitDetailsOfIssuance } from 'app/pages/_identity/hooks/useSubmitDetailsOfIssuance'
import { identityURL } from 'config/apiURL'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'

describe('useSubmitDetailsOfIssuance', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn()
      const apiObj = { patch: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useSubmitDetailsOfIssuance('123'),
        {
          apiService: apiObj
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
        },
        { timeout: 1000 }
      )
    })
  })
})
