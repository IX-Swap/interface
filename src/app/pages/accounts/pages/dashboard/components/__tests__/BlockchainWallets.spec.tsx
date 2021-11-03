import React from 'react'
import { render, cleanup } from 'test-utils'
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

  it('renders title with correct text', () => {
    const { getByTestId } = render(<BlockchainWallets count={count} />)
    expect(getByTestId('title')).toHaveTextContent('Blockchain Wallets')
  })
})
