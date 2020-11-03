/**  * @jest-environment jsdom-sixteen  */
import { act } from '@testing-library/react-hooks'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { useValidateWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'
import { balance } from '__fixtures__/balance'
import { bank } from '__fixtures__/authorizer'
import * as banks from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import * as balances from 'v2/hooks/balance/useAllBalances'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

describe('useValidateWithdrawCash', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', async () => {
    jest
      .spyOn(banks, 'useBanksData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [bank._id]: bank } })
      )
    jest
      .spyOn(balances, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [bank.currency._id]: balance } })
      )
    await act(async () => {
      const { result } = renderHookWithServiceProvider(() =>
        useValidateWithdrawCash()
      )

      await waitFor(
        () => {
          expect(result.current.canSubmit).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })
})
