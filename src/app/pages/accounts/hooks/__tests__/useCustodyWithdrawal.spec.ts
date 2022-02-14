import { act } from '@testing-library/react-hooks'
import { useCustodyWithdrawal } from 'app/pages/accounts/hooks/useCustodyWithdrawal'
import { accountsURL } from 'config/apiURL'
import { waitFor, renderHookWithServiceProvider } from 'test-utils'
import { successfulResponse } from '__fixtures__/api'

describe('useCustodyWithdrawal', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('to call api correctly', async () => {
    await act(async () => {
      const args = {
        assetTicker: 'RHT Coin',
        quantity: '1',
        memo: 'This is the memo',
        toAddress: '1232132131231'
      }

      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useCustodyWithdrawal(),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          const [mutate] = result.current
          void mutate(args)
          expect(apiFn).toHaveBeenCalledWith(
            accountsURL.dsWithdrawals.createCustodyWithdrawal,
            args
          )
        },
        { timeout: 1000 }
      )
    })
  })
})
