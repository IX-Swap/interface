import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import * as useVirtualAccounts from 'app/pages/accounts/hooks/useVirtualAccounts'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('VirtualAccountDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const useVirtualsAccountResponse = generateQueryResult({
      data: virtualAccountsSample
    })

    jest
      .spyOn(useVirtualAccounts, 'useVirtualAccounts')
      .mockImplementation(() => useVirtualsAccountResponse as any)
    render(<VirtualAccountDetails />)
  })

  it('returns null when isLoading is true', () => {
    const useVirtualAccountsResponse = generateQueryResult({
      data: virtualAccountsSample,
      isLoading: true
    })

    jest
      .spyOn(useVirtualAccounts, 'useVirtualAccounts')
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
      .spyOn(useVirtualAccounts, 'useVirtualAccounts')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
})
