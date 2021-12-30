import { act, waitFor, renderHookWithForm } from 'test-utils'
import { useValidateWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useValidateWithdrawCash'
import { balance } from '__fixtures__/balance'
import { bank, asset } from '__fixtures__/authorizer'
import * as banksHook from 'app/pages/accounts/pages/banks/hooks/useBankById'
import * as balancesHook from 'hooks/balance/useBalancesByAssetId'
import * as assetHook from 'hooks/asset/useAssetById'
import {
  generateInfiniteQueryResult,
  generateQueryResult
} from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('useValidateWithdrawCash', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns canSubmit as true if amount is valid and less than available balance', async () => {
    jest
      .spyOn(banksHook, 'useBankById')
      .mockReturnValue(generateQueryResult({ data: bank }))
    jest
      .spyOn(assetHook, 'useAssetById')
      .mockReturnValue(generateQueryResult({ data: asset }))

    const useVirtualAccountResponse = generateQueryResult({
      data: virtualAccountsSample[0]
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)

    await act(async () => {
      const { result } = renderHookWithForm(() => useValidateWithdrawCash(), {
        amount: 10000
      })

      await waitFor(
        () => {
          expect(result.current.canSubmit).toBe(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns canSubmit as false if amount is undefined', async () => {
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

  it('returns canSubmit as false if bank is undefined', async () => {
    jest
      .spyOn(banksHook, 'useBankById')
      .mockReturnValue(generateQueryResult({ data: undefined }))
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

  it('returns canSubmit as false if bank is loading', async () => {
    jest
      .spyOn(banksHook, 'useBankById')
      .mockReturnValue(
        generateQueryResult({ data: bank, queryStatus: QueryStatus.Idle })
      )
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
