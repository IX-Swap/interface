import { act } from '@testing-library/react-hooks'
import {
  waitFor,
  cleanup,
  renderHookWithServiceProvider,
  apiServiceMock
} from 'test-utils'
import { accountsURL } from 'config/apiURL'
import { fakeDepositAddress } from '__fixtures__/issuance'
import { useDepositAddress } from 'app/pages/accounts/hooks/useDepositAddress'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useDepositAddress', () => {
  const fakeTokenSymbol = 'IX-RHTC ERC-20'

  const sampleResponse = generateQueryResult({
    data: fakeDepositAddress
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects request with correct parameters and correct response', async () => {
    await act(async () => {
      apiServiceMock.post.mockResolvedValue(sampleResponse)

      await act(async () => {
        const { result } = renderHookWithServiceProvider(() => {
          return useDepositAddress(fakeTokenSymbol)
        })

        await waitFor(() => result.current.data)

        expect(result.current.data).toEqual(sampleResponse.data)
        expect(apiServiceMock.post).toHaveBeenCalledWith(
          accountsURL.digitalSecurities.getDepositAddress,
          {
            assetTicker: fakeTokenSymbol
          }
        )
      })
    })
  })
})
