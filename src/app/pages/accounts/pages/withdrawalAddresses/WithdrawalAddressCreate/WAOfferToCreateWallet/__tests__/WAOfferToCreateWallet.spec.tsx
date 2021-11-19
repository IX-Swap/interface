import React from 'react'
import { render, cleanup } from 'test-utils'
import { WAOfferToCreateWallet } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAOfferToCreateWallet/WAOfferToCreateWallet'

describe('WAOfferToCreateWallet', () => {
  const handleClick = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WAOfferToCreateWallet onClick={handleClick} />)
  })
})
