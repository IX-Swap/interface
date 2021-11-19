import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateWalletDialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialog'

describe('CreateWalletDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateWalletDialog open />)
  })
})
