/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawForm } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawForm'

describe('WithdrawForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<WithdrawForm />)
  })
})
