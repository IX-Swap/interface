import React from 'react'
import { render } from 'test-utils'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm',
  () => ({ DepositForm: jest.fn(() => null) })
)

describe('DepositView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DepositForm component', () => {
    render(<DSDeposit />)

    expect(DepositForm).toHaveBeenCalledTimes(1)
  })
})
