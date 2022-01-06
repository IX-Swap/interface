import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddressCreate } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate'

describe('WithdrawalAddressCreate', () => {
  it('should match snapshot', () => {
    const { container } = render(<WithdrawalAddressCreate />)

    expect(container).toMatchSnapshot()
  })
})
