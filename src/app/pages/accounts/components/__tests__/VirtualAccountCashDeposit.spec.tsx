import { VirtualAccountCashDeposit } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountCashDeposit'
import React from 'react'
import { render } from 'test-utils'
import { fakeVirtualAccount } from '__fixtures__/unassignedVirtualAccounts'

describe('VirtualAccountCashDeposit', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <VirtualAccountCashDeposit virtualAccountDetails={fakeVirtualAccount} />
    )
    expect(container).toMatchSnapshot()
  })
})
