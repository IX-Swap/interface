import { act } from '@testing-library/react-hooks'
import { useCreateDetailsOfIssuance } from 'app/pages/identity/hooks/useCreateDetailsOfIssuance'
import * as useAuth from 'hooks/auth/useAuth'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { user } from '__fixtures__/user'

describe('useCreateDetailsOfIssuance', () => {
  beforeEach(() => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => ({ user } as any))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes correct api service', async () => {
    await act(async () => {
      const apiFn = jest.fn()
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useCreateDetailsOfIssuance(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate()

          expect(apiFn).toHaveBeenCalled()
        },
        { timeout: 1000 }
      )
    })
  })
})
