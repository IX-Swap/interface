import { act } from '@testing-library/react-hooks'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { useAssetById } from 'hooks/asset/useAssetById'
import { asset } from '__fixtures__/authorizer'

describe('useAssetById', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('will be idle if asset id is undefined', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: asset })
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useAssetById(undefined as any),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('idle')
          expect(getFn).toHaveBeenCalledTimes(0)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns data with correct response from api', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: asset })
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useAssetById(asset._id),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith(`accounts/assets/${asset._id}`)

          expect(result.current.data).toEqual(asset)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns data with correct response from api if ownerId is undefined', async () => {
    await act(async () => {
      const getFn = jest.fn().mockResolvedValueOnce({ data: asset })
      const apiObj = { get: getFn }

      const { result } = renderHookWithServiceProvider(
        () => useAssetById(asset._id),
        { apiService: apiObj }
      )

      await waitFor(
        () => {
          expect(result.current.status).toBe('success')
          expect(getFn).toHaveBeenCalledWith(`accounts/assets/${asset._id}`)

          expect(result.current.data).toEqual(asset)
        },
        { timeout: 1000 }
      )
    })
  })
})
