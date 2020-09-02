/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { BanksList } from 'v2/app/pages/accounts/pages/banks/BanksList/BanksList'

describe('BanksList', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    render(<BanksList />)
  })
})
