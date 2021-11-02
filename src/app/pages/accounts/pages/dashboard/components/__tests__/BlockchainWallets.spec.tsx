import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { BlockchainWallets } from 'app/pages/accounts/pages/dashboard/components/BlockchainWallets/BlockchainWallets'

const count = 10

describe('BlockchainWallets', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BlockchainWallets count={count} />)
  })

  it('renders title with correct props', () => {
    const { getByTestId } = render(<BlockchainWallets count={count} />)
    expect(getByTestId('title')).toHaveTextContent('Blockchain Wallets')
  })

  it('renders title with correct props when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)

    const { getByTestId } = render(<BlockchainWallets count={count} />)
    expect(getByTestId('title')).toHaveTextContent('Blockchain Wallets:')
  })
})
