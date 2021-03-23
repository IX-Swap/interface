import React from 'react'
import { render, cleanup } from 'test-utils'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'

describe('Header', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Header />)
  })
})
