import { AdminCorporateIdentityView } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateIdentityView'
import * as useAllCorporatesByUserId from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import * as useAdminRouter from 'app/pages/admin/router'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminCorporateIdentityView', () => {
  const useAdminRouterResponse = { params: { userId: corporate._id } }
  const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
    list: [corporate],
    isLoading: false
  })

  beforeEach(() => {
    jest
      .spyOn(useAdminRouter, 'useAdminRouter')
      .mockImplementation(() => useAdminRouterResponse as any)

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AdminCorporateIdentityView />)
  })
})
