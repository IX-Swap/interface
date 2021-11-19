import React from 'react'
import { render, cleanup } from 'test-utils'
import { CreateWalletDialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/CreateWalletDialog/CreateWalletDialogContent'

describe('CreateWalletDialogContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CreateWalletDialogContent />)
  })
})
