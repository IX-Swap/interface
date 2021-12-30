import React from 'react'
import { render } from 'test-utils'
import { WithdrawCash } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawCash'
import { WithdrawView } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView'

jest.mock(
  'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView',
  () => ({
    WithdrawView: jest.fn(() => <div data-testid='WithdrawView'></div>)
  })
)

describe('WithdrawCash', () => {
  afterEach(async () => {})

  it.skip('renders withdrawView without error', () => {
    const { getByTestId } = render(<WithdrawCash />)

    const withdrawView = getByTestId('WithdrawView')
    expect(WithdrawView).toHaveBeenCalledTimes(1)

    expect(withdrawView).toBeTruthy()
  })
})
