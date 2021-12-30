import React from 'react'
import { render } from 'test-utils'
import { AdminIndividualIdentityView } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualIdentityView'
import * as useIndividualIdentityById from 'app/pages/admin/hooks/useIndividualIdentityById'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminIndividualIdentityView', () => {
  beforeEach(() => {
    // jest
    //   .spyOn(useAdminRouter, 'useAdminRouter')
    //   .mockImplementation(() => useAdminRouterResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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
