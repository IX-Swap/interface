/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSWithdrawals } from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'

describe('DSWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<DSWithdrawals />)
  })
})
