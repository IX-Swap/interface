import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import React from 'react'
import { render } from 'test-utils'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('VirtualAccountCashDeposit', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <VirtualAccountCashDeposit
        virtualAccountDetails={virtualAccountsSample[0]}
      />
    )
  })
})
