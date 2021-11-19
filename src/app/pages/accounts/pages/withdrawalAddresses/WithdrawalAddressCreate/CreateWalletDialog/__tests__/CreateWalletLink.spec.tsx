import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateWalletLink } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletLink'

describe('CreateWalletLink', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateWalletLink href={'href'} label={'label'} icon={'icon'} />)
  })
})
