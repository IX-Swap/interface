import { act } from '@testing-library/react-hooks'
import { useTreasuryWallet } from 'app/pages/authorizer/hooks/useTreasuryWallet'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useTreasuryWallet', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('calls apiService with correct params and returns correct data', async () => {
    await act(async () => {
      const wallet = {
        balance: 100000
      }
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(generateQueryResult({ data: wallet }))
      const apiObj = { get: apiFn }

      const networkCode = '123'
      const dsoId = 'dso-id'
      const { result } = renderHookWithServiceProvider(
        () => useTreasuryWallet(networkCode, dsoId),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.data).toEqual(wallet)
          expect(apiFn).toHaveBeenCalledWith(
            `/blockchain/balance/${networkCode}`
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
