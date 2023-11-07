import React from 'react'
import { render } from 'test-utils'
import { DepositForm } from 'app/pages/accounts/pages/security-tokens/Deposit/DepositForm'
import { DepositFormFields } from 'app/pages/accounts/pages/security-tokens/Deposit/DepositFormFields'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields',
  () => ({ DepositFormFields: jest.fn(() => null) })
)

describe('DepositForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DepositFormFields', () => {
    render(<DepositForm />)

    expect(DepositFormFields).toHaveBeenCalledTimes(1)
  })
})
