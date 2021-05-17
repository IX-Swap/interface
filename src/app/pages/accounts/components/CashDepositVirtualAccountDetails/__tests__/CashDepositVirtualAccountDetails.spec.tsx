import React from 'react'
import { render, cleanup } from 'test-utils'
import { CashDepositVirtualAccountDetails } from 'app/pages/accounts/components/CashDepositVirtualAccountDetails/CashDepositVirtualAccountDetails'

describe('CashDepositVirtualAccountDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <CashDepositVirtualAccountDetails
        selectedAccount='123'
        handleChange={() => {}}
      />
    )
  })
})
