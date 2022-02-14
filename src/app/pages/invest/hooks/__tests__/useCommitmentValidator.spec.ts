import { act, waitFor, renderHookWithForm } from 'test-utils'
import { useCommitmentValidator } from 'app/pages/invest/hooks/useCommitmentValidator'
import * as balancesHook from 'hooks/balance/useBalancesByAssetId'
import { asset } from '__fixtures__/authorizer'
import { balance } from '__fixtures__/balance'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'

describe('useCommitmentValidator', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns isValid as false if data.list.lenth < 1', async () => {
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        map: { [asset._id]: balance }
      })
    )

    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: 100, assetId: asset._id }),
        { totalAmount: 1000, numberOfUnits: 200 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns isValid as false if isSuccess is false', async () => {
    const sampleList = [1, 2, 3]
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        list: sampleList,
        map: { [asset._id]: balance },
        queryStatus: QueryStatus.Error
      })
    )

    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: 100, assetId: asset._id }),
        { totalAmount: 1000, numberOfUnits: 200 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns isValid as true if investmentAmount is not greater than availableAmount and investmentUnits is less than minimumUnits', async () => {
    const sampleList = [1, 2, 3]
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        list: sampleList,
        map: { [asset._id]: balance }
      })
    )
    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: 100, assetId: asset._id }),
        { totalAmount: 1000, numberOfUnits: 200 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(true)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns isValid as false if investmentAmount is greater than availableAmount', async () => {
    const sampleList = [1, 2, 3]
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        list: sampleList,
        map: { [asset._id]: balance }
      })
    )
    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: 100, assetId: asset._id }),
        { totalAmount: 10000000, numberOfUnits: 200 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns isValid as false if investmentUnits is less than minimumUnits', async () => {
    const sampleList = [1, 2, 3]
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        list: sampleList,
        map: { [asset._id]: balance }
      })
    )
    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: 100, assetId: asset._id }),
        { totalAmount: 1000, numberOfUnits: 50 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })

  it('returns validates with minimumUnits as 1 when minimumInvestment is null', async () => {
    jest.spyOn(balancesHook, 'useBalancesByAssetId').mockReturnValue(
      generateInfiniteQueryResult({
        map: { [asset._id]: balance }
      })
    )
    await act(async () => {
      const { result } = renderHookWithForm(
        () =>
          useCommitmentValidator({ minInvestment: null, assetId: asset._id }),
        { totalAmount: 1000, numberOfUnits: 0 }
      )

      await waitFor(
        () => {
          expect(result.current.isValid).toBe(false)
        },
        { timeout: 1000 }
      )
    })
  })
})
