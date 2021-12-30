import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DigitalSecuritiesRouter />)
  })
})
