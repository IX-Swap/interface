import React from 'react'
import { render } from 'test-utils'
import { CashDepositVirtualAccountDetails } from 'app/pages/accounts/components/CashDepositVirtualAccountDetails/CashDepositVirtualAccountDetails'

describe('CashDepositVirtualAccountDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <CashDepositVirtualAccountDetails
        selectedAccount='123'
        handleChange={() => {}}
      />
    )
  })
})
