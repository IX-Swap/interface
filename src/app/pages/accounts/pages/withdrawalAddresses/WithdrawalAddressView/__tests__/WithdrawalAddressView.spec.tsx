import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddressView } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'

describe('WithdrawalAddressView', () => {
  it('should match snapshot', () => {
    const { container } = render(<WithdrawalAddressView />)
    expect(container).toMatchSnapshot()
  })
})
