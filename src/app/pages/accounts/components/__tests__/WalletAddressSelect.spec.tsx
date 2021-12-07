import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useWalletAddresses from 'app/pages/accounts/hooks/useWalletAddresses'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { WalletAddressSelect } from 'app/pages/accounts/components/WalletAddressSelect'

describe('WalletAddressSelect', () => {
  beforeEach(() => {
    const objResponse = generateQueryResult({
      data: [withdrawalAddress],
      isLoading: false
    })

    jest
      .spyOn(useWalletAddresses, 'useWalletAddresses')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<WalletAddressSelect />)
  })

  it('returns null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useWalletAddresses, 'useWalletAddresses')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<WalletAddressSelect />)

    expect(container).toBeEmptyDOMElement()
  })

  it('returns null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: [withdrawalAddress],
      isLoading: true
    })

    jest
      .spyOn(useWalletAddresses, 'useWalletAddresses')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<WalletAddressSelect />)

    expect(container).toBeEmptyDOMElement()
  })
})
