import { AdminCorporateIdentityView } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateIdentityView'
import * as useAllCorporatesByUserId from 'app/pages/admin/hooks/useAllCorporatesByUserId'
import React from 'react'
import { render } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('AdminCorporateIdentityView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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

  it('should match snapshot', () => {
    const useAllCorporatesByUserIdResponse = generateInfiniteQueryResult({
      list: [corporate],
      isLoading: false
    })

    jest
      .spyOn(useAllCorporatesByUserId, 'useAllCorporatesByUserId')
      .mockImplementation(() => useAllCorporatesByUserIdResponse as any)
    const { container } = render(<AdminCorporateIdentityView />)

    expect(container).toMatchSnapshot()
  })
})
