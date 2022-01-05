import { act } from '@testing-library/react-hooks'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { AppService, AppFeature } from 'types/app'
import { useUpdateCustomField } from '../useUpdateCustomField'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { userURL } from 'config/apiURL'
import { updateDSOTableColumnsArgs } from '__fixtures__/customFields'

describe('useUpdateCustomField', () => {
  const hookArgs = {
    service: AppService.Invest,
    feature: AppFeature.Offerings
  }

  beforeEach(() => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })
  })

  it('makes a request to correct api endpoint with correct payload', async () => {
    const apiService = {
      put: jest.fn()
    }

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useUpdateCustomField(hookArgs),
        {
          apiService
        }
      )

      await waitFor(() => {
        const [mutate] = result.current
        const expectedURL = userURL.updateCustomFields(user._id)
        const expectedPayload = {
          ...updateDSOTableColumnsArgs,
          ...hookArgs
        }

        void mutate(updateDSOTableColumnsArgs)

        expect(apiService.put).toHaveBeenCalledWith(
          expectedURL,
          expectedPayload
        )
      })
    })
  })
})
