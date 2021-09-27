import { act } from '@testing-library/react-hooks'
import { useAuthorizerPendingItems } from 'app/pages/authorizer/hooks/useAuthorizerPendingItems'
import * as useTableWithPagination from 'components/TableWithPagination/hooks/useTableWithPagination'
import { waitFor, cleanup, renderHookWithServiceProvider } from 'test-utils'
import { AuthorizerCategory } from 'types/app'
import { successfulResponse } from '__fixtures__/api'

describe('useAuthourizerPendingItems.spec.ts', () => {
  const objResponse = {
    total: 500,
    status: undefined
  }

  beforeEach(() => {
    jest
      .spyOn(useTableWithPagination, 'useTableWithPagination')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('expects', async () => {
    await act(async () => {
      const apiFn = jest.fn().mockResolvedValueOnce(successfulResponse)
      const apiObj = { post: apiFn }

      const { result } = renderHookWithServiceProvider(
        () => useAuthorizerPendingItems(AuthorizerCategory.Commitments),
        {
          apiService: apiObj
        }
      )

      await waitFor(
        () => {
          expect(result.current.total).toEqual(objResponse.total)
          expect(result.current.status).toEqual(objResponse.status)
        },
        { timeout: 1000 }
      )
    })
  })
})
