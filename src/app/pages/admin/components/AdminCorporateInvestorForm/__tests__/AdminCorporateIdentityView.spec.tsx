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

  beforeEach(() => {
    jest
      .spyOn(useAdminRouter, 'useAdminRouter')
      .mockImplementation(() => useAdminRouterResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
      list: [corporate],
      isLoading: false
    })

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
    render(<AdminCorporateIdentityView />)
  })

  it('renders null when isLoading = true', () => {
    const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
      list: [corporate],
      isLoading: true
    })

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
    const { container } = render(<AdminCorporateIdentityView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when identity = undefined', () => {
    const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
      list: [undefined],
      isLoading: false
    })

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
    const { container } = render(<AdminCorporateIdentityView />)

    expect(container).toBeEmptyDOMElement()
  })
})
