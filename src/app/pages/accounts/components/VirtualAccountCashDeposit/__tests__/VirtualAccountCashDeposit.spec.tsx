import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'

describe('VirtualAccountCashDeposit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <VirtualAccountCashDeposit
        virtualAccountDetails={virtualAccountsSample[0]}
      />
    )
  })
})
