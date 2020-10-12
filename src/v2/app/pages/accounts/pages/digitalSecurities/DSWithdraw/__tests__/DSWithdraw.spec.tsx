/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSWithdraw } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/DSWithdraw'
import { WithdrawForm } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { WithdrawView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/RecentWithdrawals'

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm',
  () => ({
    WithdrawForm: jest.fn(({ children }) => (
      <div data-testid='WithdrawForm'>{children}</div>
    ))
  })
)

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView',
  () => ({ WithdrawView: jest.fn(() => null) })
)

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/RecentWithdrawals',
  () => ({
    RecentWithdrawals: jest.fn(() => <div />)
  })
)

describe('DSWithdraw', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSWithdraw />)
  })

  it('renders WithdrawForm & WithdrawView', () => {
    render(<DSWithdraw />)

    expect(WithdrawForm).toHaveBeenCalledTimes(1)
    expect(WithdrawView).toHaveBeenCalledTimes(1)
    expect(RecentWithdrawals).toHaveBeenCalledTimes(1)
  })
})
