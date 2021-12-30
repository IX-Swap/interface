import React from 'react'
import { render } from 'test-utils'
import { Header } from 'app/pages/accounts/pages/banks/pages/BanksList/Header'

describe('Header', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Header />)
  })
})
