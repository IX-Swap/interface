import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import React from 'react'
import { render } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('VirtualAccountDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns null when isLoading is true', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: virtualAccountsSample[0],
      isLoading: true
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
  it('returns null when data is undefined', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
})
