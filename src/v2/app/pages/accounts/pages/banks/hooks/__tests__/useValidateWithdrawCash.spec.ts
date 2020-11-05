/**  * @jest-environment jsdom-sixteen  */
import { act, waitFor, cleanup, renderHookWithForm } from 'test-utils'
import { useValidateWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'
import { balance } from '__fixtures__/balance'
import { bank, asset } from '__fixtures__/authorizer'
import * as banksHook from 'v2/app/pages/accounts/pages/banks/hooks/useBankById'
import * as balancesHook from 'v2/hooks/balance/useBalancesByAssetId'
import * as assetHook from 'v2/hooks/asset/useAssetById'
import {
  generateInfiniteQueryResult,
  generateQueryResult
} from '__fixtures__/useQuery'

describe('useValidateWithdrawCash', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('has correct default values', async () => {
    jest
      .spyOn(banksHook, 'useBankById')
      .mockReturnValue(generateQueryResult({ data: bank }))
    jest
      .spyOn(assetHook, 'useAssetById')
      .mockReturnValue(generateQueryResult({ data: asset }))
    jest
      .spyOn(balancesHook, 'useBalancesByAssetId')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [bank.currency._id]: balance } })
      )
    await act(async () => {
      const { result } = renderHookWithForm(() => useValidateWithdrawCash())

      await waitFor(
        () => {
          expect(result.current.canSubmit).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })
})
