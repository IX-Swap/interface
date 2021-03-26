import React from 'react'
import { render, cleanup } from 'test-utils'
import { AdminIndividualIdentityView } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualIdentityView'
import * as useAdminRouter from 'app/pages/admin/router'
import * as useIndividualIdentityById from 'app/pages/admin/hooks/useIndividualIdentityById'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminIndividualIdentityView', () => {
  const useAdminRouterResponse = { params: { userId: individual._id } }

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
    const useIndividualIdentityByIdResponse = generateQueryResult({
      data: individual,
      isLoading: false
    })
    jest
      .spyOn(useIndividualIdentityById, 'useIndividualIdentityById')
      .mockImplementation(() => useIndividualIdentityByIdResponse as any)
    render(<AdminIndividualIdentityView />)
  })

  it('returns null when loading', () => {
    const useIndividualIdentityByIdResponse = generateQueryResult({
      data: individual,
      isLoading: true
    })
    jest
      .spyOn(useIndividualIdentityById, 'useIndividualIdentityById')
      .mockImplementation(() => useIndividualIdentityByIdResponse as any)

    const { container } = render(<AdminIndividualIdentityView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when data is undefined', () => {
    const useIndividualIdentityByIdResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })
    jest
      .spyOn(useIndividualIdentityById, 'useIndividualIdentityById')
      .mockImplementation(() => useIndividualIdentityByIdResponse as any)

    const { container } = render(<AdminIndividualIdentityView />)
    expect(container).toBeEmptyDOMElement()
  })
})
