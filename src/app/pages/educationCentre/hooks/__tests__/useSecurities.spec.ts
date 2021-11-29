import { act } from '@testing-library/react-hooks'
import { useSecurities } from 'app/pages/educationCentre/hooks/useSecurities'
import { atlasOneURL } from 'config/apiURL'
import { history } from 'config/history'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('useSecurities', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct data', async () => {
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateQueryResult({ data: [{ documents: [] }] })
        )
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(() => useSecurities(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(result.current.data).toEqual([])
        },
        { timeout: 1000 }
      )
    })
  })

  it('calls api endpoint with correct filters', async () => {
    history.push(
      '/app?protocol=ERC-20&industry=Finance&country=Belarus&assetClass=Debt'
    )
    await act(async () => {
      const apiFn = jest
        .fn()
        .mockResolvedValueOnce(
          generateQueryResult({ data: [{ documents: [] }] })
        )
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(() => useSecurities(), {
        apiService: apiObj
      })

      await waitFor(
        () => {
          expect(result.current.data).toEqual([])
          expect(apiFn).toHaveBeenCalledWith(atlasOneURL.getSecurities, {
            assetClass: 'Debt',
            industry: 'Finance',
            country: 'Belarus',
            search: undefined,
            protocol: 'ERC-20'
          })
        },
        { timeout: 1000 }
      )
    })
  })
})
