import React from 'react'
import { render, cleanup } from 'test-utils'
import { DigitalSecuritiesRouter } from 'app/pages/accounts/pages/digitalSecurities/router/DigitalSecuritiesRouter'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/DSDeposit',
  () => ({
    DSDeposit: jest.fn(() => null)
  })
)

jest.mock('app/pages/accounts/pages/digitalSecurities/DSList/DSList', () => ({
  DSList: jest.fn(() => null)
}))

jest.mock('components/AppRoute', () => ({
  AppRoute: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/Withdraw',
  () => ({
    Withdraw: jest.fn(() => null)
  })
)

describe('DigitalSecuritiesRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DigitalSecuritiesRouter />)
  })
})
