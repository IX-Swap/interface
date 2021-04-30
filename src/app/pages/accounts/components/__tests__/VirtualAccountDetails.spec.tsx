import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
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
    const useVirtualAccountResponse = generateQueryResult({
      data: virtualAccountsSample
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)
    render(<VirtualAccountDetails />)
  })

  it('returns null when isLoading is true', () => {
    const useVirtualAccountResponse = generateQueryResult({
      data: virtualAccountsSample,
      isLoading: true
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
  it('returns null when data is undefined', () => {
    const useVirtualAccountResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
})
