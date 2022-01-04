import { act } from '@testing-library/react-hooks'
import { useCustomField } from 'hooks/customFields/useCustomField'
import { renderHookWithServiceProvider, waitFor } from 'test-utils'
import { AppFeature, AppService } from 'types/app'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { userURL } from 'config/apiURL'
import { generateQueryResult } from '__fixtures__/useQuery'
import { customField } from '__fixtures__/customFields'

describe('useCustomField', () => {
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

  it('makes a request to correct api endpoint', async () => {
    const apiService = {
      get: jest.fn()
    }

    await act(async () => {
      renderHookWithServiceProvider(() => useCustomField(hookArgs), {
        apiService
      })

      await waitFor(() => {
        const expectedURL = userURL.getCustomFields(
          user._id,
          hookArgs.service,
          hookArgs.feature
        )

        expect(apiService.get).toHaveBeenCalledWith(expectedURL)
      })
    })
  })

  it('returns correct response data', async () => {
    const response = generateQueryResult({ data: customField })
    const apiService = {
      get: jest.fn().mockResolvedValueOnce(response)
    }

    await act(async () => {
      const { result } = renderHookWithServiceProvider(
        () => useCustomField(hookArgs),
        {
          apiService
        }
      )

      await waitFor(() => {
        expect(result.current.data).toBe(response.data)
      })
    })
  })
})
