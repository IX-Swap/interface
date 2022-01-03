import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositForm } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm'
import { DSDeposit } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositForm',
  () => ({ DepositForm: jest.fn(() => null) })
)

describe('DepositView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSDeposit />)
  })

  it('renders DepositForm component', () => {
    render(<DSDeposit />)

    expect(DepositForm).toHaveBeenCalledTimes(1)
  })
})
