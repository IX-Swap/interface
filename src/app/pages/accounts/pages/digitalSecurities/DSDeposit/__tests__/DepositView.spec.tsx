import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields',
  () => ({ DepositFormFields: jest.fn(() => null) })
)

describe('DepositForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DepositForm />)
  })

  it('renders DepositFormFields', () => {
    render(<DepositForm />)

    expect(DepositFormFields).toHaveBeenCalledTimes(1)
  })
})
