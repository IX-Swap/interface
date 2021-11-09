import React from 'react'
import { render, cleanup } from 'test-utils'
import { BlockchainWalletsCount } from 'app/pages/accounts/pages/dashboard/components/BlockchainWalletsCount/BlockchainWalletsCount'

const count = 10

describe('BlockchainWalletsCount', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BlockchainWalletsCount count={count} />)
  })

  it('renders title with correct text', () => {
    const { getByTestId } = render(<BlockchainWalletsCount count={count} />)
    expect(getByTestId('title')).toHaveTextContent('Blockchain Wallets')
  })

  it('renders correct count value', () => {
    const { getByTestId } = render(<BlockchainWalletsCount count={count} />)
    expect(getByTestId('count')).toHaveTextContent(count.toString())
  })
})
