/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DepositCash } from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositCash'

jest.mock('v2/app/pages/accounts/pages/banks/DepositCash/DepositView', () => ({
  DepositView: () => <div data-testid='deposit-view'></div>
}))
jest.mock(
  'v2/app/pages/accounts/pages/banks/DepositCash/RecentDeposits',
  () => ({ RecentDeposits: () => <div data-testid='recent-deposits'></div> })
)

describe('DepositCash', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    const { queryByTestId } = render(<DepositCash />)

    const el1 = queryByTestId('deposit-view')
    const el2 = queryByTestId('recent-deposits')

    expect(el1).toBeTruthy()
    expect(el2).toBeTruthy()
  })
})
