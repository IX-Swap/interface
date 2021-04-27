import { VirtualAccountDetails } from 'app/pages/accounts/components/VirtualAccountDetails'
import * as useVirtualAccountByUserId from 'app/pages/accounts/hooks/useVirtualAccountByUserId'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('VirtualAccountDetails', () => {
  beforeEach(() => {})

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const useVirtualAccountByUserIdResponse = generateQueryResult({
      data: virtualAccountsSample
    })

    jest
      .spyOn(useVirtualAccountByUserId, 'useVirtualAccountByUserId')
      .mockImplementation(() => useVirtualAccountByUserIdResponse as any)
    render(<VirtualAccountDetails />)
  })

  it('returns null when isLoading is true', () => {
    const useVirtualAccountByUserIdResponse = generateQueryResult({
      data: virtualAccountsSample,
      isLoading: true
    })

    jest
      .spyOn(useVirtualAccountByUserId, 'useVirtualAccountByUserId')
      .mockImplementation(() => useVirtualAccountByUserIdResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
  it('returns null when data is undefined', () => {
    const useVirtualAccountByUserIdResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccountByUserId, 'useVirtualAccountByUserId')
      .mockImplementation(() => useVirtualAccountByUserIdResponse as any)
    const { container } = render(<VirtualAccountDetails />)

    expect(container).toBeEmptyDOMElement()
  })
})
