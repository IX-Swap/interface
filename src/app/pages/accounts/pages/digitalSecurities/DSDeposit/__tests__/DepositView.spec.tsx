import React from 'react'
import { render } from 'test-utils'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields',
  () => ({ DepositFormFields: jest.fn(() => null) })
)

describe('DepositForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DepositForm />)
  })

  it('renders DepositFormFields', () => {
    render(<DepositForm />)

    expect(DepositFormFields).toHaveBeenCalledTimes(1)
  })
})
