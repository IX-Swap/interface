/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CashWithdrawals } from 'v2/app/pages/authorizer/pages/cashWithdrawals/CashWithdrawals'

describe('CashWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CashWithdrawals />)
  })
})
